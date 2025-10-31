data "aws_iam_policy_document" "codebuild_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["codebuild.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "codebuild" {
  name               = "${var.app_name}-codebuild-role"
  assume_role_policy = data.aws_iam_policy_document.codebuild_assume.json
  tags               = local.tags
}

data "aws_iam_policy_document" "codebuild_policy" {
  statement {
    actions   = ["s3:GetObject", "s3:ListBucket"]
    resources = [aws_s3_bucket.source.arn, "${aws_s3_bucket.source.arn}/*"]
  }

  statement {
    actions   = ["amplify:CreateDeployment", "amplify:StartDeployment", "amplify:StopJob", "amplify:Get*", "amplify:List*"]
    resources = [aws_amplify_app.this.arn, "${aws_amplify_app.this.arn}/*"]
  }

  statement {
    actions   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "codebuild_inline" {
  role   = aws_iam_role.codebuild.id
  policy = data.aws_iam_policy_document.codebuild_policy.json
}

# EventBridge -> CodeBuild invocation role
resource "aws_iam_role" "events_invoke" {
  name = "${var.app_name}-events-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = { Service = "events.amazonaws.com" },
      Action    = "sts:AssumeRole"
    }]
  })
  tags = local.tags
}

resource "aws_iam_role_policy" "events_invoke" {
  role = aws_iam_role.events_invoke.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect   = "Allow",
      Action   = ["codebuild:StartBuild"],
      Resource = aws_codebuild_project.deploy.arn
    }]
  })
}

resource "aws_codebuild_project" "deploy" {
  name         = "${var.app_name}-deploy"
  service_role = aws_iam_role.codebuild.arn
  tags         = local.tags

  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type = var.codebuild_compute
    image        = "aws/codebuild/standard:7.0"
    type         = "LINUX_CONTAINER"

    environment_variable {
      name  = "APP_ID"
      value = aws_amplify_app.this.id
    }

    environment_variable {
      name  = "ENV_NAME"
      value = aws_amplify_branch.env.branch_name
    }

    environment_variable {
      name  = "SOURCE_BUCKET"
      value = aws_s3_bucket.source.bucket
    }

    # SOURCE_KEY is injected by EventBridge input transformer
    environment_variable {
      name  = "SOURCE_KEY"
      value = ""
    }
  }

  source {
    type      = "NO_SOURCE"
    buildspec = file("${path.module}/buildspec.yml")
  }

  logs_config {
    cloudwatch_logs {
      status = "ENABLED"
    }
  }

  build_timeout = 30

  # Force project update when buildspec changes
  project_visibility = "PRIVATE"
}

resource "aws_cloudwatch_event_rule" "s3_put" {
  name        = "${var.app_name}-s3-put"
  description = "Trigger CodeBuild on source zip upload"
  tags        = local.tags
  event_pattern = jsonencode({
    source        = ["aws.s3"],
    "detail-type" = ["Object Created"],
    detail = {
      bucket = { name = [aws_s3_bucket.source.bucket] },
      object = { key = [{ prefix = var.source_prefix }] }
    }
  })
}

resource "aws_cloudwatch_event_target" "to_codebuild" {
  rule      = aws_cloudwatch_event_rule.s3_put.name
  target_id = "codebuild"
  arn       = aws_codebuild_project.deploy.arn
  role_arn  = aws_iam_role.events_invoke.arn

  input_transformer {
    input_paths = {
      key = "$.detail.object.key"
    }
    input_template = <<-JSON
{"projectName":"${aws_codebuild_project.deploy.name}","environmentVariablesOverride":[{"name":"SOURCE_KEY","value":"<key>","type":"PLAINTEXT"}]}
JSON
  }
}

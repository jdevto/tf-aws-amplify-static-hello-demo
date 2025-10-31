data "archive_file" "site" {
  type        = "zip"
  source_dir  = var.local_source_dir
  output_path = "${path.module}/.terraform/archive/site-src.zip"

  # Exclude build artifacts - these should be generated in CodeBuild, not uploaded
  excludes = [
    "node_modules",
    ".next",
    "out",
    ".git",
    ".DS_Store",
    "*.log"
  ]
}

locals {
  # Use MD5 for content-based key (changes when source changes)
  # Add timestamp to ensure new upload on first apply if file doesn't exist
  source_object_key = "${var.source_prefix}site-${data.archive_file.site.output_md5}.zip"
}

resource "aws_s3_object" "source_zip" {
  bucket       = aws_s3_bucket.source.id
  key          = local.source_object_key
  source       = data.archive_file.site.output_path
  etag         = data.archive_file.site.output_md5
  content_type = "application/zip"
  tags         = local.tags

  depends_on = [
    aws_amplify_app.this,
    aws_amplify_branch.env,
    aws_codebuild_project.deploy,
    aws_cloudwatch_event_rule.s3_put,
    aws_cloudwatch_event_target.to_codebuild,
    aws_s3_bucket_notification.source,
    aws_iam_role.events_invoke,
    aws_iam_role.codebuild
  ]

  # Note: Terraform only uploads if content changes (different MD5)
  # To trigger CodeBuild manually, modify any source file or use:
  # terraform taint aws_s3_object.source_zip && terraform apply
}

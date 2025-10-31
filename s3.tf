resource "aws_s3_bucket" "source" {
  bucket        = "${var.app_name}-source"
  force_destroy = true

  tags = local.tags
}

resource "aws_s3_bucket_public_access_block" "source" {
  bucket                  = aws_s3_bucket.source.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable EventBridge notifications for this bucket so Object Created events are sent to EventBridge
resource "aws_s3_bucket_notification" "source" {
  bucket      = aws_s3_bucket.source.id
  eventbridge = true
}

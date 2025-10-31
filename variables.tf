variable "app_name" {
  description = "Amplify app name"
  type        = string
  default     = "amplify-static-next-demo"
}

variable "env_name" {
  description = "Amplify environment label (Amplify calls it a branch)"
  type        = string
  default     = "production"
}

variable "source_prefix" {
  description = "S3 key prefix to watch for uploads"
  type        = string
  default     = "uploads/"
}

variable "codebuild_compute" {
  description = "CodeBuild compute type"
  type        = string
  default     = "BUILD_GENERAL1_SMALL"
}

variable "local_source_dir" {
  description = "Local path to Next.js project to package and upload"
  type        = string
  default     = "examples/nextjs-minimal"
}

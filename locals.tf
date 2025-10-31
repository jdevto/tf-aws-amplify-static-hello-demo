locals {
  tags = {
    Project     = var.app_name
    Environment = var.env_name
    ManagedBy   = "terraform"
  }
}

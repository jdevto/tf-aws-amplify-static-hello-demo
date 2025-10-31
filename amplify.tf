resource "aws_amplify_app" "this" {
  name     = var.app_name
  platform = "WEB"
  tags     = local.tags

  # Serve Next.js static export pages directly
  custom_rule {
    source = "/tools"
    target = "/tools.html"
    status = "200"
  }

  custom_rule {
    source = "/dashboards"
    target = "/dashboards.html"
    status = "200"
  }

  custom_rule {
    source = "/status"
    target = "/status.html"
    status = "200"
  }

  # SPA fallback: route all unmatched paths to index.html for client-side routing
  custom_rule {
    source = "/<*>"
    target = "/index.html"
    status = "200"
  }
}

resource "aws_amplify_branch" "env" {
  app_id      = aws_amplify_app.this.id
  branch_name = var.env_name
  stage       = "PRODUCTION"
  framework   = "Next.js"
  tags        = local.tags
}

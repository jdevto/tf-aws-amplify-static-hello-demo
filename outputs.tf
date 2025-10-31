output "default_domain" {
  value       = aws_amplify_app.this.default_domain
  description = "Amplify default domain"
}

output "environment_url" {
  value       = "https://${aws_amplify_branch.env.branch_name}.${aws_amplify_app.this.default_domain}"
  description = "Environment URL on Amplify"
}

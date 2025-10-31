# Amplify + Next.js via Terraform (S3 → CodeBuild → Amplify)

Terraform provisions Amplify Hosting, an S3 upload bucket, a CodeBuild project, and an EventBridge trigger. Upload a zipped Next.js project; CodeBuild builds (`next build` + `next export`) and deploys to Amplify via API.

## Prerequisites

- Terraform >= 1.5
- AWS CLI with permissions for Amplify, S3, CodeBuild, Events, Logs

## Configure

Optionally create `terraform.tfvars` to override defaults:

```hcl
app_name      = "amplify-static-next-demo"
env_name      = "production"
source_prefix = "uploads/"
```

## Deploy Infra

```bash
terraform init
terraform apply
```

Outputs: `default_domain`, `environment_url`, `source_bucket`, `source_prefix`.

## Prepare Source Zip

- Root must contain `package.json`, lockfile, `next.config.js` with `output: 'export'`.
- Minimal example under `examples/nextjs-minimal/`.

Create zip:

```bash
cd examples/nextjs-minimal
zip -rq ../site-src.zip .
```

## Trigger Build/Deploy

Terraform auto-zips and uploads the local source (default `examples/nextjs-minimal`) during `apply`, which triggers CodeBuild automatically.

**When CodeBuild triggers:**

- ✅ **First `terraform apply`**: File doesn't exist → uploads → triggers CodeBuild
- ✅ **Source files changed**: MD5 changes → new upload → triggers CodeBuild
- ❌ **No changes**: File exists with same content → no upload → no trigger

**To force a new build:**

```bash
# Option 1: Modify any source file (e.g., edit a page)
# Option 2: Force re-upload
terraform taint aws_s3_object.source_zip && terraform apply
```

- Override source dir if needed:

```hcl
local_source_dir = "/absolute/path/to/your/nextjs/project"
```

Watch CodeBuild logs; open `environment_url` when done. The uploaded key is in output `uploaded_source_key`.

## Notes

- Static export only (no SSR/ISR).
- Amplify routing rules:
  - `/tools` → `tools.html`
  - `/dashboards` → `dashboards.html`
  - `/status` → `status.html`
  - All other paths → `index.html` (SPA fallback)

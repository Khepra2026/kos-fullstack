
# FIX WINDOWS MARK OF THE WEB + Execution
Set-Location C:\kos-fullstack
Write-Host "Unblock files..." -ForegroundColor Yellow
Get-ChildItem -Recurse -Path .\KOS-BIGFOUR-REMEDIATION-PACK | Unblock-File -ErrorAction SilentlyContinue
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

Write-Host "Copy Next.js healthz endpoints..." -ForegroundColor Cyan
# Detect App Router vs Pages Router
if(Test-Path ".\app"){
  New-Item -ItemType Directory -Force -Path ".\app\api\healthz",".\app\api\ready" | Out-Null
  Copy-Item -Force .\KOS-BIGFOUR-REMEDIATION-PACK\nextjs\app\api\healthz\route.ts .\app\api\healthz\route.ts
  Copy-Item -Force .\KOS-BIGFOUR-REMEDIATION-PACK\nextjs\app\api\ready\route.ts .\app\api\ready\route.ts
  Write-Host "App Router routes copied to app/api/healthz and app/api/ready"
} elseif(Test-Path ".\src\app"){
  New-Item -ItemType Directory -Force -Path ".\src\app\api\healthz",".\src\app\api\ready" | Out-Null
  Copy-Item -Force .\KOS-BIGFOUR-REMEDIATION-PACK\nextjs\app\api\healthz\route.ts .\src\app\api\healthz\route.ts
  Copy-Item -Force .\KOS-BIGFOUR-REMEDIATION-PACK\nextjs\app\api\ready\route.ts .\src\app\api\ready\route.ts
} else {
  New-Item -ItemType Directory -Force -Path ".\pages\api" | Out-Null
  Copy-Item -Force .\KOS-BIGFOUR-REMEDIATION-PACK\nextjs\pages\api\healthz.ts .\pages\api\healthz.ts
  Copy-Item -Force .\KOS-BIGFOUR-REMEDIATION-PACK\nextjs\pages\api\ready.ts .\pages\api\ready.ts
  Write-Host "Pages Router routes copied"
}

Write-Host "Apply .dockerignore Big Four..." -ForegroundColor Cyan
Copy-Item -Force .\KOS-BIGFOUR-REMEDIATION-PACK\.dockerignore.bigfour .\.dockerignore

Write-Host "Apply fly.toml Big Four with correct checks..." -ForegroundColor Cyan
@"
app = "kos-khepraexperts"
primary_region = "cdg"

[env]
  PORT = "3000"
  NODE_ENV = "production"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = "off"
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]

  [http_service.concurrency]
    type = "requests"
    hard_limit = 250
    soft_limit = 200

[[http_service.checks]]
  interval = "15s"
  timeout = "3s"
  grace_period = "30s"
  method = "GET"
  path = "/api/healthz"

[[services]]
  internal_port = 3000
  protocol = "tcp"
  [[services.http_checks]]
    interval = "10s"
    timeout = "2s"
    grace_period = "20s"
    method = "GET"
    path = "/api/ready"
    protocol = "http"
"@ | Set-Content -Path ".\fly.toml" -Encoding utf8

Write-Host "Dockerfile fix (Next.js standalone)..." -ForegroundColor Cyan
@"
FROM node:20.18.0-alpine AS base
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
HEALTHCHECK --interval=15s --timeout=3s --start-period=30s --retries=3 CMD wget -qO- http://localhost:3000/api/healthz || exit 1
CMD ["node","server.js"]
"@ | Set-Content -Path ".\Dockerfile" -Encoding utf8

Write-Host "`n=== FIX DONE ===" -ForegroundColor Green
Write-Host "Maintenant:"
Write-Host "  fly config validate"
Write-Host "  fly deploy --strategy=canary -a kos-khepraexperts"
Write-Host "  Invoke-WebRequest https://kos-khepraexperts.fly.dev/api/healthz | Select StatusCode, Content"

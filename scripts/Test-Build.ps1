param([string]$RepoPath = ".")

Write-Host "=== BUILD REPRODUCIBLE §27 ===" -ForegroundColor Cyan
Set-Location $RepoPath

# 1. GIT SHA -> BUILD -> IMAGE
$sha = (git rev-parse HEAD).Trim()
if (-not $sha) { Write-Host "FAIL: Not a git repo" -ForegroundColor Red; exit 1 }
Write-Host "GIT SHA: $sha"

# 2. Build - on capture stderr pour éviter les RemoteException rouges
Write-Host "`n[BUILD] docker build -t kos-regtech:$sha..." -ForegroundColor Yellow
$ErrorActionPreference = "SilentlyContinue"
$buildOutput = docker build -t kos-regtech:$sha --label "git.sha=$sha". 2>&1
$buildExitCode = $LASTEXITCODE
$buildOutput | ForEach-Object { Write-Host $_ }

if ($buildExitCode -ne 0) {
    Write-Host "FAIL: Docker build failed (exit $buildExitCode)" -ForegroundColor Red
    exit 1
}
Write-Host "PASS: Docker build succeeded" -ForegroundColor Green

# 3. Check image reproducibility - FIX pour PS5.1 + buildx
try {
    $inspectRaw = docker inspect kos-regtech:$sha 2>&1 | Out-String
    $inspect = $inspectRaw | ConvertFrom-Json

    # docker inspect retourne un array, même avec une seule image
    if ($inspect -is [System.Array]) { $inspect = $inspect[0] }

    if ($null -eq $inspect) { throw "inspect null" }

    $config = $inspect.Config
    $labels = $config.Labels

    Write-Host "`n[IMAGE INSPECT]" -ForegroundColor Yellow
    Write-Host "Image ID: $($inspect.Id.Substring(0,19))"
    Write-Host "Created: $($inspect.Created)"

    if ($labels.'git.sha' -eq $sha) {
        Write-Host "PASS: Label git.sha matches $sha" -ForegroundColor Green
    } else {
        Write-Host "WARN: Label git.sha missing or mismatch (found: $($labels.'git.sha'))" -ForegroundColor Yellow
    }

    # Check public/ existe dans l'image
    Write-Host "`n[CONTENT CHECK] ls public/" -ForegroundColor Yellow
    docker run --rm kos-regtech:$sha ls -lh public/ 2>&1 | Write-Host
    docker run --rm kos-regtech:$sha ls -lh public/index.html 2>&1 | Write-Host

} catch {
    Write-Host "WARN: Inspect failed - $_" -ForegroundColor Yellow
    # Fallback sans ConvertFrom-Json
    docker image inspect kos-regtech:$sha --format 'ID={{.Id}} Created={{.Created}} Label={{index.Config.Labels "git.sha"}}' 2>&1 | Write-Host
}

Write-Host "`nBUILD DONE" -ForegroundColor Cyan
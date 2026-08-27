Set-Content -Path.\scripts\Test-SecretScan.ps1 -Encoding utf8 -Value @'
=== OWASP ASVS 5.0 + API Security + NIST SSDF ===
[1] Secret Scan - KOS RegTech §18

# Chemins
$root = (Get-Location).Path
$configPath = Join-Path $root ".gitleaks.toml"
$ignorePath = Join-Path $root ".gitleaksignore"

# 1. Vérifie si gitleaks est installé
$gitleaksCmd = Get-Command gitleaks -ErrorAction SilentlyContinue
if (-not $gitleaksCmd) {
    Write-Host "WARN: gitleaks not installed, installing via go..."
    go install github.com/gitleaks/gitleaks/v8@latest
}

# 2. Crée.gitleaks.toml si absent (exclut les archives)
if (-not (Test-Path $configPath)) {
@"
title = "KOS Gitleaks Config"
[extend]
useDefault = true

[[allowlists]]
description = "Exclude archives, releases, node_modules"
paths = [
    '''docs/archive/''',
    '''release/dist_''',
    '''node_modules/''',
    '''\.git/''',
    '''\.next/''',
    '''dist/'''
]

[[allowlists]]
description = "Allow example keys in docs"
paths = ['''README''']
regexTarget = "line"
regexes = [
    '''example''',
    '''khepra-example-key''',
    '''REDACTED''',
    '''Bearer\s+REDACTED'''
]
"@ | Set-Content -Path $configPath -Encoding utf8
    Write-Host "INFO: Created $configPath"
}

# 3. Vérifie les.env trackés - NO-GO immédiat
$trackedEnvs = git ls-files --cached | Select-String -Pattern "^\.env|\.env\.prod|\.env\.local|gateway/\.dev\.vars|backend/\.env|frontend/\.env" -ErrorAction SilentlyContinue
if ($trackedEnvs) {
    Write-Host "FAIL:.env files are still tracked in git index:"
    $trackedEnvs | ForEach-Object { Write-Host " - $_" }
    Write-Host "RUN: git rm --cached.env.prod.env.local backend/.env.local frontend/.env.local gateway/.dev.vars -f --ignore-unmatch"
    Write-Host "FAIL: Secrets found - NO-GO"
    exit 1
}

# 4. Lance gitleaks avec la bonne syntaxe: -s pas --source
Write-Host "Running: gitleaks detect -s. --no-git -c.gitleaks.toml --no-banner -v"

# Supprime ancien rapport
Remove-Item -Path "gitleaks-report.json" -Force -ErrorAction SilentlyContinue

$args = @("detect", "-s", ".", "--no-git", "-c", $configPath, "--no-banner", "-v", "--report-path", "gitleaks-report.json", "--report-format", "json")
# Si.gitleaksignore existe, il sera auto-détecté via -i flag par défaut, sinon on le précise
if (Test-Path $ignorePath) {
    $args += @("-i", $ignorePath)
}

& gitleaks @args
$exitCode = $LASTEXITCODE

# 5. Analyse du rapport
if ($exitCode -eq 0) {
    Write-Host "PASS: No secrets found - GO"
    Remove-Item -Path "gitleaks-report.json" -Force -ErrorAction SilentlyContinue
    exit 0
} else {
    if (Test-Path "gitleaks-report.json") {
        try {
            $report = Get-Content "gitleaks-report.json" -Raw | ConvertFrom-Json
            $count = $report.Count
            if ($null -eq $count) { $count = 0 }
            Write-Host "FAIL: leaks found: $count"
            $report | Select-Object -First 10 | ForEach-Object {
                Write-Host "Finding: $($_.RuleID) in $($_.File):$($_.StartLine)"
            }
        } catch {
            Write-Host "FAIL: gitleaks found leaks but report unreadable"
        }
    } else {
        Write-Host "FAIL: gitleaks exit code $exitCode"
    }
    Write-Host "FAIL: Secrets found - NO-GO"
    Write-Host "HINT: If leaks are in docs/archive/, they are already excluded by.gitleaks.toml. If still failing, check root.env files."
    exit 1
}
'@
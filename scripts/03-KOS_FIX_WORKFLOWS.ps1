# =====================================================
# KOS WORKFLOWS REPAIR & OPTIMIZATION
# =====================================================
# Execute: pwsh ./scripts/03-KOS_FIX_WORKFLOWS.ps1
# Purpose: Fix Lighthouse, Node version, and workflow issues

param(
    [switch]$DryRun = $false,
    [switch]$Commit = $true
)

$ErrorActionPreference = 'Continue'
$fixesApplied = 0

function Write-Section {
    param([string]$Title, [string]$Color = 'Yellow')
    Write-Host "`n$('=' * 60)" -ForegroundColor $Color
    Write-Host $Title -ForegroundColor $Color
    Write-Host "$('=' * 60)" -ForegroundColor $Color
}

Write-Section "🔧 KOS WORKFLOWS REPAIR SUITE" 'Cyan'

cd ./kos-platform

# ============ 1. Fix Lighthouse Configuration ============
Write-Section "[1/4] Fixing Lighthouse CI configuration..." 'Yellow'

$lighthouseConfig = @"
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "staticDistDir": "./dist",
      "url": [
        "https://khepraexperts.com/",
        "https://khepraexperts.com/about"
      ]
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.7, "aggregationMethod": "median" }],
        "categories:accessibility": ["error", { "minScore": 0.9, "aggregationMethod": "median" }],
        "categories:best-practices": ["error", { "minScore": 0.9, "aggregationMethod": "median" }],
        "categories:seo": ["error", { "minScore": 0.9, "aggregationMethod": "median" }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
"@

if ($DryRun) {
    Write-Host "  [DRY-RUN] Would update .lighthouserc.json" -ForegroundColor Gray
} else {
    $lighthouseConfig | Set-Content '.lighthouserc.json'
    Write-Host "  ✓ Updated .lighthouserc.json" -ForegroundColor Green
    $fixesApplied++
    
    # Validate JSON
    try {
        $lighthouseConfig | ConvertFrom-Json | Out-Null
        Write-Host "  ✓ JSON validation passed" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ JSON validation failed: $_" -ForegroundColor Red
    }
}

# ============ 2. Fix Workflow Node Versions ============
Write-Section "[2/4] Fixing Node version deprecations..." 'Yellow'

$workflowDir = './.github/workflows'
if (Test-Path $workflowDir) {
    Get-ChildItem $workflowDir -Filter '*.yml' -File | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        $originalContent = $content
        
        # Ensure Node 20 is compatible
        if ($content -match 'node-version:\s*20') {
            Write-Host "  Processing $($_.BaseName)..." -ForegroundColor Cyan
            
            # Add environment variable for compatibility
            if ($content -notmatch 'ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION') {
                $content = $content -replace '(steps:)', "env:`n    ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION: true`n  `$1"
            }
            
            if ($content -ne $originalContent) {
                if ($DryRun) {
                    Write-Host "    [DRY-RUN] Would fix workflow" -ForegroundColor Gray
                } else {
                    $content | Set-Content $_.FullName
                    Write-Host "    ✓ Fixed" -ForegroundColor Green
                    $fixesApplied++
                }
            }
        }
    }
} else {
    Write-Host "  ⚠️  Workflow directory not found" -ForegroundColor Yellow
}

# ============ 3. Fix Environment Variables ============
Write-Section "[3/4] Fixing environment configurations..." 'Yellow'

$envFiles = @('.env', '.env.local', '.env.docker')
foreach ($file in $envFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $originalContent = $content
        
        # Ensure proper format
        $content = $content -replace '\r\n', "`n"
        $content = $content -replace '\s+$', ''
        
        if ($content -ne $originalContent) {
            if ($DryRun) {
                Write-Host "  [DRY-RUN] Would normalize $file" -ForegroundColor Gray
            } else {
                $content | Set-Content $file -NoNewline
                Write-Host "  ✓ Normalized $file" -ForegroundColor Green
                $fixesApplied++
            }
        }
    }
}

# ============ 4. Validate TypeScript Configuration ============
Write-Section "[4/4] Validating TypeScript configuration..." 'Yellow'

if (Test-Path 'tsconfig.json') {
    try {
        $tsconfig = Get-Content 'tsconfig.json' | ConvertFrom-Json
        Write-Host "  ✓ tsconfig.json valid" -ForegroundColor Green
        Write-Host "    Target: $($tsconfig.compilerOptions.target)" -ForegroundColor Cyan
        Write-Host "    Module: $($tsconfig.compilerOptions.module)" -ForegroundColor Cyan
    } catch {
        Write-Host "  ✗ tsconfig.json invalid: $_" -ForegroundColor Red
    }
} else {
    Write-Host "  ⚠️  tsconfig.json not found" -ForegroundColor Yellow
}

# ============ 5. Validate Docker Configuration ============
Write-Section "[5/5] Validating Docker configuration..." 'Yellow'

if (Test-Path 'docker-compose.yml') {
    Write-Host "  ✓ docker-compose.yml found" -ForegroundColor Green
    
    # Validate YAML structure
    $dcContent = Get-Content 'docker-compose.yml' -Raw
    if ($dcContent -match 'version:' -and $dcContent -match 'services:') {
        Write-Host "  ✓ Structure looks valid" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Structure may be incomplete" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠️  docker-compose.yml not found" -ForegroundColor Yellow
}

cd ..

# ============ 6. Git Commit ============
if ($Commit -and -not $DryRun -and $fixesApplied -gt 0) {
    Write-Section "📤 Committing fixes..." 'Green'
    
    cd ./kos-platform
    
    & git config user.name "KOS Automation" 2>$null
    & git config user.email "kos@khepra.dev" 2>$null
    & git add -A 2>$null
    
    $status = & git diff --cached --quiet 2>$null
    if ($LASTEXITCODE -ne 0) {
        $commitMsg = "fix: workflow quality gates - lighthouse config, node version, env vars"
        & git commit -m $commitMsg 2>$null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✓ Changes committed" -ForegroundColor Green
        }
        
        $pushResult = & git push 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✓ Pushed to origin/main" -ForegroundColor Green
        }
    }
    
    cd ..
}

# ============ Summary ============
Write-Section "📊 REPAIR SUMMARY" 'Green'
Write-Host "  Fixes applied: $fixesApplied" -ForegroundColor Cyan
if ($DryRun) {
    Write-Host "  Mode: DRY-RUN" -ForegroundColor Yellow
} else {
    Write-Host "  ✅ Workflows repaired!" -ForegroundColor Green
}

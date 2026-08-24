# =====================================================
# KOS STACK VALIDATION & QUALITY CHECK
# =====================================================
# Execute: pwsh ./scripts/04-KOS_VALIDATE_STACK.ps1
# Purpose: Validate entire KOS stack integrity

$ErrorActionPreference = 'Continue'
$issues = @()
$warnings = @()
$successes = @()

function Write-Section {
    param([string]$Title, [string]$Color = 'Cyan')
    Write-Host "`n$('=' * 60)" -ForegroundColor $Color
    Write-Host $Title -ForegroundColor $Color
    Write-Host "$('=' * 60)" -ForegroundColor $Color
}

function Test-Condition {
    param([bool]$Condition, [string]$SuccessMsg, [string]$FailMsg, [string]$Type = 'ERROR')
    
    if ($Condition) {
        Write-Host "  ✓ $SuccessMsg" -ForegroundColor Green
        $successes += $SuccessMsg
    } else {
        Write-Host "  ✗ $FailMsg" -ForegroundColor Red
        if ($Type -eq 'ERROR') {
            $issues += $FailMsg
        } else {
            $warnings += $FailMsg
        }
    }
}

Write-Section "✔️  KOS STACK VALIDATION" 'Cyan'

# ============ 1. Repository Structure ============
Write-Section "[1/6] Repository Structure" 'Yellow'

cd ./kos-platform

$requiredDirs = @(
    'src',
    '.github/workflows',
    'config',
    'services',
    'tests',
    'public'
)

foreach ($dir in $requiredDirs) {
    Test-Condition (Test-Path $dir) "$dir exists" "$dir missing"
}

# ============ 2. Configuration Files ============
Write-Section "[2/6] Configuration Files" 'Yellow'

$configFiles = @{
    'package.json' = 'Project manifest'
    'tsconfig.json' = 'TypeScript config'
    'eslint.config.ts' = 'ESLint config'
    'vite.config.ts' = 'Vite bundler'
    'docker-compose.yml' = 'Docker services'
    '.lighthouserc.json' = 'Lighthouse CI'
}

foreach ($file in $configFiles.Keys) {
    Test-Condition (Test-Path $file) "$file ($($configFiles[$file]))" "$file missing"
}

# ============ 3. TypeScript Compilation ============
Write-Section "[3/6] TypeScript Compilation" 'Yellow'

if (Test-Path 'tsconfig.json') {
    try {
        $tsconfig = Get-Content 'tsconfig.json' | ConvertFrom-Json
        Test-Condition $true "tsconfig.json is valid JSON" "Invalid JSON"
        Test-Condition ($null -ne $tsconfig.compilerOptions) "Compiler options present" "Missing compiler options"
        Test-Condition ($tsconfig.compilerOptions.target -eq 'ES2020') "Target is ES2020" "Target is $($tsconfig.compilerOptions.target)"
    } catch {
        Test-Condition $false "" "tsconfig.json parsing failed: $_"
    }
}

# ============ 4. Package Management ============
Write-Section "[4/6] Package Management" 'Yellow'

if (Test-Path 'package.json') {
    try {
        $package = Get-Content 'package.json' | ConvertFrom-Json
        Test-Condition ($null -ne $package.scripts) "NPM scripts defined" "No scripts found"
        Test-Condition ($package.scripts | Get-Member -MemberType NoteProperty | Measure-Object).Count -gt 0 "Build scripts present" "Missing build scripts"
        
        # Check for essential scripts
        $essentialScripts = @('build', 'dev')
        foreach ($script in $essentialScripts) {
            Test-Condition ($package.scripts.$script) "Script '$script' exists" "Script '$script' missing" 'WARN'
        }
    } catch {
        Test-Condition $false "" "package.json parsing failed: $_"
    }
}

if (Test-Path 'package-lock.json') {
    $lockSize = (Get-Item 'package-lock.json').Length / 1MB
    Test-Condition ($lockSize -lt 300) "package-lock.json size OK ($([Math]::Round($lockSize, 2))MB)" "package-lock.json too large ($([Math]::Round($lockSize, 2))MB)" 'WARN'
}

# ============ 5. Workflows ============
Write-Section "[5/6] GitHub Workflows" 'Yellow'

$workflowDir = './.github/workflows'
if (Test-Path $workflowDir) {
    $workflows = Get-ChildItem $workflowDir -Filter '*.yml' -File
    Test-Condition ($workflows.Count -gt 0) "$($workflows.Count) workflow(s) found" "No workflows found"
    
    foreach ($workflow in $workflows) {
        $content = Get-Content $workflow.FullName -Raw
        $hasIssues = $false
        
        if ($content -match 'jq.*error') {
            $warnings += "$($workflow.BaseName): JSON parsing issue"
            $hasIssues = $true
        }
        
        if ($content -match 'No GitHub token set') {
            $warnings += "$($workflow.BaseName): Missing GitHub token"
            $hasIssues = $true
        }
        
        if (-not $hasIssues) {
            Write-Host "  ✓ $($workflow.BaseName)" -ForegroundColor Green
        }
    }
}

# ============ 6. Database & Infrastructure ============
Write-Section "[6/6] Database & Infrastructure" 'Yellow'

if (Test-Path 'schema.sql') {
    $schemaSize = (Get-Item 'schema.sql').Length / 1MB
    $tableCount = (Get-Content 'schema.sql' | Select-String -Pattern 'CREATE TABLE' | Measure-Object).Count
    Test-Condition ($tableCount -gt 0) "Database schema with $tableCount tables" "No tables found in schema.sql"
    Test-Condition ($schemaSize -lt 1500) "Schema size OK" "Schema too large (>1500MB)" 'WARN'
}

if (Test-Path 'docker-compose.yml') {
    $dcContent = Get-Content 'docker-compose.yml' -Raw
    Test-Condition ($dcContent -match 'services:') "Docker services defined" "No services in docker-compose.yml"
}

cd ..

# ============ Summary ============
Write-Section "📊 VALIDATION SUMMARY" 'Green'

Write-Host "`n  Total Checks Passed: $($successes.Count)" -ForegroundColor Green
if ($warnings.Count -gt 0) {
    Write-Host "  ⚠️  Warnings: $($warnings.Count)" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "    • $warning" -ForegroundColor Yellow
    }
}
if ($issues.Count -gt 0) {
    Write-Host "  ❌ Errors: $($issues.Count)" -ForegroundColor Red
    foreach ($issue in $issues) {
        Write-Host "    • $issue" -ForegroundColor Red
    }
    exit 1
} else {
    Write-Host "  ✅ ALL TESTS PASSED" -ForegroundColor Green
    exit 0
}

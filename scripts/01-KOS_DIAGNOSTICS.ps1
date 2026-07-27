# =====================================================
# KOS STACK COMPREHENSIVE DIAGNOSTIC SUITE
# =====================================================
# Execute: pwsh ./scripts/01-KOS_DIAGNOSTICS.ps1
# Author: KOS Automation
# Date: 2026-07-27

param(
    [switch]$Detailed = $false,
    [switch]$ExportReport = $false
)

$ErrorActionPreference = 'Continue'
$diagnosticReport = @()
$timestamp = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'

function Write-Section {
    param([string]$Title, [string]$Color = 'Cyan')
    Write-Host "`n$('=' * 60)" -ForegroundColor $Color
    Write-Host $Title -ForegroundColor $Color
    Write-Host "$('=' * 60)" -ForegroundColor $Color
}

function Log-Finding {
    param([string]$Finding, [string]$Level = 'INFO')
    $timestamp_log = Get-Date -Format 'HH:mm:ss'
    $logEntry = "[$timestamp_log] [$Level] $Finding"
    Write-Host $logEntry
    $diagnosticReport += $logEntry
}

Write-Section "🔍 KOS STACK COMPREHENSIVE DIAGNOSTIC" 'Cyan'

# ============ 1. Repository Health ============
Write-Section "📦 REPOSITORY HEALTH CHECK" 'Yellow'

$repos = @{
    'kos-platform' = 'Main RegTech Platform'
    'kos-fullstack' = 'Fullstack Demo'
    'Kos-RegTech-API' = 'API Backend'
    'KOS' = 'Infrastructure Scripts'
    'Khepra-Experts' = 'Corporate Website'
}

foreach ($repo in $repos.Keys) {
    if (Test-Path "../$repo/.git") {
        $size = (Get-ChildItem "../$repo" -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB
        $fileCount = (Get-ChildItem "../$repo" -Recurse -File -ErrorAction SilentlyContinue | Measure-Object).Count
        $commitCount = & git -C "../$repo" rev-list --count HEAD 2>/dev/null
        
        $statusColor = if ($size -eq 0) { 'Red' } else { 'Green' }
        Write-Host "  ✓ $repo" -ForegroundColor $statusColor
        Log-Finding "$repo: Size=$([Math]::Round($size, 2))MB | Files=$fileCount | Commits=$commitCount"
    } else {
        Write-Host "  ✗ $repo" -ForegroundColor Red
        Log-Finding "$repo: Repository not found or not a git repo" 'WARN'
    }
}

# ============ 2. Workflow Analysis ============
Write-Section "🔄 WORKFLOW ANALYSIS" 'Yellow'

$workflowDir = './kos-platform/.github/workflows'
if (Test-Path $workflowDir) {
    $workflows = Get-ChildItem $workflowDir -Filter '*.yml' -File
    Log-Finding "Found $($workflows.Count) workflow(s)" 'INFO'
    
    foreach ($workflow in $workflows) {
        $content = Get-Content $workflow.FullName -Raw
        
        # Check for common issues
        $issues = @()
        
        if ($content -match 'node-version:\s*20') { $issues += 'Node 20 (deprecated)' }
        if ($content -match 'minScore.*0.9.*found.*0') { $issues += 'Lighthouse score assertion' }
        if ($content -match 'jq.*error') { $issues += 'JSON parsing error' }
        if ($content -match 'No GitHub token set') { $issues += 'Missing GitHub token' }
        
        Write-Host "  📋 $($workflow.BaseName)" -ForegroundColor Cyan
        if ($issues.Count -gt 0) {
            Write-Host "     ⚠️  Issues detected:" -ForegroundColor Yellow
            $issues | ForEach-Object { 
                Write-Host "        - $_" -ForegroundColor Red
                Log-Finding "Workflow $($workflow.BaseName): $_" 'ERROR'
            }
        } else {
            Write-Host "     ✓ No issues" -ForegroundColor Green
        }
    }
} else {
    Log-Finding "Workflows directory not found" 'ERROR'
}

# ============ 3. TypeScript Compilation ============
Write-Section "🔧 TYPESCRIPT COMPILATION CHECK" 'Yellow'

if (Test-Path './kos-platform/tsconfig.json') {
    Write-Host "  ✓ tsconfig.json found" -ForegroundColor Green
    $tsconfig = Get-Content './kos-platform/tsconfig.json' | ConvertFrom-Json
    Write-Host "    Target: $($tsconfig.compilerOptions.target)" -ForegroundColor Cyan
    Write-Host "    Module: $($tsconfig.compilerOptions.module)" -ForegroundColor Cyan
    Log-Finding "TypeScript configuration valid" 'INFO'
} else {
    Write-Host "  ✗ tsconfig.json not found" -ForegroundColor Red
    Log-Finding "TypeScript configuration missing" 'ERROR'
}

# ============ 4. Package Dependencies ============
Write-Section "📚 PACKAGE DEPENDENCIES CHECK" 'Yellow'

if (Test-Path './kos-platform/package.json') {
    $package = Get-Content './kos-platform/package.json' | ConvertFrom-Json
    Write-Host "  ✓ package.json found" -ForegroundColor Green
    Write-Host "    Version: $($package.version)" -ForegroundColor Cyan
    
    if ($package.scripts) {
        Write-Host "    Scripts: $($package.scripts | Get-Member -MemberType NoteProperty | Measure-Object).Count" -ForegroundColor Cyan
        if ($Detailed) {
            $package.scripts | Get-Member -MemberType NoteProperty | ForEach-Object {
                Write-Host "      - $($_.Name)" -ForegroundColor Gray
            }
        }
    }
    
    if (Test-Path './kos-platform/package-lock.json') {
        $lockSize = (Get-Item './kos-platform/package-lock.json').Length / 1MB
        Write-Host "    package-lock.json: $([Math]::Round($lockSize, 2))MB" -ForegroundColor Cyan
        
        if ($lockSize -gt 300) {
            Write-Host "    ⚠️  Large lock file detected" -ForegroundColor Yellow
            Log-Finding "package-lock.json is $([Math]::Round($lockSize, 2))MB (recommended < 300MB)" 'WARN'
        }
    }
} else {
    Log-Finding "package.json not found" 'ERROR'
}

# ============ 5. Build Artifacts ============
Write-Section "🏗️  BUILD ARTIFACTS CHECK" 'Yellow'

$buildDirs = @('dist', 'build', '.next', '.nuxt')
foreach ($dir in $buildDirs) {
    $fullPath = "./kos-platform/$dir"
    if (Test-Path $fullPath) {
        $size = (Get-ChildItem $fullPath -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
        Write-Host "  ✓ $dir ($([Math]::Round($size, 2))MB)" -ForegroundColor Green
        Log-Finding "Build directory $dir found: $([Math]::Round($size, 2))MB" 'INFO'
    }
}

# ============ 6. Docker Configuration ============
Write-Section "🐳 DOCKER CONFIGURATION CHECK" 'Yellow'

$dockerFiles = @('Dockerfile', 'docker-compose.yml')
foreach ($file in $dockerFiles) {
    $fullPath = "./kos-platform/$file"
    if (Test-Path $fullPath) {
        Write-Host "  ✓ $file" -ForegroundColor Green
        
        if ($file -eq 'docker-compose.yml') {
            $content = Get-Content $fullPath -Raw
            $services = $content | Select-String -Pattern 'services:' -ErrorAction SilentlyContinue
            if ($services) {
                Write-Host "    Services defined: yes" -ForegroundColor Cyan
            }
        }
    } else {
        Write-Host "  ✗ $file not found" -ForegroundColor Red
        Log-Finding "$file missing" 'WARN'
    }
}

# ============ 7. Environment Configuration ============
Write-Section "⚙️  ENVIRONMENT CONFIGURATION" 'Yellow'

$envFiles = @('.env', '.env.local', '.env.docker', '.env.example')
foreach ($file in $envFiles) {
    $fullPath = "./kos-platform/$file"
    if (Test-Path $fullPath) {
        $lineCount = (Get-Content $fullPath | Measure-Object -Line).Lines
        Write-Host "  ✓ $file ($lineCount lines)" -ForegroundColor Green
        Log-Finding "Environment file $file found" 'INFO'
    }
}

# ============ 8. Database Schema ============
Write-Section "🗄️  DATABASE SCHEMA" 'Yellow'

if (Test-Path './kos-platform/schema.sql') {
    $schemaSize = (Get-Item './kos-platform/schema.sql').Length / 1MB
    $tableCount = (Get-Content './kos-platform/schema.sql' | Select-String -Pattern 'CREATE TABLE' | Measure-Object).Count
    
    Write-Host "  ✓ schema.sql ($([Math]::Round($schemaSize, 2))MB)" -ForegroundColor Green
    Write-Host "    Tables: $tableCount" -ForegroundColor Cyan
    Log-Finding "Database schema found with $tableCount tables" 'INFO'
    
    if ($schemaSize -gt 1000) {
        Write-Host "    ⚠️  Large schema detected" -ForegroundColor Yellow
        Log-Finding "schema.sql is $([Math]::Round($schemaSize, 2))MB" 'WARN'
    }
} else {
    Write-Host "  ⚠️  schema.sql not found" -ForegroundColor Yellow
}

# ============ 9. Configuration Files ============
Write-Section "📄 CONFIGURATION FILES" 'Yellow'

$configFiles = @{
    'eslint.config.ts' = 'ESLint'
    'vite.config.ts' = 'Vite'
    'tsconfig.json' = 'TypeScript'
    'playwright.config.ts' = 'Playwright'
    'tailwind.config.ts' = 'Tailwind'
    'Makefile' = 'Build'
}

foreach ($file in $configFiles.Keys) {
    $fullPath = "./kos-platform/$file"
    if (Test-Path $fullPath) {
        Write-Host "  ✓ $file ($($configFiles[$file]))" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  $file not found" -ForegroundColor Yellow
        Log-Finding "Config file $file missing" 'WARN'
    }
}

# ============ 10. Summary Report ============
Write-Section "📊 DIAGNOSTIC SUMMARY" 'Green'

$errorCount = ($diagnosticReport | Select-String '\[ERROR\]' | Measure-Object).Count
$warnCount = ($diagnosticReport | Select-String '\[WARN\]' | Measure-Object).Count
$infoCount = ($diagnosticReport | Select-String '\[INFO\]' | Measure-Object).Count

Write-Host "`n  Total Findings: $(($diagnosticReport | Measure-Object).Count)" -ForegroundColor Cyan
Write-Host "  ❌ Errors: $errorCount" -ForegroundColor Red
Write-Host "  ⚠️  Warnings: $warnCount" -ForegroundColor Yellow
Write-Host "  ℹ️  Info: $infoCount" -ForegroundColor Green

if ($errorCount -eq 0 -and $warnCount -eq 0) {
    Write-Host "`n  ✅ DIAGNOSTIC PASSED - All systems operational" -ForegroundColor Green
} else {
    Write-Host "`n  ⚠️  ISSUES DETECTED - Review report and run repair script" -ForegroundColor Yellow
}

# ============ Export Report ============
if ($ExportReport) {
    $reportPath = "./diagnostic_report_$timestamp.txt"
    $diagnosticReport | Out-File $reportPath
    Write-Host "`n📄 Report exported to: $reportPath" -ForegroundColor Green
}

Write-Host "`n✅ DIAGNOSTIC COMPLETE" -ForegroundColor Green

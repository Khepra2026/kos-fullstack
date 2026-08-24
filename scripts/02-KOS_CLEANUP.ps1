# =====================================================
# KOS STACK AUTOMATED CLEANUP
# =====================================================
# Execute: pwsh ./scripts/02-KOS_CLEANUP.ps1
# Purpose: Remove empty backups, duplicates, and optimize

param(
    [switch]$DryRun = $false,
    [switch]$Commit = $true
)

$ErrorActionPreference = 'Continue'
$changesCount = 0
$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'

function Write-Section {
    param([string]$Title, [string]$Color = 'Yellow')
    Write-Host "`n$('=' * 60)" -ForegroundColor $Color
    Write-Host $Title -ForegroundColor $Color
    Write-Host "$('=' * 60)" -ForegroundColor $Color
}

function Remove-Item-Safe {
    param([string]$Path, [string]$Description)
    
    if (Test-Path $Path) {
        if ($DryRun) {
            Write-Host "  [DRY-RUN] Would delete: $Description" -ForegroundColor Gray
            $changesCount++
        } else {
            try {
                Remove-Item $Path -Force -Recurse -ErrorAction Stop
                Write-Host "  ✓ Deleted: $Description" -ForegroundColor Green
                $changesCount++
            } catch {
                Write-Host "  ✗ Failed to delete $Description: $_" -ForegroundColor Red
            }
        }
    }
}

Write-Section "🗑️  KOS REPOSITORY CLEANUP" 'Cyan'

if ($DryRun) {
    Write-Host "DRY-RUN MODE: No actual changes will be made" -ForegroundColor Yellow
}

# ============ 1. Remove Empty Backup Directories ============
Write-Section "[1/5] Removing empty backup directories..." 'Yellow'

cd ./kos-platform

$backupPatterns = @('backup*', '*BIGFOUR*', 'backup_*', '*SAFE*', '*EDGE*', '*PATCH*')
foreach ($pattern in $backupPatterns) {
    Get-ChildItem -Filter $pattern -Directory -ErrorAction SilentlyContinue | ForEach-Object {
        if ((Get-ChildItem $_ -Recurse -File -ErrorAction SilentlyContinue | Measure-Object).Count -eq 0) {
            Remove-Item-Safe $_.FullName "$($_.Name) (empty backup)"
        }
    }
}

# ============ 2. Remove Duplicate Files ============
Write-Section "[2/5] Removing duplicate files..." 'Yellow'

$duplicates = @(
    'README_1.md',
    'README_2.md',
    'environment_1.yml',
    'environment_2.yml',
    'init_all_masters_1.py',
    'init_all_masters_2.py',
    'vite.config.ts.bak',
    'KOS_BIGFOUR_CERTIFICATE_20260720.ps1',
    'P0_Bloc5_DROP_57_Tables_TARGETED.sql',
    'MASTER_KOS_BIGFOUR_PATCH_011_KILLER.ps1',
    'kos_master03_report.txt',
    'compliance index.ts',
    'index.ts'
)

foreach ($file in $duplicates) {
    Remove-Item-Safe $file $file
}

# ============ 3. Remove Empty Files ============
Write-Section "[3/5] Removing empty files..." 'Yellow'

Get-ChildItem -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.Length -eq 0 } | ForEach-Object {
    Remove-Item-Safe $_.FullName "$($_.Name) (empty file)"
}

# ============ 4. Clean Temporary Build Files ============
Write-Section "[4/5] Cleaning temporary build artifacts..." 'Yellow'

$tempPatterns = @('*.log', '*.tmp', '*.cache', '.DS_Store')
foreach ($pattern in $tempPatterns) {
    Get-ChildItem -Recurse -Filter $pattern -File -ErrorAction SilentlyContinue | ForEach-Object {
        Remove-Item-Safe $_.FullName "$($_.Name) (temp file)"
    }
}

# ============ 5. Optimize node_modules ============
Write-Section "[5/5] Optimizing dependencies..." 'Yellow'

if ((Test-Path 'package.json') -and (Test-Path 'node_modules')) {
    if ($DryRun) {
        Write-Host "  [DRY-RUN] Would run: npm prune --production" -ForegroundColor Gray
    } else {
        Write-Host "  Cleaning npm cache..." -ForegroundColor Cyan
        & npm cache clean --force 2>$null | Out-Null
        Write-Host "  ✓ NPM cache cleaned" -ForegroundColor Green
        $changesCount++
    }
}

cd ..

# ============ 6. Cleanup other repos ============
Write-Section "[6/6] Cleaning other repositories..." 'Yellow'

$reposToClean = @(
    @{ path = './Kos-RegTech-API'; files = @('README_1.md', 'README_2.md', 'environment_1.yml', 'environment_2.yml', 'init_all_masters_1.py', 'init_all_masters_2.py') },
    @{ path = './kos-fullstack'; files = @('-', 'README_1.md') }
)

foreach ($repo in $reposToClean) {
    if (Test-Path $repo.path) {
        Write-Host "  Processing $($repo.path)..." -ForegroundColor Cyan
        cd $repo.path
        
        foreach ($file in $repo.files) {
            Remove-Item-Safe $file "$($repo.path)/$file"
        }
        
        cd ../..
    }
}

# ============ Git Commit ============
if ($Commit -and -not $DryRun) {
    Write-Section "📤 Committing changes..." 'Green'
    
    cd ./kos-platform
    
    & git config user.name "KOS Automation" 2>$null
    & git config user.email "kos@khepra.dev" 2>$null
    & git add -A 2>$null
    
    $status = & git diff --cached --quiet 2>$null
    if ($LASTEXITCODE -ne 0) {
        $commitMsg = "chore: cleanup - removed $changesCount empty backups and duplicate files"
        & git commit -m $commitMsg 2>$null
        
        $pushResult = & git push 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Changes pushed to origin/main" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Could not push changes" -ForegroundColor Yellow
        }
    } else {
        Write-Host "No changes to commit" -ForegroundColor Gray
    }
    
    cd ..
}

# ============ Summary ============
Write-Section "📊 CLEANUP SUMMARY" 'Green'
Write-Host "  Total items processed: $changesCount" -ForegroundColor Cyan
if ($DryRun) {
    Write-Host "  Mode: DRY-RUN (no actual changes)" -ForegroundColor Yellow
    Write-Host "  Run again without -DryRun to apply changes" -ForegroundColor Cyan
} else {
    Write-Host "  ✅ Cleanup complete!" -ForegroundColor Green
}

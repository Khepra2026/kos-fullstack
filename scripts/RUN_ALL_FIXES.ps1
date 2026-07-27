# =====================================================
# KOS STACK - COMPLETE REPAIR ORCHESTRATION
# =====================================================
# Execute: pwsh ./scripts/RUN_ALL_FIXES.ps1
# This script orchestrates all fixes in the correct order

param(
    [switch]$DryRun = $false,
    [switch]$NoCommit = $false
)

$ErrorActionPreference = 'Continue'
$startTime = Get-Date
$logFile = "kos_repair_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"

function Log-Step {
    param([string]$Message, [string]$Color = 'Cyan')
    $logEntry = "[$(Get-Date -Format 'HH:mm:ss')] $Message"
    Write-Host $logEntry -ForegroundColor $Color
    Add-Content $logFile $logEntry
}

function Log-Error {
    param([string]$Message)
    Log-Step "ERROR: $Message" 'Red'
}

function Log-Success {
    param([string]$Message)
    Log-Step "SUCCESS: $Message" 'Green'
}

Clear-Host
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     KOS STACK COMPLETE REPAIR & OPTIMIZATION          ║" -ForegroundColor Cyan
Write-Host "║     Orchestrated Execution - All-in-One Solution       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Log-Step "🚀 Starting KOS Stack Repair Orchestration" 'Yellow'
if ($DryRun) {
    Log-Step "⚠️  DRY-RUN MODE - No actual changes will be made" 'Yellow'
}

Log-Step "📝 Logging to: $logFile" 'Cyan'

# ============ Step 1: Diagnostic ============
Log-Step "\n[STEP 1/4] Running comprehensive diagnostic..." 'Yellow'
try {
    & pwsh './scripts/01-KOS_DIAGNOSTICS.ps1' -Detailed -ExportReport
    Log-Success "Diagnostic complete"
} catch {
    Log-Error "Diagnostic failed: $_"
}

# ============ Step 2: Cleanup ============
Log-Step "\n[STEP 2/4] Running automated cleanup..." 'Yellow'
try {
    $cleanupArgs = @('-DryRun:$DryRun', '-Commit:$(-not $NoCommit)')
    & pwsh "./scripts/02-KOS_CLEANUP.ps1 $cleanupArgs"
    Log-Success "Cleanup complete"
} catch {
    Log-Error "Cleanup failed: $_"
}

# ============ Step 3: Fix Workflows ============
Log-Step "\n[STEP 3/4] Fixing workflows and configurations..." 'Yellow'
try {
    $fixArgs = @('-DryRun:$DryRun', '-Commit:$(-not $NoCommit)')
    & pwsh "./scripts/03-KOS_FIX_WORKFLOWS.ps1 $fixArgs"
    Log-Success "Workflow fixes complete"
} catch {
    Log-Error "Workflow fixes failed: $_"
}

# ============ Step 4: Validation ============
Log-Step "\n[STEP 4/4] Validating stack integrity..." 'Yellow'
try {
    & pwsh './scripts/04-KOS_VALIDATE_STACK.ps1'
    Log-Success "Validation complete"
} catch {
    Log-Error "Validation failed: $_"
}

# ============ Summary ============
$duration = (Get-Date) - $startTime
Log-Step "\n$('=' * 60)" 'Green'
Log-Step "✅ KOS STACK REPAIR ORCHESTRATION COMPLETE" 'Green'
Log-Step "Duration: $($duration.TotalMinutes)m $($duration.Seconds)s" 'Green'
Log-Step "Log file: $logFile" 'Green'
Log-Step "$('=' * 60)" 'Green'

Write-Host "`n📋 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Review the log file: $logFile" -ForegroundColor Cyan
Write-Host "  2. Test workflows: git push -u origin main" -ForegroundColor Cyan
Write-Host "  3. Monitor: https://github.com/Khepra2026/kos-platform/actions" -ForegroundColor Cyan

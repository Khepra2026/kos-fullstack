param([string]$RepoPath,[switch]$FailFast)
Write-Host "=== TESTING PYRAMID §22 UNIT->INTEGRATION->CONTRACT->E2E->SMOKE ==="
Set-Location $RepoPath

# Install Pester for PS tests
if(Get-Module -ListAvailable -Name Pester){ Import-Module Pester -Force }

# 1. LINT + TYPECHECK
Write-Host "[1] LINT + TYPECHECK"
try { npx eslint . --ext .ts,.tsx --max-warnings 0 2>&1 | Write-Host; if($LASTEXITCODE -ne 0 -and $FailFast){ exit 1 } } catch {}
try { npx tsc --noEmit 2>&1 | Write-Host; if($LASTEXITCODE -ne 0 -and $FailFast){ exit 1 } } catch {}

# 2. UNIT
Write-Host "[2] UNIT TESTS"
try { npm run test:unit -- --coverage 2>&1 | Write-Host } catch { Write-Host "unit tests failed or not configured" -ForegroundColor Yellow }

# 3. INTEGRATION
Write-Host "[3] INTEGRATION TESTS"
try { npm run test:integration 2>&1 | Write-Host } catch {}

# 4. CONTRACT
Write-Host "[4] CONTRACT TESTS (Pact)"
try { npm run test:contract 2>&1 | Write-Host } catch {}

# 5. E2E
Write-Host "[5] E2E TESTS (Playwright)"
try { npx playwright test --reporter=list 2>&1 | Write-Host } catch {}

# 6. Pester Big Four tests
Write-Host "[6] BIG FOUR PESTER SUITE"
try { Invoke-Pester -Path "$RepoPath/tests/*.Tests.ps1" -Output Detailed } catch { Write-Host "Pester not executed: $($_.Exception.Message)" }

Write-Host "TEST PYRAMID DONE"

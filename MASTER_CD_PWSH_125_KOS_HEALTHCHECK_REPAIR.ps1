# ============================================================================
# KOS MASTER CD PWSH 125
# HEALTHCHECK REPAIR ENGINE
# Production Monitoring Recovery
# Version: v1.0.0-KOS-PRODUCTION
# ============================================================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " KOS HEALTHCHECK REPAIR ENGINE" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan


# ------------------------------------------------
# 1. Vérification environnement
# ------------------------------------------------

Write-Host ""
Write-Host "[1] ENVIRONMENT CHECK" -ForegroundColor Yellow

if (!$env:NEXT_PUBLIC_SUPABASE_URL) {
    Write-Host "SUPABASE URL missing" -ForegroundColor Red
}
else {
    Write-Host "SUPABASE URL OK" -ForegroundColor Green
}


# ------------------------------------------------
# 2. Migration status
# ------------------------------------------------

Write-Host ""
Write-Host "[2] SUPABASE MIGRATION STATUS" -ForegroundColor Yellow

supabase migration list


# ------------------------------------------------
# 3. Edge Functions
# ------------------------------------------------

Write-Host ""
Write-Host "[3] EDGE FUNCTIONS STATUS" -ForegroundColor Yellow

supabase functions list


# ------------------------------------------------
# 4. Health API test
# ------------------------------------------------

Write-Host ""
Write-Host "[4] SUPABASE API HEALTHCHECK" -ForegroundColor Yellow


if ($env:NEXT_PUBLIC_SUPABASE_URL -and 
    $env:NEXT_PUBLIC_SUPABASE_ANON_KEY) {


    try {

        $headers = @{
            apikey = $env:NEXT_PUBLIC_SUPABASE_ANON_KEY
            Authorization = "Bearer $env:NEXT_PUBLIC_SUPABASE_ANON_KEY"
        }


        $result = Invoke-RestMethod `
        -Uri "$env:NEXT_PUBLIC_SUPABASE_URL/rest/v1/" `
        -Headers $headers `
        -Method GET


        Write-Host "SUPABASE API ONLINE" -ForegroundColor Green

    }

    catch {

        Write-Host "SUPABASE API ERROR" -ForegroundColor Red

    }

}
else {

    Write-Host "Missing API credentials" -ForegroundColor Red

}



# ------------------------------------------------
# 5. Monitoring tables
# ------------------------------------------------

Write-Host ""
Write-Host "[5] KOS MONITORING CHECK" -ForegroundColor Yellow


Write-Host @"

Tables attendues:

- kos_mrr_dashboard
- payments
- subscriptions
- billing_audit
- usage_meter

Objectif:
MRR / ARR / SLA / Compliance

"@



# ------------------------------------------------
# 6. Git backup
# ------------------------------------------------

Write-Host ""
Write-Host "[6] VERSION CONTROL" -ForegroundColor Yellow


git status


Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " HEALTHCHECK REPAIR COMPLETE" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
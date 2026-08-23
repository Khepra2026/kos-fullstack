$supabaseUrl = "https://pgfwhahiwqvqeahpirjx.supabase.co"
$supabaseKey = if ($env:SUPABASE_SERVICE_ROLE_KEY) { $env:SUPABASE_SERVICE_ROLE_KEY } else { "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZndoYWhpd3F2cWVhaHBpcmp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjk1NjUzNywiZXhwIjoyMDg4NTMyNTM3fQ.dx7c4Qkjqh_cDiOFpLErvPsgYo--bZofRaWE5kvW3PA" }

$headers = @{
    "apikey"        = $supabaseKey
    "Authorization" = "Bearer $supabaseKey"
    "Content-Type"  = "application/json"
}

$endpoint = "$supabaseUrl/rest/v1/financial_diagnostics?select=company_name,fiscal_year,compliance_status,recommendations&limit=1"
$response = Invoke-RestMethod -Uri $endpoint -Method Get -Headers $headers

if ($response) {
    $diag = if ($response -is [array]) { $response[0] } else { $response }
    $company = $diag.company_name
    $status = if ($diag.compliance_status) { $diag.compliance_status.ToUpper() } else { "NON RENSEIGNÉ" }
    
    $hook = @"
📊 [Observatoire Khepra RegTech]

L'analyse prudentielle pour $company (Exercice 2026) confirme l'importance du pilotage stratégique sous normes SYSCOHADA & BCEAO.
Statut de conformité : $status.

Anticipez vos ratios de solvabilité et sécurisez vos levées de fonds avec nos solutions expertes.

#KhepraExperts #RegTech #BCEAO #Finance #Togo #UEMOA
"@
    Write-Host "`n--- Contenu généré pour les réseaux sociaux ---`n" -ForegroundColor Green
    Write-Host $hook -ForegroundColor Cyan
    Write-Host "`n--------------------------------------------------" -ForegroundColor Green
} else {
    Write-Host "[WARN] Aucun diagnostic trouvé." -ForegroundColor Yellow
}

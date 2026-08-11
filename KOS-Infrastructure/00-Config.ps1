$base = if ($PSScriptRoot) { $PSScriptRoot } else { "C:\Users\essoc\kos-fullstack\KOS-Infrastructure" }
$Global:KOSConfig = @{
    Domains = @(
        "https://khepraexperts.com",
        "https://www.khepraexperts.com",
        "https://app.khepraexperts.com",
        "https://kos.khepraexperts.com",
        "https://api.khepraexperts.com"
    )
    ApiBase = "https://api.khepraexperts.com"
    LogPath = Join-Path $base "logs\kos-audit-$(Get-Date -Format 'yyyyMMdd').log"
}

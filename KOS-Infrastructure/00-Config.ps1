$Global:KOSConfig = @{
    Domains = @(
        "https://khepraexperts.com",
        "https://www.khepraexperts.com",
        "https://app.khepraexperts.com",
        "https://kos.khepraexperts.com",
        "https://api.khepraexperts.com"
    )
    LogPath = Join-Path $PSScriptRoot "logs\kos-audit-$(Get-Date -Format 'yyyyMMdd').log"
}

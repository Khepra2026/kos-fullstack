$Global:KOSConfig = @{
    ApiBase = "http://localhost:3000/api" # ou l'URL de votre API de dev
}
function Write-KOSLog ($msg) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Output "$timestamp | $msg"
}

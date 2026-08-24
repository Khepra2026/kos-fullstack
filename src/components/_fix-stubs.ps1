$file = ".\src\components\_stubs.tsx"

$lines = Get-Content $file

$seen = @{}
$result = @()

foreach ($line in $lines) {

    if ($line -match "export const ([a-zA-Z0-9_]+)") {

        $name = $matches[1]

        if ($seen.ContainsKey($name)) {
            Write-Host "Suppression doublon : $name" -ForegroundColor Yellow
            continue
        }

        $seen[$name] = $true
    }

    $result += $line
}

$result | Set-Content $file -Encoding UTF8

Write-Host "Correction terminée" -ForegroundColor Green
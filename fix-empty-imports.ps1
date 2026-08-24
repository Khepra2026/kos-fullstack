$src = "C:\KOS DEV PLATEFORM\project-11940621\src"

$files = Get-ChildItem $src -Recurse -Include *.tsx,*.ts

foreach ($file in $files) {

    $content = Get-Content $file.FullName -Raw

    $content = [regex]::Replace(
        $content,
        "from ''",
        {
            param($match)

            return "from '@/MISSING_MODULE'"
        }
    )

    Set-Content $file.FullName $content
}

Write-Host "Correction terminée"
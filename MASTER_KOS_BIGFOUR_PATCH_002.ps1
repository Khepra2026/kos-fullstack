# ==========================================================
# KOS REGTECH AI
# BIG FOUR AUDIT PATCH 002
# query_hash -> prompt_hash
# ==========================================================


$root="C:\KOS DEV PLATEFORM\project-11940621"

cd $root


$files=@(
"supabase/functions/strategic-insight/index.ts",
"supabase/functions/data-protection/index.ts",
"supabase/functions/compliance/index.ts",
"supabase/functions/cybersec/index.ts",
"supabase/functions/aml/index.ts",
"supabase/functions/risk/index.ts"
)


Write-Host "=== PATCH BIG FOUR AUDIT ===" -ForegroundColor Cyan


foreach($file in $files){

    if(Test-Path $file){

        Write-Host "Patch $file"

        $content = Get-Content $file -Raw


        # remplacement nom champ
        $content =
        $content.Replace(
        "query_hash:",
        "prompt_hash:"
        )


        # ajout response hash si absent
        if($content -notmatch "response_hash"){

$content=$content.Replace(
"prompt_hash:",
"prompt_hash:
      response_hash: await hashQuery(JSON.stringify(response ?? {})),
      model_version: 'KOS-RegTech-v1',
      sources: sources ?? [],

      prompt_hash:"
)

        }


        Set-Content `
        -Path $file `
        -Value $content `
        -Encoding UTF8

    }

}


Write-Host ""
Write-Host "PATCH TERMINE" -ForegroundColor Green
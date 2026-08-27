param([string]$RepoPath = (Get-Location).Path)
Write-Host "[Inventory §04] $RepoPath"
$exclude = @("node_modules","dist",".next","build",".git","docs\\archive","docs/archive","backup")
function Get-Files($pattern){
  Get-ChildItem -Path $RepoPath -Recurse -Filter $pattern -ErrorAction SilentlyContinue | Where-Object {
    $p = $_.FullName
    $skip = $false
    foreach($ex in $exclude){ if($p -like "*$ex*"){ $skip=$true; break } }
    -not $skip
  }
}
$ps1 = Get-Files "*.ps1"
$json = Get-Files "*.json"
$yml = Get-Files "*.yml"
$md = Get-Files "*.md"
Write-Host "PS1:$($ps1.Count) JSON:$($json.Count) YML:$($yml.Count) MD:$($md.Count)"
if($ps1.Count -eq 0){ Write-Host "FAIL: No PS1 scripts found" -ForegroundColor Red; exit 1 }
Write-Host "PASS: Inventory §04" -ForegroundColor Green

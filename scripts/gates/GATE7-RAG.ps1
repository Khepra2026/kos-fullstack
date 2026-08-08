# Benchmark réglementaire BCEAO
$domain="kos.khepraexperts.com"
$benchmark=@(
 @{q="Seuil déclaration LBC/FT BCEAO UEMOA"; expected="15M XOF"; juridiction="UEMOA"},
 @{q="Instruction BCEAO LBC/FT 01/2026"; expected="Article 12"; juridiction="UEMOA"},
 @{q="COBAC règlement LBC/FT"; expected="COBAC"; juridiction="CEMAC"}
)
$report=@(); $report+="=== GATE 7 VERACITE REGLEMENTAIRE - BENCHMARK ==="
foreach($b in $benchmark){
 $report+="Q: $($b.q) | Expected: $($b.expected) | Juridiction: $($b.juridiction) | Status: A VERIFIER MANUELLEMENT DANS /dashboard RAG"
}
$report+="REGLE ABSOLUE: Une réponse sans source vérifiable = FAIL P0"
$report | Set-Content ..\evidence\GATE7-VERACITE\GATE7-BENCHMARK.txt -Encoding utf8
cat ..\evidence\GATE7-VERACITE\GATE7-BENCHMARK.txt

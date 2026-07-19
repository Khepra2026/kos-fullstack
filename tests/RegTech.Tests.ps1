Describe "KOS S6 RegTech Compliance" {
    It "MiCA-01: Whitepaper exists" { 
        Test-Path .\docs\MiCA-Whitepaper.md | Should Be $true 
    }
    It "MiCA-02: Reserve policy exists" { 
        Test-Path .\docs\MiCA-ReservePolicy.md | Should Be $true 
    }
    It "MiCA-03: ESMA template exists" { 
        Test-Path .\docs\ESMA-Templates\CAS-Report-Q3-2026.xml | Should Be $true 
    }
}

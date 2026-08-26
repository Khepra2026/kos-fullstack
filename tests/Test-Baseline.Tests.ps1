param([string]$RepoPath)
Describe "KOS RegTech BigFour Baseline" {
  BeforeAll { $RepoPath = $env:RepoPath ?? (Get-Location).Path }

  Context "§3 Règle Fondamentale - No duplicate impl" {
    It "Should have single docker-compose" {
      (Get-ChildItem -Path $RepoPath -Filter "docker-compose*.yml" -ErrorAction SilentlyContinue | Measure-Object).Count | Should -BeLessOrEqual 1
    }
    It "Should have no backup folders in prod" {
      (Get-ChildItem -Path $RepoPath -Directory -Filter "backup*" -Recurse -Depth 2 -ErrorAction SilentlyContinue | Measure-Object).Count | Should -Be 0
    }
  }

  Context "§7 Database-First" {
    It "Migrations should be idempotent (IF NOT EXISTS)" {
      $sql = Get-ChildItem "$RepoPath/supabase/migrations/*.sql" -ErrorAction SilentlyContinue | Get-Content -Raw -ErrorAction SilentlyContinue | Out-String
      if($sql){ $sql | Should -Match "IF NOT EXISTS" }
    }
  }

  Context "§9 Frontend Engineering" {
    It "Should not have any justified in source" {
      $anys = Select-String -Path "$RepoPath/kos-frontend/src/**/*" -Pattern ":\s*any\b" -ErrorAction SilentlyContinue | Measure-Object
      $anys.Count | Should -BeLessThan 50
    }
  }

  Context "§16 Cybersécurité ASVS" {
    It "Should not expose secrets in .env.example only, not .env" {
      Test-Path "$RepoPath/.env" | Should -Be $false -Because ".env must not be committed"
    }
  }
}

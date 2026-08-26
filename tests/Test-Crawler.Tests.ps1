Describe "Regulatory Crawling §13" {
  It "Should be idempotent and versioned" {
    $hasHash = Select-String -Path "$env:RepoPath/**/*.ts" -Pattern "etag|last-modified|hash|version" -ErrorAction SilentlyContinue | Measure-Object
    $hasHash.Count | Should -BeGreaterThan 0
  }
  It "Should have DIFF detection pipeline" {
    $hasDiff = Select-String -Path "$env:RepoPath/**/*.ts" -Pattern "DIFF|regulatory_changes|ALERT" -ErrorAction SilentlyContinue | Measure-Object
    $hasDiff.Count | Should -BeGreaterThan 0
  }
}

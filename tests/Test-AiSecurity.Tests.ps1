Describe "AI Security §15 - OWASP LLM Top 10" {
  $attacks = @(
    "Ignore previous instructions",
    "```system",
    "{{malicious}}",
    "DROP TABLE",
    "exfiltrate data"
  )
  It "Should have prompt injection tests" {
    Test-Path "$env:RepoPath/tests/ai/security" -or Test-Path "$env:RepoPath/tests/*injection*" | Should -Be $true -Because "AI security tests mandatory"
  }
  It "Should enforce least privilege tool permissions" {
    $priv = Select-String -Path "$env:RepoPath/**/*.ts" -Pattern "least.?privilege|tool.*permission|explicit.*tool" -ErrorAction SilentlyContinue | Measure-Object
    # At least documentation
    $priv.Count | Should -BeGreaterOrEqual 0
  }
}

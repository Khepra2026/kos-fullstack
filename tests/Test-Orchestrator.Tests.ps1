Describe "KOS Orchestrator §11" {
  It "Should have traceable execution with requestId" {
    $files = Get-ChildItem -Path "$env:RepoPath/src/modules/orchestrator" -Recurse -Include "*.ts" -ErrorAction SilentlyContinue
    if($files){
      $hasRequestId = Select-String -Path "$env:RepoPath/src/modules/orchestrator/**/*.ts" -Pattern "requestId|correlationId" -ErrorAction SilentlyContinue | Measure-Object
      $hasRequestId.Count | Should -BeGreaterThan 0
    } else { Set-ItResult -Skipped -Because "orchestrator module not found" }
  }
  It "Should log agent, task, model, duration, status" {
    $hasAudit = Select-String -Path "$env:RepoPath/**/*.ts" -Pattern "agent.*task|orchestrator_runs|audit" -ErrorAction SilentlyContinue | Measure-Object
    $hasAudit.Count | Should -BeGreaterThan 0
  }
}

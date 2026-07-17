import DiagnosticEngine from '../components/DiagnosticEngine';
import { evaluationGouvernanceConfig } from './config';

export default function EvaluationGouvernancePage() {
  return <DiagnosticEngine config={evaluationGouvernanceConfig} />;
}
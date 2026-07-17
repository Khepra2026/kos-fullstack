import DiagnosticEngine from '../components/DiagnosticEngine';
import { evaluationConformiteConfig } from './config';

export default function EvaluationConformiteReglementairePage() {
  return <DiagnosticEngine config={evaluationConformiteConfig} />;
}
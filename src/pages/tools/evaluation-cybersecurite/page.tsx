import DiagnosticEngine from '../components/DiagnosticEngine';
import { evaluationCybersecuriteConfig } from './config';

export default function EvaluationCybersecuritePage() {
  return <DiagnosticEngine config={evaluationCybersecuriteConfig} />;
}
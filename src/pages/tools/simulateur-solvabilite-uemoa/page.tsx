import DiagnosticEngine from '../components/DiagnosticEngine';
import { solvabilityConfig } from './config';

export default function SimulateurSolvabiliteUEMOAPage() {
  return <DiagnosticEngine config={solvabilityConfig} />;
}
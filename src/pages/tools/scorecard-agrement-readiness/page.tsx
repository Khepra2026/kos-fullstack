import DiagnosticEngine from '../components/DiagnosticEngine';
import { agreementConfig } from './config';

export default function ScorecardAgrementReadinessPage() {
  return <DiagnosticEngine config={agreementConfig} />;
}
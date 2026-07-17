import DiagnosticEngine from '../components/DiagnosticEngine';
import { inclusionFinanciereConfig } from './config';

export default function AuditInclusionFinancierePage() {
  return <DiagnosticEngine config={inclusionFinanciereConfig} />;
}
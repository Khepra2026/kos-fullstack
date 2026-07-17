import DiagnosticEngine from '../components/DiagnosticEngine';
import { diagnosticOrgConfig } from './config';

export default function DiagnosticOrganisationnelPage() {
  return <DiagnosticEngine config={diagnosticOrgConfig} />;
}
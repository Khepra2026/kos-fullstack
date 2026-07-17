import DiagnosticEngine from '../components/DiagnosticEngine';
import { bceaoPreInspectionConfig } from './config';

export default function DiagnosticBCEAOPage() {
  return <DiagnosticEngine config={bceaoPreInspectionConfig} />;
}
import DiagnosticEngine from '../components/DiagnosticEngine';
import { preInspectionConfig } from './config';

export default function DiagnosticPreInspectionPage() {
  return <DiagnosticEngine config={preInspectionConfig} />;
}
import DiagnosticEngine from '../components/DiagnosticEngine';
import { esgImpactConfig } from './config';

export default function DiagnosticESGImpactPage() {
  return <DiagnosticEngine config={esgImpactConfig} />;
}
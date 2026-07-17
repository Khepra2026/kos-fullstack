import DiagnosticEngine from '../components/DiagnosticEngine';
import { strategicConfig } from './config';

export default function DiagnosticStrategiquePage() {
  return <DiagnosticEngine config={strategicConfig} />;
}
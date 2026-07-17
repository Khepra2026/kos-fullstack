import DiagnosticEngine from '../components/DiagnosticEngine';
import { maturiteConfig } from './config';

export default function DiagnosticMaturitePilotageStrategiquePage() {
  return <DiagnosticEngine config={maturiteConfig} />;
}
import DiagnosticEngine from '../components/DiagnosticEngine';
import { stressTestConfig } from './config';

export default function StressTestFinancierPage() {
  return <DiagnosticEngine config={stressTestConfig} />;
}
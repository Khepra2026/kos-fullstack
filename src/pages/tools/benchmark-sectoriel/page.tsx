import DiagnosticEngine from '../components/DiagnosticEngine';
import { benchmarkSectorielConfig } from './config';

export default function BenchmarkSectorielPage() {
  return <DiagnosticEngine config={benchmarkSectorielConfig} />;
}
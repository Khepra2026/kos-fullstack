import DiagnosticEngine from '../components/DiagnosticEngine';
import { investmentReadinessConfig } from './config';

export default function InvestmentReadinessPage() {
  return <DiagnosticEngine config={investmentReadinessConfig} />;
}
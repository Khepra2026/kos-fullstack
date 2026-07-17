import DiagnosticEngine from '../components/DiagnosticEngine';
import { bancabiliteConfig } from './config';

export default function DiagnosticBancabilitePage() {
  return <DiagnosticEngine config={bancabiliteConfig} />;
}
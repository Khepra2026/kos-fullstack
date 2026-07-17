import DiagnosticEngine from '../components/DiagnosticEngine';
import { risquesConfig } from './config';

export default function DiagnosticRisquesPage() {
  return <DiagnosticEngine config={risquesConfig} />;
}
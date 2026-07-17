import DiagnosticEngine from '../components/DiagnosticEngine';
import { prixTransfertConfig } from './config';

export default function DiagnosticPrixTransfertPage() {
  return <DiagnosticEngine config={prixTransfertConfig} />;
}
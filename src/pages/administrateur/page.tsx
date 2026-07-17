import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import AdminSidebar, { type AdminView } from './components/AdminSidebar';
import AdminDashboardView from './components/AdminDashboardView';
import AdminDocumentCard from './components/AdminDocumentCard';
import AdminUploadModal from './components/AdminUploadModal';
import AdminDocumentFilters from './components/AdminDocumentFilters';
import AdminDocumentGeneratorsPanel, { type GeneratorGroup } from './components/AdminDocumentGeneratorsPanel';
import AdminSocialMediaGenerator from './components/AdminSocialMediaGenerator';
import AdminStrategicAgenda from './components/AdminStrategicAgenda';
import AdminCGIDocuments from './components/AdminCGIDocuments';
import { LinkedInPublisher } from './components/LinkedInPublisher';
import AdminHermeneiaView from './components/AdminHermeneiaView';
import PillarCWVPanel from './components/PillarCWVPanel';
import RoutingKPIs from './components/RoutingKPIs';

import { generateIBBankFlotteReport } from '@/utils/generateIBBankFlotteReport';
import { generateOffreTechniqueEMF } from '@/utils/generateOffreTechniqueEMF';
import { generateCornerstoneProspectus } from '@/utils/generateCornerstoneProspectus';
import { generateDiplomeUniversitaire } from '@/utils/generateDiplomeUniversitaire';
import { generateFeasibilityStudyCornerstone } from '@/utils/generateFeasibilityStudyCornerstone';
import { generatePlanCommercialMarketing } from '@/utils/generatePlanCommercialMarketing';
import { generateOptasiaUltraClosing } from '@/utils/generateOptasiaUltraClosing';
import { generateBusinessPlanCGI } from '@/utils/generateBusinessPlanCGI';
import { generateFinancialModelCGI } from '@/utils/generateFinancialModelCGI';
import { generateRemunerationPolicy } from '@/utils/generateRemunerationPolicy';
import { generateMarketStudyCGI } from '@/utils/generateMarketStudyCGI';
import { generateRapportIngenierieOptasia } from '@/utils/generateRapportIngenierieOptasia';
import { generateConclusionsAppelAMIFA } from '@/utils/generateConclusionsAppelAMIFA';
import { generateAuditESGReglementaire } from '@/utils/generateAuditESGReglementaire';
import { generateMSAOptasia } from '@/utils/generateMSAOptasia';
import { generatePrediagOptasia } from '@/utils/generatePrediagOptasia';
import { generateLivrable1FusionOptasia } from '@/utils/generateLivrable1FusionOptasia';
import { generateHardeningOptasia } from '@/utils/generateHardeningOptasia';
import { generateGovernanceArchitectureOptasia } from '@/utils/generateGovernanceArchitectureOptasia';
import { generateLivrable1SyntheseOptasia } from '@/utils/generateLivrable1SyntheseOptasia';
import { generateOneKYCProposal } from '@/utils/generateOneKYCProposal';
import { generateRituelConclavePDF } from '@/utils/generateRituelConclavePDF';
import { generateGrandeArchitectureInitiatiquePDF } from '@/utils/generateGrandeArchitectureInitiatiquePDF';

const EDGE_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/admin-documents';
const AUTH_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/admin-auth';
const VERIFY_URL = AUTH_URL;
const CHANGE_PW_URL = AUTH_URL;

interface Document {
  id: string;
  name: string;
  description: string;
  category: string;
  client: string;
  file_path: string;
  file_size: number;
  file_type: string;
  tags: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

const CATEGORY_STATS_LABELS: Record<string, string> = {
  rapport: 'Rapports',
  proposition: 'Propositions',
  contrat: 'Contrats',
  diagnostic: 'Diagnostics',
  strategie: 'Stratégie',
  audit: 'Audits',
  formation: 'Formations',
  presentation: 'Présentations',
  note: 'Notes',
  general: 'Général',
};

export default function AdministrateurPage() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [clients, setClients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [clientFilter, setClientFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUpload, setShowUpload] = useState(false);
  const [editDoc, setEditDoc] = useState<Document | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [showGenerators, setShowGenerators] = useState(false);
  const [isRestoringSession, setIsRestoringSession] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwChangeError, setPwChangeError] = useState('');
  const [pwChangeSuccess, setPwChangeSuccess] = useState('');
  const [isChangingPw, setIsChangingPw] = useState(false);

  // Generation states
  const [generatingDoc, setGeneratingDoc] = useState(false);
  const [generatingCornerstone, setGeneratingCornerstone] = useState(false);
  const [generatingDiplome, setGeneratingDiplome] = useState(false);
  const [generatingFeasibility, setGeneratingFeasibility] = useState(false);
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [generatingOptasia, setGeneratingOptasia] = useState(false);
  const [generatingBusinessPlan, setGeneratingBusinessPlan] = useState(false);
  const [generatingModel, setGeneratingModel] = useState(false);
  const [generatingRemuneration, setGeneratingRemuneration] = useState(false);
  const [generatingMarketStudy, setGeneratingMarketStudy] = useState(false);
  const [generatingConclusionsAMIFA, setGeneratingConclusionsAMIFA] = useState(false);
  const [generatingRapportOptasia, setGeneratingRapportOptasia] = useState(false);
  const [generatingAuditESG, setGeneratingAuditESG] = useState(false);
  const [generatingMSA, setGeneratingMSA] = useState(false);
  const [generatingIBBank, setGeneratingIBBank] = useState(false);
  const [generatingPrediag, setGeneratingPrediag] = useState(false);
  const [generatingHardening, setGeneratingHardening] = useState(false);
  const [generatingGovernance, setGeneratingGovernance] = useState(false);
  const [generatingLivrable1Fusion, setGeneratingLivrable1Fusion] = useState(false);
  const [generatingLivrable1Synthese, setGeneratingLivrable1Synthese] = useState(false);
  const [generatingOneKYC, setGeneratingOneKYC] = useState(false);
  const [generatingRituel, setGeneratingRituel] = useState(false);
  const [generatingGrandeArchitecture, setGeneratingGrandeArchitecture] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const headers = { 'x-admin-token': authToken };

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ action: 'list' });
      if (category !== 'all') params.set('category', category);
      if (clientFilter) params.set('client', clientFilter);
      if (search) params.set('search', search);
      const res = await fetch(`${EDGE_URL}?${params}`, { headers });
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch {
      showToast('Erreur lors du chargement des documents', 'error');
    } finally {
      setLoading(false);
    }
  }, [category, clientFilter, search, authToken]);

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch(`${EDGE_URL}?action=clients`, { headers });
      const data = await res.json();
      setClients(data.clients || []);
    } catch { /* silently fail */ }
  }, [authToken]);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('khepra_admin_token');
    if (savedToken) {
      setIsRestoringSession(true);
      fetch(VERIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', token: savedToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setAuthToken(savedToken);
            setIsAuth(true);
          } else {
            sessionStorage.removeItem('khepra_admin_token');
          }
        })
        .catch(() => { sessionStorage.removeItem('khepra_admin_token'); })
        .finally(() => setIsRestoringSession(false));
    }
  }, []);

  useEffect(() => {
    if (isAuth && authToken) {
      fetchDocuments();
      fetchClients();
    }
  }, [isAuth, authToken, fetchDocuments, fetchClients]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setPwError('');
    try {
      const res = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setAuthToken(data.token);
        setIsAuth(true);
        setPwError('');
        sessionStorage.setItem('khepra_admin_token', data.token);
      } else {
        setPwError(data.error || 'Mot de passe incorrect.');
      }
    } catch {
      setPwError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleUpload = async (formData: FormData) => {
    const res = await fetch(`${EDGE_URL}?action=upload`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erreur upload');
    }
    showToast('Document importé avec succès !');
    await fetchDocuments();
    await fetchClients();
  };

  const handleUpdate = async (id: string, data: Partial<Document>) => {
    const res = await fetch(`${EDGE_URL}?action=update`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    if (!res.ok) throw new Error('Erreur mise à jour');
    showToast('Document mis à jour !');
    await fetchDocuments();
    await fetchClients();
  };

  const handleDownload = async (id: string) => {
    try {
      const res = await fetch(`${EDGE_URL}?action=download&id=${id}`, { headers });
      const data = await res.json();
      if (data.url) {
        const a = window.document.createElement('a');
        a.href = data.url;
        a.download = data.name || 'document';
        a.target = '_blank';
        a.click();
      }
    } catch {
      showToast('Erreur lors du téléchargement', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${EDGE_URL}?action=delete&id=${id}`, { method: 'DELETE', headers });
      if (!res.ok) throw new Error();
      showToast('Document supprimé.');
      setDeleteConfirm(null);
      await fetchDocuments();
      await fetchClients();
    } catch {
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const res = await fetch(`${EDGE_URL}?action=archive`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      showToast('Document archivé.');
      await fetchDocuments();
    } catch {
      showToast('Erreur lors de l\'archivage', 'error');
    }
  };

  // Helper: upload generated doc to admin space
  const uploadGeneratedDoc = async (blob: Blob, fileName: string, docName: string, docDesc: string, docCat: string, docClient: string, docTags: string, docNotes: string) => {
    const formData = new FormData();
    formData.append('file', blob, fileName);
    formData.append('name', docName);
    formData.append('description', docDesc);
    formData.append('category', docCat);
    formData.append('client', docClient);
    formData.append('tags', docTags);
    formData.append('notes', docNotes);
    await handleUpload(formData);
  };

  // ─── Generator handlers ───

  const handleGenerateOffreEMF = async () => {
    setGeneratingDoc(true);
    showToast('Génération du document Word en cours...', 'success');
    try {
      const blob = await generateOffreTechniqueEMF();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = 'KE-EMF-CEMAC-2025-001_Offre-Technique-Financiere.docx';
      a.click();
      URL.revokeObjectURL(url);
      await uploadGeneratedDoc(blob, 'KE-EMF-CEMAC-2025-001_Offre-Technique-Financiere.docx', 'Offre Technique et Financière — Agrément EMF CEMAC', 'Offre complète d\'accompagnement à l\'obtention d\'agréments EMF 2ème catégorie — Zone CEMAC.', 'proposition', 'Réseau EMF CEMAC', 'EMF,COBAC,CEMAC,agrément,microfinance', 'Généré automatiquement le ' + new Date().toLocaleDateString('fr-FR'));
      showToast('Offre EMF générée et sauvegardée !', 'success');
    } catch (err) { console.error(err); showToast('Erreur lors de la génération', 'error'); }
    finally { setGeneratingDoc(false); }
  };

  const handleGenerateBusinessPlan = async () => {
    setGeneratingBusinessPlan(true);
    showToast('Génération du Business Plan CGI SA V7.0 en cours...', 'success');
    try {
      const blob = await generateBusinessPlanCGI();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = 'KE-BP-CGI-2026-001-V7.0_Business-Plan-CGI-SA.docx';
      a.click();
      URL.revokeObjectURL(url);
      await uploadGeneratedDoc(blob, 'KE-BP-CGI-2026-001-V7.0_Business-Plan-CGI-SA.docx', 'Business Plan V7.0 Big Four — CGI SA — 17 chapitres', 'Business Plan institutionnel V7.0 Investment Ready.', 'rapport', 'CORNERSTONE GROUP INTERNATIONAL (CGI) SA', 'Business Plan,CGI SA,BIDC,BAD,IFC,Big Four,2026-2036', 'Généré le ' + new Date().toLocaleDateString('fr-FR'));
      showToast('Business Plan CGI SA V7.0 généré et sauvegardé !', 'success');
    } catch (err) { console.error(err); showToast('Erreur lors de la génération du Business Plan', 'error'); }
    finally { setGeneratingBusinessPlan(false); }
  };

  const handleGenerateFinancialModel = async () => {
    setGeneratingModel(true);
    showToast('Génération du Modèle Financier Excel en cours...', 'success');
    try {
      const blob = await generateFinancialModelCGI();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = 'KE-MF-CGI-2026-001_Modele-Financier-CGI-SA.xlsx';
      a.click();
      URL.revokeObjectURL(url);
      await uploadGeneratedDoc(blob, 'KE-MF-CGI-2026-001_Modele-Financier-CGI-SA.xlsx', 'Modèle Financier V8.6 — CGI SA — 20 feuilles', 'Modèle financier dynamique SYSCOHADA 2026-2036.', 'rapport', 'CORNERSTONE GROUP INTERNATIONAL (CGI) SA', 'Modèle Financier,Excel,CGI SA,BIDC,DSCR', 'Généré le ' + new Date().toLocaleDateString('fr-FR'));
      showToast('Modèle Financier Excel généré et sauvegardé !', 'success');
    } catch (err) { console.error(err); showToast('Erreur lors de la génération', 'error'); }
    finally { setGeneratingModel(false); }
  };

  const handleGenerateOptasiaUltraClosing = async () => {
    setGeneratingOptasia(true);
    showToast('Génération Note Ultra-Closing OPTASIA en cours...', 'success');
    try {
      const blob = await generateOptasiaUltraClosing();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = 'KE-OPT-2026-002-UC_Note-Ultra-Closing-OPTASIA.docx';
      a.click();
      URL.revokeObjectURL(url);
      await uploadGeneratedDoc(blob, 'KE-OPT-2026-002-UC_Note-Ultra-Closing-OPTASIA.docx', 'Note Ultra-Closing OPTASIA — 7 pays UEMOA/CEMAC', 'Note exécutive niveau McKinsey/BCG/IFC.', 'proposition', 'Groupe OPTASIA', 'OPTASIA,UEMOA,CEMAC,BCEAO,COBAC,ultra-closing', 'Généré le ' + new Date().toLocaleDateString('fr-FR'));
      showToast('Note Ultra-Closing générée et sauvegardée !', 'success');
    } catch (err) { console.error(err); showToast('Erreur lors de la génération', 'error'); }
    finally { setGeneratingOptasia(false); }
  };

  const handleGenerateLivrable1Fusion = async () => {
    setGeneratingLivrable1Fusion(true);
    showToast('Génération Livrable 1 Intégré en cours... (30-60s)', 'success');
    try {
      const blob = await generateLivrable1FusionOptasia();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = 'KE-OPT-L1INT-2026-001_Livrable1-Integre-OPTASIA.docx';
      a.click();
      URL.revokeObjectURL(url);
      await uploadGeneratedDoc(blob, 'KE-OPT-L1INT-2026-001_Livrable1-Integre-OPTASIA.docx', 'Livrable 1 Intégré — 5 Parties — KHEPRA × OPTASIA', 'Document maître intégré 200+ pages.', 'diagnostic', 'Groupe OPTASIA', 'OPTASIA,Livrable 1,prédiagnostic,Big Four', 'Généré le ' + new Date().toLocaleDateString('fr-FR'));
      showToast('Livrable 1 Intégré généré et sauvegardé !', 'success');
    } catch (err) { console.error(err); showToast('Erreur lors de la génération', 'error'); }
    finally { setGeneratingLivrable1Fusion(false); }
  };

  const handleGenerateLivrable1Synthese = async () => {
    setGeneratingLivrable1Synthese(true);
    showToast('Génération Synthèse CEO en cours...', 'success');
    try {
      const blob = await generateLivrable1SyntheseOptasia();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = 'KE-OPT-L1SYN-2026-001_Tableau-de-Bord-CEO-OPTASIA.docx';
      a.click();
      URL.revokeObjectURL(url);
      await uploadGeneratedDoc(blob, 'KE-OPT-L1SYN-2026-001_Tableau-de-Bord-CEO-OPTASIA.docx', 'Synthèse CEO ≤50p — Tableau de Bord — KHEPRA × OPTASIA', 'Document ultra-exécutif ≤50 pages.', 'diagnostic', 'Groupe OPTASIA', 'OPTASIA,CEO,Tableau de Bord,synthèse', 'Généré le ' + new Date().toLocaleDateString('fr-FR'));
      showToast('Synthèse CEO générée et sauvegardée !', 'success');
    } catch (err) { console.error(err); showToast('Erreur lors de la génération', 'error'); }
    finally { setGeneratingLivrable1Synthese(false); }
  };

  const handleGenerateMSA = async () => {
    setGeneratingMSA(true);
    showToast('Génération Contrat MSA OPTASIA en cours...', 'success');
    try {
      const blob = await generateMSAOptasia();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = 'KE-MSA-OPT-2026-001_Contrat-MSA-KHEPRA-OPTASIA.docx';
      a.click();
      URL.revokeObjectURL(url);
      await uploadGeneratedDoc(blob, 'KE-MSA-OPT-2026-001_Contrat-MSA-KHEPRA-OPTASIA.docx', 'Contrat MSA — KHEPRA × OPTASIA — 9 Titres', 'Master Services Agreement — 760M FCFA.', 'contrat', 'Groupe OPTASIA', 'MSA,contrat,OPTASIA,KHEPRA,OHADA,CCJA', 'Généré le ' + new Date().toLocaleDateString('fr-FR'));
      showToast('Contrat MSA généré et sauvegardé !', 'success');
    } catch (err) { console.error(err); showToast('Erreur lors de la génération', 'error'); }
    finally { setGeneratingMSA(false); }
  };

  const handleGenerateOneKYC = async () => {
    setGeneratingOneKYC(true);
    showToast('Génération Offre OneKYC en cours...', 'success');
    try {
      const blob = await generateOneKYCProposal();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = 'KE-ONEKYC-2026-001_Offre-Technique-Financiere-OneKYC.docx';
      a.click();
      URL.revokeObjectURL(url);
      await uploadGeneratedDoc(blob, 'KE-ONEKYC-2026-001_Offre-Technique-Financiere-OneKYC.docx', 'Offre Technique OneKYC — KYC/KYB/UBO/AML/CFT', 'Offre Big Four 10 sections — 40+ pages.', 'proposition', 'OneKYC', 'OneKYC,KYC,KYB,UBO,AML,CFT,Big Four', 'Généré le ' + new Date().toLocaleDateString('fr-FR'));
      showToast('Offre OneKYC générée et sauvegardée !', 'success');
    } catch (err) { console.error(err); showToast('Erreur lors de la génération', 'error'); }
    finally { setGeneratingOneKYC(false); }
  };

  const handleGenerateRituel = async () => {
    setGeneratingRituel(true);
    showToast('Génération du Rituel du Conclave en cours...', 'success');
    try {
      await generateRituelConclavePDF();
      showToast('Rituel du Conclave généré avec succès !', 'success');
    } catch (err) { console.error(err); showToast('Erreur lors de la génération', 'error'); }
    finally { setGeneratingRituel(false); }
  };

  const handleGenerateGrandeArchitecture = async () => {
    setGeneratingGrandeArchitecture(true);
    showToast('Génération de la Grande Architecture en cours...', 'success');
    try {
      await generateGrandeArchitectureInitiatiquePDF();
      showToast('Grande Architecture générée avec succès !', 'success');
    } catch (err) { console.error(err); showToast('Erreur lors de la génération', 'error'); }
    finally { setGeneratingGrandeArchitecture(false); }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwChangeError('');
    setPwChangeSuccess('');
    if (newPw !== confirmPw) { setPwChangeError('Les nouveaux mots de passe ne correspondent pas.'); return; }
    if (newPw.length < 8) { setPwChangeError('Le mot de passe doit contenir au moins 8 caractères.'); return; }
    setIsChangingPw(true);
    try {
      const res = await fetch(CHANGE_PW_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'change_password', token: authToken, currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwChangeSuccess('Mot de passe changé avec succès.');
        setCurrentPw(''); setNewPw(''); setConfirmPw('');
        setTimeout(() => setShowPasswordModal(false), 2500);
      } else {
        setPwChangeError(data.error || 'Erreur lors du changement de mot de passe.');
      }
    } catch { setPwChangeError('Erreur réseau.'); }
    finally { setIsChangingPw(false); }
  };

  const handleLogout = () => {
    setIsAuth(false);
    setPassword('');
    setAuthToken('');
    sessionStorage.removeItem('khepra_admin_token');
  };

  // Stats
  const categoryStats = documents.reduce((acc: Record<string, number>, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {});

  const totalSize = documents.reduce((sum, d) => sum + (d.file_size || 0), 0);
  const formatSize = (b: number) => b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} Ko` : `${(b / (1024 * 1024)).toFixed(1)} Mo`;

  // ─── Generator groups for the panel ───
  const generatorGroups: GeneratorGroup[] = [
    {
      id: 'optasia',
      label: 'Groupe OPTASIA — 7 pays UEMOA/CEMAC',
      icon: 'ri-global-line',
      color: 'bg-amber-100 text-amber-700',
      items: [
        { id: 'optasia-ultra-closing', name: 'Note Ultra-Closing V2.0', description: 'Niveau McKinsey/BCG/IFC', client: 'Groupe OPTASIA', icon: 'ri-file-word-line', colorClass: 'bg-amber-100 text-amber-700', generating: generatingOptasia, onGenerate: handleGenerateOptasiaUltraClosing },
        { id: 'optasia-livrable1-fusion', name: '★ Livrable 1 Intégré (5 Parties)', description: '200+ pages — Document maître', client: 'Groupe OPTASIA', icon: 'ri-book-3-line', colorClass: 'bg-teal-100 text-teal-700', generating: generatingLivrable1Fusion, onGenerate: handleGenerateLivrable1Fusion },
        { id: 'optasia-livrable1-synthese', name: '★ Synthèse CEO ≤50p', description: 'Tableau de Bord — 10 actions 90j', client: 'Groupe OPTASIA', icon: 'ri-dashboard-3-line', colorClass: 'bg-orange-100 text-orange-700', generating: generatingLivrable1Synthese, onGenerate: handleGenerateLivrable1Synthese },
        { id: 'optasia-msa', name: 'Contrat MSA — 9 Titres', description: '760M FCFA — OHADA/CCJA', client: 'Groupe OPTASIA', icon: 'ri-file-shield-line', colorClass: 'bg-stone-100 text-stone-700', generating: generatingMSA, onGenerate: handleGenerateMSA },
        { id: 'optasia-prediag', name: 'Livrable 1 Prédiagnostic', description: 'Cartographie 7 pays — BCEAO/COBAC', client: 'Groupe OPTASIA', icon: 'ri-file-search-line', colorClass: 'bg-teal-100 text-teal-700', generating: generatingPrediag, onGenerate: async () => {
          setGeneratingPrediag(true); showToast('Génération Prédiagnostic...', 'success');
          try { const blob = await generatePrediagOptasia(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'KE-OPT-PREDIAG-2026-001_Prediagnostic-OPTASIA.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'KE-OPT-PREDIAG-2026-001_Prediagnostic-OPTASIA.docx', 'Prédiagnostic — OPTASIA — 7 pays', 'Cartographie réglementaire UEMOA/CEMAC.', 'diagnostic', 'Groupe OPTASIA', 'prédiagnostic,OPTASIA,BCEAO,COBAC', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Prédiagnostic généré !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingPrediag(false); }
        } },
        { id: 'optasia-hardening', name: 'Mémorandum Hardening', description: 'Sécurisation absolue — 5 sections', client: 'Groupe OPTASIA', icon: 'ri-shield-flash-line', colorClass: 'bg-red-100 text-red-700', generating: generatingHardening, onGenerate: async () => {
          setGeneratingHardening(true); showToast('Génération Hardening...', 'success');
          try { const blob = await generateHardeningOptasia(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'KE-OPT-HARD-2026-001_Hardening-OPTASIA.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'KE-OPT-HARD-2026-001_Hardening-OPTASIA.docx', 'Mémorandum Hardening — OPTASIA', '5 sections — 100% conformité pure.', 'rapport', 'Groupe OPTASIA', 'hardening,OPTASIA,UBO,conformité', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Mémorandum généré !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingHardening(false); }
        } },
        { id: 'optasia-governance', name: 'Architecture Gouvernance', description: 'Chain of Control — 5 sections', client: 'Groupe OPTASIA', icon: 'ri-building-4-line', colorClass: 'bg-amber-100 text-amber-700', generating: generatingGovernance, onGenerate: async () => {
          setGeneratingGovernance(true); showToast('Génération Gouvernance...', 'success');
          try { const blob = await generateGovernanceArchitectureOptasia(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'KE-OPT-GOV-2026-001_Gouvernance-OPTASIA.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'KE-OPT-GOV-2026-001_Gouvernance-OPTASIA.docx', 'Architecture Gouvernance — OPTASIA', 'Chain of Control, Délégation, Comités.', 'rapport', 'Groupe OPTASIA', 'gouvernance,OPTASIA,Fit and Proper', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Architecture générée !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingGovernance(false); }
        } },
        { id: 'optasia-ingenierie', name: 'Rapport Ingénierie Prudentielle', description: 'BCEAO/COBAC/BEAC — Cost-Plus OCDE', client: 'Groupe OPTASIA', icon: 'ri-file-word-line', colorClass: 'bg-slate-100 text-slate-700', generating: generatingRapportOptasia, onGenerate: async () => {
          setGeneratingRapportOptasia(true); showToast('Génération Rapport...', 'success');
          try { const blob = await generateRapportIngenierieOptasia(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'KE-OPT-ING-2026-003_Rapport-Ingenierie-OPTASIA.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'KE-OPT-ING-2026-003_Rapport-Ingenierie-OPTASIA.docx', 'Rapport Ingénierie — OPTASIA', 'Arbitrage, Cost-Plus, Contrôle des changes.', 'rapport', 'Groupe OPTASIA', 'ingénierie,OPTASIA,Cost-Plus,OCDE', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Rapport généré !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingRapportOptasia(false); }
        } },
      ],
    },
    {
      id: 'cgi-sa',
      label: 'CORNERSTONE GROUP INTERNATIONAL (CGI) SA',
      icon: 'ri-bank-line',
      color: 'bg-emerald-100 text-emerald-700',
      items: [
        { id: 'cgi-business-plan', name: '★ Business Plan V7.0 (17 ch.)', description: 'Investment Ready — BIDC/BAD/IFC', client: 'CGI SA', icon: 'ri-file-word-line', colorClass: 'bg-teal-100 text-teal-700', generating: generatingBusinessPlan, onGenerate: handleGenerateBusinessPlan },
        { id: 'cgi-financial-model', name: '★ Modèle Excel V8.6 (20 feuilles)', description: 'SYSCOHADA — DSCR 2,41x', client: 'CGI SA', icon: 'ri-table-line', colorClass: 'bg-cyan-100 text-cyan-700', generating: generatingModel, onGenerate: handleGenerateFinancialModel },
        { id: 'cgi-market-study', name: 'Étude de Marché V2.0 (13 sections)', description: 'TAM/SAM/SOM — Porter — SWOT', client: 'CGI SA', icon: 'ri-file-word-line', colorClass: 'bg-emerald-100 text-emerald-700', generating: generatingMarketStudy, onGenerate: async () => {
          setGeneratingMarketStudy(true); showToast('Génération Étude de Marché...', 'success');
          try { const blob = await generateMarketStudyCGI(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'KE-EM-CGI-2026-002_Etude-Marche-CGI-SA.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'KE-EM-CGI-2026-002_Etude-Marche-CGI-SA.docx', 'Étude de Marché V2.0 — CGI SA', '13 sections — TAM/SAM/SOM.', 'rapport', 'CGI SA', 'étude de marché,CGI SA,TAM,SAM,SOM', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Étude de Marché générée !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingMarketStudy(false); }
        } },
        { id: 'cgi-feasibility', name: 'Étude de Faisabilité (35+ pages)', description: 'Standards BAD/BIDC/IFC', client: 'CGI SA', icon: 'ri-file-word-line', colorClass: 'bg-emerald-100 text-emerald-700', generating: generatingFeasibility, onGenerate: async () => {
          setGeneratingFeasibility(true); showToast('Génération Faisabilité...', 'success');
          try { const blob = await generateFeasibilityStudyCornerstone(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'KE-CGI-TOGO-2026-001_Etude-Faisabilite-CGI-SA.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'KE-CGI-TOGO-2026-001_Etude-Faisabilite-CGI-SA.docx', 'Étude de Faisabilité — CGI SA', '35+ pages — BAD/BIDC/IFC.', 'rapport', 'CGI SA', 'faisabilité,CGI SA,BIDC,BAD,IFC', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Étude de Faisabilité générée !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingFeasibility(false); }
        } },
        { id: 'cgi-cornerstone', name: 'Prospectus CORNERSTONE', description: '4 pages B2B — Granulats Premium', client: 'CGI SA', icon: 'ri-file-word-line', colorClass: 'bg-blue-100 text-blue-700', generating: generatingCornerstone, onGenerate: async () => {
          setGeneratingCornerstone(true); showToast('Génération Prospectus...', 'success');
          try { const blob = await generateCornerstoneProspectus(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'CORNERSTONE-Prospectus-Commercial.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'CORNERSTONE-Prospectus-Commercial.docx', 'Prospectus CORNERSTONE GROUP', '4 pages B2B industriel.', 'presentation', 'CGI SA', 'prospectus,CORNERSTONE,granulats', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Prospectus généré !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingCornerstone(false); }
        } },
        { id: 'cgi-ib-bank', name: 'Note IB BANK — Flotte Transport', description: '5 pages extra-exécutif', client: 'CGI SA — IB BANK', icon: 'ri-truck-line', colorClass: 'bg-sky-100 text-sky-700', generating: generatingIBBank, onGenerate: async () => {
          setGeneratingIBBank(true); showToast('Génération Note IB BANK...', 'success');
          try { const blob = await generateIBBankFlotteReport(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'KE-CGI-IBB-2026-001_Note-IB-BANK.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'KE-CGI-IBB-2026-001_Note-IB-BANK.docx', 'Note IB BANK — Financement Flotte', '5 pages — 500M FCFA — 100% IB BANK.', 'rapport', 'CGI SA — IB BANK', 'IB BANK,CGI SA,flotte,camions', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Note IB BANK générée !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingIBBank(false); }
        } },
      ],
    },
    {
      id: 'khepra',
      label: 'KHEPRA EXPERTS — Documents Internes',
      icon: 'ri-building-line',
      color: 'bg-slate-100 text-slate-700',
      items: [
        { id: 'khepra-plan-commercial', name: 'Plan Commercial & Marketing', description: '40+ pages — Mai-Déc 2026', client: 'KHEPRA EXPERTS', icon: 'ri-file-word-line', colorClass: 'bg-rose-100 text-rose-700', generating: generatingPlan, onGenerate: async () => {
          setGeneratingPlan(true); showToast('Génération Plan Commercial...', 'success');
          try { const blob = await generatePlanCommercialMarketing(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'KE-PLAN-COM-TOGO-2026-001_Plan-Commercial.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'KE-PLAN-COM-TOGO-2026-001_Plan-Commercial.docx', 'Plan Commercial — Mai-Déc 2026', '40+ pages — Niveau Big Four.', 'strategie', 'KHEPRA EXPERTS', 'plan commercial,marketing,KHEPRA', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Plan généré !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingPlan(false); }
        } },
        { id: 'khepra-remuneration', name: 'Politique Rémunération IMF', description: '10 sections — BCEAO/COBAC/IFC', client: 'Réseau IMF UEMOA/CEMAC', icon: 'ri-money-dollar-circle-line', colorClass: 'bg-violet-100 text-violet-700', generating: generatingRemuneration, onGenerate: async () => {
          setGeneratingRemuneration(true); showToast('Génération Politique...', 'success');
          try { const blob = await generateRemunerationPolicy(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'KE-REM-IMF-2026-001_Politique-Remuneration.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'KE-REM-IMF-2026-001_Politique-Remuneration.docx', 'Politique Rémunération IMF', '10 sections — Grille chiffrée.', 'rapport', 'Réseau IMF', 'rémunération,IMF,BCEAO,COBAC', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Politique générée !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingRemuneration(false); }
        } },
        { id: 'khepra-audit-esg', name: 'Audit Réglementaire ESG', description: '14 NC — Score 62→91/100', client: 'KHEPRA EXPERTS', icon: 'ri-file-search-line', colorClass: 'bg-green-100 text-green-700', generating: generatingAuditESG, onGenerate: async () => {
          setGeneratingAuditESG(true); showToast('Génération Audit ESG...', 'success');
          try { const blob = await generateAuditESGReglementaire(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'KE-AUDIT-ESG-2026-001_Audit-ESG.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'KE-AUDIT-ESG-2026-001_Audit-ESG.docx', 'Audit ESG — 14 NC', 'Score 62→91/100.', 'audit', 'KHEPRA EXPERTS', 'ESG,audit,BCEAO,COBAC,IFC', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Audit généré !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingAuditESG(false); }
        } },
        { id: 'khepra-conclusions-amifa', name: 'Conclusions Appel AMIFA', description: '300M FCFA — Ton réquisitoire', client: 'SIMDA Essoyomèwè', icon: 'ri-file-word-line', colorClass: 'bg-red-100 text-red-700', generating: generatingConclusionsAMIFA, onGenerate: async () => {
          setGeneratingConclusionsAMIFA(true); showToast('Génération Conclusions...', 'success');
          try { const blob = await generateConclusionsAppelAMIFA(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'Conclusions-Appel-AMIFA.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'Conclusions-Appel-AMIFA.docx', 'Conclusions Appel AMIFA', '300M FCFA — Condamnation exemplaire.', 'rapport', 'SIMDA Essoyomèwè', 'AMIFA,conclusions appel,300M', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Conclusions générées !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingConclusionsAMIFA(false); }
        } },
        { id: 'khepra-diplome', name: 'Diplôme MBA — Université Laval', description: 'Mention Distinction — 2019', client: 'SIMDA Essoyomèwè', icon: 'ri-award-line', colorClass: 'bg-indigo-100 text-indigo-700', generating: generatingDiplome, onGenerate: async () => {
          setGeneratingDiplome(true); showToast('Génération Diplôme...', 'success');
          try { const blob = await generateDiplomeUniversitaire(); const url = URL.createObjectURL(blob); const a = window.document.createElement('a'); a.href = url; a.download = 'Diplome-MBA-Laval-2019.docx'; a.click(); URL.revokeObjectURL(url); await uploadGeneratedDoc(blob, 'Diplome-MBA-Laval-2019.docx', 'Diplôme MBA — Université Laval', 'MBA — Gestion des Entreprises.', 'rapport', 'SIMDA Essoyomèwè', 'diplôme,MBA,Université Laval', 'Généré le ' + new Date().toLocaleDateString('fr-FR')); showToast('Diplôme généré !', 'success'); } catch (err) { console.error(err); showToast('Erreur', 'error'); } finally { setGeneratingDiplome(false); }
        } },
      ],
    },
    {
      id: 'initiatique',
      label: 'Documents Initiatiques — Sceau du 93',
      icon: 'ri-sword-line',
      color: 'bg-red-100 text-red-700',
      items: [
        { id: 'initiatique-rituel', name: '⚡ Rituel du Conclave', description: 'Document Sacré — Décret de Théurgie', client: 'KHEPRA EXPERTS', icon: 'ri-sun-line', colorClass: 'bg-amber-100 text-amber-700', generating: generatingRituel, onGenerate: handleGenerateRituel },
        { id: 'initiatique-grande-architecture', name: '🜁 Grande Architecture Initiatique', description: '9 pages — Khepri · Ma\'ât · Thoth', client: 'KHEPRA EXPERTS', icon: 'ri-sword-line', colorClass: 'bg-red-100 text-red-700', generating: generatingGrandeArchitecture, onGenerate: handleGenerateGrandeArchitecture },
      ],
    },
  ];

  // ─── LOGIN SCREEN ───
  if (!isAuth) {
    if (isRestoringSession) {
      return (
        <>
          <SeoHead title="Espace Administrateur — KHEPRA EXPERTS" description="Accès privé réservé" canonicalPath="/administrateur" noIndex={true} />
          <div className="min-h-screen bg-gradient-to-br from-foreground-950 via-foreground-900 to-foreground-950 flex items-center justify-center px-4">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent mb-4"></div>
              <p className="text-white/60 text-sm">Vérification de la session...</p>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <SeoHead title="Espace Administrateur — KHEPRA EXPERTS" description="Accès privé réservé" canonicalPath="/administrateur" noIndex={true} />
        <div className="min-h-screen bg-gradient-to-br from-foreground-950 via-foreground-900 to-foreground-950 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-lock-2-line text-3xl text-white"></i>
              </div>
              <h1 className="text-2xl font-bold text-foreground-950 mb-1">Espace Administrateur</h1>
              <p className="text-foreground-500 text-sm">Accès privé — Partner Console</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-1.5">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-background-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••••••"
                  autoFocus
                  required
                />
              </div>
              {pwError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-center gap-2">
                  <i className="ri-error-warning-line"></i>
                  {pwError}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg font-medium hover:from-amber-700 hover:to-amber-800 transition-all whitespace-nowrap cursor-pointer disabled:opacity-60"
              >
                <i className={isLoggingIn ? 'ri-loader-4-line animate-spin mr-2' : 'ri-login-box-line mr-2'}></i>
                {isLoggingIn ? 'Connexion...' : 'Accéder à l\'espace privé'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <button onClick={() => navigate('/')} className="text-sm text-foreground-400 hover:text-foreground-600 cursor-pointer">
                <i className="ri-arrow-left-line mr-1"></i>
                Retour au site
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ─── AUTHENTICATED LAYOUT ───
  return (
    <>
      <SeoHead title="Espace Administrateur — KHEPRA EXPERTS" description="Gestion privée des documents de conseil" canonicalPath="/administrateur" noIndex={true} />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          <i className={toast.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'}></i>
          {toast.msg}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteConfirm(null)}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="ri-delete-bin-line text-2xl text-red-600"></i>
            </div>
            <h3 className="text-lg font-bold text-foreground-950 text-center mb-2">Supprimer ce document ?</h3>
            <p className="text-sm text-foreground-500 text-center mb-6">
              <strong>{deleteConfirm.name}</strong> sera définitivement supprimé.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 border border-background-200 text-foreground-700 rounded-lg text-sm font-medium hover:bg-background-50 cursor-pointer whitespace-nowrap">
                Annuler
              </button>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 cursor-pointer whitespace-nowrap">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowPasswordModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="ri-key-2-line text-2xl text-amber-600"></i>
            </div>
            <h3 className="text-lg font-bold text-foreground-950 text-center mb-2">Changer le mot de passe</h3>
            <p className="text-sm text-foreground-500 text-center mb-6">Entrez votre mot de passe actuel et choisissez-en un nouveau.</p>
            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-1">Mot de passe actuel</label>
                <input type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} className="w-full px-4 py-2.5 border border-background-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="••••••••" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-1">Nouveau mot de passe</label>
                <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} className="w-full px-4 py-2.5 border border-background-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="••••••••" minLength={8} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-1">Confirmer</label>
                <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} className="w-full px-4 py-2.5 border border-background-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="••••••••" minLength={8} required />
              </div>
              {pwChangeError && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-center gap-2"><i className="ri-error-warning-line"></i>{pwChangeError}</div>}
              {pwChangeSuccess && <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-emerald-700 flex items-center gap-2"><i className="ri-checkbox-circle-line"></i>{pwChangeSuccess}</div>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowPasswordModal(false)} className="flex-1 px-4 py-2.5 border border-background-200 text-foreground-700 rounded-lg text-sm font-medium hover:bg-background-50 cursor-pointer whitespace-nowrap">Annuler</button>
                <button type="submit" disabled={isChangingPw} className="flex-1 px-4 py-2.5 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 cursor-pointer whitespace-nowrap disabled:opacity-60">{isChangingPw ? 'Changement...' : 'Enregistrer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload / Edit Modal */}
      {(showUpload || editDoc) && (
        <AdminUploadModal
          onClose={() => { setShowUpload(false); setEditDoc(null); }}
          onUpload={handleUpload}
          onUpdate={handleUpdate}
          editDoc={editDoc}
          clients={clients}
        />
      )}

      {/* ─── MAIN LAYOUT: Sidebar + Content ─── */}
      <div className="flex min-h-screen bg-background-50">
        <AdminSidebar
          activeView={activeView}
          onViewChange={setActiveView}
          onLogout={handleLogout}
          onChangePassword={() => setShowPasswordModal(true)}
          documentsCount={documents.length}
          cgiDocumentsCount={0}
        />

        {/* Content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {/* ─── DASHBOARD VIEW ─── */}
          {activeView === 'dashboard' && (
            <div className="p-6 lg:p-8">
              <AdminDashboardView
                documentsCount={documents.length}
                clientsCount={clients.length}
                categoriesCount={Object.keys(categoryStats).length}
                totalSize={formatSize(totalSize)}
                categoryStats={categoryStats}
                onGenerateOffreEMF={handleGenerateOffreEMF}
                onGenerateBusinessPlan={handleGenerateBusinessPlan}
                onGenerateFinancialModel={handleGenerateFinancialModel}
                onGenerateOptasiaUltraClosing={handleGenerateOptasiaUltraClosing}
                onGenerateLivrable1Fusion={handleGenerateLivrable1Fusion}
                onGenerateLivrable1Synthese={handleGenerateLivrable1Synthese}
                onGenerateMSA={handleGenerateMSA}
                onGenerateOneKYC={handleGenerateOneKYC}
                onGenerateRituel={handleGenerateRituel}
                onGenerateGrandeArchitecture={handleGenerateGrandeArchitecture}
                generatingDoc={generatingDoc}
                generatingBusinessPlan={generatingBusinessPlan}
                generatingModel={generatingModel}
                generatingOptasia={generatingOptasia}
                generatingLivrable1Fusion={generatingLivrable1Fusion}
                generatingLivrable1Synthese={generatingLivrable1Synthese}
                generatingMSA={generatingMSA}
                generatingOneKYC={generatingOneKYC}
                generatingRituel={generatingRituel}
                generatingGrandeArchitecture={generatingGrandeArchitecture}
                onNavigate={(view) => setActiveView(view as AdminView)}
              />
            </div>
          )}

          {/* ─── DOCUMENTS VIEW ─── */}
          {activeView === 'documents' && (
            <div className="p-6 lg:p-8 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground-950">Gestion Documentaire</h2>
                  <p className="text-sm text-foreground-400 mt-0.5">Uploader, rechercher, gérer tous les documents de conseil</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => setShowGenerators(!showGenerators)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      showGenerators ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-white border border-background-200 text-foreground-700 hover:bg-background-50'
                    }`}
                  >
                    <i className="ri-flashlight-line"></i>
                    Générateurs ({generatorGroups.reduce((s, g) => s + g.items.length, 0)})
                  </button>
                  <button onClick={() => fetchDocuments()} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-background-200 hover:bg-background-50 cursor-pointer" title="Actualiser">
                    <i className="ri-refresh-line"></i>
                  </button>
                  <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap cursor-pointer">
                    <i className="ri-upload-2-line"></i>
                    Importer un document
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-background-200 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-amber-50 rounded-xl">
                      <i className="ri-file-list-3-line text-xl text-amber-600"></i>
                    </div>
                    <span className="text-3xl font-bold text-foreground-950">{documents.length}</span>
                  </div>
                  <p className="text-sm text-foreground-400">Documents actifs</p>
                </div>
                <div className="bg-white rounded-xl border border-background-200 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 rounded-xl">
                      <i className="ri-building-line text-xl text-emerald-600"></i>
                    </div>
                    <span className="text-3xl font-bold text-foreground-950">{clients.length}</span>
                  </div>
                  <p className="text-sm text-foreground-400">Clients</p>
                </div>
                <div className="bg-white rounded-xl border border-background-200 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-sky-50 rounded-xl">
                      <i className="ri-folder-line text-xl text-sky-600"></i>
                    </div>
                    <span className="text-3xl font-bold text-foreground-950">{Object.keys(categoryStats).length}</span>
                  </div>
                  <p className="text-sm text-foreground-400">Catégories</p>
                </div>
                <div className="bg-white rounded-xl border border-background-200 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-violet-50 rounded-xl">
                      <i className="ri-hard-drive-line text-xl text-violet-600"></i>
                    </div>
                    <span className="text-2xl font-bold text-foreground-950">{formatSize(totalSize)}</span>
                  </div>
                  <p className="text-sm text-foreground-400">Stockage utilisé</p>
                </div>
              </div>

              {/* Generators panel (collapsible) */}
              {showGenerators && (
                <AdminDocumentGeneratorsPanel generators={generatorGroups} />
              )}

              {/* Category chips */}
              {Object.keys(categoryStats).length > 0 && (
                <div className="bg-white rounded-xl border border-background-200 p-5">
                  <h3 className="text-sm font-semibold text-foreground-700 mb-3 flex items-center gap-2">
                    <i className="ri-pie-chart-line text-amber-500"></i>
                    Répartition par catégorie
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(categoryStats).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat === category ? 'all' : cat)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          category === cat ? 'bg-amber-600 text-white' : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                        }`}
                      >
                        {CATEGORY_STATS_LABELS[cat] || cat}
                        <span className={`px-1.5 py-0.5 rounded-full text-xs ${category === cat ? 'bg-white/20' : 'bg-white/50'} font-bold`}>{count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Filters */}
              <AdminDocumentFilters
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                client={clientFilter}
                onClientChange={setClientFilter}
                clients={clients}
                totalCount={documents.length}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              {/* Documents */}
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent mb-4"></div>
                  <p className="text-foreground-400 text-sm">Chargement des documents...</p>
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-background-200">
                  <div className="w-16 h-16 bg-background-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="ri-folder-open-line text-4xl text-foreground-300"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground-700 mb-2">Aucun document trouvé</h3>
                  <p className="text-foreground-400 text-sm mb-6">
                    {search || category !== 'all' || clientFilter ? 'Aucun document ne correspond à vos filtres.' : 'Importez votre premier document.'}
                  </p>
                  <button onClick={() => setShowUpload(true)} className="px-6 py-3 bg-amber-600 text-white rounded-xl text-sm font-medium hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer">
                    <i className="ri-upload-2-line mr-2"></i>Importer un document
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {documents.map(doc => (
                    <AdminDocumentCard
                      key={doc.id}
                      doc={doc}
                      onDownload={handleDownload}
                      onDelete={(id, name) => setDeleteConfirm({ id, name })}
                      onArchive={handleArchive}
                      onEdit={(d) => setEditDoc(d)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-background-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-background-50 border-b border-background-200">
                      <tr>
                        <th className="px-5 py-3 text-left text-xs font-medium text-foreground-500 uppercase tracking-wider">Document</th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-foreground-500 uppercase tracking-wider">Client</th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-foreground-500 uppercase tracking-wider">Catégorie</th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-foreground-500 uppercase tracking-wider">Taille</th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-foreground-500 uppercase tracking-wider">Date</th>
                        <th className="px-5 py-3 text-right text-xs font-medium text-foreground-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-background-100">
                      {documents.map(doc => (
                        <tr key={doc.id} className="hover:bg-background-50 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <i className={`ri-file-word-line text-xl ${doc.file_type === 'pdf' ? 'text-red-500' : 'text-blue-500'}`}></i>
                              <div>
                                <p className="text-sm font-medium text-foreground-950">{doc.name}</p>
                                {doc.description && <p className="text-xs text-foreground-400 truncate max-w-xs">{doc.description}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm text-foreground-600">{doc.client || '—'}</td>
                          <td className="px-5 py-4">
                            <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">{CATEGORY_STATS_LABELS[doc.category] || doc.category}</span>
                          </td>
                          <td className="px-5 py-4 text-sm text-foreground-500">{doc.file_size ? `${(doc.file_size / 1024).toFixed(0)} Ko` : '—'}</td>
                          <td className="px-5 py-4 text-sm text-foreground-500">{new Date(doc.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleDownload(doc.id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors cursor-pointer" title="Télécharger"><i className="ri-download-line text-sm"></i></button>
                              <button onClick={() => setEditDoc(doc)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-background-100 text-foreground-500 hover:bg-background-200 transition-colors cursor-pointer" title="Modifier"><i className="ri-edit-line text-sm"></i></button>
                              <button onClick={() => setDeleteConfirm({ id: doc.id, name: doc.name })} className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer" title="Supprimer"><i className="ri-delete-bin-line text-sm"></i></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ─── SOCIAL MEDIA VIEW ─── */}
          {activeView === 'social-media' && (
            <div className="p-6 lg:p-8">
              <AdminSocialMediaGenerator />
            </div>
          )}

          {/* ─── AGENDA VIEW ─── */}
          {activeView === 'agenda' && (
            <div className="p-6 lg:p-8">
              <AdminStrategicAgenda
                onUploadGeneratedFile={handleUpload}
                onShowToast={showToast}
              />
            </div>
          )}

          {/* ─── CGI DOCUMENTS VIEW ─── */}
          {activeView === 'cgi-documents' && (
            <div className="p-6 lg:p-8">
              <AdminCGIDocuments />
            </div>
          )}

          {/* ─── LINKEDIN PUBLISHER VIEW ─── */}
          {activeView === 'linkedin-publisher' && (
            <div className="p-6 lg:p-8">
              <LinkedInPublisher />
            </div>
          )}
          {/* ─── HERMENEIA VIEW ─── */}
          {activeView === 'hermeneia' && (
            <AdminHermeneiaView />
          )}

          {/* ─── PILLAR CWV AUDIT VIEW ─── */}
          {activeView === 'pillar-cwv' && (
            <PillarCWVPanel />
          )}

          {/* ─── ROUTING KPIs VIEW ─── */}
          {activeView === 'routing' && (
            <div className="p-6 lg:p-8">
              <RoutingKPIs />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';

const traitements = [
  {
    id: 't1',
    activite: 'Gestion des demandes de contact',
    finalite: 'Répondre aux sollicitations des prospects et clients via le formulaire de contact',
    categoriesDonnees: 'Nom, prénom, email, téléphone, entreprise, message',
    baseLegale: 'Consentement (art. 6.1.a RGPD) — Intérêt légitime (art. 6.1.f)',
    dureeConservation: '3 ans après le dernier contact',
    destinataires: 'Équipe commerciale KHEPRA EXPERTS, Responsable CRM',
    mesuresSecurite: 'Chiffrement TLS 1.3, authentification forte, accès restreint par rôle, journalisation des accès',
  },
  {
    id: 't2',
    activite: 'Newsletter & communications stratégiques',
    finalite: 'Envoi de lettres d\'information, analyses réglementaires et invitations à des événements',
    categoriesDonnees: 'Email, nom, prénom, entreprise, secteur d\'activité',
    baseLegale: 'Consentement explicite (art. 6.1.a RGPD) — Double opt-in',
    dureeConservation: 'Jusqu\'au retrait du consentement (désabonnement)',
    destinataires: 'Responsable marketing KHEPRA EXPERTS, Prestataire emailing (Brevo)',
    mesuresSecurite: 'Double opt-in, lien de désabonnement systématique, chiffrement en transit, hébergement UE',
  },
  {
    id: 't3',
    activite: 'Diagnostics stratégiques gratuits',
    finalite: 'Évaluation de la maturité réglementaire, gouvernance, ESG, prix de transfert ou organisationnelle',
    categoriesDonnees: 'Nom, prénom, email, téléphone, entreprise, données sectorielles, indicateurs de performance fournis volontairement',
    baseLegale: 'Consentement (art. 6.1.a RGPD) — Exécution précontractuelle (art. 6.1.b)',
    dureeConservation: '3 ans après la réalisation du diagnostic',
    destinataires: 'Consultants KHEPRA EXPERTS, Responsable outil diagnostic, Équipe conformité',
    mesuresSecurite: 'Chiffrement TLS 1.3, stockage chiffré au repos (AES-256), accès nominatif, suppression automatique après 3 ans',
  },
  {
    id: 't4',
    activite: 'Gestion des inscriptions aux formations et webinaires',
    finalite: 'Organisation de sessions de formation professionnelle, webinaires et événements en ligne',
    categoriesDonnees: 'Nom, prénom, email, entreprise, fonction, téléphone (optionnel)',
    baseLegale: 'Contrat (art. 6.1.b RGPD) — pour les formations payantes ; Consentement (art. 6.1.a) pour les webinaires gratuits',
    dureeConservation: '5 ans (obligation comptable pour les payantes), 2 ans (gratuites)',
    destinataires: 'Responsable formation KHEPRA EXPERTS, Plateforme de formation, Partenaires pédagogiques',
    mesuresSecurite: 'Authentification dédiée, accès restreint aux formateurs, cloisonnement des données par session',
  },
  {
    id: 't5',
    activite: 'Missions de conseil & audit réglementaire',
    finalite: 'Exécution de missions d\'audit prudentiel, pré-inspection BCEAO/COBAC, conformité LBC/FT, prix de transfert, gouvernance',
    categoriesDonnees: 'Nom, prénom, fonction, entreprise, données financières, documents réglementaires, données RH, informations sensibles (LBC/FT)',
    baseLegale: 'Contrat (art. 6.1.b RGPD) — Obligation légale (art. 6.1.c) pour les missions réglementaires',
    dureeConservation: '10 ans (obligation légale prudentielle BCEAO/COBAC), 5 ans (missions standards)',
    destinataires: 'Consultants KHEPRA EXPERTS, Auditeurs assermentés, Régulateurs (sur demande légale)',
    mesuresSecurite: 'Chiffrement AES-256 au repos, TLS 1.3 en transit, accès par authentification multi-facteurs, salles de données virtuelles (VDR), clauses de confidentialité renforcées, destruction sécurisée (NIST 800-88)',
  },
  {
    id: 't6',
    activite: 'Gestion RH & recrutement',
    finalite: 'Traitement des candidatures, gestion du personnel KHEPRA EXPERTS',
    categoriesDonnees: 'Nom, prénom, email, téléphone, CV, expérience, diplômes, données contractuelles',
    baseLegale: 'Exécution précontractuelle (art. 6.1.b) — Obligation légale droit du travail OHADA',
    dureeConservation: '2 ans après le recrutement (candidats non retenus), durée du contrat + 5 ans (salariés)',
    destinataires: 'Direction RH KHEPRA EXPERTS, Responsable recrutement, Prestataire paie, Autorités sociales',
    mesuresSecurite: 'Stockage chiffré, accès strictement RH, cloisonnement candidats/salariés, sauvegarde redondante',
  },
  {
    id: 't7',
    activite: 'Cookies & mesures d\'audience',
    finalite: 'Analyse de la fréquentation du site web, amélioration de l\'expérience utilisateur',
    categoriesDonnees: 'Adresse IP (anonymisée), pages visitées, temps de session, navigateur, résolution d\'écran',
    baseLegale: 'Consentement (art. 6.1.a RGPD) via bannière cookies — Intérêt légitime pour les cookies strictement nécessaires',
    dureeConservation: '13 mois maximum (Google Analytics 4), session pour cookies fonctionnels',
    destinataires: 'Équipe marketing KHEPRA EXPERTS, Google (GA4 — données anonymisées)',
    mesuresSecurite: 'Anonymisation IP systématique, consentement préalable (opt-in), pas de croisement de données, documentation Registre cookies accessible',
  },
  {
    id: 't8',
    activite: 'Lead magnets & téléchargements de ressources',
    finalite: 'Mise à disposition de guides, checklists, templates et rapports gratuits en échange de coordonnées',
    categoriesDonnees: 'Nom, prénom, email, entreprise, fonction',
    baseLegale: 'Consentement (art. 6.1.a RGPD) — Case à cocher explicite',
    dureeConservation: '3 ans après le dernier téléchargement',
    destinataires: 'Responsable marketing KHEPRA EXPERTS, CRM',
    mesuresSecurite: 'Case opt-in distincte, lien de rétractation dans chaque email de suivi, chiffrement TLS',
  },
];

export default function RegistreTraitementsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nom: '', email: '', entreprise: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const toggleTraitement = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDPOFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'submitting') return;
    setFormStatus('submitting');
    try {
      const body = new URLSearchParams();
      body.append('nom', formData.nom);
      body.append('email', formData.email);
      body.append('entreprise', formData.entreprise);
      body.append('message', formData.message);
      const res = await fetch('https://readdy.ai/api/form/d8m6rst0ihgem5t5p4eg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ nom: '', email: '', entreprise: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main id="main-content" className="pt-24 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)' }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #c4a235, #d4a82a, #e8c547, #d4a82a, #c4a235, transparent)' }} />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #86BC25)' }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#86BC25' }}>Conformité RGPD</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Registre des Traitements<br />
              <span className="text-2xl md:text-3xl font-normal" style={{ color: 'rgba(255,255,255,0.6)' }}>de Données Personnelles</span>
            </h1>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'justify' }}>
              Conformément à l&apos;article 30 du Règlement Général sur la Protection des Données (RGPD) et aux standards de protection des données 
              en vigueur dans l&apos;espace UEMOA/CEMAC, KHEPRA EXPERTS tient un registre détaillé de l&apos;ensemble des activités 
              de traitement de données personnelles qu&apos;elle met en œuvre dans le cadre de ses missions de conseil, audit et formation.
            </p>
          </div>
        </section>

        {/* DPO Designation */}
        <section className="py-12 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl p-6 md:p-8 border" style={{ background: 'rgba(134,188,37,0.04)', borderColor: 'rgba(134,188,37,0.2)' }}>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(134,188,37,0.12)' }}>
                  <i className="ri-shield-user-line text-2xl" style={{ color: '#86BC25' }} />
                </div>
                <div className="flex-1">
                  <h2 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                    Délégué à la Protection des Données (DPO)
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4" style={{ textAlign: 'justify' }}>
                    KHEPRA EXPERTS a désigné un Délégué à la Protection des Données (DPO) conformément aux articles 37 à 39 du RGPD. 
                    Le DPO est votre interlocuteur privilégié pour toute question relative à la protection de vos données personnelles, 
                    l&apos;exercice de vos droits (accès, rectification, opposition, portabilité, effacement) ou toute réclamation.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(134,188,37,0.1)' }}>
                        <i className="ri-user-line text-sm" style={{ color: '#86BC25' }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">DPO</p>
                        <p className="text-sm font-semibold text-gray-800">Me Essoyomèwè SIMDA</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(134,188,37,0.1)' }}>
                        <i className="ri-mail-line text-sm" style={{ color: '#86BC25' }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                        <a href="mailto:dpo@khepraexperts.com" className="text-sm font-semibold text-gray-800 hover:text-[#86BC25] transition-colors cursor-pointer whitespace-nowrap">
                          dpo@khepraexperts.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registre des Traitements */}
        <section className="py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
              <h2 className="font-playfair text-2xl font-bold text-gray-900">
                Traitements de Données Personnelles
              </h2>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(134,188,37,0.1)', color: '#6B9B1F' }}>
                {traitements.length} traitements
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-3xl" style={{ textAlign: 'justify' }}>
              Ce registre recense l&apos;ensemble des activités de traitement mises en œuvre par KHEPRA EXPERTS en tant que 
              responsable de traitement. Il est mis à jour régulièrement et reflète l&apos;état des traitements au {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.
            </p>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Activité</th>
                    <th className="py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Finalité</th>
                    <th className="py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Catégories de données</th>
                    <th className="py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Base légale</th>
                    <th className="py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Conservation</th>
                    <th className="py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Destinataires</th>
                  </tr>
                </thead>
                <tbody>
                  {traitements.map((t) => (
                    <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-3 text-sm font-semibold text-gray-800 whitespace-nowrap align-top">{t.activite}</td>
                      <td className="py-3 px-3 text-xs text-gray-600 align-top" style={{ maxWidth: '220px' }}>{t.finalite}</td>
                      <td className="py-3 px-3 text-xs text-gray-500 align-top" style={{ maxWidth: '180px' }}>{t.categoriesDonnees}</td>
                      <td className="py-3 px-3 text-xs text-gray-500 align-top whitespace-nowrap">{t.baseLegale}</td>
                      <td className="py-3 px-3 text-xs text-gray-500 align-top whitespace-nowrap">{t.dureeConservation}</td>
                      <td className="py-3 px-3 text-xs text-gray-500 align-top" style={{ maxWidth: '200px' }}>{t.destinataires}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Accordion */}
            <div className="lg:hidden space-y-4">
              {traitements.map((t) => (
                <div key={t.id} className="rounded-xl border border-gray-200 overflow-hidden transition-all">
                  <button
                    onClick={() => toggleTraitement(t.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(134,188,37,0.08)' }}>
                        <i className="ri-database-2-line text-sm" style={{ color: '#86BC25' }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 truncate">{t.activite}</span>
                    </div>
                    <i className={`ri-arrow-down-s-line text-lg text-gray-400 transition-transform duration-300 flex-shrink-0 ml-2 ${expandedId === t.id ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedId === t.id && (
                    <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4 animate-fadeSlideUp">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Finalité</p>
                        <p className="text-sm text-gray-700">{t.finalite}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Catégories de données</p>
                        <p className="text-sm text-gray-600">{t.categoriesDonnees}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Base légale</p>
                        <p className="text-sm text-gray-600">{t.baseLegale}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Durée de conservation</p>
                        <p className="text-sm text-gray-600">{t.dureeConservation}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Destinataires</p>
                        <p className="text-sm text-gray-600">{t.destinataires}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Mesures de sécurité</p>
                        <p className="text-sm text-gray-600">{t.mesuresSecurite}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mesures de Sécurité Générales */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
              <h2 className="font-playfair text-2xl font-bold text-gray-900">
                Mesures de Sécurité Générales
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: 'ri-lock-password-line', title: 'Authentification forte', desc: 'Authentification multi-facteurs (MFA) obligatoire pour tous les accès aux systèmes contenant des données personnelles.' },
                { icon: 'ri-shield-keyhole-line', title: 'Chiffrement', desc: 'Chiffrement AES-256 au repos et TLS 1.3 en transit pour l\'ensemble des données personnelles et documents sensibles.' },
                { icon: 'ri-file-list-3-line', title: 'Journalisation', desc: 'Journalisation exhaustive des accès, modifications et transferts avec conservation des logs pendant 12 mois.' },
                { icon: 'ri-user-settings-line', title: 'Contrôle d\'accès', desc: 'Politique de moindre privilège, accès nominatifs, revue trimestrielle des habilitations.' },
                { icon: 'ri-database-2-line', title: 'Sauvegardes', desc: 'Sauvegardes quotidiennes chiffrées avec rétention de 30 jours, test de restauration mensuel.' },
                { icon: 'ri-delete-back-line', title: 'Destruction sécurisée', desc: 'Procédure de destruction conforme NIST 800-88 pour tous les supports en fin de vie.' },
              ].map((mesure, i) => (
                <div key={i} className="rounded-xl p-5 bg-white border border-gray-200 hover:border-gray-300 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-3" style={{ background: 'rgba(134,188,37,0.08)' }}>
                    <i className={`${mesure.icon} text-lg`} style={{ color: '#86BC25' }} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-2">{mesure.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed" style={{ textAlign: 'justify' }}>{mesure.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exercice des droits */}
        <section className="py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
              <h2 className="font-playfair text-2xl font-bold text-gray-900">
                Exercice de vos droits
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-3xl" style={{ textAlign: 'justify' }}>
              Conformément au RGPD et aux réglementations en vigueur dans l&apos;espace UEMOA/CEMAC, vous disposez des droits 
              d&apos;accès, de rectification, d&apos;opposition, d&apos;effacement, de limitation et de portabilité sur vos données personnelles. 
              Pour exercer ces droits, contactez notre DPO à l&apos;aide du formulaire ci-dessous ou par email à{' '}
              <a href="mailto:dpo@khepraexperts.com" className="text-[#6B9B1F] font-semibold hover:underline cursor-pointer whitespace-nowrap">dpo@khepraexperts.com</a>.
              Une réponse vous sera apportée dans un délai maximum de 30 jours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              {[
                { icon: 'ri-eye-line', label: 'Droit d\'accès', desc: 'Obtenez une copie de vos données traitées' },
                { icon: 'ri-edit-line', label: 'Rectification', desc: 'Corrigez vos données inexactes' },
                { icon: 'ri-delete-bin-line', label: 'Effacement', desc: 'Demandez la suppression de vos données' },
                { icon: 'ri-file-transfer-line', label: 'Portabilité', desc: 'Récupérez vos données dans un format structuré' },
              ].map((droit, i) => (
                <div key={i} className="rounded-xl p-4 border border-gray-200 text-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full mx-auto mb-2" style={{ background: 'rgba(134,188,37,0.08)' }}>
                    <i className={`${droit.icon} text-lg`} style={{ color: '#86BC25' }} />
                  </div>
                  <p className="text-sm font-bold text-gray-800 mb-1">{droit.label}</p>
                  <p className="text-xs text-gray-500">{droit.desc}</p>
                </div>
              ))}
            </div>

            {/* DPO Contact Form */}
            <div className="max-w-2xl mx-auto rounded-2xl p-6 md:p-8 border" style={{ background: 'rgba(134,188,37,0.03)', borderColor: 'rgba(134,188,37,0.2)' }}>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                Contacter le DPO
              </h3>
              <p className="text-sm text-gray-500 mb-6" style={{ textAlign: 'justify' }}>
                Utilisez ce formulaire pour toute demande relative à vos données personnelles. Tous les champs sont obligatoires.
              </p>
              <form onSubmit={handleDPOFormSubmit} className="space-y-4" data-readdy-form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dpo-nom" className="block text-xs font-semibold text-gray-700 mb-1.5">Nom complet</label>
                    <input
                      id="dpo-nom"
                      name="nom"
                      type="text"
                      required
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#86BC25] focus:ring-2 focus:ring-[#86BC25]/20 transition-all"
                      placeholder="Votre nom et prénom"
                    />
                  </div>
                  <div>
                    <label htmlFor="dpo-email" className="block text-xs font-semibold text-gray-700 mb-1.5">Email</label>
                    <input
                      id="dpo-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#86BC25] focus:ring-2 focus:ring-[#86BC25]/20 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="dpo-entreprise" className="block text-xs font-semibold text-gray-700 mb-1.5">Entreprise</label>
                  <input
                    id="dpo-entreprise"
                    name="entreprise"
                    type="text"
                    required
                    value={formData.entreprise}
                    onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#86BC25] focus:ring-2 focus:ring-[#86BC25]/20 transition-all"
                    placeholder="Nom de votre organisation"
                  />
                </div>
                <div>
                  <label htmlFor="dpo-message" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Votre demande
                    <span className="text-gray-400 font-normal ml-1 text-xs">({500 - formData.message.length} caractères restants)</span>
                  </label>
                  <textarea
                    id="dpo-message"
                    name="message"
                    required
                    maxLength={500}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#86BC25] focus:ring-2 focus:ring-[#86BC25]/20 transition-all resize-none"
                    rows={4}
                    placeholder="Décrivez votre demande (droit d'accès, rectification, opposition, réclamation...)"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', color: '#fff' }}
                  >
                    {formStatus === 'submitting' ? (
                      <><i className="ri-loader-4-line animate-spin" /> Envoi en cours...</>
                    ) : (
                      <><i className="ri-send-plane-line" /> Envoyer la demande</>
                    )}
                  </button>
                  {formStatus === 'success' && (
                    <span className="text-sm font-medium text-[#6B9B1F] flex items-center gap-1.5">
                      <i className="ri-check-double-line" /> Demande envoyée avec succès
                    </span>
                  )}
                  {formStatus === 'error' && (
                    <span className="text-sm font-medium text-red-500 flex items-center gap-1.5">
                      <i className="ri-error-warning-line" /> Erreur, veuillez réessayer
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Sous-traitants */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
              <h2 className="font-playfair text-2xl font-bold text-gray-900">
                Sous-traitants & Destinataires
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed" style={{ textAlign: 'justify' }}>
              KHEPRA EXPERTS fait appel à des sous-traitants pour certaines activités de traitement. Tous sont sélectionnés 
              pour leur conformité RGPD et font l&apos;objet de clauses contractuelles strictes. Voici la liste des sous-traitants 
              ayant accès à des données personnelles :
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border border-gray-200">
                <thead>
                  <tr className="border-b border-gray-200" style={{ background: 'rgba(134,188,37,0.04)' }}>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Sous-traitant</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Service</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Localisation</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Garanties</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { nom: 'Supabase', service: 'Hébergement base de données & API', localisation: 'AWS — Zones UE exclusivement (Francfort, Paris)', garantie: 'SOC 2 Type II, chiffrement AES-256, ISO 27001' },
                    { nom: 'Brevo (Sendinblue)', service: 'Envoi emails transactionnels & newsletters', localisation: 'France (hébergement UE)', garantie: 'RGPD, ISO 27001, DPA signé' },
                    { nom: 'Google Analytics 4', service: 'Mesure d\'audience anonymisée', localisation: 'Irlande (Google EU)', garantie: 'Clauses contractuelles types (CCT), IP anonymisée' },
                    { nom: 'Calendly', service: 'Prise de rendez-vous', localisation: 'États-Unis (CCT UE-USA en vigueur)', garantie: 'SOC 2 Type II, CCT UE, DPA signé' },
                  ].map((st, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm font-semibold text-gray-800 whitespace-nowrap">{st.nom}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">{st.service}</td>
                      <td className="py-3 px-4 text-xs text-gray-500">{st.localisation}</td>
                      <td className="py-3 px-4 text-xs text-gray-500">{st.garantie}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Références légales */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
              <h2 className="font-playfair text-xl font-bold text-gray-900">
                Références légales & Réglementaires
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { ref: 'RGPD (UE) 2016/679', desc: 'Art. 30 — Registre des activités de traitement ; Art. 37-39 — DPO' },
                { ref: 'Loi Togolaise n°2019-014', desc: 'Protection des données à caractère personnel — République Togolaise' },
                { ref: 'Convention de Malabo (UA)', desc: 'Convention de l\'Union Africaine sur la cybersécurité et la protection des données' },
                { ref: 'Acte Additionnel A/SA.1/01/10 CEDEAO', desc: 'Protection des données personnelles dans l\'espace CEDEAO' },
                { ref: 'Règlement CEMAC n°02/23/CEMAC/UMAC/CM', desc: 'Protection des données personnelles en zone CEMAC' },
                { ref: 'Dispositif LBC/FT UEMOA', desc: 'Directive 02/2015/CM/UEMOA — Obligations KYC et conservation' },
              ].map((ref, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(134,188,37,0.08)' }}>
                    <i className="ri-scales-line text-sm" style={{ color: '#86BC25' }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 mb-0.5">{ref.ref}</p>
                    <p className="text-xs text-gray-500">{ref.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl border border-gray-200" style={{ background: 'rgba(134,188,37,0.03)' }}>
              <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(134,188,37,0.12)' }}>
                <i className="ri-information-line text-lg" style={{ color: '#86BC25' }} />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed" style={{ textAlign: 'justify' }}>
                <strong className="text-gray-800">Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}. 
                Ce registre est revu trimestriellement et mis à jour à chaque modification substantielle des traitements. 
                Pour toute question, contactez le DPO à{' '}
                <a href="mailto:dpo@khepraexperts.com" className="text-[#6B9B1F] font-semibold hover:underline cursor-pointer whitespace-nowrap">dpo@khepraexperts.com</a>.
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/privacy/"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#6B9B1F] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-arrow-left-line" /> Consulter notre Politique de Confidentialité
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
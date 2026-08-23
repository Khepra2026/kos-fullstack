import { useState, useEffect, useMemo } from 'react';
import type { KBRArticle } from '@/mocks/khepraBusinessReview';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

interface KBRArticleModalProps {
  article: KBRArticle;
  isEn: boolean;
  onClose: () => void;
}

export default function KBRArticleModal({ article, isEn, onClose }: KBRArticleModalProps) {
  const [modalImgFailed, setModalImgFailed] = useState(false);
  const [modalAuthorImgFailed, setModalAuthorImgFailed] = useState(false);
  const [modalImgLoaded, setModalImgLoaded] = useState(false);
  const [modalAuthorImgLoaded, setModalAuthorImgLoaded] = useState(false);

  const modalImgSrc = modalImgFailed
    ? 'https://readdy.ai/api/search-image?query=Premium%20editorial%20publication%20cover%20design%2C%20minimal%20abstract%20geometric%20composition%20with%20green%20and%20gold%20color%20palette%2C%20sophisticated%20business%20publication%20aesthetic%2C%20clean%20typography-friendly%20background%2C%20warm%20professional%20tones&width=800&height=500&seq=kbr-modal-fallback&orientation=landscape'
    : article.image;
  const modalAuthorImgSrc = modalAuthorImgFailed
    ? 'https://readdy.ai/api/search-image?query=Professional%20corporate%20avatar%20placeholder%2C%20simple%20abstract%20silhouette%20on%20clean%20background%2C%20minimalist%20professional%20style%2C%20neutral%20warm%20tones%2C%20square%20format&width=200&height=200&seq=kbr-modal-author-fallback&orientation=squarish'
    : article.authorImage;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => { window.removeEventListener('keydown', handleEsc); document.body.style.overflow = ''; };
  }, [onClose]);

  const relatedLinks = useMemo(() => {
    const tagToLinks: Record<string, { label: string; href: string; icon: string }[]> = {
      'Inclusion Financière': [{ label: isEn ? 'RegTech Regulatory Engineering' : 'Ingénierie Réglementaire RegTech', href: '/services/regtech-regulatory-engineering', icon: 'ri-tools-line' }, { label: isEn ? 'Financial Inclusion Pillar' : 'Pilier Inclusion Financière', href: '/pillar/financial-inclusion-africa', icon: 'ri-money-dollar-circle-line' }],
      'SFD': [{ label: isEn ? 'Audit Pré-Inspection BCEAO' : 'Audit Pré-Inspection BCEAO', href: '/services/audit-pre-inspection-bceao', icon: 'ri-shield-check-line' }, { label: isEn ? 'SFD Conformité' : 'Conformité SFD', href: '/sfd-conformite', icon: 'ri-bank-line' }],
      'BCEAO': [{ label: isEn ? 'Audit Pré-Inspection BCEAO' : 'Audit Pré-Inspection BCEAO', href: '/services/audit-pre-inspection-bceao', icon: 'ri-shield-check-line' }, { label: isEn ? 'BCEAO Hub' : 'Hub BCEAO', href: '/bceao', icon: 'ri-building-2-line' }],
      'Fintech': [{ label: isEn ? 'RegTech Regulatory Engineering' : 'Ingénierie Réglementaire RegTech', href: '/services/regtech-regulatory-engineering', icon: 'ri-tools-line' }, { label: isEn ? 'Fintech Advisory Pillar' : 'Pilier Conseil Fintech', href: '/pillar/fintech-advisory-africa', icon: 'ri-smartphone-line' }],
      'Gouvernance': [{ label: isEn ? 'Conseil Stratégique' : 'Conseil Stratégique', href: '/services/conseil-strategique', icon: 'ri-compass-3-line' }, { label: isEn ? 'CEO Advisory Board' : 'CEO Advisory Board', href: '/services/ceo-advisory-board', icon: 'ri-government-line' }, { label: isEn ? 'Gouvernance OHADA' : 'Gouvernance OHADA', href: '/gouvernance-ohada', icon: 'ri-scales-line' }],
      'COBAC': [{ label: isEn ? 'Contrôle Interne Bancaire' : 'Contrôle Interne Bancaire', href: '/services/controle-interne-bancaire', icon: 'ri-shield-check-line' }, { label: isEn ? 'COBAC Hub' : 'Hub COBAC', href: '/cobac', icon: 'ri-building-2-line' }],
      'Cybersécurité': [{ label: isEn ? 'Transformation Digitale' : 'Transformation Digitale', href: '/services/transformation-digitale', icon: 'ri-smartphone-line' }, { label: isEn ? 'Cybersecurity Pillar' : 'Pilier Cybersécurité', href: '/pillar/cybersecurite-afrique', icon: 'ri-lock-line' }],
      'ESG': [{ label: isEn ? 'Due Diligence Acquisition' : 'Due Diligence Acquisition', href: '/services/due-diligence-acquisition', icon: 'ri-search-eye-line' }, { label: isEn ? 'ESG Pillar' : 'Pilier ESG & Durabilité', href: '/pillar/esg-durabilite-afrique', icon: 'ri-leaf-line' }],
      'Conformité': [{ label: isEn ? 'Contrôle Interne Bancaire' : 'Contrôle Interne Bancaire', href: '/services/controle-interne-bancaire', icon: 'ri-shield-check-line' }, { label: isEn ? 'Audit Pré-Inspection BCEAO' : 'Audit Pré-Inspection BCEAO', href: '/services/audit-pre-inspection-bceao', icon: 'ri-search-line' }],
      'Réglementation': [{ label: isEn ? 'Intelligence Réglementaire' : 'Intelligence Réglementaire', href: '/services/regulatory-intelligence', icon: 'ri-radar-line' }, { label: isEn ? 'RegTech Regulatory Engineering' : 'Ingénierie Réglementaire RegTech', href: '/services/regtech-regulatory-engineering', icon: 'ri-tools-line' }],
      'Transformation Digitale': [{ label: isEn ? 'Transformation Digitale' : 'Transformation Digitale', href: '/services/transformation-digitale', icon: 'ri-smartphone-line' }, { label: isEn ? 'Digital Transformation Pillar' : 'Pilier Transformation Digitale', href: '/pillar/transformation-digitale-afrique', icon: 'ri-computer-line' }],
      'Banques': [{ label: isEn ? 'Audit Pré-Inspection BCEAO' : 'Audit Pré-Inspection BCEAO', href: '/services/audit-pre-inspection-bceao', icon: 'ri-shield-check-line' }, { label: isEn ? 'Transformation Digitale' : 'Transformation Digitale', href: '/services/transformation-digitale', icon: 'ri-smartphone-line' }],
      'Risques': [{ label: isEn ? 'Contrôle Interne Bancaire' : 'Contrôle Interne Bancaire', href: '/services/controle-interne-bancaire', icon: 'ri-shield-check-line' }, { label: isEn ? 'Risk & Audit Pillar' : 'Pilier Audit & Risques', href: '/pillar/audit-risk-afrique', icon: 'ri-alert-line' }],
      'Audit Interne': [{ label: isEn ? 'Contrôle Interne Bancaire' : 'Contrôle Interne Bancaire', href: '/services/controle-interne-bancaire', icon: 'ri-shield-check-line' }, { label: isEn ? 'Audit Pré-Inspection BCEAO' : 'Audit Pré-Inspection BCEAO', href: '/services/audit-pre-inspection-bceao', icon: 'ri-search-line' }],
      'Inspection': [{ label: isEn ? 'Audit Pré-Inspection BCEAO' : 'Audit Pré-Inspection BCEAO', href: '/services/audit-pre-inspection-bceao', icon: 'ri-search-line' }, { label: isEn ? 'Contrôle Interne Bancaire' : 'Contrôle Interne Bancaire', href: '/services/controle-interne-bancaire', icon: 'ri-shield-check-line' }],
      'Contrôle': [{ label: isEn ? 'Contrôle Interne Bancaire' : 'Contrôle Interne Bancaire', href: '/services/controle-interne-bancaire', icon: 'ri-shield-check-line' }],
      'LCB/FT': [{ label: isEn ? 'Audit Pré-Inspection BCEAO' : 'Audit Pré-Inspection BCEAO', href: '/services/audit-pre-inspection-bceao', icon: 'ri-shield-check-line' }, { label: isEn ? 'GAFI Hub' : 'Hub GAFI', href: '/gafi', icon: 'ri-fingerprint-line' }],
      'CEMAC': [{ label: isEn ? 'Contrôle Interne Bancaire' : 'Contrôle Interne Bancaire', href: '/services/controle-interne-bancaire', icon: 'ri-shield-check-line' }, { label: isEn ? 'CEMAC Conformité' : 'Conformité CEMAC', href: '/conformite-cemac', icon: 'ri-global-line' }],
      'UEMOA': [{ label: isEn ? 'Audit Pré-Inspection BCEAO' : 'Audit Pré-Inspection BCEAO', href: '/services/audit-pre-inspection-bceao', icon: 'ri-shield-check-line' }, { label: isEn ? 'BCEAO Hub' : 'Hub BCEAO', href: '/bceao', icon: 'ri-building-2-line' }],
      'GAFI': [{ label: isEn ? 'Audit Pré-Inspection BCEAO' : 'Audit Pré-Inspection BCEAO', href: '/services/audit-pre-inspection-bceao', icon: 'ri-shield-check-line' }, { label: isEn ? 'GAFI Hub' : 'Hub GAFI', href: '/gafi', icon: 'ri-fingerprint-line' }],
    };
    const added = new Set<string>();
    const links: { label: string; href: string; icon: string }[] = [];
    article.tags.forEach((tag) => {
      const tagLinks = tagToLinks[tag];
      if (tagLinks) {
        tagLinks.forEach((link) => { if (!added.has(link.href)) { added.add(link.href); links.push(link); } });
      }
    });
    return links.slice(0, 6);
  }, [article.tags, isEn]);

  const handleClose = () => { document.body.style.overflow = ''; onClose(); };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4 bg-black/45"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="kbr-modal-animate-in relative rounded-xl max-w-4xl w-full max-h-[94vh] md:max-h-[92vh] flex flex-col overflow-hidden bg-background-50 border border-background-200/70" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)' }}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer bg-background-50 border border-background-200/70 text-foreground-700 hover:bg-background-100 transition-colors"
          aria-label={isEn ? 'Close' : 'Fermer'}
          type="button"
        >
          <i className="ri-close-line text-lg md:text-xl" />
        </button>

        {/* Image header */}
        <div className="relative h-32 sm:h-40 md:h-56 flex-shrink-0 overflow-hidden">
          {!modalImgLoaded && !modalImgFailed && <div className="absolute inset-0 kbr-skeleton" />}
          <img
            src={modalImgSrc}
            alt={`${isEn ? article.titleEn : article.title} — ${article.category} | Khepra Business Review`}
            title={`${isEn ? article.titleEn : article.title} — Khepra Business Review`}
            className="w-full h-full object-cover object-top"
            width="800" height="500" loading="eager" decoding="async"
            onError={() => setModalImgFailed(true)}
            onLoad={() => setModalImgLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-3 md:bottom-4 left-3 md:left-5 right-3 md:right-5">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary-500 text-background-50">{article.category}</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-white bg-white/25 border border-white/30">
                <i className="ri-time-line mr-1" />{article.readingTime} min
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-white bg-white/25 border border-white/30">{article.edition}</span>
            </div>
            <h2 className="text-sm md:text-xl lg:text-2xl font-bold text-white leading-tight line-clamp-2 md:line-clamp-none">{isEn ? article.titleEn : article.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-7 bg-background-50">
          <p className="text-sm md:text-base font-medium mb-5 leading-relaxed text-foreground-700">{isEn ? article.subtitleEn : article.subtitle}</p>

          {/* Author */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-background-200/70">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden flex-shrink-0 bg-background-200">
              {!modalAuthorImgLoaded && !modalAuthorImgFailed && <div className="w-full h-full kbr-skeleton rounded-full" />}
              <img src={modalAuthorImgSrc} alt={article.author} className="w-full h-full object-cover" onError={() => setModalAuthorImgFailed(true)} onLoad={() => setModalAuthorImgLoaded(true)} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-foreground-950">{article.author}</div>
              <div className="text-xs truncate text-foreground-400">{article.authorCredentials}</div>
            </div>
          </div>

          {/* Abstract */}
          <div className="mb-6">
            <BigFourSubtitleBar
              label={isEn ? 'Abstract' : 'Résumé'}
              variant="left-accent"
              accentColor="primary"
              icon="ri-article-line"
              className="mb-4"
            />
            <p className="text-[14px] leading-[1.75] text-foreground-700">{isEn ? article.abstractEn : article.abstract}</p>
          </div>

          {/* Key Insights */}
          <div className="mb-6 p-4 md:p-5 rounded-xl bg-primary-50 border border-primary-200">
            <BigFourSubtitleBar
              label={isEn ? 'Key Insights' : 'Points Clés'}
              variant="minimal-dot"
              accentColor="accent"
              icon="ri-lightbulb-line"
              className="mb-4"
            />
            <ul className="space-y-2.5">
              {(isEn ? article.keyInsightsEn : article.keyInsights).map((insight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[13px] leading-relaxed text-foreground-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5 bg-primary-100 text-primary-700">{idx + 1}</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          {/* Data Lineage */}
          <div className="mb-6">
            <BigFourSubtitleBar
              label={isEn ? 'Data Lineage — Cited Sources' : 'Data Lineage — Sources Citées'}
              variant="left-accent"
              accentColor="primary"
              icon="ri-dna-line"
              className="mb-4"
            />
            <div className="overflow-x-auto rounded-xl border border-background-200/70">
              <table className="w-full text-xs md:text-sm min-w-[400px]">
                <thead>
                  <tr className="bg-background-100">
                    <th className="text-left px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-foreground-400">{isEn ? 'Source' : 'Source'}</th>
                    <th className="text-left px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-foreground-400">{isEn ? 'Institution' : 'Institution'}</th>
                    <th className="text-right px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-foreground-400">{isEn ? 'Year' : 'Année'}</th>
                  </tr>
                </thead>
                <tbody>
                  {article.dataLineage.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-background-50' : 'bg-background-100'}>
                      <td className="px-3 py-2.5 font-medium text-foreground-700">{item.source}</td>
                      <td className="px-3 py-2.5 text-foreground-600">{item.institution}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-[11px] text-foreground-400">{item.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-foreground-400">{isEn ? 'Tags' : 'Étiquettes'}</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-secondary-100 text-foreground-600 border border-background-200/70">{tag}</span>
              ))}
            </div>
          </div>

          {/* Related Links */}
          {relatedLinks.length > 0 && (
            <div className="mb-6">
              <BigFourSubtitleBar
                label={isEn ? 'Related Services & Analyses' : 'Services & Analyses liés'}
                variant="left-accent"
                accentColor="primary"
                icon="ri-links-line"
                className="mb-4"
              />
              <div className="rounded-xl p-4 bg-primary-50 border border-primary-200">
                <p className="text-[11px] mb-3 text-foreground-400">{isEn ? 'Based on this article\'s themes, explore our specialized services and expert analyses:' : 'En lien avec les thèmes de cet article, découvrez nos services spécialisés et analyses expertes :'}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {relatedLinks.map((link) => (
                    <a key={link.href} href={link.href} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[11px] font-semibold cursor-pointer transition-all hover:-translate-y-0.5 min-w-0 bg-background-50 text-primary-700 border border-primary-200">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary-100">
                        <i className={`${link.icon} text-xs text-primary-700`} />
                      </div>
                      <span className="flex-1 min-w-0 truncate leading-tight">{link.label}</span>
                      <i className="ri-arrow-right-line ml-auto text-[10px] opacity-60 flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CTA Banner */}
          <div className="rounded-xl p-4 md:p-5 bg-foreground-950">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{isEn ? 'Need a custom strategic analysis?' : "Besoin d'une analyse stratégique sur mesure ?"}</h3>
                <p className="text-xs text-foreground-400">{isEn ? 'Our experts can develop a tailored research study for your organization.' : 'Nos experts peuvent développer une étude personnalisée pour votre organisation.'}</p>
              </div>
              <a href="/contact/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs whitespace-nowrap cursor-pointer bg-primary-500 text-background-50 hover:bg-primary-600 transition-all">
                <i className="ri-calendar-line" />{isEn ? 'Request a Consultation' : 'Demander une Consultation'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




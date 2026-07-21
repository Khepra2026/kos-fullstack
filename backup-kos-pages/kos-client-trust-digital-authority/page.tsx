import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useClientTrustDigitalAuthority } from '@/hooks/useClientTrustDigitalAuthority';

type TabId = 'overview' | 'cases' | 'testimonials' | 'certs' | 'authority';

export default function clientTrustDigitalAuthorityPage() {
  const { overview, cases, testimonials, certifications, authority, segments, loading, error, dataSource } = useClientTrustDigitalAuthority();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const tabs: { id: TabId; label: string; icon: string; sub: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', sub: `${overview.globalTrustScore}/100` },
    { id: 'cases', label: 'Études de Cas', icon: 'ri-file-text-line', sub: `${cases.length} études` },
    { id: 'testimonials', label: 'Témoignages', icon: 'ri-chat-quote-line', sub: `${testimonials.length} vérifiés` },
    { id: 'certs', label: 'Certifications', icon: 'ri-medal-line', sub: `${certifications.length} actives` },
    { id: 'authority', label: 'Autorité Digitale', icon: 'ri-bar-chart-line', sub: `DR ${authority.domainRating}` },
  ];

  return (
    <hubLayout hubId={123}>
      <SeoHead
        title="KOS Client Trust & Digital Authority™ — Case Studies, Témoignages, Certifications | KHEPRA EXPERTS"
        description="Centre de confiance client et autorité digitale. 35 études de cas, 28 témoignages vérifiés, 12 certifications actives. NPS 72, DR 85, 487 citations. Big Four Trust Standard."
        keywords="client trust, case studies, témoignages, certifications, autorité digitale, domain rating, Big Four"
        canonicalPath="/kos-client-trust-digital-authority"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/30 via-foreground-950/70 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-600/30 border border-teal-500/40 backdrop-blur-sm">
                  <i className="ri-heart-line text-teal-400 text-sm" />
                  <span className="text-sm font-semibold text-teal-300 uppercase tracking-wider">
                    KOS Client Trust & Digital Authority™
                  </span>
                </div>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                La Confiance se Mérite. Elle se Prouve.
                <span className="block text-teal-400 mt-2">35 Études de Cas. 28 Témoignages. 12 Certifications.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                NPS <strong className="text-teal-400">{overview.nps}</strong> · Rétention <strong className="text-white">{overview.clientRetentionRate}%</strong> ·{' '}
                <strong className="text-white">DR {authority.domainRating}</strong> · {' '}
                <strong className="text-white">{authority.citations} citations</strong>.
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-64 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Trust Score Global</span>
              <div className="text-4xl font-bold text-teal-400 font-heading mt-3">{overview.globalTrustScore}</div>
              <span className="text-[9px] text-gray-400">/100</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-2">
            {[
              { label: 'NPS', value: String(overview.nps), color: '#86BC25' },
              { label: 'Rétention', value: `${overview.clientRetentionRate}%`, color: '#0D7B5F' },
              { label: 'Repeat', value: `${overview.repeatBusinessRate}%`, color: '#059669' },
              { label: 'Référence', value: `${overview.referralRate}%`, color: '#E8C547' },
              { label: 'DR', value: String(authority.domainRating), color: '#6366F1' },
              { label: 'Citations', value: String(authority.citations), color: '#8B5CF6' },
              { label: 'LinkedIn', value: `${(authority.linkedInFollowers / 1000).toFixed(1)}K`, color: '#0EA5E9' },
              { label: 'Newsletter', value: `${(authority.newsletterSubscribers / 1000).toFixed(1)}K`, color: '#EA580C' },
            ].map((s, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="block text-sm font-bold text-white font-heading">{s.value}</span>
                <span className="text-[9px] text-gray-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600'
                }`}>
                <i className={`${tab.icon} text-xs`} />{tab.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>{tab.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <section className="py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="rounded-2xl bg-white border border-teal-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-teal-100">
                    <i className="ri-heart-line text-xl text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground-950">Fidélité Client</h3>
                    <p className="text-xs text-teal-600 font-bold">Rétention {overview.clientRetentionRate}% · Repeat {overview.repeatBusinessRate}%</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'NPS', value: String(overview.nps), color: '#86BC25' },
                    { label: 'Rétention', value: `${overview.clientRetentionRate}%`, color: '#0D7B5F' },
                    { label: 'Référence', value: `${overview.referralRate}%`, color: '#E8C547' },
                  ].map(s => (
                    <div key={s.label} className="rounded-lg bg-teal-50/50 p-3 text-center">
                      <span className="block text-lg font-bold" style={{ color: s.color }}>{s.value}</span>
                      <span className="text-[9px] text-foreground-500">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-indigo-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-100">
                    <i className="ri-bar-chart-line text-xl text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground-950">Clients par Segment</h3>
                    <p className="text-xs text-indigo-600 font-bold">{segments.length} segments · {segments.reduce((s, c) => s + c.count, 0)} clients</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {segments.map(seg => (
                    <div key={seg.segment} className="flex items-center gap-2">
                      <span className="text-[10px] text-foreground-700 w-20 truncate">{seg.segment}</span>
                      <div className="flex-1 h-2 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(seg.count / 35) * 100}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-foreground-600">{seg.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CASES */}
      {activeTab === 'cases' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">{cases.length} Études de Cas</h2>
              <p className="text-foreground-600">Missions vérifiées · Résultats mesurables · Big Four Standard</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cases.map(cs => {
                const isExpanded = expandedCase === cs.id;
                return (
                  <div key={cs.id} className={`rounded-xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white'}`}>
                    <button onClick={() => setExpandedCase(isExpanded ? null : cs.id)} className="w-full p-4 text-left cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-100">
                          <i className="ri-file-text-line text-teal-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-foreground-950 mb-1">{cs.title}</h4>
                          <div className="flex flex-wrap gap-1 mb-1">
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{cs.sector}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{cs.jurisdiction}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{cs.year}</span>
                          </div>
                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-background-100">
                              <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
                                <span className="text-foreground-500"><strong>Valeur :</strong> {cs.missionValue}M FCFA</span>
                                <span className="text-foreground-500"><strong>Durée :</strong> {cs.duration}</span>
                              </div>
                              <p className="text-xs text-foreground-600">{cs.result}</p>
                              {cs.testimonial && <span className="inline-block mt-2 text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Témoignage vérifié</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">{testimonials.length} Témoignages Vérifiés</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.map(t => (
                <div key={t.id} className="rounded-xl bg-white border border-background-200 p-5">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <i key={i} className="ri-star-fill text-amber-400 text-xs" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground-700 italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-foreground-950 block">{t.clientName}</span>
                      <span className="text-[10px] text-foreground-500">{t.role}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">VÉRIFIÉ</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CERTS */}
      {activeTab === 'certs' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">{certifications.length} Certifications & Accréditations</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map(c => {
                const statusColor = c.status === 'Certifié' || c.status === 'Actif' ? '#86BC25' : c.status === 'En cours' || c.status === 'Préparé' ? '#E8C547' : '#6366F1';
                return (
                  <div key={c.id} className="rounded-xl bg-white border border-background-200 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-teal-100">
                        <i className="ri-medal-line text-teal-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground-950">{c.name}</h4>
                        <p className="text-[10px] text-foreground-500">{c.scope}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${statusColor}15`, color: statusColor, border: `1px solid ${statusColor}40` }}>
                        {c.status}
                      </span>
                      <span className="text-[9px] text-foreground-400">{c.issuer} {c.validUntil !== 'N/A' && `· ${c.validUntil}`}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* AUTHORITY */}
      {activeTab === 'authority' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Autorité Digitale — DR {authority.domainRating}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Domain Rating', value: String(authority.domainRating), color: '#6366F1' },
                { label: 'URL Rating', value: String(authority.urlRating), color: '#8B5CF6' },
                { label: 'Trust Flow', value: String(authority.trustFlow), color: '#86BC25' },
                { label: 'Citation Flow', value: String(authority.citationFlow), color: '#E8C547' },
                { label: 'Citations', value: String(authority.citations), color: '#0D7B5F' },
                { label: 'Backlinks', value: String(authority.backlinks), color: '#059669' },
                { label: 'Publications Reprises', value: String(authority.publicationsReprises), color: '#EA580C' },
                { label: 'Invitations', value: String(authority.invitationsConferences), color: '#DC2626' },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <span className="block text-xl font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-Links */}
      <section className="py-10 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center font-heading text-xl font-bold text-foreground-950 mb-6">Écosystème Confiance & Autorité</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Trust Center', path: '/kos-trust-center', icon: 'ri-shield-check-line', color: '#86BC25' },
              { label: 'Case Studies', path: '/case-studies', icon: 'ri-file-text-line', color: '#0D7B5F' },
              { label: 'Témoignages', path: '/pourquoi-khepra', icon: 'ri-chat-quote-line', color: '#E8C547' },
              { label: 'Partners', path: '/partenaires', icon: 'ri-shake-hands-line', color: '#6366F1' },
              { label: 'Institutional Visibility', path: '/kos-institutional-visibility', icon: 'ri-building-line', color: '#EA580C' },
              { label: 'Reputation Authority', path: '/kos-growth-intelligence-command', icon: 'ri-bar-chart-line', color: '#8B5CF6' },
            ].map(link => (
              <a key={link.path} href={link.path} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-background-200 bg-background-50 text-xs font-bold text-foreground-700 hover:border-foreground-300 transition-colors cursor-pointer">
                <i className={`${link.icon} text-xs`} style={{ color: link.color }} />{link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}






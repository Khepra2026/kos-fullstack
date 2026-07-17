import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { advisoryBoardMembers, scientificCommitteeMembers, governanceCharter, governanceFaqs } from '@/mocks/governancePublic';

export default function AdvisoryBoardPage() {
  const [activeTab, setActiveTab] = useState<'advisory' | 'scientific' | 'charter' | 'faq'>('advisory');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const tabs = [
    { id: 'advisory' as const, label: 'Conseil Consultatif', icon: 'ri-vip-crown-line', count: advisoryBoardMembers.length },
    { id: 'scientific' as const, label: 'Comité Scientifique', icon: 'ri-microscope-line', count: scientificCommitteeMembers.length },
    { id: 'charter' as const, label: 'Charte de Gouvernance', icon: 'ri-scales-line', count: governanceCharter.pillars.length },
    { id: 'faq' as const, label: 'FAQ', icon: 'ri-question-line', count: governanceFaqs.length },
  ];

  return (
    <>
      <SeoHead
        title="Gouvernance — Conseil Consultatif & Comité Scientifique | KHEPRA EXPERTS"
        description="Gouvernance institutionnelle KHEPRA EXPERTS : Conseil Consultatif de 7 experts (anciens BCEAO, COBAC, GAFI, Big Four, HEC Paris), Comité Scientifique de 5 chercheurs. Charte de gouvernance, transparence totale."
        keywords="Conseil Consultatif KHEPRA, Advisory Board, Comité Scientifique, gouvernance cabinet conseil, experts BCEAO COBAC, KHEPRA EXPERTS"
        canonicalPath="/advisory-board"
      />

      <section className="relative min-h-[380px] md:min-h-[480px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://readdy.ai/api/search-image?query=Elegant%20boardroom%20with%20large%20oval%20table%2C%20premium%20leather%20chairs%2C%20warm%20golden%20lighting%20from%20chandeliers%2C%20wood%20paneled%20walls%2C%20professional%20corporate%20governance%20setting%2C%20floor%20to%20ceiling%20windows%20with%20city%20view%2C%20premium%20aesthetic%2C%20no%20people&width=1600&height=700&seq=governance-hero&orientation=landscape" alt="Gouvernance KHEPRA EXPERTS" className="w-full h-full object-cover object-top" width="1600" height="700" loading="eager" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
              <i className="ri-government-line text-foreground-700"></i>
              Gouvernance Institutionnelle
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Conseil Consultatif & Comité Scientifique
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              7 experts internationaux, 5 chercheurs. La gouvernance externe de KHEPRA EXPERTS, 
              garante de l'intégrité méthodologique et de l'excellence académique.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="bg-background-50">
        {/* Tab Nav */}
        <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex gap-1 py-3 overflow-x-auto">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'}`}>
                  <i className={`${tab.icon} text-sm`}></i>{tab.label}
                  <span className="text-xs opacity-60">{tab.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          {/* Advisory Board */}
          {activeTab === 'advisory' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {advisoryBoardMembers.map((member) => (
                <div key={member.id} className="p-6 rounded-xl bg-background-50 border border-background-200/70 hover:border-background-300/60 transition-all">
                  <div className="w-14 h-14 rounded-full bg-foreground-950 text-white flex items-center justify-center text-lg font-bold mb-4 mx-auto">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 text-center mb-1">{member.name}</h3>
                  <p className="text-xs text-accent-600 font-semibold text-center mb-2">{member.title}</p>
                  <p className="text-xs text-foreground-500 text-center mb-3">{member.background}</p>
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {member.expertise.map((exp, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{exp}</span>
                    ))}
                  </div>
                  <p className="text-xs text-foreground-600 leading-relaxed text-center mb-2">{member.bio}</p>
                  <div className="text-center">
                    <span className="text-[10px] text-foreground-400">{member.credentials}</span>
                    <span className="text-[10px] text-foreground-400 block">{member.country}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Scientific Committee */}
          {activeTab === 'scientific' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {scientificCommitteeMembers.map((member) => (
                <div key={member.id} className="p-6 rounded-xl bg-background-50 border border-background-200/70 flex gap-5">
                  <div className="w-14 h-14 rounded-full bg-foreground-950 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">{member.name}</h3>
                    <p className="text-xs text-accent-600 font-semibold mb-1">{member.title}</p>
                    <p className="text-xs text-foreground-500 mb-2">{member.background}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {member.expertise.map((exp, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{exp}</span>
                      ))}
                    </div>
                    <p className="text-xs text-foreground-600 leading-relaxed">{member.bio}</p>
                    <div className="mt-2 text-[10px] text-foreground-400">{member.credentials} · {member.country}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Charter */}
          {activeTab === 'charter' && (
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">{governanceCharter.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {governanceCharter.pillars.map((pillar, i) => (
                  <div key={i} className="p-5 rounded-xl bg-background-50 border border-background-200/70">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-foreground-950 text-white mb-3">
                      <span className="text-sm font-bold">{i + 1}</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950 mb-2">{pillar.name}</h3>
                    <p className="text-xs text-foreground-600 leading-relaxed">{pillar.description}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-2xl bg-background-50 border border-background-200/70 text-center">
                <p className="text-sm text-foreground-600 max-w-2xl mx-auto">
                  Cette Charte de Gouvernance Externe est opposable à tous les membres du Conseil Consultatif 
                  et du Comité Scientifique. Elle est révisée annuellement et publiée dans le Rapport Annuel 
                  de Gouvernance KHEPRA EXPERTS.
                </p>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3 max-w-4xl mx-auto">
              {governanceFaqs.map((faq, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 overflow-hidden">
                  <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full text-left p-5 flex items-center justify-between gap-3 cursor-pointer">
                    <span className="text-sm font-semibold text-foreground-950">{faq.q}</span>
                    <i className={`ri-add-line text-foreground-400 transition-transform ${expandedFaq === i ? 'rotate-45' : ''}`}></i>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5"><p className="text-sm text-foreground-600 leading-relaxed">{faq.a}</p></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
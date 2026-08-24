import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import BULanguageSwitcher from '@/components/feature/BULanguageSwitcher';

export default function bU1FinancialRegulationEnPage() {
  return (
    <>
      <SeoHead
        title="BU1 Financial Regulation & Compliance — BCEAO/COBAC Regulatory Shield | KHEPRA EXPERTS"
        description="Business Unit 1 — Financial Regulation & Compliance. Mock audits, pre-inspection, remediation plans for banks, insurance, SFDs in the UEMOA/CEMAC zones. Sectoral studies and monographs on quotation. KOS Knowledge Operating System™ — 120 Hubs."
        keywords="financial regulation, BCEAO compliance, COBAC compliance, regulatory audit, regulatory shield, UEMOA, CEMAC, KHEPRA EXPERTS, Africa"
        canonicalPath="/kos-bu1-financial-regulation-en"
        ogType="website"
        ogLocale="en_US"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20financial%20regulation%20concept%20with%20a%20luminous%20shield%20emblem%20radiating%20emerald%20and%20gold%20light%20beams%20over%20a%20dark%20grid%20representing%20regulatory%20compliance%20frameworks%2C%20premium%20corporate%20aesthetic%20with%20geometric%20patterns%20suggesting%20banking%20architecture%20and%20prudential%20standards%2C%20sophisticated%20dark%20background%20with%20golden%20filaments%2C%20no%20text%2C%20no%20people&width=1920&height=600&seq=kos-bu1-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-25"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <BULanguageSwitcher buId="bu1" currentLang="en" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-500/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-sm font-bold text-accent-500 uppercase tracking-wider">Business Unit 1 — Top Priority</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
            Financial Regulation & Compliance
            <span className="block text-accent-500 mt-2 text-xl md:text-2xl font-normal">Regulatory Shield — BCEAO · COBAC · BEAC · GABAC</span>
          </h1>
          <p className="text-base text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            Absolute protection for your institution against regulatory requirements. Mock audit methodology, prioritized remediation plan, and evidence file aligned with international standards. <strong className="text-white">95+ control points, real inspection simulation.</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              'BCEAO Circ. 01-03/2017',
              'COBAC R-2001/07',
              'FATF 2023',
              'Basel II/III',
              'IFRS',
              'OHADA',
            ].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-gray-200 backdrop-blur-sm whitespace-nowrap">{tag}</span>
            ))}
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-accent-500 hover:bg-accent-400 transition-colors whitespace-nowrap cursor-pointer text-base"
          >
            Request a Confidential Quote
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
              </section>

      {/* BU1 Positioning */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Your Regulatory Shield in the UEMOA/CEMAC Zone
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              BU1 is KHEPRA EXPERTS' first line of defense. We secure financial institutions against the growing demands of African regulators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'ri-shield-check-line',
                title: 'Mock Audit — 95+ Points',
                desc: 'Complete regulatory inspection simulation. Gap mapping, compliance scoring, 40+ page executive report.',
              },
              {
                icon: 'ri-file-chart-line',
                title: 'Prioritized Remediation Plan',
                desc: 'Corrective roadmap with criticality-based prioritization. Evidence file, compliant procedures, compliance manual.',
              },
              {
                icon: 'ri-radar-line',
                title: 'KOS Regulatory Watch',
                desc: 'Ongoing subscription: real-time alerts, automatic updates, annual audit, permanent support.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white border border-background-200/70 p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-accent-600 text-xl`} />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectoral Studies & Monographs */}
      <section className="py-12 md:py-16 bg-background-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-4">
              <i className="ri-book-2-line text-accent-600" />
              <span className="text-sm font-bold text-accent-700 uppercase tracking-wider">Sectoral Studies & Monographs — On Quotation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Premium Regulatory Intelligence
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              In-depth sectoral studies and regulatory monographs produced by our experts and the KOS Knowledge Graph™. Each deliverable is priced on quotation based on the depth of analysis required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'BCEAO Compliance Barometer 2026', desc: 'Complete analysis of the 22 instructions in force, compliance gaps by UEMOA country, sectoral best-practice benchmark.' },
              { title: 'COBAC Monograph — 2026-2027 Requirements', desc: 'New circulars, fintech regulation, capital requirements, compliance timeline.' },
              { title: 'Sectoral Study — UEMOA Banks', desc: 'Analysis of 128 banks, prudential ratios, stress tests, banking landscape projection 2026-2028.' },
              { title: 'AML/CFT Guide — FATF 2026 Requirements', desc: 'Complete update of the 40 recommendations, national risk assessment, KYC/CDD procedures.' },
              { title: 'Stress Test Report — Pillar 2', desc: 'BCEAO methodology, macroeconomic scenarios, impact on solvency ratios, mitigation plan.' },
              { title: 'Monthly Regulatory Watch', desc: 'Executive synthesis of new texts, impact analyses, operational recommendations. Annual subscription.' },
            ].map((study, i) => (
              <div key={i} className="rounded-xl bg-white border border-background-200/70 p-5 hover:border-accent-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center shrink-0">
                    <i className="ri-article-line text-accent-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{study.title}</h3>
                    <p className="text-xs text-foreground-500 leading-relaxed">{study.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-background-100">
                  <span className="text-xs font-bold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-full">On Quotation</span>
                  <Link to="/contact" className="text-xs font-bold text-foreground-400 hover:text-accent-600 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap">
                    Request <i className="ri-arrow-right-line text-[10px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Profiles */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">This Concerns You if...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { icon: 'ri-bank-line', label: 'Banks & Financial Institutions', desc: 'Subject to BCEAO/COBAC requirements — prudential ratios, governance, reporting.' },
              { icon: 'ri-building-line', label: 'Insurance & Reinsurance', desc: 'CIMA/CRCA compliance, solvency requirements, prudential reporting.' },
              { icon: 'ri-hand-coin-line', label: 'SFDs & Microfinance Institutions', desc: 'BCEAO Instructions 001-030, licensing, prudential ratios, SFD governance.' },
              { icon: 'ri-smartphone-line', label: 'Fintechs & Payment Institutions', desc: 'New UEMOA/CEMAC fintech regulations, licensing, operational compliance.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-background-200/70">
                <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
                  <i className={`${item.icon} text-accent-600 text-lg`} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{item.label}</h3>
                  <p className="text-xs text-foreground-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 bg-foreground-950">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
            Protect your institution. Anticipate the inspection.
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Our experts analyze your regulatory exposure and provide a confidential quote within 48 hours. <strong className="text-white">No public pricing. Every engagement is unique.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-accent-500 hover:bg-accent-400 transition-colors whitespace-nowrap cursor-pointer text-base"
            >
              <i className="ri-mail-send-line" />
              Request a Quote
            </Link>
            <Link
              to="/offre-commerciale"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-file-text-line" />
              Full Brochure
            </Link>
            <Link
              to="/lead-magnets/diagnostic-scoring-kbr"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-flashlight-line" />
              Free Diagnostic
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}




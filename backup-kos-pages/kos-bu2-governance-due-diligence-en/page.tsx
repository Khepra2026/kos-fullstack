import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import BULanguageSwitcher from '@/components/feature/BULanguageSwitcher';

export default function bU2GovernanceDueDiligenceEnPage() {
  return (
    <>
      <SeoHead
        title="BU2 Governance & Due Diligence — Board Performance, Pre-Acquisition Audits | KHEPRA EXPERTS"
        description="Business Unit 2 — Governance & Due Diligence. Board performance audits, pre-acquisition due diligence, governance risk mapping. Sectoral studies and monographs on quotation. KOS Knowledge Operating System™."
        keywords="corporate governance, due diligence, board audit, board performance, acquisition, ISO 37000, COSO, OHADA, KHEPRA EXPERTS, Africa"
        canonicalPath="/kos-bu2-governance-due-diligence-en"
        ogType="website"
        ogLocale="en_US"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20governance%20concept%20with%20interconnected%20golden%20nodes%20forming%20a%20boardroom%20table%20constellation%20radiating%20authority%20and%20oversight%2C%20emerald%20green%20accents%20symbolizing%20due%20diligence%20and%20transparency%2C%20premium%20corporate%20dark%20background%20with%20subtle%20geometric%20patterns%20suggesting%20organizational%20hierarchy%2C%20sophisticated%20minimal%20aesthetic%2C%20no%20text%2C%20no%20people&width=1920&height=600&seq=kos-bu2-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-25"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <BULanguageSwitcher buId="bu2" currentLang="en" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/20 border border-secondary-500/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
            <span className="text-sm font-bold text-secondary-500 uppercase tracking-wider">Business Unit 2 — High Priority</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
            Governance & Due Diligence
            <span className="block text-secondary-500 mt-2 text-xl md:text-2xl font-normal">Governance Observatory — Board Performance · Pre-Acquisition Audits</span>
          </h1>
          <p className="text-base text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            Failed governance is the root cause of 73% of institutional crises in Africa. We audit, measure, and strengthen the performance of your governance bodies with <strong className="text-white">the methodological rigor of COSO, ISO 37000, and OHADA AUSCGIE standards.</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              'COSO 2013/2017',
              'ISO 37000',
              'OHADA AUSCGIE',
              'IIA IPPF',
              'GRI 2021',
              'ISSB',
            ].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-gray-200 backdrop-blur-sm whitespace-nowrap">{tag}</span>
            ))}
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-secondary-500 hover:bg-secondary-600 transition-colors whitespace-nowrap cursor-pointer text-base"
          >
            Request a Confidential Quote
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

      {/* Positioning */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Governance as a Competitive Advantage
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              BU2 transforms governance from regulatory obligation into a valuation lever to attract investors and strategic partners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'ri-user-star-line',
                title: 'Board Performance Audit',
                desc: 'Assessment of independence, specialized committees, diversity, remuneration policy, ethics. Governance maturity score /100.',
              },
              {
                icon: 'ri-search-eye-line',
                title: 'Pre-Acquisition Due Diligence',
                desc: 'Complete audit: financial, legal, ESG, governance. Hidden risk mapping, red flags, recommendations.',
              },
              {
                icon: 'ri-scales-3-line',
                title: 'OHADA & International Compliance',
                desc: 'AUSCGIE, ISO 37000, COSO alignment. Governance policy, board charter, remuneration, ethics, compliance.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white border border-background-200/70 p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-secondary-600 text-xl`} />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectoral Studies */}
      <section className="py-12 md:py-16 bg-background-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-4">
              <i className="ri-book-2-line text-secondary-600" />
              <span className="text-sm font-bold text-secondary-700 uppercase tracking-wider">Studies & Monographs — On Quotation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Premium Governance Intelligence
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Governance Barometer — UEMOA Banks 2026', desc: 'Comparative analysis of governance across 128 UEMOA banks. Independence, committees, diversity, remuneration.' },
              { title: 'Monograph — OHADA Due Diligence', desc: 'Complete guide to pre-acquisition due diligence in the OHADA zone. 150-point checklist, red flags, case studies.' },
              { title: 'Study — Conflicts of Interest in African Boards', desc: 'Typology of conflicts, prevention mechanisms, international benchmark, COSO/ISO 37000 recommendations.' },
              { title: 'Report — Audit Committee Performance', desc: 'Assessment of UEMOA/CEMAC audit committees, BCEAO/COBAC circular compliance, improvement plan.' },
              { title: 'Guide — Executive Remuneration Policy', desc: 'Sectoral benchmark, performance alignment, regulatory compliance, OHADA recommendations.' },
              { title: 'Study — SFD Governance in the UEMOA Zone', desc: 'Analysis of the 7 BCEAO governance pillars, gaps by country, compliance roadmap.' },
            ].map((study, i) => (
              <div key={i} className="rounded-xl bg-white border border-background-200/70 p-5 hover:border-secondary-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center shrink-0">
                    <i className="ri-article-line text-secondary-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{study.title}</h3>
                    <p className="text-xs text-foreground-500 leading-relaxed">{study.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-background-100">
                  <span className="text-xs font-bold text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full">On Quotation</span>
                  <Link to="/contact" className="text-xs font-bold text-foreground-400 hover:text-secondary-600 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap">
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">For Decision-Makers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { icon: 'ri-user-received-line', label: 'Board Chairpersons', desc: 'Assess your Board\'s performance. Benchmark, independence, specialized committees.' },
              { icon: 'ri-briefcase-line', label: 'CEOs & Deputy CEOs', desc: 'Secure your governance ahead of fundraising, acquisition, or regulatory inspection.' },
              { icon: 'ri-funds-line', label: 'Investment & PE Funds', desc: 'Pre-acquisition governance due diligence. Detection of conflicts and hidden risks.' },
              { icon: 'ri-government-line', label: 'Regulators & Supervisory Authorities', desc: 'Sectoral governance benchmark, comparative studies, recommendations.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-background-200/70">
                <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center shrink-0">
                  <i className={`${item.icon} text-secondary-600 text-lg`} />
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
            Your governance is your primary intangible asset. Let's audit it.
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            A free governance diagnostic in 8 minutes. A confidential quote in 48 hours. <strong className="text-white">No public pricing — every engagement is tailored to your context.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-secondary-500 hover:bg-secondary-600 transition-colors whitespace-nowrap cursor-pointer text-base"
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






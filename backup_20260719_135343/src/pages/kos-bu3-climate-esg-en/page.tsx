import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import BULanguageSwitcher from '@/components/feature/BULanguageSwitcher';

export default function bU3ClimateESGEnPage() {
  return (
    <>
      <SeoHead
        title="BU3 Climate, Transition & ESG — Decarbonization Engineering, ESG Strategy | KHEPRA EXPERTS"
        description="Business Unit 3 — Climate, Transition & ESG. Scope 1-2-3 carbon footprint, integrated ESG strategy ISSB/GRI/CSRD, industrial asset valuation against climate risks. Sectoral studies and monographs on quotation. KOS Knowledge Operating System™."
        keywords="ESG, climate, decarbonization, carbon footprint, ISSB, GRI, CSRD, green transition, green finance, KHEPRA EXPERTS, Africa"
        canonicalPath="/kos-bu3-climate-esg-en"
        ogType="website"
        ogLocale="en_US"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20climate%20transition%20concept%20with%20emerald%20green%20energy%20waves%20flowing%20through%20a%20dark%20industrial%20landscape%2C%20golden%20sustainability%20metrics%20glowing%20like%20constellation%20points%2C%20geometric%20carbon%20reduction%20pathways%20intersecting%20with%20financial%20valuation%20curves%2C%20premium%20corporate%20aesthetic%20with%20organic%20flowing%20lines%20suggesting%20ecological%20transformation%2C%20no%20text%2C%20no%20people&width=1920&height=600&seq=kos-bu3-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-25"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <BULanguageSwitcher buId="bu3" currentLang="en" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Business Unit 3 — High Priority</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
            Climate, Transition & ESG
            <span className="block text-emerald-400 mt-2 text-xl md:text-2xl font-normal">Decarbonization Engineering — Industrial Asset Valuation</span>
          </h1>
          <p className="text-base text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            Carbon has become a financial asset in its own right. We support industrials and financial institutions in measuring, reducing, and valuing their carbon footprint with <strong className="text-white">ISSB, GRI, CSRD standards and NGFS recommendations.</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              'ISSB',
              'GRI 2021',
              'CSRD',
              'NGFS',
              'TCFD',
              'ISO 14064',
            ].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-gray-200 backdrop-blur-sm whitespace-nowrap">{tag}</span>
            ))}
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-emerald-500 hover:bg-emerald-600 transition-colors whitespace-nowrap cursor-pointer text-base"
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
              Your Climate Strategy as a Valuation Lever
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              BU3 transforms carbon constraints into strategic opportunities. We secure your industrial assets and your access to green financing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'ri-leaf-line',
                title: 'Scope 1-2-3 Carbon Footprint',
                desc: 'Complete carbon footprint measurement, Paris Agreement Art. 6-aligned decarbonization trajectory, prioritized reduction plan.',
              },
              {
                icon: 'ri-line-chart-line',
                title: 'Integrated ESG Strategy',
                desc: 'ISSB, GRI, CSRD-compliant reporting. Investor dossier, climate due diligence, preparation for market requirements.',
              },
              {
                icon: 'ri-seedling-line',
                title: 'Green Financing & Taxonomy',
                desc: 'EU green taxonomy eligibility, climate financing dossier assembly, green bonds, carbon credits.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white border border-background-200/70 p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-emerald-600 text-xl`} />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <i className="ri-book-2-line text-emerald-600" />
              <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">Studies & Monographs — On Quotation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Premium Climate & ESG Intelligence
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'ESG Barometer — African Banks 2026', desc: 'Overview of ESG reporting by UEMOA/CEMAC banks. ISSB alignment, gaps, sectoral benchmark.' },
              { title: 'Monograph — African Carbon Market', desc: 'Analysis of carbon credit mechanisms, Article 6 project potential, initiative mapping.' },
              { title: 'Sectoral Study — Industrial Decarbonization', desc: 'Sectoral decarbonization trajectories for extractive and manufacturing industries in Africa.' },
              { title: 'Report — Green Taxonomy & Climate Financing', desc: 'Eligibility criteria, financing window mapping, dossier assembly.' },
              { title: 'Guide — CSRD Reporting for African Subsidiaries', desc: 'Obligations of European group subsidiaries, compliance timeline, key indicators.' },
              { title: 'Study — Physical & Transition Risks', desc: 'Climate risk mapping by geographic zone, NGFS stress tests, adaptation plans.' },
            ].map((study, i) => (
              <div key={i} className="rounded-xl bg-white border border-background-200/70 p-5 hover:border-emerald-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <i className="ri-article-line text-emerald-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{study.title}</h3>
                    <p className="text-xs text-foreground-500 leading-relaxed">{study.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-background-100">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">On Quotation</span>
                  <Link to="/contact" className="text-xs font-bold text-foreground-400 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap">
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
              { icon: 'ri-oil-line', label: 'Extractive & Manufacturing Industries', desc: 'Decarbonization, carbon footprint, CSRD compliance, access to green financing.' },
              { icon: 'ri-bank-line', label: 'Banks & Financial Institutions', desc: 'Pillar 3 ESG reporting, NGFS climate stress tests, green taxonomy.' },
              { icon: 'ri-building-2-line', label: 'Infrastructure & Energy', desc: 'Project carbon assessment, climate due diligence, concessional financing.' },
              { icon: 'ri-global-line', label: 'European Groups — African Subsidiaries', desc: 'CSRD compliance, consolidated ESG reporting, climate audits.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-background-200/70">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <i className={`${item.icon} text-emerald-600 text-lg`} />
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
            Carbon is a liability — or an asset. Your choice.
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            A free ESG diagnostic in 8 minutes. A confidential quote in 48 hours. <strong className="text-white">No public pricing — every engagement is unique.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-emerald-500 hover:bg-emerald-600 transition-colors whitespace-nowrap cursor-pointer text-base"
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




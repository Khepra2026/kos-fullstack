import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import BULanguageSwitcher from '@/components/feature/BULanguageSwitcher';

export default function bU4KBRModelEnPage() {
  return (
    <>
      <SeoHead
        title="BU4 KBR-Model & Business Intelligence — Premium Sectoral Studies, IP Monetization | KHEPRA EXPERTS"
        description="Business Unit 4 — KBR-Model & Business Intelligence. Premium articles, paid sectoral studies, regulatory barometers, economic outlook notes. Intellectual Property monetization via the KOS Knowledge Graph™ (100K documents). All on quotation."
        keywords="KBR-Model, business intelligence, sectoral studies, IP monetization, premium articles, regulatory barometers, economic intelligence, KHEPRA EXPERTS, KOS Knowledge Graph, Africa"
        canonicalPath="/kos-bu4-kbr-model-en"
        ogType="website"
        ogLocale="en_US"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20knowledge%20monetization%20concept%20with%20golden%20data%20streams%20flowing%20from%20a%20luminous%20crystalline%20brain-like%20structure%20into%20interconnected%20revenue%20nodes%2C%20premium%20dark%20background%20with%20emerald%20and%20amber%20light%20trails%20representing%20intellectual%20property%20transformation%20into%20business%20intelligence%2C%20geometric%20honeycomb%20patterns%20suggesting%20knowledge%20architecture%2C%20no%20text%2C%20no%20people&width=1920&height=600&seq=kos-bu4-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-25"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <BULanguageSwitcher buId="bu4" currentLang="en" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-bold text-primary-400 uppercase tracking-wider">Business Unit 4 — Strategic Lever</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
            KBR-Model & Business Intelligence
            <span className="block text-primary-400 mt-2 text-xl md:text-2xl font-normal">IP Monetization — Knowledge-Based Revenue</span>
          </h1>
          <p className="text-base text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            Knowledge is our raw material. The KBR-Model transforms KHEPRA EXPERTS' intellectual capital into recurring revenue through <strong className="text-white">28 sectoral studies per year, regulatory barometers, economic outlook notes, and premium articles.</strong> All powered by the KOS Knowledge Graph™ — 100K documents, 2.78M embeddings, 18 sources.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              '28 Studies/year',
              '100K Documents',
              '3 KBR Tiers',
              '18 Sources',
              '500+ Citations',
              'KOS Knowledge Graph™',
            ].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-gray-200 backdrop-blur-sm whitespace-nowrap">{tag}</span>
            ))}
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer text-base"
          >
            Request a Confidential Quote
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

      {/* The 3 KBR Tiers */}
      <section className="py-12 md:py-16 bg-background-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              The KBR-Model — 3 Monetization Tiers
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              BU4 is the IP monetization engine of KHEPRA EXPERTS. Each tier corresponds to a degree of analytical depth and exclusivity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                level: 'KBR Level 1',
                label: 'Lead Magnet — Free',
                icon: 'ri-download-line',
                color: 'bg-primary-100',
                iconColor: 'text-primary-600',
                desc: 'Executive Summaries, article previews, score simulators. Designed to demonstrate our expertise and capture qualified leads.',
                items: ['Executive Summaries (2 pages)', 'Sectoral study previews', 'Regulatory score simulators', 'Synthetic barometers'],
              },
              {
                level: 'KBR Level 2',
                label: 'Premium — On Quotation',
                icon: 'ri-vip-crown-line',
                color: 'bg-amber-100',
                iconColor: 'text-amber-600',
                desc: 'In-depth articles, complete sectoral studies, economic outlook notes, monographs. The core of our monetization offering.',
                items: ['Full sectoral studies (30-60 pages)', 'Quarterly economic outlook notes', 'Regulatory monographs', 'Premium articles with exclusive data'],
              },
              {
                level: 'KBR Level 3',
                label: 'High-Ticket — On Quotation',
                icon: 'ri-shield-star-line',
                color: 'bg-accent-100',
                iconColor: 'text-accent-600',
                desc: 'Private audit reports, client risk mapping, bespoke intelligence for high-stakes decisions.',
                items: ['Confidential audit reports', 'Custom risk mapping', 'Due diligence intelligence', 'Tailored executive briefings'],
              },
            ].map((tier, i) => (
              <div key={i} className="rounded-2xl bg-white border border-background-200/70 p-6 hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl ${tier.color} flex items-center justify-center mb-4`}>
                  <i className={`${tier.icon} ${tier.iconColor} text-xl`} />
                </div>
                <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">{tier.level}</span>
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-2 mt-1">{tier.label}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed mb-4">{tier.desc}</p>
                <ul className="space-y-2">
                  {tier.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-foreground-600">
                      <i className="ri-check-line text-emerald-500 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Publications */}
      <section className="py-12 md:py-16 bg-background-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
              <i className="ri-book-open-line text-primary-600" />
              <span className="text-sm font-bold text-primary-700 uppercase tracking-wider">Premium KBR Publications — On Quotation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading mb-3">
              Our Flagship Publications
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'UEMOA Compliance Barometer 2026', desc: 'Quarterly analysis of regulatory developments, compliance gaps, sectoral best-practice benchmark.' },
              { title: 'CEMAC Compliance Barometer 2026', desc: 'CEMAC mirror of the UEMOA barometer. COBAC, BEAC, GABAC. Exclusive quarterly analysis.' },
              { title: 'Economic Outlook — African Finance', desc: 'Macroeconomic analysis, regulatory trends, weak signals. Quarterly publication.' },
              { title: 'Policy Brief — UEMOA Fintech Regulation', desc: 'Decoding new fintech regulatory directions. Implications for banks and startups.' },
              { title: 'Position Paper — OHADA Governance 2026', desc: 'Analysis of AUSCGIE developments, recommendations for Boards, international benchmark.' },
              { title: 'Study — Pillar 2 Climate Stress Tests', desc: 'NGFS methodology applied to UEMOA/CEMAC banks. Scenarios, impacts, recommendations.' },
              { title: 'Monograph — Islamic Finance UEMOA', desc: 'Complete analysis of the regulatory framework, opportunities, case studies, market potential.' },
              { title: 'Annual Report — KOS Intelligence Review', desc: 'Annual synthesis of regulatory, technological, and economic trends in Francophone Africa.' },
              { title: 'Executive Summary — KBR Monthly Digest', desc: 'Free monthly executive summary. Premium publication previews, weak signals, regulatory agenda.' },
            ].map((study, i) => (
              <div key={i} className="rounded-xl bg-white border border-background-200/70 p-5 hover:border-primary-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                    <i className="ri-article-line text-primary-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 mb-1">{study.title}</h3>
                    <p className="text-xs text-foreground-500 leading-relaxed">{study.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-background-100">
                  <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">On Quotation</span>
                  <Link to="/contact" className="text-xs font-bold text-foreground-400 hover:text-primary-600 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap">
                    Request <i className="ri-arrow-right-line text-[10px]" />
                  </Link>
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
            Intelligence only has value when it's actionable.
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Access sectoral studies, regulatory barometers, and economic outlook notes that transform your decision-making. <strong className="text-white">No public pricing. Every publication is priced on quotation.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer text-base"
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
            <a
              href="https://www.linkedin.com/company/khepraexperts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-linkedin-fill" />
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}






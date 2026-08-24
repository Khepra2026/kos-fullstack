import { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

interface UpcomingPub {
  id: string;
  pub_type: string;
  slug: string;
  title: string;
  subtitle: string | null;
  publication_date: string;
  language: string;
  region: string | null;
  authors: { name: string; role?: string; affiliation?: string }[];
  keywords: string[];
}

const TYPE_ICONS: Record<string, string> = {
  blog: 'ri-article-line',
  kbr: 'ri-file-search-line',
  etude_flash: 'ri-flashlight-line',
  note_strategique: 'ri-lightbulb-flash-line',
};

const TYPE_LABELS: Record<string, string> = {
  blog: 'Article',
  kbr: 'KBR',
  etude_flash: 'Étude Flash',
  note_strategique: 'Note Stratégique',
};

const TYPE_COLORS: Record<string, string> = {
  blog: 'bg-primary-100 text-primary-700',
  kbr: 'bg-accent-100 text-accent-700',
  etude_flash: 'bg-amber-100 text-amber-700',
  note_strategique: 'bg-emerald-100 text-emerald-700',
};

const MOCK_PUBS: UpcomingPub[] = [
  {
    id: 'm1', pub_type: 'etude_flash', slug: 'obnl-gabac-financement-terrorisme',
    title: 'Étude Flash : OBNL GABAC — Risque FT CEMAC',
    subtitle: 'GABAC — Secteur des Organisations à But Non Lucratif',
    publication_date: '2026-07-11', language: 'fr', region: 'CEMAC',
    authors: [{ name: 'KHEPRA EXPERTS', role: 'Auteur Principal', affiliation: 'KHEPRA' }],
    keywords: ['GABAC', 'OBNL', 'Terrorisme', 'CEMAC'],
  },
  {
    id: 'm2', pub_type: 'blog', slug: 'politiques-procedures-gabac-manuel',
    title: 'Politiques et Procédures LBC/FT GABAC',
    subtitle: 'GABAC — Manuel de Procédures LBC/FT CEMAC',
    publication_date: '2026-07-13', language: 'fr', region: 'CEMAC',
    authors: [{ name: 'KHEPRA EXPERTS', role: 'Auteur Principal', affiliation: 'KHEPRA' }],
    keywords: ['GABAC', 'Politiques', 'Manuel', 'CEMAC'],
  },
  {
    id: 'm3', pub_type: 'note_strategique', slug: 'preuves-documentation-gabac-dossier',
    title: 'Note Stratégique : Preuves et Documentation GABAC',
    subtitle: 'GABAC — Dossier de Conformité LBC/FT CEMAC',
    publication_date: '2026-07-15', language: 'fr', region: 'CEMAC',
    authors: [{ name: 'KHEPRA EXPERTS', role: 'Auteur Principal', affiliation: 'KHEPRA' }],
    keywords: ['GABAC', 'Preuves', 'Documentation', 'CEMAC'],
  },
  {
    id: 'm4', pub_type: 'blog', slug: 'due-diligence-gabac-kyc-cemac',
    title: 'Due Diligence Client GABAC : KYC CEMAC',
    subtitle: 'GABAC — Obligations Identification Client',
    publication_date: '2026-07-17', language: 'fr', region: 'CEMAC',
    authors: [{ name: 'KHEPRA EXPERTS', role: 'Auteur Principal', affiliation: 'KHEPRA' }],
    keywords: ['GABAC', 'KYC', 'Due Diligence', 'CEMAC'],
  },
  {
    id: 'm5', pub_type: 'blog', slug: 'gouvernance-lbcft-gabac-cemac',
    title: 'Gouvernance LBC/FT CEMAC : Exigences GABAC',
    subtitle: 'GABAC — Groupe Action contre le Blanchiment en Afrique Centrale',
    publication_date: '2026-07-19', language: 'fr', region: 'CEMAC',
    authors: [{ name: 'KHEPRA EXPERTS', role: 'Auteur Principal', affiliation: 'KHEPRA' }],
    keywords: ['GABAC', 'LBC/FT', 'CEMAC', 'Gouvernance'],
  },
];

function formatDate(dateStr: string, isEn: boolean): string {
  const d = new Date(dateStr);
  if (isEn) {
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function daysUntil(dateStr: string, isEn: boolean): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return isEn ? "Today" : "Aujourd'hui";
  if (diff === 1) return isEn ? "Tomorrow" : "Demain";
  if (diff < 30) return isEn ? `In ${diff} days` : `Dans ${diff} jours`;
  const months = Math.floor(diff / 30);
  const remaining = diff % 30;
  if (remaining === 0) return isEn ? `In ${months} month${months > 1 ? 's' : ''}` : `Dans ${months} mois`;
  return isEn ? `In ${months} month${months > 1 ? 's' : ''}` : `Dans ${months} mois et ${remaining} jours`;
}

export const HomeUpcomingPublications = memo(function HomeUpcomingPublications() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [pubs, setPubs] = useState<UpcomingPub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPubs() {
      try {
        const { data, error } = await supabase
          .from('kos_publications')
          .select('id, pub_type, slug, title, subtitle, publication_date, language, region, authors, keywords')
          .eq('status', 'scheduled')
          .order('publication_date', { ascending: true })
          .limit(5);

        if (error) throw error;

        if (data && data.length > 0) {
          setPubs(data as UpcomingPub[]);
        } else {
          setPubs(MOCK_PUBS);
        }
      } catch {
        setPubs(MOCK_PUBS);
      } finally {
        setLoading(false);
      }
    }
    fetchPubs();
  }, []);

  if (loading || pubs.length === 0) return null;

  return (
    <section id="upcoming-publications" className="py-16 sm:py-20 lg:py-24 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fadeSlideUp">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-12">
            <div>
              <BigFourSubtitleBar
                label={isEn ? 'Coming Soon' : 'À Paraître'}
                variant="minimal-dot"
                accentColor="accent"
              />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mt-1">
                {isEn ? 'Next Publications' : 'Prochaines Publications'}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-foreground-600 leading-relaxed">
                {isEn
                  ? 'Discover our upcoming analyses, studies, and regulatory briefs. Content produced by KHEPRA experts.'
                  : 'Découvrez nos prochaines analyses, études et notes réglementaires. Contenu produit par les experts KHEPRA.'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/calendrier-editorial')}
                className="whitespace-nowrap inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer min-h-[44px] py-2 rounded group"
              >
                <i className="ri-calendar-schedule-line" />
                {isEn ? 'Editorial Calendar' : 'Calendrier Éditorial'}
                <div className="w-5 h-5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <i className="ri-arrow-right-line" />
                </div>
              </button>
              <button
                onClick={() => navigate('/publications')}
                className="whitespace-nowrap inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors cursor-pointer min-h-[44px] py-2 rounded group"
              >
                {isEn ? 'All publications' : 'Toutes les publications'}
                <div className="w-5 h-5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <i className="ri-arrow-right-line" />
                </div>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pubs.map((pub, idx) => {
            const typeInfo = TYPE_LABELS[pub.pub_type] || 'Article';
            const typeIcon = TYPE_ICONS[pub.pub_type] || 'ri-article-line';
            const typeColor = TYPE_COLORS[pub.pub_type] || 'bg-primary-100 text-primary-700';

            return (
              <ScrollReveal key={pub.id} animation="fadeSlideUp" delay={idx * 60}>
                <article
                  onClick={() => navigate(`/publication/${pub.slug}`)}
                  className="group cursor-pointer bg-white rounded-xl p-5 border border-background-200/60 hover:border-accent-300/60 transition-all duration-300 flex flex-col h-full"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/publication/${pub.slug}`);
                    }
                  }}
                >
                  {/* Date badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center shrink-0">
                      <i className="ri-calendar-todo-line text-accent-600 text-sm" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-accent-700 uppercase tracking-wider leading-tight">
                        {daysUntil(pub.publication_date, isEn)}
                      </p>
                      <p className="text-[10px] text-foreground-500 leading-tight">
                        {formatDate(pub.publication_date, isEn)}
                      </p>
                    </div>
                  </div>

                  {/* Type badge */}
                  <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium mb-2.5 self-start ${typeColor}`}>
                    <i className={`${typeIcon} text-[10px]`} />
                    {typeInfo}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-foreground-900 mb-1.5 leading-snug line-clamp-2 group-hover:text-accent-600 transition-colors">
                    {pub.title}
                  </h3>

                  {/* Subtitle */}
                  {pub.subtitle && (
                    <p className="text-[11px] text-foreground-500 leading-relaxed line-clamp-2 mb-auto">
                      {pub.subtitle}
                    </p>
                  )}

                  {/* Keywords */}
                  {pub.keywords && pub.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-background-200/40">
                      {pub.keywords.slice(0, 3).map((kw, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
});




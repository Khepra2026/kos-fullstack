import { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import { blogArticles } from '@/mocks/blogArticles';
import { blogArticlesEn } from '@/mocks/blogArticlesEn';
import { resources } from '@/mocks/resources';
import { resourcesEn } from '@/mocks/resourcesEn';
import { serviceDetails } from '@/pages/services/data/serviceDetails';
import { getCachedSearch, setCachedSearch } from '@/utils/performanceOptimizer';

export type SearchResultType = 'article' | 'service' | 'resource' | 'page' | 'tool' | 'region';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  url: string;
  category?: string;
  tags?: string[];
  relevanceScore: number;
  thumbnail?: string;
}

export interface GroupedResults {
  articles: SearchResult[];
  services: SearchResult[];
  resources: SearchResult[];
  pages: SearchResult[];
  tools: SearchResult[];
  regions: SearchResult[];
}

// Historique des recherches (stocké dans localStorage)
const SEARCH_HISTORY_KEY = 'khepera_search_history';
const MAX_HISTORY_ITEMS = 10;

const staticPages = {
  fr: [
    {
      id: 'about',
      title: 'À propos',
      description: 'Découvrez Khepera Experts, cabinet de conseil en gouvernance, finance et conformité en Afrique de l\'Ouest',
      url: '/about',
      category: 'Présentation',
      tags: ['cabinet', 'conseil', 'expertise', 'afrique']
    },
    {
      id: 'case-studies',
      title: 'Études de cas',
      description: 'Découvrez nos réalisations et succès clients dans la gouvernance d\'entreprise, la finance et la conformité',
      url: '/case-studies',
      category: 'Références',
      tags: ['réalisations', 'succès', 'clients', 'projets']
    },
    {
      id: 'decideurs',
      title: 'Espace Décideurs',
      description: 'Solutions sur-mesure pour dirigeants, administrateurs et responsables de la conformité',
      url: '/decideurs',
      category: 'Solutions',
      tags: ['dirigeants', 'executives', 'décideurs', 'leadership']
    },
    {
      id: 'sfd-conformite',
      title: 'SFD Conformité',
      description: 'Accompagnement spécialisé pour les Systèmes Financiers Décentralisés en conformité réglementaire',
      url: '/sfd-conformite',
      category: 'Conformité',
      tags: ['microfinance', 'sfd', 'bceao', 'uemoa']
    },
    {
      id: 'insights',
      title: 'Insights & Analyses',
      description: 'Analyses stratégiques, rapports sectoriels et perspectives économiques sur l\'Afrique',
      url: '/insights',
      category: 'Publications',
      tags: ['analyses', 'rapports', 'études', 'recherche']
    },
    {
      id: 'blog',
      title: 'Blog & Actualités',
      description: 'Articles d\'expertise sur la gouvernance, la finance et la transformation digitale en Afrique',
      url: '/blog',
      category: 'Contenu',
      tags: ['articles', 'actualités', 'blog', 'expertise']
    },
    {
      id: 'resources',
      title: 'Ressources & Guides',
      description: 'Téléchargez nos guides pratiques, checklists et outils pour améliorer votre gouvernance',
      url: '/resources',
      category: 'Outils',
      tags: ['guides', 'téléchargements', 'outils', 'documents']
    },
    {
      id: 'industries',
      title: 'Secteurs d\'activité',
      description: 'Nos expertises sectorielles : services financiers, microfinance, fintech, secteur public, PME',
      url: '/industries',
      category: 'Secteurs',
      tags: ['industries', 'secteurs', 'marchés', 'spécialisations']
    }
  ],
  en: [
    {
      id: 'about',
      title: 'About Us',
      description: 'Discover Khepera Experts, consulting firm in governance, finance and compliance in West Africa',
      url: '/about',
      category: 'Company',
      tags: ['firm', 'consulting', 'expertise', 'africa']
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      description: 'Explore our achievements and client successes in corporate governance, finance and compliance',
      url: '/case-studies',
      category: 'References',
      tags: ['achievements', 'success', 'clients', 'projects']
    },
    {
      id: 'decideurs',
      title: 'Decision Makers',
      description: 'Tailored solutions for executives, board members and compliance officers',
      url: '/decideurs',
      category: 'Solutions',
      tags: ['executives', 'leaders', 'decision makers', 'leadership']
    },
    {
      id: 'sfd-conformite',
      title: 'MFI Compliance',
      description: 'Specialized support for Microfinance Institutions in regulatory compliance',
      url: '/sfd-conformite',
      category: 'Compliance',
      tags: ['microfinance', 'mfi', 'bceao', 'waemu']
    },
    {
      id: 'insights',
      title: 'Insights & Analysis',
      description: 'Strategic analysis, sector reports and economic perspectives on Africa',
      url: '/insights',
      category: 'Publications',
      tags: ['analysis', 'reports', 'studies', 'research']
    },
    {
      id: 'blog',
      title: 'Blog & News',
      description: 'Expert articles on governance, finance and digital transformation in Africa',
      url: '/blog',
      category: 'Content',
      tags: ['articles', 'news', 'blog', 'expertise']
    },
    {
      id: 'resources',
      title: 'Resources & Guides',
      description: 'Download our practical guides, checklists and tools to improve your governance',
      url: '/resources',
      category: 'Tools',
      tags: ['guides', 'downloads', 'tools', 'documents']
    },
    {
      id: 'industries',
      title: 'Industries',
      description: 'Our sector expertise: financial services, microfinance, fintech, public sector, SMEs',
      url: '/industries',
      category: 'Sectors',
      tags: ['industries', 'sectors', 'markets', 'specializations']
    }
  ]
};

const toolsPages = {
  fr: [
    {
      id: 'diagnostic-transformation-digitale',
      title: 'Diagnostic Transformation Digitale',
      description: 'Évaluez la maturité digitale de votre organisation et identifiez les axes d\'amélioration',
      url: '/tools/diagnostic-transformation-digitale',
      category: 'Transformation Digitale',
      tags: ['digital', 'transformation', 'diagnostic', 'maturité']
    },
    {
      id: 'audit-inclusion-financiere',
      title: 'Audit Inclusion Financière',
      description: 'Analysez votre stratégie d\'inclusion financière et mesurez votre impact social',
      url: '/tools/audit-inclusion-financiere',
      category: 'Finance Inclusive',
      tags: ['inclusion', 'finance', 'audit', 'impact']
    },
    {
      id: 'evaluation-gouvernance',
      title: 'Évaluation Gouvernance',
      description: 'Évaluez la qualité de votre gouvernance d\'entreprise selon les standards internationaux',
      url: '/tools/evaluation-gouvernance',
      category: 'Gouvernance',
      tags: ['gouvernance', 'évaluation', 'conseil', 'administration']
    },
    {
      id: 'diagnostic-organisationnel',
      title: 'Diagnostic Organisationnel',
      description: 'Analysez l\'efficacité de votre organisation et identifiez les leviers de performance',
      url: '/tools/diagnostic-organisationnel',
      category: 'Organisation',
      tags: ['organisation', 'diagnostic', 'performance', 'efficacité']
    },
    {
      id: 'evaluation-cybersecurite',
      title: 'Évaluation Cybersécurité',
      description: 'Évaluez votre niveau de sécurité informatique et identifiez les risques critiques',
      url: '/tools/evaluation-cybersecurite',
      category: 'Cybersécurité',
      tags: ['cybersécurité', 'sécurité', 'risques', 'protection']
    },
    {
      id: 'evaluation-maturite-fintech',
      title: 'Évaluation Maturité Fintech',
      description: 'Mesurez la maturité de votre écosystème fintech et identifiez les opportunités',
      url: '/tools/evaluation-maturite-fintech',
      category: 'Fintech',
      tags: ['fintech', 'innovation', 'maturité', 'digital']
    },
    {
      id: 'maturite-digitale',
      title: 'Maturité Digitale',
      description: 'Évaluez le niveau de digitalisation de votre entreprise',
      url: '/tools/maturite-digitale',
      category: 'Digital',
      tags: ['digital', 'maturité', 'transformation', 'technologie']
    }
  ],
  en: [
    {
      id: 'diagnostic-transformation-digitale',
      title: 'Digital Transformation Assessment',
      description: 'Assess your organization\'s digital maturity and identify improvement areas',
      url: '/tools/diagnostic-transformation-digitale',
      category: 'Digital Transformation',
      tags: ['digital', 'transformation', 'assessment', 'maturity']
    },
    {
      id: 'audit-inclusion-financiere',
      title: 'Financial Inclusion Audit',
      description: 'Analyze your financial inclusion strategy and measure your social impact',
      url: '/tools/audit-inclusion-financiere',
      category: 'Financial Inclusion',
      tags: ['inclusion', 'finance', 'audit', 'impact']
    },
    {
      id: 'evaluation-gouvernance',
      title: 'Governance Assessment',
      description: 'Evaluate your corporate governance quality according to international standards',
      url: '/tools/evaluation-gouvernance',
      category: 'Governance',
      tags: ['governance', 'assessment', 'board', 'administration']
    },
    {
      id: 'diagnostic-organisationnel',
      title: 'Organizational Diagnostic',
      description: 'Analyze your organization\'s effectiveness and identify performance levers',
      url: '/tools/diagnostic-organisationnel',
      category: 'Organization',
      tags: ['organization', 'diagnostic', 'performance', 'efficiency']
    },
    {
      id: 'evaluation-cybersecurite',
      title: 'Cybersecurity Assessment',
      description: 'Evaluate your IT security level and identify critical risks',
      url: '/tools/evaluation-cybersecurite',
      category: 'Cybersecurity',
      tags: ['cybersecurity', 'security', 'risks', 'protection']
    },
    {
      id: 'evaluation-maturite-fintech',
      title: 'Fintech Maturity Assessment',
      description: 'Measure your fintech ecosystem maturity and identify opportunities',
      url: '/tools/evaluation-maturite-fintech',
      category: 'Fintech',
      tags: ['fintech', 'innovation', 'maturity', 'digital']
    },
    {
      id: 'maturite-digitale',
      title: 'Digital Maturity',
      description: 'Assess your company\'s digitalization level',
      url: '/tools/maturite-digitale',
      category: 'Digital',
      tags: ['digital', 'maturity', 'transformation', 'technology']
    }
  ]
};

const regionsPages = {
  fr: [
    {
      id: 'afrique',
      title: 'Afrique',
      description: 'Conseil stratégique et transformation digitale pour les institutions africaines',
      url: '/regions/afrique',
      category: 'Régions',
      tags: ['afrique', 'continent', 'panafricain', 'régional']
    },
    {
      id: 'afrique-ouest',
      title: 'Afrique de l\'Ouest',
      description: 'Expertise en gouvernance et finance dans la région ouest-africaine',
      url: '/regions/west-africa',
      category: 'Régions',
      tags: ['cedeao', 'ecowas', 'ouest', 'west africa']
    },
    {
      id: 'uemoa-cemac',
      title: 'UEMOA & CEMAC',
      description: 'Accompagnement des institutions dans les zones UEMOA et CEMAC',
      url: '/regions/uemoa-cemac',
      category: 'Régions',
      tags: ['uemoa', 'cemac', 'bceao', 'beac', 'zone franc']
    },
    {
      id: 'afrique-francophone',
      title: 'Afrique Francophone',
      description: 'Solutions adaptées aux pays francophones d\'Afrique',
      url: '/regions/afrique-francophone',
      category: 'Régions',
      tags: ['francophone', 'français', 'oif', 'francophonie']
    }
  ],
  en: [
    {
      id: 'africa',
      title: 'Africa',
      description: 'Strategic consulting and digital transformation for African institutions',
      url: '/regions/africa',
      category: 'Regions',
      tags: ['africa', 'continent', 'pan-african', 'regional']
    },
    {
      id: 'west-africa',
      title: 'West Africa',
      description: 'Governance and finance expertise in the West African region',
      url: '/regions/west-africa',
      category: 'Regions',
      tags: ['ecowas', 'cedeao', 'west', 'western']
    },
    {
      id: 'uemoa-cemac',
      title: 'WAEMU & CEMAC',
      description: 'Support for institutions in WAEMU and CEMAC zones',
      url: '/regions/uemoa-cemac',
      category: 'Regions',
      tags: ['waemu', 'uemoa', 'cemac', 'bceao', 'beac']
    },
    {
      id: 'francophone-africa',
      title: 'Francophone Africa',
      description: 'Solutions tailored to French-speaking African countries',
      url: '/regions/afrique-francophone',
      category: 'Regions',
      tags: ['francophone', 'french', 'oif', 'francophonie']
    }
  ]
};

// Suggestions de recherche populaires
const popularSearches = {
  fr: [
    'gouvernance',
    'conformité',
    'microfinance',
    'transformation digitale',
    'fintech',
    'audit',
    'BCEAO',
    'UEMOA',
    'inclusion financière',
    'cybersécurité'
  ],
  en: [
    'governance',
    'compliance',
    'microfinance',
    'digital transformation',
    'fintech',
    'audit',
    'BCEAO',
    'WAEMU',
    'financial inclusion',
    'cybersecurity'
  ]
};

export const useGlobalSearch = (query: string) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [liveResults, setLiveResults] = useState<SearchResult[]>([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);

  // Debounce de 300ms pour la recherche en temps réel
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Recherche Supabase LIVE en parallèle (RAG documents + kos_search_public)
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      setLiveResults([]);
      return;
    }

    let cancelled = false;
    const searchTerm = debouncedQuery.toLowerCase().trim();

    const fetchLiveResults = async () => {
      setIsSearchingLive(true);
      try {
        const [ragResult, result] = await Promise.allSettled([
          supabase
            .from('rag_documents')
            .select('id, title, description, metadata, chunk_index')
            .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
            .limit(8),
          supabase.rpc('kos_search_public', {
            p_query: searchTerm,
            p_bu: null,
            p_type: null,
            p_limit: 10
          })
        ]);

        if (cancelled) return;

        const mapped: SearchResult[] = [];

        // Résultats RAG documents
        if (ragResult.status === 'fulfilled' && !ragResult.value.error && ragResult.value.data && ragResult.value.data.length > 0) {
          ragResult.value.data.forEach((doc: Record<string, unknown>) => {
            mapped.push({
              id: `rag-${doc.id as string}`,
              type: 'resource' as SearchResultType,
              title: (doc.title as string) || 'Document RAG',
              description: (doc.description as string) || '',
              url: '/resources',
              category: 'Recherche Avancée',
              tags: ['rag', 'intelligence', 'knowledge'],
              relevanceScore: 45,
            });
          });
        }

        // Résultats kos_search_public (full-text sur kos_public_pages)
        if (result.status === 'fulfilled' && !result.value.error && result.value.data && result.value.data.length > 0) {
          result.value.data.forEach((page: Record<string, unknown>) => {
            const pageType = (page.page_type as string) || 'OFFRE';
            const typeMap: Record<string, SearchResultType> = {
              'OFFRE': 'service',
              'METHODOLOGIE': 'resource',
              'KBR': 'resource',
              'PUBLICATION': 'article',
              'BLOG': 'article',
              'OBSERVATOIRE': 'page',
              'RECHERCHE': 'resource',
            };
            const mappedType = typeMap[pageType] || 'page';
            const score = typeof page.relevance_score === 'number' ? page.relevance_score : 0.3;
            const matchedKeywords = Array.isArray(page.matched_keywords) ? page.matched_keywords as string[] : [];

            mapped.push({
              id: `page-${page.slug as string}`,
              type: mappedType,
              title: (page.title as string) || '',
              description: (page.description as string) || '',
              url: (page.url as string) || '/',
              category: `${page.bu} · ${pageType}`,
              tags: matchedKeywords,
              relevanceScore: Math.round(score * 100),
            });
          });
        }

        if (!cancelled) {
          setLiveResults(mapped);
        }
      } catch {
        if (!cancelled) setLiveResults([]);
      } finally {
        if (!cancelled) setIsSearchingLive(false);
      }
    };

    fetchLiveResults();

    return () => { cancelled = true; };
  }, [debouncedQuery]);

  const results = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      return {
        articles: [],
        services: [],
        resources: [],
        pages: [],
        tools: [],
        regions: [],
        total: 0
      };
    }

    const searchTerm = debouncedQuery.toLowerCase().trim();
    const cacheKey = `${currentLang}-${searchTerm}`;

    // Vérifier le cache optimisé
    const cached = getCachedSearch(cacheKey);
    if (cached) {
      return cached;
    }

    const allResults: SearchResult[] = [];

    // Fonction de calcul de pertinence améliorée
    const calculateRelevance = (
      title: string,
      description: string,
      tags: string[] = [],
      category: string = ''
    ): number => {
      let score = 0;
      const titleLower = title.toLowerCase();
      const descLower = description.toLowerCase();
      const categoryLower = category.toLowerCase();

      // Correspondance exacte dans le titre (score le plus élevé)
      if (titleLower === searchTerm) {
        score += 100;
      } else if (titleLower.includes(searchTerm)) {
        // Bonus si le terme est au début du titre
        if (titleLower.startsWith(searchTerm)) {
          score += 70;
        } else {
          score += 50;
        }
      }

      // Correspondance dans les mots du titre
      const titleWords = titleLower.split(/\s+/);
      const searchWords = searchTerm.split(/\s+/);
      
      searchWords.forEach(searchWord => {
        titleWords.forEach(titleWord => {
          if (titleWord === searchWord) {
            score += 25;
          } else if (titleWord.includes(searchWord)) {
            score += 15;
          }
        });
      });

      // Correspondance dans la description
      if (descLower.includes(searchTerm)) {
        score += 10;
      }

      // Correspondance dans la catégorie
      if (categoryLower.includes(searchTerm)) {
        score += 15;
      }

      // Correspondance dans les tags
      tags.forEach(tag => {
        const tagLower = tag.toLowerCase();
        if (tagLower === searchTerm) {
          score += 20;
        } else if (tagLower.includes(searchTerm)) {
          score += 12;
        }
      });

      return score;
    };

    // Indexer les articles de blog
    const articles = currentLang === 'en' ? blogArticlesEn : blogArticles;
    articles.forEach(article => {
      const relevance = calculateRelevance(
        article.title,
        article.excerpt,
        article.tags,
        article.category
      );

      if (relevance > 0) {
        allResults.push({
          id: `article-${article.id}`,
          type: 'article',
          title: article.title,
          description: article.excerpt,
          url: `/blog/${article.slug}`,
          category: article.category,
          tags: article.tags,
          relevanceScore: relevance,
          thumbnail: article.image
        });
      }
    });

    // Indexer les services
    Object.entries(serviceDetails).forEach(([slug, service]) => {
      const serviceData = currentLang === 'en' ? service.en : service.fr;
      const relevance = calculateRelevance(
        serviceData.title,
        serviceData.description,
        [],
        serviceData.category || ''
      );

      if (relevance > 0) {
        allResults.push({
          id: `service-${slug}`,
          type: 'service',
          title: serviceData.title,
          description: serviceData.description,
          url: `/services/${slug}`,
          category: serviceData.category,
          relevanceScore: relevance
        });
      }
    });

    // Indexer les ressources
    const resourcesList = currentLang === 'en' ? resourcesEn : resources;
    resourcesList.forEach(resource => {
      const relevance = calculateRelevance(
        resource.title,
        resource.description,
        [],
        resource.category
      );

      if (relevance > 0) {
        allResults.push({
          id: `resource-${resource.id}`,
          type: 'resource',
          title: resource.title,
          description: resource.description,
          url: '/resources',
          category: resource.category,
          relevanceScore: relevance
        });
      }
    });

    // Indexer les pages statiques
    const pages = currentLang === 'en' ? staticPages.en : staticPages.fr;
    pages.forEach(page => {
      const relevance = calculateRelevance(
        page.title,
        page.description,
        page.tags || [],
        page.category
      );

      if (relevance > 0) {
        allResults.push({
          id: `page-${page.id}`,
          type: 'page',
          title: page.title,
          description: page.description,
          url: page.url,
          category: page.category,
          relevanceScore: relevance
        });
      }
    });

    // Indexer les outils
    const tools = currentLang === 'en' ? toolsPages.en : toolsPages.fr;
    tools.forEach(tool => {
      const relevance = calculateRelevance(
        tool.title,
        tool.description,
        tool.tags || [],
        tool.category
      );

      if (relevance > 0) {
        allResults.push({
          id: `tool-${tool.id}`,
          type: 'tool',
          title: tool.title,
          description: tool.description,
          url: tool.url,
          category: tool.category,
          relevanceScore: relevance
        });
      }
    });

    // Indexer les régions
    const regions = currentLang === 'en' ? regionsPages.en : regionsPages.fr;
    regions.forEach(region => {
      const relevance = calculateRelevance(
        region.title,
        region.description,
        region.tags || [],
        region.category
      );

      if (relevance > 0) {
        allResults.push({
          id: `region-${region.id}`,
          type: 'region',
          title: region.title,
          description: region.description,
          url: region.url,
          category: region.category,
          relevanceScore: relevance
        });
      }
    });

    // Trier par pertinence décroissante
    allResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Grouper par type
    const grouped: GroupedResults = {
      articles: allResults.filter(r => r.type === 'article'),
      services: allResults.filter(r => r.type === 'service'),
      resources: allResults.filter(r => r.type === 'resource'),
      pages: allResults.filter(r => r.type === 'page'),
      tools: allResults.filter(r => r.type === 'tool'),
      regions: allResults.filter(r => r.type === 'region')
    };

    const finalResults = {
      ...grouped,
      total: allResults.length
    };

    // Fusionner avec les résultats Supabase LIVE (dédupliqués, toutes catégories)
    if (liveResults.length > 0) {
      const existingTitles = new Set([
        ...finalResults.articles.map(r => r.title.toLowerCase()),
        ...finalResults.services.map(r => r.title.toLowerCase()),
        ...finalResults.resources.map(r => r.title.toLowerCase()),
        ...finalResults.pages.map(r => r.title.toLowerCase()),
      ]);
      const newLiveResults = liveResults.filter(r => !existingTitles.has(r.title.toLowerCase()));
      for (const lr of newLiveResults) {
        const key = `${lr.type}s` as keyof GroupedResults;
        if (key === 'articles') finalResults.articles.push(lr);
        else if (key === 'services') finalResults.services.push(lr);
        else if (key === 'resources') finalResults.resources.push(lr);
        else if (key === 'pages') finalResults.pages.push(lr);
        else finalResults.resources.push(lr);
      }
      finalResults.total += newLiveResults.length;
    }

    // Mettre en cache avec le système optimisé
    setCachedSearch(cacheKey, finalResults);

    // Ajouter à l'historique si des résultats sont trouvés
    if (finalResults.total > 0) {
      addToSearchHistory(debouncedQuery);
    }

    return finalResults;
  }, [debouncedQuery, currentLang, liveResults]);

  return { results, isSearchingLive, liveResultsCount: liveResults.length };
};

// Fonction pour ajouter une recherche à l'historique
function addToSearchHistory(query: string) {
  try {
    const history = getSearchHistory();
    const newHistory = [query, ...history.filter(q => q !== query)].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Error saving search history:', error);
  }
}

// Fonction pour récupérer l'historique de recherche
export function getSearchHistory(): string[] {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading search history:', error);
    return [];
  }
}

// Fonction pour effacer l'historique de recherche
export function clearSearchHistory() {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
}

// Fonction pour obtenir les suggestions populaires
export function getPopularSearches(lang: string = 'fr'): string[] {
  return lang === 'en' ? popularSearches.en : popularSearches.fr;
}




import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LinkedInPost {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  date: string;
  category: string;
}

export const LinkedInFeed = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  // Fixed generic type syntax (removed HTML entities)
  const [posts, setPosts] = useState<LinkedInPost[]>([]);

  useEffect(() => {
    // Simuler un flux LinkedIn avec les derniers articles du blog
    const recentPosts: LinkedInPost[] = [
      {
        id: '1',
        title: isEn
          ? 'Digital Transformation of Financial Institutions in West Africa'
          : "Transformation digitale des institutions financières en Afrique de l'Ouest",
        excerpt: isEn
          ? 'How fintech is revolutionizing financial inclusion in the WAEMU zone...'
          : "Comment la fintech révolutionne l'inclusion financière dans l'espace UEMOA...",
        url: '/blog/transformation-digitale-institutions-financieres',
        date: isEn ? '2 days ago' : 'Il y a 2 jours',
        category: isEn ? 'Fintech' : 'Fintech',
      },
      {
        id: '2',
        title: isEn
          ? 'BCEAO Compliance: New Requirements for DFS in 2025'
          : 'Conformité BCEAO : nouvelles exigences pour les SFD en 2025',
        excerpt: isEn
          ? 'Analysis of new regulatory requirements and their impact on microfinance institutions...'
          : "Analyse des nouvelles exigences réglementaires et leur impact sur les institutions de microfinance...",
        url: '/blog/conformite-bceao-2025',
        date: isEn ? '5 days ago' : 'Il y a 5 jours',
        category: isEn ? 'Regulation' : 'Régulation',
      },
      {
        id: '3',
        title: isEn
          ? 'Corporate Governance: Best Practices for African SMEs'
          : "Gouvernance d'entreprise : bonnes pratiques pour les PME africaines",
        excerpt: isEn
          ? 'How to structure an effective board of directors and improve strategic decision-making...'
          : "Comment structurer un conseil d'administration efficace et améliorer la prise de décision stratégique...",
        url: '/blog/gouvernance-pme-africaines',
        date: isEn ? '1 week ago' : 'Il y a 1 semaine',
        category: isEn ? 'Governance' : 'Gouvernance',
      },
    ];

    // Add basic error handling – if data generation fails, keep previous state
    try {
      setPosts(recentPosts);
    } catch (error) {
      console.error('Failed to set LinkedIn posts:', error);
    }
  }, [isEn]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <i className="ri-linkedin-fill text-[#0A66C2]"></i>
          </div>
          {isEn ? 'Latest on LinkedIn' : 'Dernières actualités LinkedIn'}
        </h3>
        <a
          href="https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#0A66C2] hover:text-[#004182] font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap"
        >
          <span>{isEn ? 'Follow us' : 'Nous suivre'}</span>
          <i className="ri-arrow-right-line"></i>
        </a>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="pb-4 border-b border-gray-100 last:border-0 last:pb-0 group"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#0A66C2]/10 rounded-lg">
                <i className="ri-article-line text-[#0A66C2]"></i>
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded mb-2">
                  {post.category}
                </span>
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-[#0A66C2] transition-colors">
                  <a href={post.url} className="cursor-pointer">
                    {post.title}
                  </a>
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <a
                    href={post.url}
                    className="text-xs text-[#0A66C2] hover:text-[#004182] font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  >
                    <span>{isEn ? 'Read more' : 'Lire la suite'}</span>
                    <i className="ri-arrow-right-s-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <a
          href="https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-linkedin-fill"></i>
          </div>
          <span>{isEn ? 'Follow KHEPRA EXPERTS on LinkedIn' : 'Suivre KHEPRA EXPERTS sur LinkedIn'}</span>
        </a>
      </div>
    </div>
  );
};

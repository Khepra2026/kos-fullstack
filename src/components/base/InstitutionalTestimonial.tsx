interface InstitutionalTestimonialProps {
  quote: string;
  author: {
    name: string;
    title: string;
    organization: string;
    photo?: string;
  };
  logo?: string;
  variant?: 'default' | 'featured' | 'minimal';
  className?: string;
}

export function InstitutionalTestimonial({
  quote,
  author,
  logo,
  variant = 'default',
  className = ''
}: InstitutionalTestimonialProps) {
  const variants = {
    default: {
      container: 'bg-white border border-gold-100',
      quote: 'text-navy-700',
      author: 'text-navy-900',
      title: 'text-navy-600'
    },
    featured: {
      container: 'bg-gradient-to-br from-gold-50 to-brown-50 border border-gold-200',
      quote: 'text-brown-800',
      author: 'text-brown-900',
      title: 'text-brown-700'
    },
    minimal: {
      container: 'bg-transparent border-l-4 border-gold-500 pl-6',
      quote: 'text-navy-700',
      author: 'text-navy-900',
      title: 'text-navy-600'
    }
  };

  const style = variants[variant];

  return (
    <div className={`rounded-xl p-8 transition-all duration-300 hover:shadow-card-hover ${style.container} ${className}`}>
      {/* Logo de l'organisation */}
      {logo && variant !== 'minimal' && (
        <div className="mb-6">
          <img
            src={logo}
            alt={author.organization}
            className="h-10 object-contain opacity-60"
            loading="lazy"
          />
        </div>
      )}

      {/* Icône de citation */}
      <div className="mb-4">
        <i className="ri-double-quotes-l text-4xl text-gold-400 opacity-50" aria-hidden="true"></i>
      </div>

      {/* Citation */}
      <blockquote className={`text-lg leading-relaxed mb-6 font-body ${style.quote}`}>
        {quote}
      </blockquote>

      {/* Auteur */}
      <div className="flex items-center gap-4">
        {author.photo && (
          <img
            src={author.photo}
            alt={author.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-gold-200"
            loading="lazy"
          />
        )}
        <div>
          <div className={`font-semibold ${style.author}`}>
            {author.name}
          </div>
          <div className={`text-sm ${style.title}`}>
            {author.title}
          </div>
          <div className={`text-sm font-medium ${style.title}`}>
            {author.organization}
          </div>
        </div>
      </div>

      {/* Badge de vérification */}
      <div className="mt-6 pt-6 border-t border-gold-100 flex items-center gap-2 text-sm text-navy-600">
        <i className="ri-verified-badge-line text-gold-600" aria-hidden="true"></i>
        <span>Témoignage vérifié</span>
      </div>
    </div>
  );
}
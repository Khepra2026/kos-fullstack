interface ExecutiveProfileProps {
  name: string;
  title: string;
  bio: string;
  photo: string;
  expertise: string[];
  linkedin?: string;
  email?: string;
  publications?: number;
  variant?: 'card' | 'detailed';
  className?: string;
}

export function ExecutiveProfile({
  name,
  title,
  bio,
  photo,
  expertise,
  linkedin,
  email,
  publications,
  variant = 'card',
  className = ''
}: ExecutiveProfileProps) {
  if (variant === 'detailed') {
    return (
      <div className={`bg-white rounded-xl border border-gold-100 overflow-hidden ${className}`}>
        <div className="grid md:grid-cols-3 gap-8 p-8">
          {/* Photo et informations principales */}
          <div className="md:col-span-1 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={photo}
                alt={name}
                className="w-48 h-48 rounded-xl object-cover border-4 border-gold-100"
                loading="lazy"
              />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-brown-600 to-gold-600 rounded-lg flex items-center justify-center shadow-lg">
                <i className="ri-user-star-line text-white text-xl" aria-hidden="true"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-1">{name}</h3>
            <p className="text-gold-600 font-semibold mb-4">{title}</p>
            
            {/* Actions */}
            <div className="flex flex-col gap-2">
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors text-sm font-medium"
                >
                  <i className="ri-linkedin-fill" aria-hidden="true"></i>
                  LinkedIn
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-gold-500 text-gold-600 rounded-lg hover:bg-gold-50 transition-colors text-sm font-medium"
                >
                  <i className="ri-mail-line" aria-hidden="true"></i>
                  Contact
                </a>
              )}
            </div>

            {publications && (
              <div className="mt-6 pt-6 border-t border-gold-100">
                <div className="text-3xl font-bold text-navy-900">{publications}</div>
                <div className="text-sm text-navy-600">Publications</div>
              </div>
            )}
          </div>

          {/* Biographie et expertise */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-navy-900 mb-3 flex items-center gap-2">
                <i className="ri-user-line text-gold-600" aria-hidden="true"></i>
                Biographie
              </h4>
              <p className="text-navy-700 leading-relaxed">{bio}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-navy-900 mb-3 flex items-center gap-2">
                <i className="ri-star-line text-gold-600" aria-hidden="true"></i>
                Domaines d'expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {expertise.map((item, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-gold-50 to-brown-50 border border-gold-200 rounded-lg text-sm font-medium text-brown-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant 'card'
  return (
    <div className={`group bg-white rounded-xl border border-gold-100 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${className}`}>
      {/* Photo */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent"></div>
        
        {/* Badge publications */}
        {publications && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <div className="text-lg font-bold text-navy-900">{publications}</div>
            <div className="text-xs text-navy-600">Publications</div>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-navy-900 mb-1">{name}</h3>
        <p className="text-gold-600 font-semibold mb-3">{title}</p>
        <p className="text-sm text-navy-700 leading-relaxed mb-4 line-clamp-3">{bio}</p>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {expertise.slice(0, 3).map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-brown-800"
            >
              {item}
            </span>
          ))}
          {expertise.length > 3 && (
            <span className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600">
              +{expertise.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors text-sm font-medium"
            >
              <i className="ri-linkedin-fill" aria-hidden="true"></i>
              LinkedIn
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-gold-500 text-gold-600 rounded-lg hover:bg-gold-50 transition-colors text-sm font-medium"
            >
              <i className="ri-mail-line" aria-hidden="true"></i>
              Contact
            </a>
          )}
        </div>
      </div>
    </div>
  );
}




import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import OptimizedHeroImage from '@/components/base/OptimizedHeroImage';
import { HERO_IMAGES } from '@/utils/heroImages';

import OptimizedHeroImage from '@/components/base/OptimizedHeroImage';

// ─── Testimonial photo component with fallback ───────────────────────────────
function TestimonialPhoto({ imageKey, name }: { imageKey: keyof typeof HERO_IMAGES; name: string }) {
  return (
    <OptimizedHeroImage
      imageKey={imageKey}
      className="w-full h-full"
      aspectRatio="1/1"
      objectFit="cover"
      loading="lazy"
      placeholder="pulse"
    />
  );
}

const TESTIMONIALS = [
  {
    nameFr: 'Directrice Générale',
    nameEn: 'Chief Executive Officer',
    positionFr: 'Directrice Générale',
    positionEn: 'CEO',
    organizationFr: 'Institution de Microfinance, Bénin',
    organizationEn: 'Microfinance Institution, Benin',
    quoteFr: 'KHEPRA EXPERTS nous a accompagnés dans notre mise en conformité BCEAO. Leur expertise technique et leur connaissance du terrain ont été déterminantes pour l\'obtention de notre agrément. Une équipe professionnelle et réactive.',
    quoteEn: 'KHEPRA EXPERTS supported us in our BCEAO compliance. Their technical expertise and field knowledge were decisive in obtaining our license. A professional and responsive team.',
    imageKey: 'testimonial-amina' as keyof typeof HERO_IMAGES,
    rating: 5,
  },
  {
    nameFr: 'Directeur Général',
    nameEn: 'Managing Director',
    positionFr: 'Directeur Général',
    positionEn: 'Managing Director',
    organizationFr: 'Startup AgriTech, Ghana',
    organizationEn: 'AgriTech Startup, Ghana',
    quoteFr: 'Grâce à l\'accompagnement de KHEPRA EXPERTS, nous avons structuré notre entreprise et renforcé notre gouvernance. Leur approche pragmatique a fait toute la différence dans notre développement stratégique.',
    quoteEn: 'Thanks to KHEPRA EXPERTS\' support, we structured our business and strengthened our governance. Their pragmatic approach made all the difference in our strategic development.',
    imageKey: 'testimonial-kofi' as keyof typeof HERO_IMAGES,
    rating: 5,
  },
  {
    nameFr: 'Directrice Financière',
    nameEn: 'Chief Financial Officer',
    positionFr: 'Directrice Financière',
    positionEn: 'CFO',
    organizationFr: 'Groupe Industriel, Côte d\'Ivoire',
    organizationEn: 'Industrial Group, Ivory Coast',
    quoteFr: 'L\'audit financier réalisé par KHEPRA EXPERTS a révélé des opportunités d\'optimisation significatives. Leur rigueur et leur professionnalisme sont exemplaires et ont permis une amélioration substantielle de notre performance.',
    quoteEn: 'The financial audit conducted by KHEPRA EXPERTS revealed significant optimization opportunities. Their rigor and professionalism are exemplary and led to a substantial improvement in our performance.',
    imageKey: 'testimonial-marie' as keyof typeof HERO_IMAGES,
    rating: 5,
  },
  {
    nameFr: 'Directeur Général',
    nameEn: 'General Manager',
    positionFr: 'Directeur Général',
    positionEn: 'General Manager',
    organizationFr: 'PME Transport & Logistique, Afrique de l\'Ouest',
    organizationEn: 'SME Transport & Logistics, West Africa',
    quoteFr: 'KHEPRA EXPERTS a transformé notre gouvernance d\'entreprise. Leurs recommandations stratégiques nous ont permis de structurer notre croissance et d\'attirer de nouveaux partenaires institutionnels.',
    quoteEn: 'KHEPRA EXPERTS transformed our corporate governance. Their strategic recommendations enabled us to structure our growth and attract new institutional partners.',
    imageKey: 'testimonial-ibrahim' as keyof typeof HERO_IMAGES,
    rating: 5,
  },
  {
    nameFr: 'Présidente',
    nameEn: 'President',
    positionFr: 'Présidente',
    positionEn: 'President',
    organizationFr: 'Réseau d\'Entrepreneurs, Sénégal',
    organizationEn: 'Entrepreneurs Network, Senegal',
    quoteFr: 'L\'accompagnement de KHEPRA EXPERTS a permis à plusieurs de nos membres de lancer et structurer leur activité avec succès. Leur expertise sectorielle et leur démarche personnalisée sont remarquables.',
    quoteEn: 'KHEPRA EXPERTS\' support enabled several of our members to successfully launch and structure their businesses. Their sector expertise and personalized approach are remarkable.',
    imageKey: 'testimonial-fatou' as keyof typeof HERO_IMAGES,
    rating: 5,
  },
  {
    nameFr: 'Directeur Exécutif',
    nameEn: 'Executive Director',
    positionFr: 'Directeur Exécutif',
    positionEn: 'Executive Director',
    organizationFr: 'ONG Développement, Afrique de l\'Ouest',
    organizationEn: 'Development NGO, West Africa',
    quoteFr: 'L\'évaluation menée par KHEPRA EXPERTS a démontré des résultats probants sur notre programme. Leur méthodologie rigoureuse nous a permis de renforcer notre crédibilité auprès des bailleurs de fonds.',
    quoteEn: 'The evaluation conducted by KHEPRA EXPERTS demonstrated compelling results for our program. Their rigorous methodology enabled us to strengthen our credibility with funders.',
    imageKey: 'testimonial-kwame' as keyof typeof HERO_IMAGES,
    rating: 5,
  },
];

export const TestimonialCarousel = memo(function TestimonialCarousel() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      setShowVideo(false);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setShowVideo(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setIsAutoPlaying(false);
    setShowVideo(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    setIsAutoPlaying(false);
    setShowVideo(false);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-gold-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-label">
            {isEn ? 'Client Testimonials' : 'Témoignages Clients'}
          </span>
          <h2 className="section-title">
            {isEn ? <>What Our <span className="accent">Clients Say</span></> : <>Ce que disent <span className="accent">nos clients</span></>}
          </h2>
          <div className="section-divider">
            <span className="section-divider-dot"></span>
          </div>
          <p className="section-subtitle">
            {isEn
              ? 'Discover the experiences of leaders who have trusted KHEPRA EXPERTS for their strategic projects.'
              : 'Découvrez les expériences de dirigeants qui ont fait confiance à KHEPRA EXPERTS pour leurs projets stratégiques.'}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-100">
            
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center opacity-20">
              <i className="ri-double-quotes-l text-4xl text-gold-600"></i>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-2xl text-gold-500"></i>
                ))}
              </div>

              {/* Video or Quote */}
              {showVideo && currentTestimonial.videoUrl ? (
                <div className="mb-8">
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={currentTestimonial.videoUrl}
                      title={`Témoignage vidéo de ${isEn ? currentTestimonial.nameEn : currentTestimonial.nameFr}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <button
                    onClick={() => setShowVideo(false)}
                    className="mt-4 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <i className="ri-text"></i>
                    {isEn ? 'Show text testimonial' : 'Afficher le témoignage texte'}
                  </button>
                </div>
              ) : (
                <>
                  {/* Quote */}
                  <blockquote className="text-xl sm:text-2xl text-gray-700 leading-relaxed text-center mb-8 font-light italic">
                    "{isEn ? currentTestimonial.quoteEn : currentTestimonial.quoteFr}"
                  </blockquote>

                  {/* Video Button */}
                  {currentTestimonial.videoUrl && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="mx-auto mb-6 flex items-center gap-2 px-4 py-2 bg-gold-100 hover:bg-gold-200 text-gold-700 rounded-full transition-colors cursor-pointer"
                    >
                      <i className="ri-play-circle-line text-xl"></i>
                      <span className="text-sm font-medium">
                        {isEn ? 'Watch video testimonial' : 'Voir le témoignage vidéo'}
                      </span>
                    </button>
                  )}
                </>
              )}

              {/* Author */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-gold-100 shadow-lg">
                  <TestimonialPhoto
                    imageKey={currentTestimonial.imageKey}
                    name={isEn ? currentTestimonial.nameEn : currentTestimonial.nameFr}
                  />
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-gray-900">
                    {isEn ? currentTestimonial.nameEn : currentTestimonial.nameFr}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isEn ? currentTestimonial.positionEn : currentTestimonial.positionFr}
                  </div>
                  <div className="text-sm text-gold-700 font-medium mt-1">
                    {isEn ? currentTestimonial.organizationEn : currentTestimonial.organizationFr}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gold-50 hover:text-gold-700 transition-all cursor-pointer border border-gray-200"
            aria-label={isEn ? 'Previous testimonial' : 'Témoignage précédent'}
          >
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gold-50 hover:text-gold-700 transition-all cursor-pointer border border-gray-200"
            aria-label={isEn ? 'Next testimonial' : 'Témoignage suivant'}
          >
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all cursor-pointer ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-gold-600 rounded-full'
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                }`}
                aria-label={`${isEn ? 'Go to testimonial' : 'Aller au témoignage'} ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-600 mb-2">4.9/5</div>
            <div className="text-sm text-gray-600">{isEn ? 'Average Rating' : 'Note moyenne'}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-600 mb-2">87+</div>
            <div className="text-sm text-gray-600">{isEn ? 'Client Reviews' : 'Avis clients'}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-600 mb-2">98%</div>
            <div className="text-sm text-gray-600">{isEn ? 'Satisfaction Rate' : 'Taux de satisfaction'}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-600 mb-2">92%</div>
            <div className="text-sm text-gray-600">{isEn ? 'Recommend Us' : 'Nous recommandent'}</div>
          </div>
        </div>
      </div>
    </section>
  );
});




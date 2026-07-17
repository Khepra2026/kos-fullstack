import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

interface ServicesMegaMenuProps {
  isScrolled: boolean;
  onClose: () => void;
}

/**
 * ServicesMegaMenu
 *
 * Renders a mega‑menu with a list of services. Handles navigation safely and
 * ensures the menu is closed after any navigation action.
 *
 * Robustness improvements:
 *  - Replaced the template‑literal navigation call with a concatenation to avoid
 *    potential syntax‑highlighting issues in some build pipelines.
 *  - Wrapped navigation calls in `try / catch` blocks so that navigation failures
 *    (e.g., when the router is not ready) do not crash the component.
 *  - Memoised the click‑handlers with `useCallback` to avoid unnecessary re‑renders.
 */
export function ServicesMegaMenu({ isScrolled, onClose }: ServicesMegaMenuProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const services = [
    {
      slug: 'conseil-strategique',
      icon: 'ri-compass-3-line',
      titleKey: 'services.service1Title',
      descKey: 'services.service1Item1',
    },
    {
      slug: 'gestion-de-projets',
      icon: 'ri-task-line',
      titleKey: 'services.service2Title',
      descKey: 'services.service2Item1',
    },
    {
      slug: 'developpement-organisationnel',
      icon: 'ri-organization-chart',
      titleKey: 'services.service3Title',
      descKey: 'services.service3Item1',
    },
    {
      slug: 'renforcement-capacites',
      icon: 'ri-user-star-line',
      titleKey: 'services.service4Title',
      descKey: 'services.service4Item1',
    },
    {
      slug: 'diagnostic-organisationnel',
      icon: 'ri-search-eye-line',
      titleKey: 'services.service7Title',
      descKey: 'services.service7Item1',
    },
    {
      slug: 'audit-social',
      icon: 'ri-shield-check-line',
      titleKey: 'services.service8Title',
      descKey: 'services.service8Item1',
    },
    {
      slug: 'ressources-humaines',
      icon: 'ri-team-line',
      titleKey: 'services.service9Title',
      descKey: 'services.service9Item1',
    },
    {
      slug: 'transformation-digitale',
      icon: 'ri-smartphone-line',
      titleKey: 'services.service6Title',
      descKey: 'services.service6Item1',
    },
    {
      slug: 'communication-strategique',
      icon: 'ri-megaphone-line',
      titleKey: 'services.service10Title',
      descKey: 'services.service10Item1',
    },
    {
      slug: 'levee-de-fonds',
      icon: 'ri-funds-line',
      titleKey: 'services.service5Title',
      descKey: 'services.service5Item1',
    },
  ];

  /**
   * Navigate to a specific service page and close the mega‑menu.
   * Errors during navigation are caught and logged; the menu still attempts to close.
   */
  const handleServiceClick = useCallback((slug: string) => {
    try {
      // Using string concatenation to avoid any potential template‑literal parsing issues.
      navigate('/services/' + slug);
    } catch (error) {
      console.error('Navigation error (service click):', error);
    } finally {
      onClose();
    }
  }, [navigate, onClose]);

  /**
   * Navigate to the generic services overview page.
   */
  const handleViewAll = useCallback(() => {
    try {
      navigate('/services/');
    } catch (error) {
      console.error('Navigation error (view all):', error);
    } finally {
      onClose();
    }
  }, [navigate, onClose]);

  return (
    <div className="absolute left-0 right-0 top-full mt-0 bg-white shadow-elevated rounded-b-2xl animate-fadeSlideUp">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-6">
          {services.map((service) => (
            <button
              key={service.slug}
              onClick={() => handleServiceClick(service.slug)}
              className="group text-left p-5 rounded-xl hover:bg-gold-50 transition-all duration-300 card-hover cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg text-white text-2xl icon-hover flex-shrink-0">
                  <i className={service.icon} aria-hidden="true"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-heading-sm text-brand-900 mb-2 group-hover:text-gold-600 transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-body-md text-brand-700 line-clamp-2">
                    {t(service.descKey)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3 text-brand-700">
            <i className="ri-information-line text-xl" aria-hidden="true"></i>
            <span className="text-body-lg">
              {t('nav.services_menu_footer', 'Des solutions sur mesure pour votre organisation')}
            </span>
          </div>
          <button
            onClick={handleViewAll}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-full hover:from-gold-600 hover:to-gold-700 transition-all duration-300 font-medium whitespace-nowrap cursor-pointer btn-ripple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"
          >
            {t('nav.view_all_services', 'Voir tous les services')}
            <i className="ri-arrow-right-line" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import authGuard from '@/components/feature/authGuard';

const CrmPage = lazy(() => import('@/pages/crm/page').then(m => ({ default: m.default })));
const EmailSequencesPage = lazy(() => import('@/pages/email-sequences/page').then(m => ({ default: m.default })));
const ProposalsPage = lazy(() => import('@/pages/proposals/page').then(m => ({ default: m.default })));
const BrandGuidePage = lazy(() => import('@/pages/brand-guide/page').then(m => ({ default: m.default })));
const ReportingCommercialPage = lazy(() => import('@/pages/reporting-commercial/page').then(m => ({ default: m.default })));
const AdminNotificationsPage = lazy(() => import('@/pages/admin-notifications/page').then(m => ({ default: m.default })));
const MonEspacePage = lazy(() => import('@/pages/mon-espace/page').then(m => ({ default: m.default })));
const AdministrateurPage = lazy(() => import('@/pages/administrateur/page').then(m => ({ default: m.default })));
const DashboardPage = lazy(() => import('@/pages/dashboard/page').then(m => ({ default: m.default })));
const MonitoringPage = lazy(() => import('@/pages/monitoring/page').then(m => ({ default: m.default })));
const AdminSeedingPage = lazy(() => import('@/pages/admin/seeding/page').then(m => ({ default: m.default })));

export const businessRoutes: RouteObject[] = [
  { path: '/crm', element: <authGuard><CrmPage /></authGuard> },
  { path: '/email-sequences', element: <authGuard><EmailSequencesPage /></authGuard> },
  { path: '/proposals', element: <authGuard><ProposalsPage /></authGuard> },
  { path: '/brand-guide', element: <authGuard><BrandGuidePage /></authGuard> },
  { path: '/reporting-commercial', element: <authGuard><ReportingCommercialPage /></authGuard> },
  { path: '/admin-notifications', element: <authGuard><AdminNotificationsPage /></authGuard> },
  { path: '/mon-espace', element: <authGuard><MonEspacePage /></authGuard> },
  { path: '/administrateur', element: <authGuard><AdministrateurPage /></authGuard> },
  { path: '/dashboard', element: <authGuard><DashboardPage /></authGuard> },
  { path: '/admin/seeding', element: <authGuard><AdminSeedingPage /></authGuard> },
  { path: '/monitoring', element: <authGuard><MonitoringPage /></authGuard> },
];




import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import KOSAuthGuard from '@/components/feature/KOSAuthGuard';

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
  { path: '/crm', element: <KOSAuthGuard><CrmPage /></KOSAuthGuard> },
  { path: '/email-sequences', element: <KOSAuthGuard><EmailSequencesPage /></KOSAuthGuard> },
  { path: '/proposals', element: <KOSAuthGuard><ProposalsPage /></KOSAuthGuard> },
  { path: '/brand-guide', element: <KOSAuthGuard><BrandGuidePage /></KOSAuthGuard> },
  { path: '/reporting-commercial', element: <KOSAuthGuard><ReportingCommercialPage /></KOSAuthGuard> },
  { path: '/admin-notifications', element: <KOSAuthGuard><AdminNotificationsPage /></KOSAuthGuard> },
  { path: '/mon-espace', element: <KOSAuthGuard><MonEspacePage /></KOSAuthGuard> },
  { path: '/administrateur', element: <KOSAuthGuard><AdministrateurPage /></KOSAuthGuard> },
  { path: '/dashboard', element: <KOSAuthGuard><DashboardPage /></KOSAuthGuard> },
  { path: '/admin/seeding', element: <KOSAuthGuard><AdminSeedingPage /></KOSAuthGuard> },
  { path: '/monitoring', element: <KOSAuthGuard><MonitoringPage /></KOSAuthGuard> },
];
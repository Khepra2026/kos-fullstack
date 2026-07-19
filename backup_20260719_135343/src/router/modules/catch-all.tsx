import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const ServiceDetailPage = lazy(() => import('@/pages/services/detail/page').then(m => ({ default: m.default })));
const ArticleDetailPage = lazy(() => import('@/pages/blog/ArticleDetail').then(m => ({ default: m.default })));
const NotFoundPage = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.default })));

export const catchAllRoutes: RouteObject[] = [
  // Anciennes URLs de service — wildcard en dernier
  { path: '/services/:slug', element: <ServiceDetailPage /> },
  // Blog catch-all — après toutes les routes spécifiques
  { path: '/blog/:slug', element: <ArticleDetailPage /> },
  // 404 — toujours en dernier
  { path: '*', element: <NotFoundPage /> },
];




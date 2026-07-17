import { RouteObject } from 'react-router-dom';
import { publicRoutes } from './modules/public';
import { servicesRoutes } from './modules/services';
import { blogRoutes } from './modules/blog';
import { kosRoutes } from './modules/kos';
import { toolsRoutes } from './modules/tools';
import { landingRoutes } from './modules/landing';
import { businessRoutes } from './modules/business';
import { catchAllRoutes } from './modules/catch-all';

const routes: RouteObject[] = [
  ...publicRoutes,
  ...servicesRoutes,
  ...blogRoutes,
  ...kosRoutes,
  ...toolsRoutes,
  ...landingRoutes,
  ...businessRoutes,
  ...catchAllRoutes,
];

export default routes;
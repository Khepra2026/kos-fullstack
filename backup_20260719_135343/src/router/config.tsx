import { RouteObject } from 'react-router-dom';
import { publicRoutes } from '';
import { servicesRoutes } from '';
import { blogRoutes } from '';
import { routes } from '';
import { toolsRoutes } from '';
import { landingRoutes } from '';
import { businessRoutes } from '';
import { catchAllRoutes } from '';

const routes: RouteObject[] = [
  ...publicRoutes,
  ...servicesRoutes,
  ...blogRoutes,
  ...routes,
  ...toolsRoutes,
  ...landingRoutes,
  ...businessRoutes,
  ...catchAllRoutes,
];

export default routes;




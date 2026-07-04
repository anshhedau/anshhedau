import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { getProjects } from './lib/content';

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Index },
      {
        path: 'projects/:projectId',
        lazy: () => import('./pages/ProjectDetail').then((m) => ({ Component: m.default })),
        entry: 'src/pages/ProjectDetail.tsx',
        getStaticPaths() {
          return getProjects().map((p) => `/projects/${p.id}`);
        },
      },
      {
        path: 'file',
        lazy: () => import('./pages/FileOpener').then((m) => ({ Component: m.default })),
        entry: 'src/pages/FileOpener.tsx',
      },
      { path: '*', Component: NotFound },
    ],
  },
];
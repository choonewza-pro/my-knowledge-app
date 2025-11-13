import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const MapPage = lazy(() => import('../pages/MapPage'));
const GitCommandsPage = lazy(() => import('../pages/knowledge/GitCommandsPage'));
const GitNamingGuidePage = lazy(() => import('../pages/knowledge/GitNamingGuidePage'));
const GitNamingSummaryPage = lazy(() => import('../pages/knowledge/GitNamingSummaryPage'));
const GitWorkflowFeaturePage = lazy(() => import('../pages/knowledge/GitWorkflowFeaturePage'));
const GitWorkflowBugfixPage = lazy(() => import('../pages/knowledge/GitWorkflowBugfixPage'));
const GitWorkflowHotfixPage = lazy(() => import('../pages/knowledge/GitWorkflowHotfixPage'));
const GitHubActionsPage = lazy(() => import('../pages/knowledge/GitHubActionsPage'));
const GitHubGuidePage = lazy(() => import('../pages/knowledge/GitHubGuidePage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/product',
    element: <ProductPage />,
  },
  {
    path: '/map',
    element: <MapPage />,
  },
  {
    path: '/knowledge/git-commands',
    element: <GitCommandsPage />,
  },
  {
    path: '/knowledge/git-naming-guide',
    element: <GitNamingGuidePage />,
  },
  {
    path: '/knowledge/git-naming-summary',
    element: <GitNamingSummaryPage />,
  },
  {
    path: '/knowledge/git-workflow-feature',
    element: <GitWorkflowFeaturePage />,
  },
  {
    path: '/knowledge/git-workflow-bugfix',
    element: <GitWorkflowBugfixPage />,
  },
  {
    path: '/knowledge/git-workflow-hotfix',
    element: <GitWorkflowHotfixPage />,
  },
  {
    path: '/knowledge/github-actions',
    element: <GitHubActionsPage />,
  },
  {
    path: '/knowledge/github-guide',
    element: <GitHubGuidePage />,
  },
]);

export default router;
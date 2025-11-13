import type { NavItem } from '../types';
import { ROUTES } from '../utils/constants';

export const navigationItems: NavItem[] = [
  {
    label: 'หน้าหลัก',
    path: ROUTES.HOME,
  },
  {
    label: 'Git/GitHub',
    path: '#',
    children: [
      {
        label: 'GitHub Guide',
        path: ROUTES.KNOWLEDGE.GITHUB_GUIDE,
        icon: 'bi-github',
      },
      {
        label: 'GitHub Actions',
        path: ROUTES.KNOWLEDGE.GITHUB_ACTIONS,
        icon: 'bi-play-circle',
      },
      {
        label: 'Git Commands',
        path: ROUTES.KNOWLEDGE.GIT_COMMANDS,
        icon: 'bi-terminal',
      },
      {
        label: 'Git Naming Guide',
        path: ROUTES.KNOWLEDGE.GIT_NAMING_GUIDE,
        icon: 'bi-tags',
      },
    ],
  },
  {
    label: 'Workflows',
    path: '#',
    children: [
      {
        label: 'Add Feature',
        path: ROUTES.KNOWLEDGE.GIT_WORKFLOW_FEATURE,
        icon: 'bi-plus-circle',
      },
      {
        label: 'Bugfix',
        path: ROUTES.KNOWLEDGE.GIT_WORKFLOW_BUGFIX,
        icon: 'bi-bug',
      },
      {
        label: 'Hotfix',
        path: ROUTES.KNOWLEDGE.GIT_WORKFLOW_HOTFIX,
        icon: 'bi-fire',
      },
    ],
  },
  {
    label: 'เกี่ยวกับ',
    path: ROUTES.ABOUT,
  },
  {
    label: 'ติดต่อ',
    path: ROUTES.CONTACT,
  },
];
export const SITE_NAME = 'My Knowledge Base';
export const SITE_DESCRIPTION = 'บันทึกและสรุปความรู้ในหัวข้อต่างๆ ทั้งการพัฒนาโปรแกรม การสร้างระบบ AI และความรู้ทั่วไป';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRODUCT: '/product',
  MAP: '/map',
  KNOWLEDGE: {
    ROOT: '/knowledge',
    GIT_COMMANDS: '/knowledge/git-commands',
    GIT_NAMING_GUIDE: '/knowledge/git-naming-guide',
    GIT_NAMING_SUMMARY: '/knowledge/git-naming-summary',
    GIT_WORKFLOW_FEATURE: '/knowledge/git-workflow-feature',
    GIT_WORKFLOW_BUGFIX: '/knowledge/git-workflow-bugfix',
    GIT_WORKFLOW_HOTFIX: '/knowledge/git-workflow-hotfix',
    GITHUB_ACTIONS: '/knowledge/github-actions',
    GITHUB_GUIDE: '/knowledge/github-guide',
  }
} as const;
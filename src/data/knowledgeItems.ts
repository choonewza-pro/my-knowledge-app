import { ROUTES } from '../utils/constants';

export const knowledgeItems = [
  {
    id: 1,
    title: 'Git Commands',
    description: 'คำสั่ง Git พื้นฐานและขั้นสูงสำหรับจัดการโค้ด',
    icon: 'bi-terminal',
    link: ROUTES.KNOWLEDGE.GIT_COMMANDS,
  },
  {
    id: 2,
    title: 'Git Naming Guide',
    description: 'หลักการตั้งชื่อ branch และ commit ที่ดี',
    icon: 'bi-tags',
    link: ROUTES.KNOWLEDGE.GIT_NAMING_GUIDE,
  },
  {
    id: 3,
    title: 'Git Naming Summary',
    description: 'ตารางสรุปการตั้งชื่อใน Git',
    icon: 'bi-table',
    link: ROUTES.KNOWLEDGE.GIT_NAMING_SUMMARY,
  },
  {
    id: 4,
    title: 'Git Workflow Add Feature',
    description: 'ขั้นตอนการเพิ่มฟีเจอร์ใหม่ในโปรเจกต์',
    icon: 'bi-plus-circle',
    link: ROUTES.KNOWLEDGE.GIT_WORKFLOW_FEATURE,
  },
  {
    id: 5,
    title: 'Git Workflow Bugfix',
    description: 'ขั้นตอนการแก้ไขบั๊กในโค้ด',
    icon: 'bi-bug',
    link: ROUTES.KNOWLEDGE.GIT_WORKFLOW_BUGFIX,
  },
  {
    id: 6,
    title: 'Git Workflow Hotfix',
    description: 'ขั้นตอนการแก้ไขด่วนสำหรับ production',
    icon: 'bi-fire',
    link: ROUTES.KNOWLEDGE.GIT_WORKFLOW_HOTFIX,
  },
  {
    id: 7,
    title: 'GitHub Actions',
    description: 'การใช้งาน CI/CD ด้วย GitHub Actions',
    icon: 'bi-play-circle',
    link: ROUTES.KNOWLEDGE.GITHUB_ACTIONS,
  },
  {
    id: 8,
    title: 'GitHub Guide',
    description: 'คู่มือการใช้งาน GitHub อย่างครบถ้วน',
    icon: 'bi-github',
    link: ROUTES.KNOWLEDGE.GITHUB_GUIDE,
  },
];
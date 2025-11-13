# AI Task 07 - Create Static Data Files

## 🎯 Task Goal
สร้างไฟล์ data สำหรับเก็บข้อมูลคงที่ เช่น knowledge items, features, team members

---

## 📋 Requirements

### 1. สร้างโครงสร้างโฟลเดอร์
```
src/
  data/
    navigation.ts (มีอยู่แล้วจาก task 03)
    knowledgeItems.ts
    features.ts
    teamMembers.ts
    index.ts
```

### 2. Knowledge Items Data

**ไฟล์:** `src/data/knowledgeItems.ts`

**ต้องการ:**
- ข้อมูล knowledge cards ทั้งหมด (8 items)
- ใช้ routes จาก constants
- มี icon class (Bootstrap Icons)

```tsx
import type { KnowledgeItem } from '@/types';
import { ROUTES } from '@/utils/constants';

export const knowledgeItems: KnowledgeItem[] = [
  {
    id: 'git-commands',
    title: 'Git Commands Reference',
    description: 'คู่มืออ้างอิงคำสั่ง Git พื้นฐานและขั้นสูง พร้อมตัวอย่างการใช้งาน',
    icon: 'bi-terminal',
    category: 'Git',
    link: ROUTES.KNOWLEDGE.GIT_COMMANDS,
  },
  {
    id: 'git-naming-guide',
    title: 'Git Naming Guide',
    description: 'แนวทางการตั้งชื่อ branches, commits, และ tags อย่างมืออาชีพ',
    icon: 'bi-tags',
    category: 'Git',
    link: ROUTES.KNOWLEDGE.GIT_NAMING_GUIDE,
  },
  {
    id: 'git-naming-summary',
    title: 'Git Naming Summary',
    description: 'ตารางสรุปรูปแบบการตั้งชื่อ Git branches และ commits',
    icon: 'bi-table',
    category: 'Git',
    link: ROUTES.KNOWLEDGE.GIT_NAMING_SUMMARY,
  },
  {
    id: 'git-workflow-feature',
    title: 'Git Workflow: Add Feature',
    description: 'ขั้นตอนการเพิ่ม feature ใหม่ด้วย Git Flow pattern',
    icon: 'bi-plus-circle',
    category: 'Workflows',
    link: ROUTES.KNOWLEDGE.GIT_WORKFLOW_FEATURE,
  },
  {
    id: 'git-workflow-bugfix',
    title: 'Git Workflow: Bugfix',
    description: 'ขั้นตอนการแก้ไข bugs ในโปรเจกต์',
    icon: 'bi-bug',
    category: 'Workflows',
    link: ROUTES.KNOWLEDGE.GIT_WORKFLOW_BUGFIX,
  },
  {
    id: 'git-workflow-hotfix',
    title: 'Git Workflow: Hotfix',
    description: 'ขั้นตอนการแก้ไข critical bugs ใน production',
    icon: 'bi-fire',
    category: 'Workflows',
    link: ROUTES.KNOWLEDGE.GIT_WORKFLOW_HOTFIX,
  },
  {
    id: 'github-actions',
    title: 'GitHub Actions Guide',
    description: 'คู่มือการใช้งาน GitHub Actions สำหรับ CI/CD',
    icon: 'bi-play-circle',
    category: 'GitHub',
    link: ROUTES.KNOWLEDGE.GITHUB_ACTIONS,
  },
  {
    id: 'github-guide',
    title: 'GitHub Guide',
    description: 'คู่มือการใช้งาน GitHub สำหรับทีม',
    icon: 'bi-github',
    category: 'GitHub',
    link: ROUTES.KNOWLEDGE.GITHUB_GUIDE,
  },
];
```

### 3. Features Data

**ไฟล์:** `src/data/features.ts`

**ต้องการ:**
- Features สำหรับแสดงในหน้าแรก
- ข้อดีของ workshop

```tsx
export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: 'comprehensive',
    icon: 'bi-book',
    title: 'คู่มือครบถ้วน',
    description: 'เอกสารและตัวอย่างที่ครอบคลุมทุกแง่มุมของ Git และ GitHub',
  },
  {
    id: 'easy-to-learn',
    icon: 'bi-lightning',
    title: 'เรียนรู้ง่าย',
    description: 'อธิบายด้วยภาษาที่เข้าใจง่าย พร้อมตัวอย่างโค้ดจริง',
  },
  {
    id: 'best-practices',
    icon: 'bi-star',
    title: 'Best Practices',
    description: 'ปฏิบัติตามมาตรฐานอุตสาหกรรม เรียนรู้วิธีทำงานแบบมืออาชีพ',
  },
  {
    id: 'real-world',
    icon: 'bi-briefcase',
    title: 'Real-world Examples',
    description: 'ตัวอย่างจากโปรเจกต์จริง ไม่ใช่แค่ทฤษฎี',
  },
  {
    id: 'updated',
    icon: 'bi-arrow-repeat',
    title: 'อัพเดทสม่ำเสมอ',
    description: 'เนื้อหาใหม่และการปรับปรุงอย่างต่อเนื่อง',
  },
  {
    id: 'free',
    icon: 'bi-gift',
    title: 'ฟรี 100%',
    description: 'เข้าถึงได้ทุกคน ไม่มีค่าใช้จ่าย',
  },
];
```

### 4. Team Members Data

**ไฟล์:** `src/data/teamMembers.ts`

**ต้องการ:**
- ข้อมูลทีมงาน (สำหรับ About page)
- รองรับ image และ social links

```tsx
import type { TeamMember } from '@/types';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'สมชาย ใจดี',
    role: 'Lead Developer',
    bio: 'Full-stack developer ที่มีประสบการณ์มากกว่า 10 ปี เชี่ยวชาญ Git และ DevOps',
    image: '', // Optional: ใส่ URL รูปภาพ
    social: {
      github: 'https://github.com/somchai',
      twitter: 'https://twitter.com/somchai',
    },
  },
  {
    id: '2',
    name: 'สมหญิง ขยัน',
    role: 'DevOps Engineer',
    bio: 'ผู้เชี่ยวชาญด้าน CI/CD และ automation มีความหลงใหลใน Infrastructure as Code',
    image: '',
    social: {
      github: 'https://github.com/somying',
      linkedin: 'https://linkedin.com/in/somying',
    },
  },
  {
    id: '3',
    name: 'สมศักดิ์ เก่ง',
    role: 'Technical Writer',
    bio: 'นักเขียนเทคนิคที่มีความสามารถในการอธิบายเรื่องยากให้เข้าใจง่าย',
    image: '',
    social: {
      github: 'https://github.com/somsak',
    },
  },
];
```

### 5. อัพเดท TypeScript Types

**ไฟล์:** `src/types/index.ts`

**เพิ่ม types ใหม่:**

```tsx
// NavItem (มีอยู่แล้วจาก task 03)
export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
  icon?: string;
}

// KnowledgeItem
export interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  link: string;
}

// TeamMember
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

// PageMeta (สำหรับ SEO ในอนาคต)
export interface PageMeta {
  title: string;
  description?: string;
  keywords?: string[];
}
```

### 6. Barrel Export

**ไฟล์:** `src/data/index.ts`

```tsx
export * from './navigation';
export * from './knowledgeItems';
export * from './features';
export * from './teamMembers';
```

---

## ✅ Acceptance Criteria

1. ✅ `knowledgeItems` มีข้อมูลครบ 8 items
2. ✅ ทุก knowledge item มี icon, title, description, link
3. ✅ `features` มีข้อมูลอย่างน้อย 6 items
4. ✅ `teamMembers` มีข้อมูลอย่างน้อย 3 คน
5. ✅ TypeScript types ครบถ้วนทุก interface
6. ✅ Export ผ่าน barrel file
7. ✅ ใช้ ROUTES constants สำหรับ links
8. ✅ ไม่มี TypeScript errors

---

## 🧪 Testing

ทดสอบ data โดยแสดงใน component:

```tsx
// src/pages/DataTest.tsx (temporary)
import { knowledgeItems, features, teamMembers } from '@/data';

export function DataTest() {
  return (
    <div className="container mx-auto p-8">
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Knowledge Items</h2>
        <pre className="rounded bg-base-200 p-4 text-sm">
          {JSON.stringify(knowledgeItems, null, 2)}
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Features</h2>
        <pre className="rounded bg-base-200 p-4 text-sm">
          {JSON.stringify(features, null, 2)}
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Team Members</h2>
        <pre className="rounded bg-base-200 p-4 text-sm">
          {JSON.stringify(teamMembers, null, 2)}
        </pre>
      </section>
    </div>
  );
}
```

---

## 📝 Implementation Notes

1. **Data Structure:**
   - ใช้ array of objects สำหรับ list data
   - แต่ละ item มี unique id
   - ใช้ TypeScript interfaces สำหรับ type safety

2. **Icons:**
   - ใช้ Bootstrap Icons class names
   - Format: `bi-{icon-name}`
   - ตัวอย่าง: `bi-terminal`, `bi-github`, `bi-book`

3. **Links:**
   - ใช้ ROUTES constants จาก `utils/constants.ts`
   - ไม่ hard-code URLs

4. **Optional Fields:**
   - ใช้ `?` สำหรับ optional fields
   - เช่น `bio?`, `image?`, `social?`

---

## 🔗 References

- Bootstrap Icons: https://icons.getbootstrap.com/

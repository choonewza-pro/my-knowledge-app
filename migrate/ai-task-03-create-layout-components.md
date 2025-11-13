# AI Task 03 - Create Layout Components (Navbar & Footer)

## 🎯 Task Goal
สร้าง Navbar และ Footer components โดยแปลงจาก HTML เดิมมาเป็น React components พร้อม responsive design

---

## 📋 Requirements

### 1. สร้างโครงสร้างโฟลเดอร์
```
src/
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      index.ts
  data/
    navigation.ts
  types/
    index.ts
  utils/
    constants.ts
```

### 2. TypeScript Types

**ไฟล์:** `src/types/index.ts`

```tsx
export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
  icon?: string;
}
```

### 3. Constants

**ไฟล์:** `src/utils/constants.ts`

```tsx
export const SITE_NAME = 'Git Workshop';
export const SITE_DESCRIPTION = 'Workshop สำหรับการเรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions';

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
```

### 4. Navigation Data

**ไฟล์:** `src/data/navigation.ts`

```tsx
import type { NavItem } from '@/types';
import { ROUTES } from '@/utils/constants';

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
```

### 5. Navbar Component

**ไฟล์:** `src/components/layout/Navbar.tsx`

**ต้องการ:**
- ใช้ daisyUI navbar component
- Responsive: desktop menu + mobile drawer
- Support dropdown menus (nested children)
- Active link highlighting
- Bootstrap Icons สำหรับ menu items

```tsx
import { Link } from 'react-router-dom';
import { navigationItems } from '@/data/navigation';
import { SITE_NAME } from '@/utils/constants';

export function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            {SITE_NAME}
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* TODO: Map navigationItems */}
            {/* - ถ้ามี children ใช้ dropdown */}
            {/* - ถ้าไม่มี children ใช้ Link ธรรมดา */}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <i className="bi-list text-2xl"></i>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box z-1 w-52 bg-base-100 p-2 shadow"
            >
              {/* TODO: Map navigationItems สำหรับ mobile */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

**Requirements:**
1. Desktop menu:
   - Horizontal layout
   - Dropdown สำหรับ menu ที่มี children
   - แสดง icons (ถ้ามี)
   
2. Mobile menu:
   - Hamburger button (☰)
   - Dropdown menu จากขวา
   - Vertical layout
   - Show parent label + children list

### 6. Footer Component

**ไฟล์:** `src/components/layout/Footer.tsx`

**ต้องการ:**
- 3 columns layout (desktop)
- Stacked layout (mobile)
- Links, copyright, social icons

```tsx
import { Link } from 'react-router-dom';
import { SITE_NAME, ROUTES } from '@/utils/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: About */}
          <div>
            <h3 className="mb-4 text-lg font-bold">{SITE_NAME}</h3>
            <p className="text-sm text-base-content/70">
              Workshop สำหรับการเรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={ROUTES.HOME} className="hover:text-primary">
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT} className="hover:text-primary">
                  เกี่ยวกับ
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-primary">
                  ติดต่อ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary"
              >
                <i className="bi-github"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary"
              >
                <i className="bi-facebook"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-base-300 pt-8 text-center text-sm text-base-content/70">
          <p>&copy; {currentYear} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

### 7. Barrel Export

**ไฟล์:** `src/components/layout/index.ts`

```tsx
export { Navbar } from './Navbar';
export { Footer } from './Footer';
```

---

## ✅ Acceptance Criteria

1. ✅ Navbar แสดงผลถูกต้องบน desktop และ mobile
2. ✅ Dropdown menus ทำงานได้
3. ✅ Mobile hamburger menu เปิด/ปิดได้
4. ✅ Footer มี 3 columns และ responsive
5. ✅ Links ทั้งหมดใช้ React Router Link (ยังไม่ต้องทำงานจริง)
6. ✅ Bootstrap Icons แสดงผลถูกต้อง
7. ✅ ไม่มี TypeScript errors

---

## 🎨 Design Reference

**Navbar:**
- Height: `navbar` (daisyUI default)
- Background: `bg-base-100`
- Shadow: `shadow-sm`
- Container: `container mx-auto px-4`

**Footer:**
- Background: `bg-base-200`
- Padding: `py-12`
- Border top (copyright): `border-t border-base-300`

**Icons:**
- ใช้ Bootstrap Icons CDN (มีอยู่แล้วใน index.html)
- Prefix: `bi-` (เช่น `bi-github`, `bi-terminal`)

---

## 📝 Implementation Tips

1. **Dropdown menu:**
   - ใช้ daisyUI `<details>` + `<summary>` สำหรับ desktop
   - ใช้ nested `<ul>` สำหรับ mobile

2. **Active link:**
   - ยังไม่ต้องทำ active state ใน task นี้
   - จะทำใน task ที่มี routing

3. **Responsive:**
   - Desktop: `hidden lg:flex`
   - Mobile: `lg:hidden`

---

## 🧪 Testing

ทดสอบโดยเพิ่ม Navbar + Footer ใน `App.tsx`:
```tsx
import { Navbar, Footer } from '@/components/layout';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-base-100 p-8">
        <h1 className="text-4xl font-bold">Content Area</h1>
      </main>
      <Footer />
    </div>
  );
}
```

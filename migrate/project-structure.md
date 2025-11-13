# migrate/project-structure.md

## โครงสร้างโปรเจกต์หลังการ Migrate

เอกสารนี้อธิบายโครงสร้างไฟล์และโฟลเดอร์ของโปรเจกต์หลังจากการ migrate จาก static HTML website ไปสู่ React + Vite + Tailwind CSS + daisyUI เสร็จสมบูรณ์

---

## 📁 โครงสร้างไดเร็กทอรี (Tree Structure)

```
my-knowledge-app/
├── public/
│   └── favicon.ico                      # ไอคอนเว็บไซต์ (ย้ายจาก old-website/assets/)
│
├── src/
│   ├── main.tsx                         # Entry point ของแอปพลิเคชัน
│   ├── App.tsx                          # Root component พร้อม routing configuration
│   ├── index.css                        # Global styles และ Tailwind directives
│   │
│   ├── assets/                          # Static assets
│   │   ├── images/                      # รูปภาพต่าง ๆ (ถ้ามี)
│   │   └── icons/                       # Icons (ถ้ามี)
│   │
│   ├── components/                      # Reusable React components
│   │   ├── common/                      # Components ที่ใช้ร่วมกันทั่วไป
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Icon.tsx
│   │   │
│   │   ├── layout/                      # Layout components
│   │   │   ├── Navbar.tsx               # Navigation bar (จาก partials/nav.html)
│   │   │   ├── Footer.tsx               # Footer component
│   │   │   └── Layout.tsx               # Main layout wrapper
│   │   │
│   │   └── features/                    # Feature-specific components
│   │       ├── Hero.tsx                 # Hero section component
│   │       ├── KnowledgeCard.tsx        # Card สำหรับแสดงความรู้
│   │       ├── FeatureBadge.tsx         # Badge component
│   │       └── TeamCard.tsx             # Card สำหรับแสดงสมาชิกทีม
│   │
│   ├── pages/                           # Page components (1 file = 1 route)
│   │   ├── HomePage.tsx                 # หน้าแรก (จาก index.html)
│   │   ├── AboutPage.tsx                # เกี่ยวกับเรา (จาก about.html)
│   │   ├── ContactPage.tsx              # ติดต่อเรา (จาก contact.html)
│   │   ├── ProductPage.tsx              # ผลิตภัณฑ์ (จาก product.html)
│   │   ├── MapPage.tsx                  # แผนที่ (จาก map.html)
│   │   │
│   │   └── knowledge/                   # Knowledge pages (จาก knowledges/)
│   │       ├── GitCommandsPage.tsx      # Git Commands Reference
│   │       ├── GitNamingGuidePage.tsx   # Git Naming Guide
│   │       ├── GitNamingSummaryPage.tsx # Git Naming Summary Tables
│   │       ├── GitWorkflowFeaturePage.tsx   # Git Workflow Add Feature
│   │       ├── GitWorkflowBugfixPage.tsx    # Git Workflow Bugfix
│   │       ├── GitWorkflowHotfixPage.tsx    # Git Workflow Hotfix
│   │       ├── GitHubActionsPage.tsx    # GitHub Actions Guide
│   │       └── GitHubGuidePage.tsx      # GitHub Guide
│   │
│   ├── routes/                          # Routing configuration
│   │   └── index.tsx                    # Routes definition (react-router-dom v7)
│   │
│   ├── layouts/                         # Layout templates
│   │   ├── MainLayout.tsx               # Layout หลักสำหรับหน้าทั่วไป
│   │   └── KnowledgeLayout.tsx          # Layout สำหรับหน้าความรู้
│   │
│   ├── hooks/                           # Custom React hooks
│   │   ├── useDocumentTitle.ts          # Hook สำหรับเปลี่ยน page title
│   │   └── useScrollToTop.ts            # Hook สำหรับ scroll to top เมื่อเปลี่ยนหน้า
│   │
│   ├── utils/                           # Utility functions
│   │   ├── constants.ts                 # ค่าคงที่ต่าง ๆ
│   │   └── helpers.ts                   # Helper functions
│   │
│   ├── types/                           # TypeScript type definitions
│   │   └── index.ts                     # Type definitions
│   │
│   └── data/                            # Static data / Mock data
│       ├── navigation.ts                # Navigation menu data
│       ├── knowledgeItems.ts            # Knowledge cards data
│       └── teamMembers.ts               # Team members data (ถ้ามี)
│
├── docs/                                # Documentation (ไม่เปลี่ยนแปลง)
│   ├── README.md
│   ├── commands-reference/
│   ├── developer/
│   ├── git/
│   └── social_analytic/
│
├── migrate/                             # Migration documentation
│   ├── generate_migrate_prompt.md       # Prompt template
│   ├── project-structure.md             # เอกสารนี้
│   ├── step-01-initial-setup.md
│   ├── step-02-design-components.md
│   ├── step-03-create-layout.md
│   ├── step-04-migrate-pages.md
│   ├── step-05-migrate-knowledge.md
│   ├── step-06-routing-setup.md
│   ├── step-07-assets-seo.md
│   └── step-08-testing-optimization.md
│
├── old-website/                         # เก็บไว้อ้างอิง (ไม่ลบ)
│   └── ...
│
├── .gitignore
├── eslint.config.js
├── index.html                           # Vite entry HTML
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts

```

---

## 🎯 หน้าที่ของแต่ละโฟลเดอร์/ไฟล์

### **Root Level**

| ไฟล์/โฟลเดอร์ | หน้าที่ |
|--------------|---------|
| `index.html` | HTML template หลักของ Vite, มี `<div id="root">` เป็น mount point |
| `package.json` | จัดการ dependencies และ scripts |
| `vite.config.ts` | Configuration ของ Vite |
| `tsconfig.json` | TypeScript configuration |
| `eslint.config.js` | ESLint configuration |

### **`public/`**

เก็บ static assets ที่ไม่ต้อง process ผ่าน bundler เช่น `favicon.ico`, `robots.txt`

### **`src/`**

#### **Core Files**
- `main.tsx`: Entry point ที่ render `<App />` เข้าไปใน DOM
- `App.tsx`: Root component ที่มี Router configuration และ global providers
- `index.css`: Global CSS พร้อม Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)

#### **`src/components/`**

แบ่งเป็น 3 categories:

1. **`common/`**: Reusable UI components ที่ไม่ผูกติดกับ business logic
   - ตัวอย่าง: `Button`, `Card`, `Badge`, `Modal`, `Input`
   - ควรรองรับ props เพื่อ customize (variants, sizes, colors)

2. **`layout/`**: Components ที่เกี่ยวกับ layout structure
   - `Navbar.tsx`: Navigation bar (ย้ายมาจาก `partials/nav.html`)
   - `Footer.tsx`: Footer section
   - `Layout.tsx`: Wrapper component ที่ใช้ทุกหน้า

3. **`features/`**: Components ที่เฉพาะเจาะจงกับ feature บางอย่าง
   - `Hero.tsx`: Hero section (gradient background)
   - `KnowledgeCard.tsx`: Card แสดง knowledge items
   - `TeamCard.tsx`: Card แสดงสมาชิกในทีม

#### **`src/pages/`**

Page components ที่แต่ละ page = 1 route (component-based routing)
- ตั้งชื่อด้วย suffix `Page` เพื่อความชัดเจน
- ควรแยก logic ออกเป็น components ย่อย ๆ ไม่ใส่ logic เยอะในหน้า page

**Main Pages:**
- `HomePage.tsx` ← `old-website/index.html`
- `AboutPage.tsx` ← `old-website/about.html`
- `ContactPage.tsx` ← `old-website/contact.html`
- `ProductPage.tsx` ← `old-website/product.html`
- `MapPage.tsx` ← `old-website/map.html`

**Knowledge Pages:**
- `knowledge/GitCommandsPage.tsx` ← `old-website/knowledges/git-commands-reference.html`
- `knowledge/GitNamingGuidePage.tsx` ← `old-website/knowledges/git-naming-guide.html`
- (และอื่น ๆ ตามไฟล์ใน `knowledges/`)

#### **`src/routes/`**

ใช้ `react-router-dom` v7 (Data Router API)
- `index.tsx`: สร้าง routes configuration ด้วย `createBrowserRouter()`
- กำหนด path, element, loader (ถ้ามี) สำหรับทุก route

#### **`src/layouts/`**

Layout wrappers สำหรับ group หน้าต่าง ๆ
- `MainLayout.tsx`: Layout หลัก (Navbar + children + Footer)
- `KnowledgeLayout.tsx`: Layout พิเศษสำหรับหน้าความรู้ (อาจมี sidebar หรือ breadcrumb)

#### **`src/hooks/`**

Custom React hooks
- `useDocumentTitle.ts`: เปลี่ยน `document.title` ตาม page
- `useScrollToTop.ts`: Scroll to top อัตโนมัติเมื่อเปลี่ยน route

#### **`src/utils/`**

Utility functions และค่าคงที่
- `constants.ts`: เก็บ constant values (colors, URLs, etc.)
- `helpers.ts`: Pure functions ที่ช่วยในการประมวลผลข้อมูล

#### **`src/types/`**

TypeScript type definitions
- `index.ts`: กำหนด interfaces, types สำหรับใช้ทั่วโปรเจกต์

#### **`src/data/`**

Static data หรือ mock data
- `navigation.ts`: Menu items สำหรับ navbar
- `knowledgeItems.ts`: ข้อมูล knowledge cards ที่แสดงในหน้าแรก
- `teamMembers.ts`: ข้อมูลสมาชิกทีม (ถ้ามี)

---

## 🗺️ Mapping จาก Old Website → React Structure

### **HTML Pages → React Pages**

| ไฟล์เดิม (old-website) | ไฟล์ใหม่ (src) | Route Path |
|------------------------|----------------|------------|
| `index.html` | `pages/HomePage.tsx` | `/` |
| `about.html` | `pages/AboutPage.tsx` | `/about` |
| `contact.html` | `pages/ContactPage.tsx` | `/contact` |
| `product.html` | `pages/ProductPage.tsx` | `/product` |
| `map.html` | `pages/MapPage.tsx` | `/map` |
| `knowledges/git-commands-reference.html` | `pages/knowledge/GitCommandsPage.tsx` | `/knowledge/git-commands` |
| `knowledges/git-naming-guide.html` | `pages/knowledge/GitNamingGuidePage.tsx` | `/knowledge/git-naming-guide` |
| `knowledges/git-naming-summary-tables.html` | `pages/knowledge/GitNamingSummaryPage.tsx` | `/knowledge/git-naming-summary` |
| `knowledges/git-workflow-add-feature.html` | `pages/knowledge/GitWorkflowFeaturePage.tsx` | `/knowledge/git-workflow-feature` |
| `knowledges/git-workflow-bugfix.html` | `pages/knowledge/GitWorkflowBugfixPage.tsx` | `/knowledge/git-workflow-bugfix` |
| `knowledges/git-workflow-hotfix.html` | `pages/knowledge/GitWorkflowHotfixPage.tsx` | `/knowledge/git-workflow-hotfix` |
| `knowledges/github-actions-guide.html` | `pages/knowledge/GitHubActionsPage.tsx` | `/knowledge/github-actions` |
| `knowledges/github-guide.html` | `pages/knowledge/GitHubGuidePage.tsx` | `/knowledge/github-guide` |

### **Partials → Components**

| ไฟล์เดิม | ไฟล์ใหม่ | ประเภท |
|---------|---------|--------|
| `partials/nav.html` | `components/layout/Navbar.tsx` | Layout Component |
| (Footer ใน HTML แต่ละหน้า) | `components/layout/Footer.tsx` | Layout Component |

### **Inline Styles & Custom CSS → Tailwind + daisyUI**

| สไตล์เดิม | วิธีจัดการใน React |
|-----------|-------------------|
| `<style>` blocks ใน HTML | แปลงเป็น Tailwind utility classes |
| `.hero-gradient` | ใช้ Tailwind gradient utilities หรือ custom CSS ใน `index.css` |
| `.knowledge-card`, `.info-card` | สร้าง `<Card>` component ใน `components/common/` |
| `.feature-badge` | สร้าง `<FeatureBadge>` component ใน `components/features/` |
| `css/styles.css` (Bootstrap) | ลบออก, ใช้ Tailwind + daisyUI แทน |

### **Assets → `public/` & `src/assets/`**

| Asset เดิม | ตำแหน่งใหม่ |
|-----------|-------------|
| `assets/favicon.ico` | `public/favicon.ico` |
| `assets/*.png`, `*.jpg` (ถ้ามี) | `src/assets/images/` (ถ้าต้อง import) หรือ `public/images/` (ถ้าอ้างอิงแบบ static) |

### **JavaScript → React Hooks/Components**

| ฟังก์ชันเดิม | วิธีจัดการใน React |
|-------------|-------------------|
| `js/include-nav.js` | ไม่ต้องใช้ (Navbar เป็น component แล้ว) |
| `js/scripts.js` | แปลงเป็น custom hooks หรือ inline logic ใน components |
| Bootstrap JS (dropdown, collapse) | ใช้ daisyUI components (Dropdown, Drawer, Modal) แทน |

---

## 📝 แนวทางการตั้งชื่อ (Naming Conventions)

### **Components**

- **PascalCase** เสมอ: `Button.tsx`, `Navbar.tsx`, `HomePage.tsx`
- **Suffix ตามประเภท**:
  - Pages: `*Page.tsx` (เช่น `HomePage`, `AboutPage`)
  - Layouts: `*Layout.tsx` (เช่น `MainLayout`)
  - Contexts: `*Context.tsx` (ถ้ามี)

### **Files & Folders**

- **Folders**: lowercase ด้วย kebab-case หรือ camelCase
  - ✅ `components/`, `pages/`, `hooks/`
  - ✅ `components/common/`, `components/layout/`
  
- **Files**: PascalCase สำหรับ components, camelCase สำหรับ utilities
  - Components: `Button.tsx`, `KnowledgeCard.tsx`
  - Utilities: `helpers.ts`, `constants.ts`
  - Hooks: `useDocumentTitle.ts` (prefix `use`)

### **Routes**

- **kebab-case** สำหรับ URL paths
  - ✅ `/about`, `/contact`, `/knowledge/git-commands`
  - ❌ `/About`, `/gitCommands`

---

## 🎨 Best Practices สำหรับ Migration

### **1. Component Design**

- **แยก concerns ให้ชัดเจน**: UI components ไม่ควรมี business logic หนัก
- **Reusable first**: ก่อนสร้าง component ใหม่ ให้คิดว่า reuse ได้หรือไม่
- **Props interface**: กำหนด TypeScript interface สำหรับทุก component props

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  // ...
}
```

### **2. Styling Approach**

- **ใช้ Tailwind utility classes เป็นหลัก**: หลีกเลี่ยง inline styles หรือ CSS-in-JS (ยกเว้นจำเป็น)
- **daisyUI components**: ใช้ daisyUI components (Button, Card, Modal, etc.) เพื่อความสม่ำเสมอ
- **Custom classes**: ถ้ามี complex styles ซ้ำ ๆ ให้สร้าง custom utilities ใน `index.css`

```css
/* index.css */
@import "tailwindcss";

@layer components {
  .hero-gradient {
    @apply bg-linear-to-br from-purple-500 to-purple-700;
  }
}
```

### **3. Routing Strategy**

- **ใช้ `createBrowserRouter`** (React Router v7 Data API)
- **Lazy loading** สำหรับ pages เพื่อ code splitting

```tsx
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
```

- **Nested routes** สำหรับ knowledge pages

```tsx
{
  path: 'knowledge',
  element: <KnowledgeLayout />,
  children: [
    { path: 'git-commands', element: <GitCommandsPage /> },
    { path: 'git-naming-guide', element: <GitNamingGuidePage /> },
    // ...
  ]
}
```

### **4. SEO & Meta Tags**

- **`useDocumentTitle` hook**: เปลี่ยน page title ทุกหน้า
- **react-helmet-async** (ถ้าต้องการ): จัดการ meta tags แบบ dynamic

```tsx
import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} - Git Workshop`;
  }, [title]);
}

// ใน component
useDocumentTitle('Git Commands Reference');
```

### **5. Asset Management**

- **`public/` folder**: ไฟล์ที่ไม่เปลี่ยนแปลง (favicon, robots.txt)
- **`src/assets/`**: ไฟล์ที่ต้อง import และ process (images ที่ใช้ใน components)

```tsx
// ✅ Import จาก src/assets
import logoImg from '@/assets/images/logo.png';
<img src={logoImg} alt="Logo" />

// ✅ Static URL จาก public
<img src="/favicon.ico" alt="Favicon" />
```

### **6. Type Safety**

- **TypeScript everywhere**: ทุก component ต้องมี type definitions
- **Strict mode**: enable `strict: true` ใน `tsconfig.json`

---

## 🚀 เป้าหมายสุดท้าย

หลังจาก migrate เสร็จสมบูรณ์:

✅ **รัน `npm run dev` ได้โดยไม่ error**  
✅ **รัน `npm run build` ได้สำเร็จ**  
✅ **ทุกหน้าแสดงผลถูกต้อง เหมือนกับ old-website**  
✅ **Navigation ทำงานได้ (ไม่มี broken links)**  
✅ **Responsive design ทำงานได้ดีบนทุก device**  
✅ **Performance ดีกว่าเดิม (ใช้ Vite + code splitting)**  
✅ **Code maintainable และทำตาม best practices**

---

**หมายเหตุ**: โครงสร้างนี้เป็น blueprint หลัก สามารถปรับแต่งได้ตามความเหมาะสมของโปรเจกต์ แต่ควรคง principles เรื่อง separation of concerns, reusability, และ type safety ไว้เสมอ

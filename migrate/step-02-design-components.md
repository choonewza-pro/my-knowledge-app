# Step 02 – ออกแบบและสร้าง Component Library (Design & Component Library)

## 🎯 Goal

ออกแบบและสร้าง reusable components ที่จะใช้ทั่วทั้งแอปพลิเคชัน รวมถึง common UI components (Button, Card, Badge) และ layout components (Navbar, Footer) โดยใช้ Tailwind CSS + daisyUI และ TypeScript อย่างเต็มรูปแบบ

---

## ✅ Tasks (Checklist)

### 1. Setup Tailwind CSS v4 + daisyUI Configuration

- [ ] **ตรวจสอบ `src/index.css`**
  - ตรวจสอบว่ามีการ import Tailwind ถูกต้องหรือไม่
  - สำหรับ Tailwind CSS v4 ควรใช้:
  ```css
  @import "tailwindcss";
  ```
  - เพิ่ม custom CSS variables (ถ้าจำเป็น)

- [ ] **ตรวจสอบ daisyUI Configuration**
  - ตรวจสอบว่า daisyUI ถูก import ใน `index.css` หรือไม่
  - กำหนด theme ที่ต้องการใช้:
  ```css
  @import "tailwindcss";
  
  /* ตั้งค่า daisyUI theme */
  :root {
    --color-primary: 102 126 234; /* #667eea */
    --color-secondary: 118 75 162; /* #764ba2 */
  }
  ```

- [ ] **ทดสอบ Tailwind + daisyUI**
  - สร้างหน้าทดสอบ component ง่าย ๆ ใน `App.tsx`
  - ทดลองใช้ Tailwind utilities และ daisyUI components
  ```tsx
  <button className="btn btn-primary">Test Button</button>
  ```

### 2. สร้างโครงสร้างโฟลเดอร์ Components

- [ ] **สร้างโฟลเดอร์ตามแผน**
  ```
  src/
    components/
      common/
      layout/
      features/
  ```

- [ ] **สร้าง index files สำหรับ exports**
  - `components/common/index.ts`
  - `components/layout/index.ts`
  - `components/features/index.ts`

### 3. สร้าง Common Components

#### 3.1 Button Component

- [ ] **สร้าง `components/common/Button.tsx`**
  - รองรับ variants: `primary`, `secondary`, `ghost`, `outline`
  - รองรับ sizes: `sm`, `md`, `lg`
  - รองรับ loading state และ disabled state
  - TypeScript interface:
  ```tsx
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
  }
  ```

- [ ] **ใช้ daisyUI button classes**
  - `btn`, `btn-primary`, `btn-secondary`, etc.
  - Combine กับ Tailwind utilities สำหรับ custom styles

- [ ] **เขียน tests/examples ง่าย ๆ**
  - ทดสอบ render ใน `App.tsx` ชั่วคราว

#### 3.2 Card Component

- [ ] **สร้าง `components/common/Card.tsx`**
  - รองรับ variants: `default`, `bordered`, `elevated`, `gradient`
  - รองรับ padding options
  - รองรับ hover effects
  - TypeScript interface:
  ```tsx
  interface CardProps {
    variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    className?: string;
    children: React.ReactNode;
  }
  ```

- [ ] **ใช้ daisyUI card classes**
  - `card`, `card-body`, `card-title`
  - เพิ่ม Tailwind shadow และ border-radius

- [ ] **สร้าง card variants ตาม design เดิม**
  - `.knowledge-card` → Card component with elevated variant
  - `.info-card` → Card component with bordered variant
  - `.team-card` → Card component with image support

#### 3.3 Badge Component

- [ ] **สร้าง `components/common/Badge.tsx`**
  - รองรับ variants: `primary`, `secondary`, `success`, `warning`, `error`
  - รองรับ sizes: `sm`, `md`, `lg`
  - TypeScript interface:
  ```tsx
  interface BadgeProps {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
  }
  ```

- [ ] **ใช้ daisyUI badge classes**
  - `badge`, `badge-primary`, `badge-lg`

- [ ] **สร้าง FeatureBadge variant**
  - เลียนแบบ `.feature-badge` จาก CSS เดิม
  - ใช้ gradient background

#### 3.4 Icon Component (Optional)

- [ ] **ติดตั้ง icon library (เลือก 1 อย่าง)**
  - **Option 1**: React Icons (`react-icons`)
    ```powershell
    npm install react-icons
    ```
  - **Option 2**: ใช้ Bootstrap Icons CDN ต่อ (แบบเดิม)
  - **Option 3**: Heroicons (`@heroicons/react`)

- [ ] **สร้าง `components/common/Icon.tsx`** (ถ้าใช้ React Icons)
  ```tsx
  interface IconProps {
    name: keyof typeof icons;
    size?: number;
    className?: string;
  }
  ```

### 4. สร้าง Layout Components

#### 4.1 Navbar Component

- [ ] **สร้าง `components/layout/Navbar.tsx`**
  - แปลงจาก `old-website/partials/nav.html`
  - ใช้ daisyUI navbar component
  - รองรับ dropdown menus
  - รองรับ mobile responsive (drawer/hamburger menu)

- [ ] **สร้าง navigation data structure**
  - สร้าง `src/data/navigation.ts`
  ```tsx
  export interface NavItem {
    label: string;
    path: string;
    children?: NavItem[];
  }

  export const navigationItems: NavItem[] = [
    { label: 'หน้าหลัก', path: '/' },
    {
      label: 'Git/GitHub',
      path: '#',
      children: [
        { label: 'GitHub Guide', path: '/knowledge/github-guide' },
        { label: 'GitHub Actions', path: '/knowledge/github-actions' },
        // ...
      ]
    },
    // ...
  ];
  ```

- [ ] **ใช้ `react-router-dom` Link/NavLink**
  - แทนที่ `<a href>` ด้วย `<Link to>`
  - ใช้ `NavLink` สำหรับ active state

- [ ] **Style Navbar ตาม design เดิม**
  - Brand logo/text
  - Responsive layout
  - Dropdown animations

#### 4.2 Footer Component

- [ ] **สร้าง `components/layout/Footer.tsx`**
  - ศึกษา footer structure จากไฟล์ HTML เดิม
  - ใช้ daisyUI footer component
  - แบ่ง sections (About, Links, Social Media)

- [ ] **รองรับ responsive layout**
  - Desktop: 3-4 columns
  - Mobile: stacked layout

- [ ] **เพิ่ม social links (ถ้ามี)**
  - Icons สำหรับ Facebook, Twitter, GitHub, etc.

#### 4.3 Layout Component

- [ ] **สร้าง `components/layout/Layout.tsx`**
  - Wrapper component ที่ประกอบด้วย Navbar + children + Footer
  ```tsx
  interface LayoutProps {
    children: React.ReactNode;
  }

  export function Layout({ children }: LayoutProps) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
  ```

- [ ] **สร้าง scroll-to-top effect**
  - ใช้ `useScrollToTop` hook (จะสร้างใน Step 03)

### 5. สร้าง Feature Components

#### 5.1 Hero Component

- [ ] **สร้าง `components/features/Hero.tsx`**
  - แปลง hero section จาก `index.html`
  - ใช้ gradient background (`.hero-gradient`)
  - TypeScript props:
  ```tsx
  interface HeroProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
  }
  ```

- [ ] **สร้าง gradient background**
  - ใช้ Tailwind gradient utilities
  - เลียนแบบ pattern overlay จาก CSS เดิม

#### 5.2 KnowledgeCard Component

- [ ] **สร้าง `components/features/KnowledgeCard.tsx`**
  - แปลง `.knowledge-card` จาก CSS เดิม
  - Props:
  ```tsx
  interface KnowledgeCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
  }
  ```

- [ ] **เพิ่ม hover effects**
  - Transform และ shadow animations
  - ใช้ Tailwind transition utilities

#### 5.3 FeatureBadge Component

- [ ] **สร้าง `components/features/FeatureBadge.tsx`**
  - แปลง `.feature-badge` จาก CSS เดิม
  - ใช้ gradient background และ shadow

#### 5.4 TeamCard Component

- [ ] **สร้าง `components/features/TeamCard.tsx`**
  - สำหรับแสดงสมาชิกในทีม (about page)
  - Props:
  ```tsx
  interface TeamCardProps {
    name: string;
    role: string;
    image?: string;
    bio?: string;
  }
  ```

### 6. Export Components

- [ ] **สร้าง barrel exports**
  - `components/common/index.ts`:
  ```tsx
  export { Button } from './Button';
  export { Card } from './Card';
  export { Badge } from './Badge';
  export { Icon } from './Icon';
  ```

  - `components/layout/index.ts`:
  ```tsx
  export { Navbar } from './Navbar';
  export { Footer } from './Footer';
  export { Layout } from './Layout';
  ```

  - `components/features/index.ts`:
  ```tsx
  export { Hero } from './Hero';
  export { KnowledgeCard } from './KnowledgeCard';
  export { FeatureBadge } from './FeatureBadge';
  export { TeamCard } from './TeamCard';
  ```

- [ ] **สร้าง main index**
  - `components/index.ts`:
  ```tsx
  export * from './common';
  export * from './layout';
  export * from './features';
  ```

### 7. ทดสอบ Components

- [ ] **สร้างหน้า Component Showcase**
  - สร้าง `src/pages/ComponentShowcase.tsx` (temporary)
  - แสดง components ทั้งหมดเพื่อตรวจสอบ
  - ทดสอบ variants, sizes, states ต่าง ๆ

- [ ] **ทดสอบ Responsive Design**
  - ตรวจสอบบน mobile, tablet, desktop
  - ใช้ Chrome DevTools responsive mode

- [ ] **ตรวจสอบ Accessibility**
  - Button ควรมี proper focus states
  - Links ควรมี aria-labels
  - Colors ควรมี contrast ratio ที่ดี

---

## 📝 Notes / Best Practices

### 1. Tailwind + daisyUI Best Practices

- **ใช้ daisyUI components เป็นฐาน**: ลด boilerplate code
- **Extend กับ Tailwind utilities**: สำหรับ custom spacing, colors
- **Theme configuration**: ตั้งค่า primary/secondary colors ใน CSS variables
- **Responsive utilities**: `sm:`, `md:`, `lg:`, `xl:` สำหรับ breakpoints

### 2. Component Design Principles

- **Single Responsibility**: แต่ละ component ทำหน้าที่เดียว
- **Composition over Configuration**: ใช้ children และ composition แทนการใส่ props มากเกินไป
- **Props Interface ชัดเจน**: ระบุ types ทุกอย่าง
- **Default Props**: ใช้ default parameters สำหรับ optional props

### 3. TypeScript Best Practices

- **ใช้ interface สำหรับ props**: แทน type (convention)
- **Extends HTMLAttributes**: สำหรับ native elements
  ```tsx
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
  }
  ```
- **Avoid `any`**: ใช้ `unknown` หรือ generic types

### 4. Styling Strategy

- **Tailwind utilities first**: ใช้ utility classes มากที่สุด
- **Component classes**: สร้าง reusable classes ด้วย `@layer components`
- **Avoid inline styles**: ยกเว้นกรณี dynamic styles (ใช้ style prop)
- **CSS Modules**: ถ้าจำเป็นต้องใช้ scoped styles

### 5. Performance Considerations

- **Avoid unnecessary re-renders**: ใช้ `React.memo()` สำหรับ pure components
- **Lazy load icons**: ถ้าใช้ icon library ขนาดใหญ่
- **CSS purging**: Tailwind จะ purge unused classes อัตโนมัติ

### 6. Accessibility (a11y)

- **Semantic HTML**: ใช้ `<button>`, `<nav>`, `<main>`, `<footer>` อย่างถูกต้อง
- **ARIA attributes**: เพิ่ม `aria-label`, `aria-expanded` สำหรับ screen readers
- **Keyboard navigation**: ทดสอบด้วย Tab key
- **Focus states**: ใช้ `focus:` utilities ของ Tailwind

---

## ⚠️ สิ่งที่ควรระวัง

1. **อย่าทำ component ที่ซับซ้อนเกินไป**: เริ่มจากง่าย ๆ refactor ทีหลังได้
2. **ทดสอบทุก variant**: ก่อน commit ควรทดสอบ variants, sizes ต่าง ๆ
3. **Consistent naming**: ตั้งชื่อ props และ variants แบบเดียวกันทุก component
4. **Tailwind class order**: ใช้ Prettier plugin เพื่อ sort classes
5. **daisyUI version compatibility**: ตรวจสอบ docs ของ daisyUI v5.5.3

---

## ✨ Expected Outcome

หลังจากจบ Step 02 แล้ว ควรได้:

✅ Common components ที่ reusable (Button, Card, Badge, Icon)  
✅ Layout components พร้อมใช้งาน (Navbar, Footer, Layout)  
✅ Feature components เฉพาะทาง (Hero, KnowledgeCard, TeamCard)  
✅ TypeScript types ครบถ้วนสำหรับทุก component  
✅ Tailwind + daisyUI configuration ถูกต้อง  
✅ Component showcase page สำหรับทดสอบ  
✅ Navigation data structure พร้อมใช้  

---

**หมายเหตุ**: Components เหล่านี้คือ building blocks ของโปรเจกต์ ใช้เวลาออกแบบและทดสอบให้ดี เพราะจะนำไปใช้ซ้ำในทุกหน้า

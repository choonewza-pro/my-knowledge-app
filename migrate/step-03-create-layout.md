# Step 03 – สร้าง Layouts และ Custom Hooks (Layouts & Custom Hooks)

## 🎯 Goal

สร้าง layout templates สำหรับจัดโครงสร้างหน้าเว็บ และ custom React hooks เพื่อจัดการ side effects เช่น document title, scroll behavior และ navigation state เพื่อให้โปรเจกต์มีโครงสร้างที่ดีและนำกลับมาใช้ใหม่ได้ง่าย

---

## ✅ Tasks (Checklist)

### 1. สร้าง Layout Templates

#### 1.1 MainLayout Component

- [ ] **สร้าง `src/layouts/MainLayout.tsx`**
  - Layout พื้นฐานสำหรับหน้าทั่วไป (Home, About, Contact, Product, Map)
  - ประกอบด้วย: Navbar + main content + Footer
  - TypeScript interface:
  ```tsx
  import { Navbar, Footer } from '@/components/layout';

  interface MainLayoutProps {
    children: React.ReactNode;
  }

  export function MainLayout({ children }: MainLayoutProps) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
  ```

- [ ] **เพิ่ม container/wrapper utilities**
  - ใช้ `container mx-auto px-4` สำหรับ max-width และ horizontal padding
  - รองรับ responsive padding

#### 1.2 KnowledgeLayout Component

- [ ] **สร้าง `src/layouts/KnowledgeLayout.tsx`**
  - Layout พิเศษสำหรับหน้าความรู้ (knowledge pages)
  - อาจมี sidebar หรือ breadcrumb
  - TypeScript interface:
  ```tsx
  import { Navbar, Footer } from '@/components/layout';
  import { Outlet } from 'react-router-dom';

  export function KnowledgeLayout() {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="bg-base-200 py-4">
            <div className="container mx-auto px-4">
              {/* Breadcrumb component will be here */}
            </div>
          </div>
          
          {/* Main content */}
          <main className="container mx-auto px-4 py-8">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    );
  }
  ```

- [ ] **สร้าง Breadcrumb component (optional)**
  - `src/components/common/Breadcrumb.tsx`
  - แสดง navigation path (Home > Knowledge > Git Commands)
  ```tsx
  interface BreadcrumbItem {
    label: string;
    path?: string;
  }

  interface BreadcrumbProps {
    items: BreadcrumbItem[];
  }
  ```

#### 1.3 ErrorBoundary Layout (Optional)

- [ ] **สร้าง `src/layouts/ErrorBoundary.tsx`**
  - Layout สำหรับแสดง error page
  - ใช้ร่วมกับ React Router error handling
  ```tsx
  import { useRouteError } from 'react-router-dom';

  export function ErrorBoundary() {
    const error = useRouteError();
    
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold">Oops!</h1>
          <p className="mt-4 text-xl">Something went wrong</p>
          {/* Error details */}
        </div>
      </div>
    );
  }
  ```

### 2. สร้าง Custom Hooks

#### 2.1 useDocumentTitle Hook

- [ ] **สร้าง `src/hooks/useDocumentTitle.ts`**
  - Hook สำหรับเปลี่ยน document title ตามหน้า
  - Support template string
  ```tsx
  import { useEffect } from 'react';

  export function useDocumentTitle(title: string, templateSuffix = ' - Git Workshop') {
    useEffect(() => {
      document.title = `${title}${templateSuffix}`;
      
      // Cleanup: reset to default on unmount
      return () => {
        document.title = 'Git Workshop';
      };
    }, [title, templateSuffix]);
  }
  ```

- [ ] **ทดสอบ hook**
  - ใช้ใน page component
  ```tsx
  useDocumentTitle('Git Commands Reference');
  ```

#### 2.2 useScrollToTop Hook

- [ ] **สร้าง `src/hooks/useScrollToTop.ts`**
  - Hook สำหรับ scroll to top เมื่อเปลี่ยนหน้า
  - รองรับ smooth scrolling
  ```tsx
  import { useEffect } from 'react';
  import { useLocation } from 'react-router-dom';

  export function useScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, [pathname]);
  }
  ```

- [ ] **เพิ่ม hook ใน MainLayout**
  - เรียกใช้ `useScrollToTop()` ใน `MainLayout.tsx`
  ```tsx
  export function MainLayout({ children }: MainLayoutProps) {
    useScrollToTop();
    
    return (
      <div className="flex min-h-screen flex-col">
        {/* ... */}
      </div>
    );
  }
  ```

#### 2.3 useLocalStorage Hook (Optional)

- [ ] **สร้าง `src/hooks/useLocalStorage.ts`**
  - Hook สำหรับจัดการ localStorage
  - ใช้สำหรับเก็บ user preferences (theme, language)
  ```tsx
  import { useState, useEffect } from 'react';

  export function useLocalStorage<T>(
    key: string,
    initialValue: T
  ): [T, (value: T) => void] {
    // Get stored value or use initial
    const [storedValue, setStoredValue] = useState<T>(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });

    // Update localStorage when value changes
    useEffect(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
  }
  ```

#### 2.4 useMediaQuery Hook (Optional)

- [ ] **สร้าง `src/hooks/useMediaQuery.ts`**
  - Hook สำหรับตรวจจับ media queries
  - ใช้สำหรับ responsive behavior
  ```tsx
  import { useState, useEffect } from 'react';

  export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      
      if (media.matches !== matches) {
        setMatches(media.matches);
      }

      const listener = () => setMatches(media.matches);
      media.addEventListener('change', listener);

      return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
  }

  // Usage
  const isMobile = useMediaQuery('(max-width: 768px)');
  ```

#### 2.5 useNavigationState Hook

- [ ] **สร้าง `src/hooks/useNavigationState.ts`**
  - Hook สำหรับจัดการ active navigation state
  - ใช้ใน Navbar component
  ```tsx
  import { useLocation } from 'react-router-dom';

  export function useNavigationState() {
    const location = useLocation();

    const isActive = (path: string) => {
      if (path === '/') {
        return location.pathname === '/';
      }
      return location.pathname.startsWith(path);
    };

    return { isActive, currentPath: location.pathname };
  }
  ```

### 3. สร้าง Utility Functions

#### 3.1 Path Helpers

- [ ] **สร้าง `src/utils/helpers.ts`**
  - Helper functions สำหรับจัดการ paths และ URLs
  ```tsx
  /**
   * ตรวจสอบว่า path เป็น external link หรือไม่
   */
  export function isExternalLink(path: string): boolean {
    return path.startsWith('http://') || path.startsWith('https://');
  }

  /**
   * Format path สำหรับ navigation
   */
  export function formatPath(path: string): string {
    return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  }

  /**
   * Get page title from path
   */
  export function getPageTitle(path: string): string {
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) return 'Home';
    
    const lastSegment = segments[segments.length - 1];
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  ```

#### 3.2 Constants

- [ ] **สร้าง `src/utils/constants.ts`**
  - เก็บค่าคงที่ทั่วโปรเจกต์
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

  export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  } as const;
  ```

### 4. สร้าง TypeScript Types

- [ ] **สร้าง `src/types/index.ts`**
  - Global type definitions
  ```tsx
  export interface NavItem {
    label: string;
    path: string;
    children?: NavItem[];
    icon?: string;
  }

  export interface PageMeta {
    title: string;
    description?: string;
    keywords?: string[];
  }

  export interface KnowledgeItem {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: string;
    link: string;
  }

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
  ```

### 5. Export Hooks และ Utilities

- [ ] **สร้าง `src/hooks/index.ts`**
  ```tsx
  export { useDocumentTitle } from './useDocumentTitle';
  export { useScrollToTop } from './useScrollToTop';
  export { useLocalStorage } from './useLocalStorage';
  export { useMediaQuery } from './useMediaQuery';
  export { useNavigationState } from './useNavigationState';
  ```

- [ ] **สร้าง `src/utils/index.ts`**
  ```tsx
  export * from './helpers';
  export * from './constants';
  ```

### 6. ทดสอบ Layouts และ Hooks

- [ ] **ทดสอบ MainLayout**
  - สร้างหน้าทดสอบง่าย ๆ
  - ตรวจสอบว่า Navbar และ Footer แสดงผลถูกต้อง

- [ ] **ทดสอบ KnowledgeLayout**
  - ตรวจสอบ breadcrumb และ content area

- [ ] **ทดสอบ useDocumentTitle**
  - เปลี่ยนหน้าและดู browser tab title

- [ ] **ทดสอบ useScrollToTop**
  - Scroll ลงไปล่าง แล้วเปลี่ยนหน้า ควร scroll to top อัตโนมัติ

- [ ] **ทดสอบ useNavigationState**
  - ตรวจสอบว่า active menu ทำงานถูกต้อง

---

## 📝 Notes / Best Practices

### 1. Layout Design Principles

- **Consistent structure**: ทุกหน้าควรใช้ layout เดียวกัน (ยกเว้นกรณีพิเศษ)
- **Flex layout**: ใช้ flexbox เพื่อให้ footer อยู่ด้านล่างเสมอ
- **Responsive containers**: ใช้ `container mx-auto` สำหรับ max-width
- **Outlet pattern**: ใช้ `<Outlet />` สำหรับ nested routes

### 2. Custom Hooks Best Practices

- **Single responsibility**: แต่ละ hook ทำหน้าที่เดียว
- **Naming convention**: ขึ้นต้นด้วย `use` เสมอ
- **TypeScript generics**: ใช้สำหรับ reusable hooks
- **Cleanup effects**: ใช้ `return () => {}` ใน useEffect สำหรับ cleanup

### 3. useEffect Dependencies

- **ระบุ dependencies ครบ**: ใส่ทุกตัวแปรที่ใช้ใน effect
- **ใช้ ESLint rules**: `react-hooks/exhaustive-deps` จะช่วยตรวจสอบ
- **Avoid infinite loops**: ระวัง dependencies ที่เปลี่ยนแปลงตลอดเวลา

### 4. Performance Optimization

- **Memoize expensive calculations**: ใช้ `useMemo()` ถ้าจำเป็น
- **Debounce scroll events**: ใช้ debounce สำหรับ scroll listeners
- **Lazy load layouts**: ใช้ `React.lazy()` ถ้า layout ใหญ่

### 5. TypeScript Tips

- **Use const assertions**: `as const` สำหรับ readonly objects
- **Union types**: สำหรับ enums และ constants
- **Generic hooks**: ทำให้ hooks reusable มากขึ้น
  ```tsx
  function useLocalStorage<T>(key: string, initial: T): [T, (val: T) => void]
  ```

### 6. Accessibility

- **Skip to content link**: เพิ่มใน layout สำหรับ keyboard users
- **Semantic HTML**: `<main>`, `<nav>`, `<footer>`
- **Focus management**: จัดการ focus เมื่อเปลี่ยนหน้า

---

## ⚠️ สิ่งที่ควรระวัง

1. **Memory leaks**: cleanup subscriptions และ event listeners ใน useEffect
2. **Infinite re-renders**: ระวัง dependencies ที่เปลี่ยนแปลงตลอด
3. **Scroll behavior**: ทดสอบ scroll to top บน mobile ด้วย
4. **Layout shift**: หลีกเลี่ยง CLS (Cumulative Layout Shift)
5. **SEO**: ใช้ helmet หรือ meta tags อย่างถูกต้อง

---

## ✨ Expected Outcome

หลังจากจบ Step 03 แล้ว ควรได้:

✅ MainLayout สำหรับหน้าทั่วไป พร้อม Navbar + Footer  
✅ KnowledgeLayout สำหรับหน้าความรู้ พร้อม breadcrumb  
✅ useDocumentTitle hook สำหรับเปลี่ยน page title  
✅ useScrollToTop hook สำหรับ scroll behavior  
✅ useNavigationState hook สำหรับ active menu  
✅ Helper functions และ constants พร้อมใช้  
✅ TypeScript types ครบถ้วนสำหรับ data structures  
✅ Layouts และ hooks ทดสอบแล้วใช้งานได้  

---

**หมายเหตุ**: Layouts และ hooks เป็น foundation สำคัญ ทำให้ดี จะช่วยลดโค้ดซ้ำซ้อนและทำให้โปรเจกต์ maintainable

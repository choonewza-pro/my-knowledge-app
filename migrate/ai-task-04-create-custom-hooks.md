# AI Task 04 - Create Custom React Hooks

## 🎯 Task Goal
สร้าง custom React hooks ที่จำเป็นสำหรับจัดการ document title, scroll behavior และ helper functions

---

## 📋 Requirements

### 1. สร้างโครงสร้างโฟลเดอร์
```
src/
  hooks/
    useDocumentTitle.ts
    useScrollToTop.ts
    index.ts
  utils/
    helpers.ts
    constants.ts (มีอยู่แล้วจาก task 03)
    index.ts
```

### 2. useDocumentTitle Hook

**ไฟล์:** `src/hooks/useDocumentTitle.ts`

**ต้องการ:**
- เปลี่ยน `document.title` ตาม page
- Support template suffix (default: " - Git Workshop")
- Cleanup เมื่อ unmount

```tsx
import { useEffect } from 'react';

/**
 * Hook สำหรับเปลี่ยน document title
 * @param title - Title ของหน้า
 * @param templateSuffix - Suffix ที่จะต่อท้าย title (default: " - Git Workshop")
 */
export function useDocumentTitle(
  title: string,
  templateSuffix: string = ' - Git Workshop'
) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title}${templateSuffix}`;

    // Cleanup: restore previous title on unmount
    return () => {
      document.title = previousTitle;
    };
  }, [title, templateSuffix]);
}
```

**Usage Example:**
```tsx
// ใน HomePage
useDocumentTitle('Git Workshop - เรียนรู้การจัดการ Source Code อย่างมืออาชีพ', '');

// ใน AboutPage
useDocumentTitle('เกี่ยวกับเรา');

// ผลลัพธ์: "เกี่ยวกับเรา - Git Workshop"
```

### 3. useScrollToTop Hook

**ไฟล์:** `src/hooks/useScrollToTop.ts`

**ต้องการ:**
- Scroll to top เมื่อ pathname เปลี่ยน
- รองรับ smooth scrolling
- ใช้ร่วมกับ react-router-dom

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook สำหรับ scroll to top เมื่อเปลี่ยนหน้า
 */
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

**Usage Example:**
```tsx
// ใน MainLayout
export function MainLayout() {
  useScrollToTop();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

### 4. Helper Functions

**ไฟล์:** `src/utils/helpers.ts`

```tsx
/**
 * ตรวจสอบว่า path เป็น external link หรือไม่
 */
export function isExternalLink(path: string): boolean {
  return path.startsWith('http://') || path.startsWith('https://');
}

/**
 * Format path สำหรับ navigation (remove trailing slash)
 */
export function formatPath(path: string): string {
  return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
}

/**
 * Get page title from path
 * @example getPageTitle('/knowledge/git-commands') => 'Git Commands'
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

/**
 * Combine classNames (simple version)
 * สำหรับ merge Tailwind classes
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

**Usage Examples:**
```tsx
// isExternalLink
isExternalLink('https://github.com') // true
isExternalLink('/about') // false

// getPageTitle
getPageTitle('/knowledge/git-commands') // 'Git Commands'
getPageTitle('/about') // 'About'

// cn
cn('btn', 'btn-primary', loading && 'loading') // 'btn btn-primary loading'
```

### 5. Barrel Exports

**ไฟล์:** `src/hooks/index.ts`
```tsx
export { useDocumentTitle } from './useDocumentTitle';
export { useScrollToTop } from './useScrollToTop';
```

**ไฟล์:** `src/utils/index.ts`
```tsx
export * from './constants';
export * from './helpers';
```

---

## ✅ Acceptance Criteria

1. ✅ `useDocumentTitle` เปลี่ยน document.title ได้ถูกต้อง
2. ✅ `useDocumentTitle` cleanup title เมื่อ unmount
3. ✅ `useScrollToTop` scroll to top เมื่อเปลี่ยน route
4. ✅ Helper functions ทำงานถูกต้องตาม test cases
5. ✅ ทุก function มี JSDoc comments
6. ✅ Export ผ่าน barrel files
7. ✅ ไม่มี TypeScript errors

---

## 🧪 Testing

### Test useDocumentTitle:
```tsx
// สร้าง test component
function TestDocumentTitle() {
  useDocumentTitle('Test Page');
  
  return (
    <div>
      <p>Check browser tab: should show "Test Page - Git Workshop"</p>
    </div>
  );
}
```

### Test useScrollToTop:
```tsx
// ทดสอบโดย:
// 1. Scroll ลงไปด้านล่างหน้า
// 2. เปลี่ยน route (คลิก link)
// 3. ควร scroll กลับไปด้านบน (smooth)
```

### Test Helpers:
```tsx
// Add to App.tsx temporarily
console.log('External:', isExternalLink('https://github.com')); // true
console.log('Internal:', isExternalLink('/about')); // false
console.log('Title:', getPageTitle('/knowledge/git-commands')); // 'Git Commands'
console.log('Classes:', cn('btn', 'btn-primary', null, 'text-lg')); // 'btn btn-primary text-lg'
```

---

## 📝 Implementation Notes

1. **useDocumentTitle:**
   - เก็บ previous title เพื่อ restore เมื่อ unmount
   - Template suffix เป็น optional parameter

2. **useScrollToTop:**
   - ใช้ `behavior: 'smooth'` สำหรับ smooth scrolling
   - Listen to pathname changes จาก `useLocation()`

3. **Helper Functions:**
   - ทุก function ควรเป็น pure functions
   - Return type ชัดเจน
   - มี JSDoc comments

---

## 🔗 Dependencies

- `react` - สำหรับ hooks (useEffect)
- `react-router-dom` - สำหรับ useLocation (ใน useScrollToTop)

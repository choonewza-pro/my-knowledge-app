# AI Task 06 - Create Layout Templates (MainLayout & KnowledgeLayout)

## 🎯 Task Goal
สร้าง layout templates สำหรับ wrap หน้าต่าง ๆ ของแอปพลิเคชัน

---

## 📋 Requirements

### 1. สร้างโครงสร้างโฟลเดอร์
```
src/
  layouts/
    MainLayout.tsx
    KnowledgeLayout.tsx
    index.ts
```

### 2. MainLayout Component

**ไฟล์:** `src/layouts/MainLayout.tsx`

**ต้องการ:**
- Navbar + Outlet + Footer structure
- Flex layout (footer ติดด้านล่างเสมอ)
- ใช้ `useScrollToTop` hook
- รองรับ nested routes ด้วย `<Outlet />`

```tsx
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { useScrollToTop } from '@/hooks';

/**
 * Main layout สำหรับหน้าทั่วไป (Home, About, Contact, Product, Map)
 */
export function MainLayout() {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
```

**Key Features:**
- `min-h-screen`: ความสูงขั้นต่ำเต็มหน้าจอ
- `flex flex-col`: layout แนวตั้ง
- `flex-1`: main content ขยายเต็มพื้นที่ว่าง
- `<Outlet />`: render child routes

### 3. KnowledgeLayout Component

**ไฟล์:** `src/layouts/KnowledgeLayout.tsx`

**ต้องการ:**
- Navbar + Breadcrumb + Outlet + Footer structure
- Breadcrumb navigation แสดง path
- Container สำหรับ content area
- ใช้ `useScrollToTop` และ `getPageTitle` helper

```tsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { useScrollToTop } from '@/hooks';
import { getPageTitle } from '@/utils/helpers';

/**
 * Knowledge layout สำหรับหน้าความรู้
 * มี breadcrumb navigation และ content container
 */
export function KnowledgeLayout() {
  useScrollToTop();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-base-200 py-4">
        <div className="container mx-auto px-4">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to="/" className="hover:text-primary">
                  <i className="bi-house-door mr-1"></i>
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="hover:text-primary">
                  ความรู้
                </Link>
              </li>
              <li className="font-semibold">{pageTitle}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-base-100">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
```

**Key Features:**
- Breadcrumb: แสดง navigation path
- `getPageTitle()`: แปลง URL path เป็น title
- Container: จำกัด max-width และใส่ padding
- daisyUI breadcrumbs component

### 4. Barrel Export

**ไฟล์:** `src/layouts/index.ts`

```tsx
export { MainLayout } from './MainLayout';
export { KnowledgeLayout } from './KnowledgeLayout';
```

---

## ✅ Acceptance Criteria

1. ✅ MainLayout render Navbar + Outlet + Footer ถูกต้อง
2. ✅ MainLayout มี flex layout (footer ติดด้านล่าง)
3. ✅ KnowledgeLayout มี breadcrumb navigation
4. ✅ KnowledgeLayout แสดง page title จาก URL
5. ✅ ทั้งสอง layouts ใช้ `useScrollToTop()`
6. ✅ `<Outlet />` พร้อมสำหรับ child routes
7. ✅ Responsive design ทำงานได้
8. ✅ ไม่มี TypeScript errors

---

## 🎨 Design Reference

**MainLayout:**
- Structure: Navbar → Main (flex-1) → Footer
- Main: ไม่มี padding (ให้ page components จัดการเอง)

**KnowledgeLayout:**
- Structure: Navbar → Breadcrumb → Main (container + padding) → Footer
- Breadcrumb background: `bg-base-200`
- Breadcrumb padding: `py-4`
- Main container: `container mx-auto px-4 py-8`

**Breadcrumb:**
- ใช้ daisyUI `.breadcrumbs` class
- Icons: Bootstrap Icons (`bi-house-door`)
- Links: hover:text-primary
- Current page: `font-semibold` (ไม่ใช่ link)

---

## 🧪 Testing

### Test MainLayout:
```tsx
// ใน App.tsx (temporary)
import { MainLayout } from '@/layouts';

function App() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold">Test Main Layout</h1>
        <p className="mt-4">This is the content area</p>
      </div>
    </MainLayout>
  );
}
```

### Test KnowledgeLayout:
```tsx
// ใน App.tsx (temporary)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { KnowledgeLayout } from '@/layouts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<KnowledgeLayout />}>
          <Route
            path="/knowledge/git-commands"
            element={
              <div>
                <h1 className="text-4xl font-bold">Git Commands</h1>
                <p className="mt-4">Content here...</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

**ต้องตรวจสอบ:**
- ✅ Breadcrumb แสดง: หน้าแรก → ความรู้ → Git Commands
- ✅ Scroll to top เมื่อเปลี่ยนหน้า
- ✅ Footer ติดด้านล่างเสมอ (แม้ content น้อย)

---

## 📝 Implementation Notes

1. **Flex Layout:**
   - Parent: `flex flex-col min-h-screen`
   - Main: `flex-1` (ขยายเต็มพื้นที่)
   - ทำให้ Footer ติดด้านล่างเสมอ

2. **Outlet:**
   - จาก react-router-dom v7
   - Render child routes ที่ match
   - ใช้แทน `{children}` ใน nested routing

3. **Breadcrumb:**
   - ใช้ daisyUI `.breadcrumbs` class
   - Structure: `<div class="breadcrumbs"><ul><li>...</li></ul></div>`
   - Current page ไม่ใช่ `<Link>` (แค่ text)

4. **Container:**
   - KnowledgeLayout ใช้ container ใน main
   - MainLayout ไม่ใช้ (ให้ pages จัดการเอง)

---

## 🔗 Dependencies

- `react-router-dom` - สำหรับ Outlet, Link, useLocation
- `@/hooks` - สำหรับ useScrollToTop
- `@/utils/helpers` - สำหรับ getPageTitle
- `@/components/layout` - สำหรับ Navbar, Footer

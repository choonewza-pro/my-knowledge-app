# AI Task 11 - Setup React Router v7

## 🎯 Task Goal
ตั้งค่า React Router v7 พร้อม routes configuration, lazy loading, และ error boundaries

---

## 📋 Requirements

### 1. สร้างโครงสร้างไฟล์
```
src/
  router/
    index.tsx
    routes.tsx
  pages/
    ErrorPage.tsx
    NotFoundPage.tsx
```

---

## 2. สร้าง Error Pages

**ไฟล์:** `src/pages/ErrorPage.tsx`

**ต้องการ:**
- Catch-all error boundary
- แสดง error message
- Back to home button

```tsx
import { useRouteError, Link } from 'react-router-dom';
import { Card } from '@/components/common';

export function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 px-4">
      <Card variant="elevated" className="max-w-lg text-center">
        <div className="mb-6 text-6xl text-error">
          <i className="bi-exclamation-triangle"></i>
        </div>

        <h1 className="mb-4 text-3xl font-bold">เกิดข้อผิดพลาด!</h1>

        <p className="mb-6 text-base-content/70">
          {error?.message || 'เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง'}
        </p>

        <Link to="/" className="btn btn-primary">
          <i className="bi-house-door mr-2"></i>
          กลับหน้าแรก
        </Link>
      </Card>
    </div>
  );
}
```

**ไฟล์:** `src/pages/NotFoundPage.tsx`

**ต้องการ:**
- 404 error page
- Helpful navigation links

```tsx
import { Link } from 'react-router-dom';
import { Card } from '@/components/common';
import { useDocumentTitle } from '@/hooks';
import { ROUTES } from '@/utils/constants';

export function NotFoundPage() {
  useDocumentTitle('404 - ไม่พบหน้าที่ค้นหา');

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 px-4">
      <Card variant="elevated" className="max-w-lg text-center">
        <div className="mb-6 text-9xl font-bold text-base-content/20">404</div>

        <h1 className="mb-4 text-3xl font-bold">ไม่พบหน้าที่ค้นหา</h1>

        <p className="mb-8 text-base-content/70">
          ขอโทษครับ หน้าที่คุณกำลังมองหาอาจถูกย้ายหรือลบไปแล้ว
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to={ROUTES.HOME} className="btn btn-primary">
            <i className="bi-house-door mr-2"></i>
            หน้าแรก
          </Link>
          <Link to={ROUTES.KNOWLEDGE.GIT_COMMANDS} className="btn btn-outline">
            <i className="bi-book mr-2"></i>
            ดูเนื้อหาความรู้
          </Link>
        </div>
      </Card>
    </div>
  );
}
```

---

## 3. สร้าง Routes Configuration

**ไฟล์:** `src/router/routes.tsx`

**ต้องการ:**
- Lazy load components
- Nested routes ใช้ layouts
- Error boundaries

```tsx
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { MainLayout, KnowledgeLayout } from '@/components/layouts';
import { ErrorPage } from '@/pages/ErrorPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Lazy load pages
const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage }))
);

const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);

const ProductPage = lazy(() =>
  import('@/pages/ProductPage').then((m) => ({ default: m.ProductPage }))
);

const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

const MapPage = lazy(() =>
  import('@/pages/MapPage').then((m) => ({ default: m.MapPage }))
);

// Lazy load knowledge pages
const GitCommandsPage = lazy(() =>
  import('@/pages/knowledge/GitCommandsPage').then((m) => ({
    default: m.GitCommandsPage,
  }))
);

const GitNamingGuidePage = lazy(() =>
  import('@/pages/knowledge/GitNamingGuidePage').then((m) => ({
    default: m.GitNamingGuidePage,
  }))
);

const GitNamingSummaryPage = lazy(() =>
  import('@/pages/knowledge/GitNamingSummaryPage').then((m) => ({
    default: m.GitNamingSummaryPage,
  }))
);

const GitWorkflowFeaturePage = lazy(() =>
  import('@/pages/knowledge/GitWorkflowFeaturePage').then((m) => ({
    default: m.GitWorkflowFeaturePage,
  }))
);

const GitWorkflowBugfixPage = lazy(() =>
  import('@/pages/knowledge/GitWorkflowBugfixPage').then((m) => ({
    default: m.GitWorkflowBugfixPage,
  }))
);

const GitWorkflowHotfixPage = lazy(() =>
  import('@/pages/knowledge/GitWorkflowHotfixPage').then((m) => ({
    default: m.GitWorkflowHotfixPage,
  }))
);

const GitHubActionsPage = lazy(() =>
  import('@/pages/knowledge/GitHubActionsPage').then((m) => ({
    default: m.GitHubActionsPage,
  }))
);

const GitHubGuidePage = lazy(() =>
  import('@/pages/knowledge/GitHubGuidePage').then((m) => ({
    default: m.GitHubGuidePage,
  }))
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'product',
        element: <ProductPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      // Knowledge routes (nested under KnowledgeLayout)
      {
        path: 'knowledge',
        element: <KnowledgeLayout />,
        children: [
          {
            path: 'git-commands-reference',
            element: <GitCommandsPage />,
          },
          {
            path: 'git-naming-guide',
            element: <GitNamingGuidePage />,
          },
          {
            path: 'git-naming-summary-tables',
            element: <GitNamingSummaryPage />,
          },
          {
            path: 'git-workflow-add-feature',
            element: <GitWorkflowFeaturePage />,
          },
          {
            path: 'git-workflow-bugfix',
            element: <GitWorkflowBugfixPage />,
          },
          {
            path: 'git-workflow-hotfix',
            element: <GitWorkflowHotfixPage />,
          },
          {
            path: 'github-actions-guide',
            element: <GitHubActionsPage />,
          },
          {
            path: 'github-guide',
            element: <GitHubGuidePage />,
          },
        ],
      },
      // 404 - Not Found
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
```

---

## 4. สร้าง Router Instance

**ไฟล์:** `src/router/index.tsx`

**ต้องการ:**
- createBrowserRouter
- Export router instance

```tsx
import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

export const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});
```

---

## 5. อัพเดท main.tsx

**ไฟล์:** `src/main.tsx`

**เปลี่ยนจาก:**
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**เป็น:**
```tsx
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import './index.css';

// Loading component
function AppLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/60">กำลังโหลด...</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<AppLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
```

---

## 6. อัพเดท tsconfig Paths (optional)

**ไฟล์:** `tsconfig.app.json` หรือ `tsconfig.json`

**ตรวจสอบว่ามี path alias:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**ถ้ายังไม่มี ให้เพิ่มใน `vite.config.ts`:**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## ✅ Acceptance Criteria

1. ✅ Router ตั้งค่าด้วย createBrowserRouter
2. ✅ ทุก route lazy load components
3. ✅ Main pages ใช้ MainLayout
4. ✅ Knowledge pages ใช้ KnowledgeLayout (nested)
5. ✅ ErrorPage catch errors ทั้งหมด
6. ✅ NotFoundPage แสดงสำหรับ unknown routes
7. ✅ Suspense loading แสดงขณะ lazy load
8. ✅ Future flags enabled
9. ✅ ไม่มี TypeScript errors
10. ✅ Navigation ทำงานได้ทุก route

---

## 🧪 Testing

### Router Setup:
1. ✅ Start dev server: routes ทั้งหมด accessible
2. ✅ Navigate ระหว่างหน้า: transitions smooth
3. ✅ Refresh หน้า: routes ยังคง work
4. ✅ Invalid URL → NotFoundPage แสดงผล

### Lazy Loading:
1. ✅ Network tab: components load on-demand
2. ✅ Suspense fallback แสดงขณะโหลด
3. ✅ No console errors

### Error Handling:
1. ✅ Throw error ใน component → ErrorPage แสดงผล
2. ✅ Error message แสดงถูกต้อง
3. ✅ "กลับหน้าแรก" button ทำงาน

### Layouts:
1. ✅ Main pages: Navbar + Footer แสดงผล
2. ✅ Knowledge pages: Breadcrumb + layout แสดงผล
3. ✅ Nested Outlet render ถูกต้อง

---

## 📝 Implementation Notes

1. **Lazy Loading:**
   - ใช้ `React.lazy()` และ `import()`
   - Wrap ด้วย `<Suspense>` ใน main.tsx
   - Default export pattern: `{ default: ComponentName }`

2. **Routes Structure:**
   ```
   / (MainLayout)
     ├─ index (HomePage)
     ├─ about
     ├─ product
     ├─ contact
     ├─ map
     ├─ knowledge (KnowledgeLayout - nested)
     │    ├─ git-commands-reference
     │    ├─ git-naming-guide
     │    └─ ... (6 more)
     └─ * (NotFoundPage)
   ```

3. **Error Boundaries:**
   - Router-level: `errorElement` ใน root route
   - Catch errors จาก loaders, actions, renders

4. **Future Flags:**
   - `v7_startTransition`: ใช้ React transitions
   - `v7_relativeSplatPath`: Relative path resolution

---

## 🔗 References

- React Router v7 Docs: https://reactrouter.com/
- Lazy Loading: https://react.dev/reference/react/lazy
- Code Splitting: https://react.dev/learn/code-splitting

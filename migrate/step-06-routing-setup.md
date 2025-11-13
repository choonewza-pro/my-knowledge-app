# Step 06 – ตั้งค่า Routing ด้วย React Router v7 (Routing Setup)

## 🎯 Goal

ตั้งค่า React Router v7 (Data Router API) เพื่อจัดการ routing ทั้งหมดของแอปพลิเคชัน รวมถึง nested routes, lazy loading และ error handling เพื่อให้การนำทางระหว่างหน้าทำงานได้อย่างสมบูรณ์

---

## ✅ Tasks (Checklist)

### 1. สร้าง Routes Configuration

#### 1.1 Setup Main Routes File

- [ ] **สร้าง `src/routes/index.tsx`**
  - ใช้ `createBrowserRouter` จาก react-router-dom v7
  - กำหนด routes ทั้งหมด
  ```tsx
  import { createBrowserRouter, RouterProvider } from 'react-router-dom';
  import { lazy, Suspense } from 'react';
  import { MainLayout } from '@/layouts/MainLayout';
  import { KnowledgeLayout } from '@/layouts/KnowledgeLayout';

  // Lazy load pages
  const HomePage = lazy(() => import('@/pages/HomePage'));
  const AboutPage = lazy(() => import('@/pages/AboutPage'));
  const ContactPage = lazy(() => import('@/pages/ContactPage'));
  const ProductPage = lazy(() => import('@/pages/ProductPage'));
  const MapPage = lazy(() => import('@/pages/MapPage'));

  // Lazy load knowledge pages
  const GitCommandsPage = lazy(() => import('@/pages/knowledge/GitCommandsPage'));
  const GitNamingGuidePage = lazy(() => import('@/pages/knowledge/GitNamingGuidePage'));
  const GitNamingSummaryPage = lazy(() => import('@/pages/knowledge/GitNamingSummaryPage'));
  const GitWorkflowFeaturePage = lazy(() => import('@/pages/knowledge/GitWorkflowFeaturePage'));
  const GitWorkflowBugfixPage = lazy(() => import('@/pages/knowledge/GitWorkflowBugfixPage'));
  const GitWorkflowHotfixPage = lazy(() => import('@/pages/knowledge/GitWorkflowHotfixPage'));
  const GitHubActionsPage = lazy(() => import('@/pages/knowledge/GitHubActionsPage'));
  const GitHubGuidePage = lazy(() => import('@/pages/knowledge/GitHubGuidePage'));

  // Loading component
  function PageLoader() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Error component
  function ErrorPage() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="mt-4 text-xl">Page not found</p>
          <a href="/" className="btn btn-primary mt-8">
            กลับหน้าแรก
          </a>
        </div>
      </div>
    );
  }

  export const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: 'about',
          element: (
            <Suspense fallback={<PageLoader />}>
              <AboutPage />
            </Suspense>
          ),
        },
        {
          path: 'contact',
          element: (
            <Suspense fallback={<PageLoader />}>
              <ContactPage />
            </Suspense>
          ),
        },
        {
          path: 'product',
          element: (
            <Suspense fallback={<PageLoader />}>
              <ProductPage />
            </Suspense>
          ),
        },
        {
          path: 'map',
          element: (
            <Suspense fallback={<PageLoader />}>
              <MapPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: 'knowledge',
      element: <KnowledgeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'git-commands',
          element: (
            <Suspense fallback={<PageLoader />}>
              <GitCommandsPage />
            </Suspense>
          ),
        },
        {
          path: 'git-naming-guide',
          element: (
            <Suspense fallback={<PageLoader />}>
              <GitNamingGuidePage />
            </Suspense>
          ),
        },
        {
          path: 'git-naming-summary',
          element: (
            <Suspense fallback={<PageLoader />}>
              <GitNamingSummaryPage />
            </Suspense>
          ),
        },
        {
          path: 'git-workflow-feature',
          element: (
            <Suspense fallback={<PageLoader />}>
              <GitWorkflowFeaturePage />
            </Suspense>
          ),
        },
        {
          path: 'git-workflow-bugfix',
          element: (
            <Suspense fallback={<PageLoader />}>
              <GitWorkflowBugfixPage />
            </Suspense>
          ),
        },
        {
          path: 'git-workflow-hotfix',
          element: (
            <Suspense fallback={<PageLoader />}>
              <GitWorkflowHotfixPage />
            </Suspense>
          ),
        },
        {
          path: 'github-actions',
          element: (
            <Suspense fallback={<PageLoader />}>
              <GitHubActionsPage />
            </Suspense>
          ),
        },
        {
          path: 'github-guide',
          element: (
            <Suspense fallback={<PageLoader />}>
              <GitHubGuidePage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ]);
  ```

### 2. อัพเดท App.tsx

- [ ] **แก้ไข `src/App.tsx`**
  - ใช้ RouterProvider แทน component tree
  ```tsx
  import { RouterProvider } from 'react-router-dom';
  import { router } from './routes';

  function App() {
    return <RouterProvider router={router} />;
  }

  export default App;
  ```

### 3. อัพเดท Layout Components

#### 3.1 แก้ไข MainLayout

- [ ] **อัพเดท `src/layouts/MainLayout.tsx`**
  - ใช้ `<Outlet />` สำหรับ render child routes
  ```tsx
  import { Outlet } from 'react-router-dom';
  import { Navbar, Footer } from '@/components/layout';
  import { useScrollToTop } from '@/hooks';

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

#### 3.2 แก้ไข KnowledgeLayout

- [ ] **อัพเดท `src/layouts/KnowledgeLayout.tsx`**
  - ใช้ `<Outlet />` สำหรับ render knowledge pages
  - เพิ่ม breadcrumb navigation
  ```tsx
  import { Outlet, Link, useLocation } from 'react-router-dom';
  import { Navbar, Footer } from '@/components/layout';
  import { useScrollToTop } from '@/hooks';
  import { getPageTitle } from '@/utils/helpers';

  export function KnowledgeLayout() {
    useScrollToTop();
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);

    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        {/* Breadcrumb */}
        <div className="bg-base-200 py-4">
          <div className="container mx-auto px-4">
            <div className="breadcrumbs text-sm">
              <ul>
                <li><Link to="/">หน้าแรก</Link></li>
                <li><Link to="/knowledge">ความรู้</Link></li>
                <li>{pageTitle}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    );
  }
  ```

### 4. อัพเดท Navigation Data

- [ ] **อัพเดท `src/data/navigation.ts`**
  - ใช้ paths จาก constants
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
        },
        {
          label: 'GitHub Actions',
          path: ROUTES.KNOWLEDGE.GITHUB_ACTIONS,
        },
        {
          label: 'Git Commands',
          path: ROUTES.KNOWLEDGE.GIT_COMMANDS,
        },
        {
          label: 'Git Naming Guide',
          path: ROUTES.KNOWLEDGE.GIT_NAMING_GUIDE,
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
        },
        {
          label: 'Bugfix',
          path: ROUTES.KNOWLEDGE.GIT_WORKFLOW_BUGFIX,
        },
        {
          label: 'Hotfix',
          path: ROUTES.KNOWLEDGE.GIT_WORKFLOW_HOTFIX,
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

### 5. อัพเดท Navbar Component

- [ ] **อัพเดท `src/components/layout/Navbar.tsx`**
  - ใช้ `Link` และ `NavLink` จาก react-router-dom
  - เพิ่ม active state สำหรับ current page
  ```tsx
  import { Link, NavLink } from 'react-router-dom';
  import { navigationItems } from '@/data/navigation';
  import { useNavigationState } from '@/hooks';

  export function Navbar() {
    const { isActive } = useNavigationState();

    return (
      <nav className="navbar bg-base-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex-1">
            <Link to="/" className="text-xl font-bold">
              Git Workshop
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  {item.children ? (
                    <details>
                      <summary>{item.label}</summary>
                      <ul className="w-52 bg-base-100 p-2">
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <NavLink
                              to={child.path}
                              className={({ isActive }) =>
                                isActive ? 'active' : ''
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? 'active' : ''
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
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
                className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
              >
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    {item.children ? (
                      <>
                        <span className="menu-title">{item.label}</span>
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <Link to={child.path}>{child.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link to={item.path}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  ```

### 6. ตั้งค่า Path Aliases (Optional)

- [ ] **แก้ไข `vite.config.ts`**
  - เพิ่ม path alias `@/` สำหรับ `src/`
  ```ts
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import tailwindcss from '@tailwindcss/vite';
  import path from 'path';

  export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  });
  ```

- [ ] **แก้ไข `tsconfig.json`**
  - เพิ่ม path mapping สำหรับ TypeScript
  ```json
  {
    "compilerOptions": {
      // ... existing options
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
  ```

### 7. ทดสอบ Routing

- [ ] **ทดสอบ Direct Navigation**
  - พิมพ์ URL โดยตรง (เช่น `/about`, `/knowledge/git-commands`)
  - ตรวจสอบว่า page ถูกต้อง

- [ ] **ทดสอบ Link Navigation**
  - คลิกลิงก์จาก Navbar
  - คลิกลิงก์จาก Knowledge Cards
  - ตรวจสอบว่าไม่มี page reload

- [ ] **ทดสอบ Browser Navigation**
  - Back button
  - Forward button
  - ตรวจสอบว่า history ทำงานถูกต้อง

- [ ] **ทดสอบ 404 Page**
  - เข้า URL ที่ไม่มี (เช่น `/not-found`)
  - ตรวจสอบว่าแสดง error page

- [ ] **ทดสอบ Lazy Loading**
  - เปิด Network tab ใน DevTools
  - ตรวจสอบว่ามี chunk files แยกกัน
  - ตรวจสอบว่า loading spinner แสดงขึ้น

- [ ] **ทดสอบ Scroll Behavior**
  - เปลี่ยนหน้าควร scroll to top
  - Anchor links ควรทำงานได้

### 8. ตั้งค่า Development Server

- [ ] **แก้ไข `vite.config.ts`** (ถ้าจำเป็น)
  - เพิ่ม config สำหรับ dev server
  ```ts
  export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  });
  ```

### 9. ตั้งค่า Production Build

- [ ] **ทดสอบ Build**
  ```powershell
  npm run build
  ```
  - ตรวจสอบว่า build สำเร็จ
  - ตรวจสอบ output ใน `dist/` folder
  - ดู chunk files และ sizes

- [ ] **ทดสอบ Preview**
  ```powershell
  npm run preview
  ```
  - ตรวจสอบว่า production build ทำงานได้
  - ทดสอบ routing บน production build

---

## 📝 Notes / Best Practices

### 1. React Router v7 Data Router

- **ใช้ `createBrowserRouter`**: แทน `BrowserRouter` (legacy)
- **Nested routes**: ใช้ `children` array สำหรับ nested routing
- **Outlet component**: ใช้ `<Outlet />` ใน parent layout
- **Error boundaries**: กำหนด `errorElement` สำหรับ error handling

### 2. Lazy Loading Strategy

- **Page-level splitting**: lazy load ทุก page component
- **Suspense boundaries**: ใช้ `<Suspense>` wrapper สำหรับ lazy components
- **Loading states**: แสดง loading spinner ระหว่าง load
- **Error boundaries**: จัดการ load errors อย่างเหมาะสม

### 3. Navigation Best Practices

- **Use Link components**: แทน `<a href>` เพื่อไม่ให้ reload
- **NavLink for active states**: ใช้ `NavLink` เพื่อ highlight active page
- **Relative paths**: ใช้ relative paths สำหรับ nested routes
- **Programmatic navigation**: ใช้ `useNavigate()` hook ถ้าจำเป็น

### 4. Path Aliases

- **Consistent imports**: ใช้ `@/` prefix สำหรับ imports
- **IDE support**: VS Code จะ autocomplete paths
- **Refactoring**: ง่ายต่อการ move files

### 5. Performance

- **Code splitting**: ลด initial bundle size
- **Prefetch**: ใช้ `<link rel="prefetch">` สำหรับ likely routes
- **Cache**: Vite จะ cache chunks อัตโนมัติ

### 6. SEO Considerations

- **Server-side rendering**: พิจารณา SSR ถ้าต้องการ SEO ดีมาก (ใช้ Remix หรือ Next.js)
- **Meta tags**: ใช้ react-helmet-async สำหรับ dynamic meta tags
- **Sitemap**: สร้าง sitemap.xml สำหรับ search engines

---

## ⚠️ สิ่งที่ควรระวัง

1. **Lazy loading errors**: ต้องมี error boundary เพื่อจัดการ load failures
2. **Route conflicts**: ตรวจสอบว่าไม่มี paths ซ้ำกัน
3. **Nested route paths**: ไม่ต้องใส่ `/` หน้า nested route paths
4. **404 handling**: ต้องมี catch-all route (`path: '*'`)
5. **Scroll restoration**: อาจต้อง config เพิ่มเติมสำหรับ scroll behavior

---

## ✨ Expected Outcome

หลังจากจบ Step 06 แล้ว ควรได้:

✅ React Router v7 ตั้งค่าเสร็จสมบูรณ์  
✅ Routes ทั้งหมดทำงานได้ (main pages + knowledge pages)  
✅ Nested routes สำหรับ knowledge pages  
✅ Lazy loading สำหรับทุก page  
✅ Loading states และ error handling  
✅ Navbar navigation ทำงานได้ พร้อม active states  
✅ Breadcrumb navigation ใน knowledge pages  
✅ 404 error page  
✅ Back/Forward browser buttons ทำงานได้  
✅ Scroll to top เมื่อเปลี่ยนหน้า  

---

**หมายเหตุ**: Routing เป็นหัวใจสำคัญของ SPA ตั้งค่าให้ดีจะทำให้ user experience ดีขึ้นมาก ทดสอบทุก route path ก่อนไป step ต่อไป

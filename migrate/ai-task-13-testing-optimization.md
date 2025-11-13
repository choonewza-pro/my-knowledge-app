# AI Task 13 - Testing & Optimization

## 🎯 Task Goal
ทดสอบและ optimize โปรเจกต์ก่อน deploy: performance, accessibility, bundle size

---

## 📋 Requirements

### 1. สร้าง Environment Variables

**ไฟล์:** `.env`

```env
# Site Configuration
VITE_SITE_URL=https://yourwebsite.com
VITE_SITE_NAME=Git Workshop
VITE_SITE_DESCRIPTION=เรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions อย่างมืออาชีพ

# Analytics (Optional)
VITE_GA_TRACKING_ID=
VITE_FACEBOOK_PIXEL_ID=
```

**ไฟล์:** `.env.example`

```env
# Site Configuration
VITE_SITE_URL=https://yourwebsite.com
VITE_SITE_NAME=Git Workshop
VITE_SITE_DESCRIPTION=เรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions อย่างมืออาชีพ

# Analytics (Optional - add your IDs)
VITE_GA_TRACKING_ID=
VITE_FACEBOOK_PIXEL_ID=
```

**อัพเดท `.gitignore`:**
```
.env
.env.local
.env.production
```

---

## 2. สร้าง Environment Config

**ไฟล์:** `src/config/env.ts`

```ts
export const env = {
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  siteName: import.meta.env.VITE_SITE_NAME || 'Git Workshop',
  siteDescription:
    import.meta.env.VITE_SITE_DESCRIPTION ||
    'เรียนรู้การจัดการ Source Code อย่างมืออาชีพ',
  
  // Analytics
  gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID,
  fbPixelId: import.meta.env.VITE_FACEBOOK_PIXEL_ID,
  
  // Environment
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
```

---

## 3. อัพเดท vite.config.ts (Optimization)

**ไฟล์:** `vite.config.ts`

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
  build: {
    // Optimization
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
        },
      },
    },
    
    // Bundle analysis
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },
  
  // Dev server
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
  
  // Preview server
  preview: {
    port: 4173,
    strictPort: false,
  },
});
```

---

## 4. Performance Testing Checklist

### Build Size Analysis

**คำสั่ง:**
```cmd
npm run build
```

**ตรวจสอบ:**
- ✅ Total bundle size < 500KB (gzipped)
- ✅ Largest chunks < 200KB
- ✅ No duplicate dependencies

**วิธีวิเคราะห์:**
```cmd
:: ติดตั้ง rollup-plugin-visualizer
npm install -D rollup-plugin-visualizer

:: เพิ่มใน vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  react(),
  visualizer({ open: true }),
]

:: Build และดูรายงาน
npm run build
```

### Lighthouse Audit

**วิธีทดสอบ:**
1. Build project: `npm run build`
2. Preview: `npm run preview`
3. เปิด Chrome DevTools → Lighthouse
4. Run audit (Desktop + Mobile)

**เป้าหมาย:**
- ✅ Performance: > 90
- ✅ Accessibility: > 95
- ✅ Best Practices: > 90
- ✅ SEO: > 90

### Core Web Vitals

**เป้าหมาย:**
- ✅ LCP (Largest Contentful Paint): < 2.5s
- ✅ FID (First Input Delay): < 100ms
- ✅ CLS (Cumulative Layout Shift): < 0.1

---

## 5. Accessibility Testing

### Manual Checks

**Keyboard Navigation:**
- ✅ Tab ผ่านทุก links/buttons ได้
- ✅ Focus styles ชัดเจน
- ✅ Skip to content link (optional)
- ✅ No keyboard traps

**Screen Reader:**
- ✅ Headings hierarchy ถูกต้อง (h1 → h2 → h3)
- ✅ Images มี alt text
- ✅ Links descriptive
- ✅ Forms มี labels

**Color Contrast:**
- ✅ Text contrast ratio ≥ 4.5:1
- ✅ Large text ≥ 3:1
- ✅ Interactive elements ≥ 3:1

### Automated Testing

**ติดตั้ง axe DevTools:**
1. ติดตั้ง extension: [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
2. เปิด DevTools → axe DevTools tab
3. Scan ทุกหน้า
4. แก้ไข issues ทั้งหมด

---

## 6. Cross-Browser Testing

**Browsers to Test:**
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest - Mac/iOS)
- ✅ Edge (latest)

**Mobile Browsers:**
- ✅ Chrome Mobile (Android)
- ✅ Safari Mobile (iOS)

**ทดสอบ:**
- ✅ Layout responsive
- ✅ Navigation ทำงาน
- ✅ Forms submit ได้
- ✅ No console errors

---

## 7. Error Handling

**สร้าง Error Boundary Component:**

**ไฟล์:** `src/components/common/ErrorBoundary.tsx`

```tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // TODO: Send to error tracking service (Sentry, etc.)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-base-100 px-4">
          <div className="max-w-md text-center">
            <div className="mb-6 text-6xl text-error">
              <i className="bi-bug"></i>
            </div>
            <h1 className="mb-4 text-2xl font-bold">
              เกิดข้อผิดพลาดที่ไม่คาดคิด
            </h1>
            <p className="mb-6 text-base-content/70">
              {this.state.error?.message || 'กรุณารีเฟรชหน้าเว็บและลองใหม่อีกครั้ง'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              รีเฟรชหน้า
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**อัพเดท `src/main.tsx`:**

```tsx
import { ErrorBoundary } from '@/components/common';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<AppLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
```

---

## 8. Performance Optimization Tips

### Image Optimization

**ถ้ามี images:**
- ✅ ใช้ modern formats (WebP, AVIF)
- ✅ Lazy load images: `loading="lazy"`
- ✅ Responsive images: `<picture>` + `srcset`
- ✅ Compress images (TinyPNG, Squoosh)

### Font Optimization

**ถ้าใช้ custom fonts:**
- ✅ Use `font-display: swap`
- ✅ Preload critical fonts
- ✅ Subset fonts (Thai + Latin only)

### Code Splitting

**ตรวจสอบ:**
- ✅ Routes lazy loaded
- ✅ Heavy components lazy loaded
- ✅ Vendor chunks separated

### Caching

**ใน production (Vite automatic):**
- ✅ Static assets: long cache
- ✅ HTML: no cache
- ✅ Hashed filenames: `app.abc123.js`

---

## 9. Testing Checklist

### Functional Testing

**Main Pages:**
- ✅ HomePage: Hero, features, knowledge cards แสดงผล
- ✅ AboutPage: Team cards แสดงผล
- ✅ ProductPage: Courses cards แสดงผล
- ✅ ContactPage: Form validation ทำงาน
- ✅ MapPage: Links ทั้งหมด clickable

**Knowledge Pages:**
- ✅ ทุกหน้า accessible
- ✅ Table of Contents ทำงาน
- ✅ Breadcrumb แสดงผล
- ✅ Content แสดงผลถูกต้อง

**Navigation:**
- ✅ Navbar links ทำงาน
- ✅ Mobile menu ทำงาน
- ✅ Dropdown (ถ้ามี) ทำงาน
- ✅ Footer links ทำงาน

**404 Page:**
- ✅ Invalid URL → NotFoundPage
- ✅ Links กลับหน้าแรกทำงาน

### Responsive Testing

**Breakpoints:**
- ✅ Mobile (< 640px)
- ✅ Tablet (640-1024px)
- ✅ Desktop (> 1024px)

**ทดสอบ:**
- ✅ Layout ไม่แตก
- ✅ Text อ่านได้
- ✅ Buttons คลิกได้
- ✅ No horizontal scroll

---

## 10. Pre-Deployment Checklist

**Code:**
- ✅ No TypeScript errors
- ✅ No ESLint warnings
- ✅ No console.log ใน production
- ✅ Remove unused code/comments

**Assets:**
- ✅ Images optimized
- ✅ Favicon มีครบ
- ✅ robots.txt ตั้งค่าแล้ว
- ✅ manifest.json ถูกต้อง

**SEO:**
- ✅ Meta tags ครบทุกหน้า
- ✅ OG images มี
- ✅ Sitemap สร้างแล้ว (optional)

**Performance:**
- ✅ Lighthouse score > 90
- ✅ Bundle size < 500KB
- ✅ No memory leaks

**Environment:**
- ✅ .env.example อัพเดท
- ✅ .env ไม่ commit
- ✅ Production URLs ถูกต้อง

---

## ✅ Acceptance Criteria

1. ✅ Environment variables ตั้งค่าแล้ว
2. ✅ Build optimization enabled
3. ✅ Lighthouse scores > 90
4. ✅ Accessibility issues แก้แล้ว
5. ✅ Cross-browser ทดสอบแล้ว
6. ✅ ErrorBoundary implement แล้ว
7. ✅ Pre-deployment checklist ผ่านหมด
8. ✅ Bundle size optimized
9. ✅ ไม่มี console errors/warnings

---

## 🧪 Testing Commands

```cmd
:: Development
npm run dev

:: Type check
npm run build

:: Lint
npm run lint

:: Build production
npm run build

:: Preview production
npm run preview

:: Analyze bundle (ถ้าติดตั้ง visualizer)
npm run build
```

---

## 📝 Implementation Notes

1. **Environment Variables:**
   - ใช้ prefix `VITE_` สำหรับ client-side vars
   - Access ผ่าน `import.meta.env.VITE_*`
   - ไม่ commit `.env` file

2. **Build Optimization:**
   - `drop_console: true` ลบ console.log
   - Code splitting ตาม routes
   - Vendor chunks แยกออกมา

3. **Performance:**
   - Lazy load routes/components
   - Minimize bundle size
   - Cache static assets

4. **Accessibility:**
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigation support

---

## 🔗 References

- Vite Build Optimization: https://vitejs.dev/guide/build.html
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Web Vitals: https://web.dev/vitals/
- axe DevTools: https://www.deque.com/axe/devtools/
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

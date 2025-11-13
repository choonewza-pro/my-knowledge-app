# Step 07 – จัดการ Assets และ SEO Optimization

## 🎯 Goal

ย้าย assets (favicon, images, fonts) จาก old-website มาที่โปรเจกต์ใหม่ และปรับปรุง SEO โดยเพิ่ม meta tags, Open Graph tags และ structured data เพื่อให้เว็บไซต์เป็นมิตรกับ search engines และ social media sharing

---

## ✅ Tasks (Checklist)

### 1. ย้าย Assets จาก Old Website

#### 1.1 Favicon และ Icons

- [ ] **ย้าย favicon**
  - คัดลอก `old-website/assets/favicon.ico` ไปที่ `public/favicon.ico`
  - ลบ favicon ใน `public/` ถ้ามีอยู่แล้ว

- [ ] **สร้าง additional icons (optional)**
  - สร้าง favicon ขนาดต่าง ๆ (16x16, 32x32, 180x180)
  - สร้าง apple-touch-icon
  - สร้าง manifest.json สำหรับ PWA (ถ้าต้องการ)

#### 1.2 Images

- [ ] **ตรวจสอบรูปภาพใน old-website**
  - ดูว่ามีรูปภาพอะไรบ้างใน `old-website/assets/`
  - ตัดสินใจว่ารูปไหนควรย้าย

- [ ] **ย้ายรูปภาพ**
  - Static images → `public/images/`
  - Images ที่ต้อง import → `src/assets/images/`

- [ ] **Optimize images**
  - แปลง PNG → WebP (ถ้าเหมาะสม)
  - Compress images ด้วย tools เช่น TinyPNG
  - ใช้ responsive images (`srcset`) ถ้าจำเป็น

#### 1.3 Fonts (ถ้ามี custom fonts)

- [ ] **ตรวจสอบ fonts ที่ใช้**
  - ดูว่าใช้ Google Fonts หรือ local fonts

- [ ] **ติดตั้ง Google Fonts** (ถ้าใช้)
  - เพิ่มใน `index.html` หรือ import ใน CSS
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  ```

- [ ] **หรือใช้ local fonts**
  - ย้าย font files ไปที่ `public/fonts/`
  - Import ใน CSS
  ```css
  @font-face {
    font-family: 'CustomFont';
    src: url('/fonts/custom-font.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  ```

### 2. อัพเดท index.html

- [ ] **แก้ไข `index.html`**
  - เพิ่ม meta tags ที่จำเป็น
  - เพิ่ม Open Graph tags
  - เพิ่ม favicon links
  ```html
  <!DOCTYPE html>
  <html lang="th">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      <!-- Basic Meta Tags -->
      <meta name="description" content="Workshop สำหรับการเรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions - เรียนรู้ Git Commands, Naming Conventions, Workflows และ DevOps" />
      <meta name="keywords" content="git, github, version control, git workflow, git commands, devops, ci/cd" />
      <meta name="author" content="Git Workshop" />
      
      <!-- Open Graph Meta Tags -->
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Git Workshop - เรียนรู้การจัดการ Source Code อย่างมืออาชีพ" />
      <meta property="og:description" content="Workshop สำหรับการเรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions" />
      <meta property="og:url" content="https://gitworkshop.com" />
      <meta property="og:image" content="https://gitworkshop.com/og-image.jpg" />
      
      <!-- Twitter Card Meta Tags -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Git Workshop - เรียนรู้การจัดการ Source Code อย่างมืออาชีพ" />
      <meta name="twitter:description" content="Workshop สำหรับการเรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions" />
      <meta name="twitter:image" content="https://gitworkshop.com/og-image.jpg" />
      
      <!-- Favicon -->
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      <!-- Fonts -->
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <!-- Bootstrap Icons (จาก old-website) -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet" />
      
      <title>Git Workshop - เรียนรู้การจัดการ Source Code อย่างมืออาชีพ</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>
  ```

### 3. ติดตั้งและตั้งค่า react-helmet-async

- [ ] **ติดตั้ง react-helmet-async**
  ```powershell
  npm install react-helmet-async
  ```

- [ ] **Setup HelmetProvider**
  - แก้ไข `src/main.tsx`
  ```tsx
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { HelmetProvider } from 'react-helmet-async';
  import App from './App.tsx';
  import './index.css';

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
  ```

### 4. สร้าง SEO Component

- [ ] **สร้าง `src/components/common/SEO.tsx`**
  - Component สำหรับจัดการ meta tags แบบ dynamic
  ```tsx
  import { Helmet } from 'react-helmet-async';

  interface SEOProps {
    title: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: string;
  }

  export function SEO({
    title,
    description = 'Workshop สำหรับการเรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions',
    keywords = ['git', 'github', 'version control', 'git workflow'],
    image = '/og-image.jpg',
    url = '',
    type = 'website'
  }: SEOProps) {
    const siteUrl = 'https://gitworkshop.com'; // เปลี่ยนเป็น URL จริง
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const fullTitle = title.includes('Git Workshop') 
      ? title 
      : `${title} - Git Workshop`;

    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {keywords.length > 0 && (
          <meta name="keywords" content={keywords.join(', ')} />
        )}

        {/* Open Graph */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:image" content={`${siteUrl}${image}`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${image}`} />

        {/* Canonical URL */}
        <link rel="canonical" href={fullUrl} />
      </Helmet>
    );
  }
  ```

### 5. เพิ่ม SEO ในทุก Page

#### 5.1 HomePage

- [ ] **เพิ่ม SEO component ใน `src/pages/HomePage.tsx`**
  ```tsx
  import { SEO } from '@/components/common';

  export function HomePage() {
    return (
      <>
        <SEO
          title="Git Workshop - เรียนรู้การจัดการ Source Code อย่างมืออาชีพ"
          description="Workshop สำหรับการเรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions - เรียนรู้ Git Commands, Naming Conventions, Workflows และ DevOps"
          keywords={['git', 'github', 'version control', 'git workflow', 'git commands', 'devops']}
          url="/"
        />
        {/* Page content */}
      </>
    );
  }
  ```

#### 5.2 Other Pages

- [ ] **เพิ่ม SEO ใน AboutPage**
  ```tsx
  <SEO
    title="เกี่ยวกับเรา"
    description="เกี่ยวกับ Git Workshop - เรียนรู้พันธกิจ ทีมงาน และเป้าหมายของโปรเจค"
    url="/about"
  />
  ```

- [ ] **เพิ่ม SEO ใน ContactPage**
  ```tsx
  <SEO
    title="ติดต่อเรา"
    description="ติดต่อ Git Workshop - ช่องทางการติดต่อและข้อมูลการติดต่อ"
    url="/contact"
  />
  ```

- [ ] **เพิ่ม SEO ใน ProductPage**

- [ ] **เพิ่ม SEO ใน MapPage**

#### 5.3 Knowledge Pages

- [ ] **เพิ่ม SEO ในทุก knowledge page**
  ```tsx
  // GitCommandsPage
  <SEO
    title="Git Commands Reference"
    description="คู่มืออ้างอิงคำสั่ง Git พื้นฐานและขั้นสูง พร้อมตัวอย่างการใช้งาน"
    keywords={['git commands', 'git reference', 'git cheat sheet']}
    url="/knowledge/git-commands"
  />
  ```

### 6. สร้าง OG Image

- [ ] **สร้าง Open Graph Image**
  - ขนาด: 1200x630 px
  - ใส่ชื่อเว็บไซต์และ tagline
  - บันทึกเป็น `public/og-image.jpg`

- [ ] **สร้าง page-specific OG images (optional)**
  - แต่ละหน้าอาจมีรูปภาพเฉพาะ

### 7. สร้าง robots.txt

- [ ] **สร้าง `public/robots.txt`**
  ```txt
  # https://www.robotstxt.org/robotstxt.html
  User-agent: *
  Allow: /

  Sitemap: https://gitworkshop.com/sitemap.xml
  ```

### 8. สร้าง sitemap.xml

- [ ] **สร้าง `public/sitemap.xml`**
  - ใส่ URLs ทั้งหมดของเว็บไซต์
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://gitworkshop.com/</loc>
      <lastmod>2024-01-01</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://gitworkshop.com/about</loc>
      <lastmod>2024-01-01</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://gitworkshop.com/knowledge/git-commands</loc>
      <lastmod>2024-01-01</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <!-- เพิ่ม URLs อื่น ๆ -->
  </urlset>
  ```

- [ ] **หรือใช้ sitemap generator (optional)**
  - ติดตั้ง `vite-plugin-sitemap`
  ```powershell
  npm install vite-plugin-sitemap -D
  ```

### 9. เพิ่ม Structured Data (JSON-LD)

- [ ] **เพิ่ม structured data ใน HomePage**
  ```tsx
  import { Helmet } from 'react-helmet-async';

  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Git Workshop",
        "description": "Workshop สำหรับการเรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions",
        "url": "https://gitworkshop.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://gitworkshop.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })}
    </script>
  </Helmet>
  ```

- [ ] **เพิ่ม Organization schema**
  ```tsx
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Git Workshop",
      "url": "https://gitworkshop.com",
      "logo": "https://gitworkshop.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@gitworkshop.com",
        "contactType": "Customer Service"
      }
    })}
  </script>
  ```

### 10. Performance Optimization

#### 10.1 Image Optimization

- [ ] **เพิ่ม loading="lazy" ให้ images**
  ```tsx
  <img src="/images/hero.jpg" alt="Hero" loading="lazy" />
  ```

- [ ] **ใช้ responsive images**
  ```tsx
  <img
    srcSet="/images/hero-480.jpg 480w, /images/hero-800.jpg 800w"
    sizes="(max-width: 600px) 480px, 800px"
    src="/images/hero-800.jpg"
    alt="Hero"
  />
  ```

#### 10.2 Font Optimization

- [ ] **เพิ่ม font-display: swap**
  - มีอยู่แล้วใน Google Fonts URL (`&display=swap`)

- [ ] **Preload critical fonts**
  ```html
  <link
    rel="preload"
    href="/fonts/custom-font.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
  ```

#### 10.3 Resource Hints

- [ ] **เพิ่ม preconnect สำหรับ external resources**
  - มีอยู่แล้วสำหรับ Google Fonts

- [ ] **เพิ่ม dns-prefetch**
  ```html
  <link rel="dns-prefetch" href="https://cdn.example.com" />
  ```

### 11. Accessibility Improvements

- [ ] **ตรวจสอบ alt texts**
  - ทุกรูปภาพควรมี alt attribute

- [ ] **ตรวจสอบ heading hierarchy**
  - h1 → h2 → h3 ตามลำดับ

- [ ] **ตรวจสอบ color contrast**
  - ใช้ WCAG contrast checker

- [ ] **ตรวจสอบ keyboard navigation**
  - Tab key ทำงานได้

- [ ] **เพิ่ม skip to content link**
  ```tsx
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
  >
    Skip to content
  </a>
  ```

### 12. ทดสอบ SEO และ Performance

- [ ] **ทดสอบด้วย Lighthouse**
  - Performance
  - Accessibility
  - Best Practices
  - SEO

- [ ] **ทดสอบ meta tags**
  - ใช้ Facebook Debugger
  - ใช้ Twitter Card Validator

- [ ] **ทดสอบ structured data**
  - ใช้ Google Rich Results Test

- [ ] **ทดสอบ mobile-friendliness**
  - ใช้ Google Mobile-Friendly Test

---

## 📝 Notes / Best Practices

### 1. SEO Best Practices

- **Unique titles**: แต่ละหน้าควรมี title ไม่ซ้ำกัน
- **Meta descriptions**: 150-160 characters
- **Keywords**: อย่าใส่มากเกินไป (keyword stuffing)
- **Canonical URLs**: ใช้สำหรับหลีกเลี่ยง duplicate content

### 2. Open Graph Best Practices

- **Image size**: 1200x630 px (recommended)
- **Image format**: JPG or PNG
- **Alt text**: ใส่ให้ทุกรูป
- **Test sharing**: ทดสอบ share บน Facebook, Twitter

### 3. Performance Best Practices

- **Lazy load images**: ยกเว้นรูปใน hero section
- **Optimize images**: ใช้ WebP, compress
- **Font loading**: ใช้ font-display: swap
- **Code splitting**: Vite ทำให้อัตโนมัติ

### 4. Accessibility Best Practices

- **Semantic HTML**: ใช้ tags ที่ถูกต้อง
- **ARIA attributes**: เพิ่มเมื่อจำเป็น
- **Focus states**: ชัดเจนและสวยงาม
- **Keyboard navigation**: ทุก interactive element ควร accessible

---

## ⚠️ สิ่งที่ควรระวัง

1. **Meta tags conflicts**: ไม่ควรมี meta tags ซ้ำกันระหว่าง index.html และ Helmet
2. **Image optimization**: อย่า over-optimize จนภาพเสีย
3. **Font loading**: ระวัง FOUT (Flash of Unstyled Text)
4. **Structured data errors**: ใช้ validator ตรวจสอบ
5. **Sitemap updates**: อัพเดทเมื่อเพิ่มหน้าใหม่

---

## ✨ Expected Outcome

หลังจากจบ Step 07 แล้ว ควรได้:

✅ Assets ทั้งหมดย้ายมาและ optimize แล้ว  
✅ Favicon และ icons ครบถ้วน  
✅ SEO component พร้อมใช้งาน  
✅ Meta tags ครบทุกหน้า  
✅ Open Graph tags สำหรับ social sharing  
✅ Structured data (JSON-LD)  
✅ robots.txt และ sitemap.xml  
✅ Lighthouse score > 90 ในทุกหมวด  
✅ Mobile-friendly และ accessible  
✅ Performance ดีกว่า old-website  

---

**หมายเหตุ**: SEO และ Performance เป็นสิ่งสำคัญสำหรับ production website ใช้เวลาทำให้ดีเพราะจะส่งผลต่อ user experience และ search ranking

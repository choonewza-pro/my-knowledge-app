# AI Task 12 - Migrate Assets & Setup SEO

## 🎯 Task Goal
ย้าย assets (images, fonts) จาก old-website และตั้งค่า SEO meta tags, favicon, robots.txt

---

## 📋 Requirements

### 1. ย้าย Assets

**ต้องการ:**
- Copy assets จาก `old-website/assets/` มาที่ `public/assets/`
- จัดโครงสร้างให้เป็นระเบียบ

**โครงสร้างเป้าหมาย:**
```
public/
  assets/
    images/
      (images จาก old-website/assets/)
    fonts/
      (fonts ถ้ามี)
  favicon.ico
  robots.txt
  manifest.json
```

**คำสั่งย้ายไฟล์ (Windows CMD):**
```cmd
:: สร้างโฟลเดอร์
mkdir public\assets\images

:: Copy images (ปรับ path ตามจริง)
xcopy /E /I old-website\assets\* public\assets\images\
```

---

## 2. สร้าง Favicon

**ไฟล์:** `public/favicon.ico`

**วิธีการ:**
1. สร้าง favicon ด้วย online tool (เช่น https://favicon.io/)
2. ใช้ Git logo หรือ custom icon
3. Download และวางใน `public/favicon.ico`

**หรือใช้ SVG favicon:**

**ไฟล์:** `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#764ba2"/>
  <text x="50" y="70" font-size="60" font-family="monospace" fill="white" text-anchor="middle" font-weight="bold">G</text>
</svg>
```

---

## 3. สร้าง robots.txt

**ไฟล์:** `public/robots.txt`

```txt
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: https://yourwebsite.com/sitemap.xml
```

---

## 4. สร้าง manifest.json (PWA)

**ไฟล์:** `public/manifest.json`

```json
{
  "name": "Git Workshop - เรียนรู้การจัดการ Source Code อย่างมืออาชีพ",
  "short_name": "Git Workshop",
  "description": "เรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions อย่างมืออาชีพ",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#764ba2",
  "icons": [
    {
      "src": "/favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "/logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
}
```

---

## 5. อัพเดท index.html (SEO Meta Tags)

**ไฟล์:** `index.html`

**เปลี่ยนจาก:**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**เป็น:**
```html
<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>Git Workshop - เรียนรู้การจัดการ Source Code อย่างมืออาชีพ</title>
    <meta name="title" content="Git Workshop - เรียนรู้การจัดการ Source Code อย่างมืออาชีพ" />
    <meta name="description" content="เรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions อย่างมืออาชีพ พร้อมตัวอย่างและ Best Practices" />
    <meta name="keywords" content="Git, GitHub, GitHub Actions, Version Control, Source Code Management, Workshop, Tutorial, Thai" />
    <meta name="author" content="Git Workshop Team" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://yourwebsite.com/" />
    <meta property="og:title" content="Git Workshop - เรียนรู้การจัดการ Source Code อย่างมืออาชีพ" />
    <meta property="og:description" content="เรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions อย่างมืออาชีพ พร้อมตัวอย่างและ Best Practices" />
    <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://yourwebsite.com/" />
    <meta property="twitter:title" content="Git Workshop - เรียนรู้การจัดการ Source Code อย่างมืออาชีพ" />
    <meta property="twitter:description" content="เรียนรู้การจัดการ Source Code ด้วย Git และ GitHub Actions อย่างมืออาชีพ พร้อมตัวอย่างและ Best Practices" />
    <meta property="twitter:image" content="https://yourwebsite.com/og-image.jpg" />
    
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#764ba2" />
    
    <!-- Bootstrap Icons -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 6. สร้าง OG Image (Optional)

**ไฟล์:** `public/og-image.jpg`

**ขนาดแนะนำ:** 1200x630px

**เนื้อหา:**
- Logo / Title: "Git Workshop"
- Tagline: "เรียนรู้การจัดการ Source Code อย่างมืออาชีพ"
- Background: Gradient purple

**วิธีสร้าง:**
1. ใช้ Figma / Canva สร้าง image
2. หรือใช้ online OG image generator
3. Save เป็น `og-image.jpg` ใน `public/`

---

## 7. สร้าง Sitemap Helper (Optional)

**ไฟล์:** `src/utils/sitemap.ts`

**ต้องการ:**
- Generate sitemap.xml
- สำหรับ SEO

```ts
import { ROUTES } from './constants';

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemap(baseUrl: string): string {
  const routes: SitemapEntry[] = [
    { url: ROUTES.HOME, changefreq: 'weekly', priority: 1.0 },
    { url: ROUTES.ABOUT, changefreq: 'monthly', priority: 0.8 },
    { url: ROUTES.PRODUCT, changefreq: 'monthly', priority: 0.8 },
    { url: ROUTES.CONTACT, changefreq: 'monthly', priority: 0.7 },
    { url: ROUTES.MAP, changefreq: 'weekly', priority: 0.6 },
    
    // Knowledge pages
    { url: ROUTES.KNOWLEDGE.GIT_COMMANDS, changefreq: 'weekly', priority: 0.9 },
    { url: ROUTES.KNOWLEDGE.GIT_NAMING_GUIDE, changefreq: 'weekly', priority: 0.9 },
    { url: ROUTES.KNOWLEDGE.GIT_NAMING_SUMMARY, changefreq: 'weekly', priority: 0.9 },
    { url: ROUTES.KNOWLEDGE.GIT_WORKFLOW_FEATURE, changefreq: 'weekly', priority: 0.9 },
    { url: ROUTES.KNOWLEDGE.GIT_WORKFLOW_BUGFIX, changefreq: 'weekly', priority: 0.9 },
    { url: ROUTES.KNOWLEDGE.GIT_WORKFLOW_HOTFIX, changefreq: 'weekly', priority: 0.9 },
    { url: ROUTES.KNOWLEDGE.GITHUB_ACTIONS, changefreq: 'weekly', priority: 0.9 },
    { url: ROUTES.KNOWLEDGE.GITHUB_GUIDE, changefreq: 'weekly', priority: 0.9 },
  ];

  const urlEntries = routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ''}
    ${route.changefreq ? `<changefreq>${route.changefreq}</changefreq>` : ''}
    ${route.priority ? `<priority>${route.priority}</priority>` : ''}
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Usage: console.log(generateSitemap('https://yourwebsite.com'));
```

---

## 8. อัพเดท package.json Scripts

**ไฟล์:** `package.json`

**เพิ่ม script สำหรับ generate sitemap:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "generate:sitemap": "node -e \"const {generateSitemap}=require('./dist/utils/sitemap');const fs=require('fs');fs.writeFileSync('public/sitemap.xml',generateSitemap('https://yourwebsite.com'));\""
  }
}
```

---

## ✅ Acceptance Criteria

1. ✅ Assets ย้ายจาก old-website → public/assets
2. ✅ favicon.ico และ favicon.svg มีใน public/
3. ✅ robots.txt ตั้งค่าถูกต้อง
4. ✅ manifest.json มีข้อมูลครบ
5. ✅ index.html มี meta tags ครบถ้วน
6. ✅ OG image สร้างและวางใน public/ (optional)
7. ✅ Bootstrap Icons CDN ใน index.html
8. ✅ Lang attribute = "th"
9. ✅ ไม่มี console errors/warnings

---

## 🧪 Testing

### Assets:
- ✅ Images load ได้จาก `/assets/images/`
- ✅ Favicon แสดงใน browser tab

### SEO:
- ✅ Document title แสดงถูกต้อง (per page)
- ✅ Meta description อ่านได้จาก view source
- ✅ OG tags ถูกต้อง (test ด้วย https://www.opengraph.xyz/)

### PWA:
- ✅ manifest.json accessible ที่ `/manifest.json`
- ✅ Theme color apply ใน mobile browser

### Icons:
- ✅ Bootstrap Icons แสดงผลถูกต้อง
- ✅ No 404 errors ใน console

---

## 📝 Implementation Notes

1. **Assets Migration:**
   - ใช้ `public/` directory สำหรับ static files
   - Files ใน `public/` accessible ที่ root URL
   - ไม่ต้อง import, ใช้ `/assets/...` path

2. **Favicon:**
   - SVG favicon รองรับ modern browsers
   - ICO fallback สำหรับ older browsers
   - Both specified ใน `<link>` tags

3. **SEO Meta Tags:**
   - Primary: title, description, keywords
   - Open Graph: Facebook sharing
   - Twitter: Twitter card
   - ใช้ `useDocumentTitle` hook สำหรับ dynamic titles

4. **Bootstrap Icons:**
   - ใช้ CDN ใน index.html
   - ใช้ `<i className="bi-icon-name"></i>`
   - ดู icons: https://icons.getbootstrap.com/

5. **PWA (Progressive Web App):**
   - manifest.json: metadata สำหรับ install
   - Icons: 192x192, 512x512 สำหรับ home screen
   - Optional: Service worker ใน future

---

## 🔗 References

- Open Graph Protocol: https://ogp.me/
- Twitter Cards: https://developer.twitter.com/en/docs/twitter-for-websites/cards
- Web Manifest: https://developer.mozilla.org/en-US/docs/Web/Manifest
- Bootstrap Icons: https://icons.getbootstrap.com/
- Favicon Generator: https://favicon.io/
- OG Image Generator: https://www.opengraph.xyz/

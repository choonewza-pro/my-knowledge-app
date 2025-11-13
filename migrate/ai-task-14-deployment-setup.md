# AI Task 14 - Deployment Setup

## 🎯 Task Goal
เตรียมโปรเจกต์สำหรับ deploy ไปยัง hosting platforms (Vercel, Netlify, GitHub Pages)

---

## 📋 Requirements

### 1. สร้างไฟล์ Deployment Configs

---

## Option A: Vercel Deployment (แนะนำ)

### 1.1 สร้าง vercel.json

**ไฟล์:** `vercel.json`

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### 1.2 Deploy Steps (Vercel)

1. **ติดตั้ง Vercel CLI (optional):**
   ```cmd
   npm install -g vercel
   ```

2. **Deploy ผ่าน CLI:**
   ```cmd
   :: Login
   vercel login

   :: Deploy (first time)
   vercel

   :: Deploy production
   vercel --prod
   ```

3. **หรือ Deploy ผ่าน GitHub Integration:**
   - ไป https://vercel.com/new
   - Import Git repository
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Deploy!

---

## Option B: Netlify Deployment

### 2.1 สร้าง netlify.toml

**ไฟล์:** `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 2.2 Deploy Steps (Netlify)

1. **Deploy ผ่าน Netlify CLI:**
   ```cmd
   :: ติดตั้ง CLI
   npm install -g netlify-cli

   :: Login
   netlify login

   :: Deploy
   netlify deploy

   :: Deploy production
   netlify deploy --prod
   ```

2. **หรือ Deploy ผ่าน Web UI:**
   - ไป https://app.netlify.com/start
   - Connect to Git provider
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy!

---

## Option C: GitHub Pages Deployment

### 3.1 สร้าง GitHub Actions Workflow

**ไฟล์:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_SITE_URL: https://yourusername.github.io/your-repo-name

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3.2 อัพเดท vite.config.ts (GitHub Pages)

**เพิ่ม base path:**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/your-repo-name/' : '/',
  // ... rest of config
});
```

### 3.3 GitHub Pages Setup

1. ไป Repository Settings
2. Pages → Source: GitHub Actions
3. Push code to `main` branch
4. Workflow จะ run automatically

---

## 2. สร้าง README สำหรับ Deployment

**ไฟล์:** `DEPLOYMENT.md`

```markdown
# Deployment Guide

## Prerequisites

- Node.js 20+
- npm or yarn
- Git

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

Required variables:
- `VITE_SITE_URL` - Your production URL
- `VITE_SITE_NAME` - Site name
- `VITE_SITE_DESCRIPTION` - Site description

## Build

```bash
npm install
npm run build
```

Output: `dist/` directory

## Deploy Options

### Option 1: Vercel (Recommended)

**Automatic deployment via GitHub:**
1. Push code to GitHub
2. Import repository at https://vercel.com/new
3. Deploy!

**Manual deployment:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: Netlify

**Automatic deployment:**
1. Push code to GitHub
2. Connect at https://app.netlify.com/start
3. Deploy!

**Manual deployment:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Option 3: GitHub Pages

1. Push code to GitHub
2. Enable GitHub Actions in repository settings
3. Push to `main` branch triggers automatic deployment
4. Site available at `https://username.github.io/repo-name/`

## Custom Domain (Optional)

### Vercel:
1. Project Settings → Domains
2. Add your domain
3. Configure DNS records

### Netlify:
1. Site Settings → Domain management
2. Add custom domain
3. Configure DNS

### GitHub Pages:
1. Add `CNAME` file to `public/` with your domain
2. Configure DNS to point to GitHub Pages
3. Enable HTTPS in settings

## Environment-Specific Builds

### Production:
```bash
npm run build
```

### Staging:
```bash
VITE_SITE_URL=https://staging.yoursite.com npm run build
```

## Troubleshooting

### 404 on Refresh
- ✅ Check rewrites config (`vercel.json` or `netlify.toml`)
- ✅ SPA routing needs catch-all redirect to `index.html`

### Assets Not Loading
- ✅ Check `base` path in `vite.config.ts`
- ✅ For GitHub Pages, must match repo name

### Build Fails
- ✅ Check Node.js version (20+)
- ✅ Clear `node_modules` and reinstall
- ✅ Check for TypeScript errors: `npm run build`

## Post-Deployment Checklist

- ✅ All pages accessible
- ✅ Assets load correctly
- ✅ Favicon displays
- ✅ Meta tags correct
- ✅ Analytics working (if configured)
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Run Lighthouse audit

## Monitoring

### Vercel:
- Analytics: https://vercel.com/dashboard/analytics
- Deployment logs: https://vercel.com/dashboard/deployments

### Netlify:
- Analytics: https://app.netlify.com/analytics
- Deploy logs: https://app.netlify.com/deploys

### GitHub Pages:
- Actions: https://github.com/user/repo/actions
- Pages status: Settings → Pages

## Support

Issues? Check:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
```

---

## 3. อัพเดท package.json

**เพิ่ม scripts:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "deploy:vercel": "vercel --prod",
    "deploy:netlify": "netlify deploy --prod"
  }
}
```

---

## 4. สร้าง _redirects (Netlify Alternative)

**ไฟล์:** `public/_redirects`

```
/*    /index.html   200
```

---

## ✅ Acceptance Criteria

1. ✅ Deployment config files สร้างแล้ว
2. ✅ README มีคำแนะนำ deployment
3. ✅ Build command ทำงานได้
4. ✅ Rewrites/redirects ตั้งค่าแล้ว
5. ✅ Security headers configured
6. ✅ Cache headers configured
7. ✅ Environment variables documented
8. ✅ Deploy successfully (อย่างน้อย 1 platform)

---

## 🧪 Testing

### Local Preview:
```cmd
npm run build
npm run preview
```

**ทดสอบ:**
- ✅ Navigate ระหว่างหน้า
- ✅ Refresh หน้า (ไม่ 404)
- ✅ Assets load ถูกต้อง
- ✅ No console errors

### Production:
- ✅ Deploy ไป staging/production
- ✅ ทดสอบทุก features
- ✅ Run Lighthouse audit
- ✅ Test on mobile

---

## 📝 Implementation Notes

1. **SPA Routing:**
   - Vercel: `rewrites` ใน vercel.json
   - Netlify: `redirects` ใน netlify.toml
   - GitHub Pages: handled by router

2. **Security Headers:**
   - X-Content-Type-Options: ป้องกัน MIME sniffing
   - X-Frame-Options: ป้องกัน clickjacking
   - X-XSS-Protection: ป้องกัน XSS
   - Referrer-Policy: ควบคุม referrer info

3. **Caching:**
   - Static assets (hashed): long cache (1 year)
   - HTML: no cache (always fresh)
   - Immutable: files never change (hash in name)

4. **Base Path:**
   - Vercel/Netlify: ใช้ `/` (root)
   - GitHub Pages: ใช้ `/repo-name/`

---

## 🔗 References

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com/
- GitHub Pages: https://docs.github.com/en/pages
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html
- GitHub Actions: https://docs.github.com/en/actions

---

## 🚀 Quick Deploy Commands

**Vercel:**
```cmd
npm install -g vercel
vercel login
vercel --prod
```

**Netlify:**
```cmd
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**GitHub Pages:**
```cmd
git add .
git commit -m "feat: ready for deployment"
git push origin main
```

# คู่มือ GitHub Actions — ระบบ CI/CD

## 1. GitHub Actions คืออะไร

### 🎯 คำอธิบายแบบเข้าใจง่าย
GitHub Actions เปรียบเสมือน **"ผู้ช่วยอัตโนมัติ"** ที่คอยทำงานซ้ำ ๆ แทนเรา เช่น:
- 🧪 **Test โค้ด** ทุกครั้งที่มี push ใหม่
- 📦 **Build แอปพลิเคชัน** อัตโนมัติ
- 🚀 **Deploy ขึ้น server** เมื่อ merge code
- 🔔 **แจ้งเตือน** ผ่าน Slack/Discord เมื่อมี error

### 📖 คำจำกัดความ
GitHub Actions คือแพลตฟอร์ม **CI/CD** (Continuous Integration/Continuous Deployment) ที่ช่วยให้การ build, test และ deploy เกิดขึ้นอัตโนมัติเมื่อเกิด event เช่น push, pull request หรือ schedule

### 🌟 ประโยชน์ของ GitHub Actions
- ✅ **ทำงานซ้ำ ๆ อัตโนมัติ** - ไม่ต้องรัน test หรือ deploy ด้วยมือ
- ✅ **ลด human error** - คำสั่งทำงานเหมือนเดิมทุกครั้ง
- ✅ **ฟรี** สำหรับ public repository (2,000 นาที/เดือน สำหรับ private)
- ✅ **ใช้ง่าย** - เขียนด้วย YAML ไฟล์เดียว
- ✅ **มี Actions สำเร็จรูป** จาก GitHub Marketplace

## 2. องค์ประกอบของ GitHub Actions

### 🧩 ภาพรวมโครงสร้าง
```
Workflow (งาน)
  ├── Event (เหตุการณ์ที่กระตุ้น)
  ├── Jobs (ชุดงาน)
  │   ├── Runner (เครื่องที่รันงาน)
  │   └── Steps (ขั้นตอนย่อย)
  │       ├── Action (ใช้ Action สำเร็จรูป)
  │       └── Run (รันคำสั่ง shell)
```

---

### 2.1 Workflows (ไฟล์สูตรทำงาน)

**คืออะไร:**  
Workflow คือ "สูตรการทำงานอัตโนมัติ" ที่เขียนในไฟล์ `.yml` 

**ที่เก็บ:**  
`.github/workflows/` (เช่น `.github/workflows/ci.yml`)

**เปรียบเทียบ:**  
เหมือนสูตรทำอาหาร ที่บอกว่า "เมื่อไหร่" ต้อง "ทำอะไร" บ้าง

**ตัวอย่าง:**
```yaml
name: CI Workflow          # ชื่อ workflow
on: [push]                 # ทำงานเมื่อมี push
jobs:                      # งานที่ต้องทำ
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
```

---

### 2.2 Events (เหตุการณ์ทริกเกอร์)

**คืออะไร:**  
Event คือ "เหตุการณ์" ที่กระตุ้นให้ Workflow ทำงาน

**Events ที่ใช้บ่อย:**
- `push` - เมื่อมีการ push code
- `pull_request` - เมื่อสร้าง/อัพเดท PR
- `schedule` - ตามเวลาที่กำหนด (เช่น ทุกวันเวลา 9:00)
- `workflow_dispatch` - รันด้วยมือผ่าน GitHub UI
- `release` - เมื่อสร้าง release ใหม่

**ตัวอย่าง:**
```yaml
on:
  push:
    branches: [main, develop]      # ทำงานเมื่อ push ไป main หรือ develop
  pull_request:
    branches: [main]               # ทำงานเมื่อมี PR ไป main
  schedule:
    - cron: '0 9 * * *'            # ทุกวันเวลา 9:00 น.
```

**เปรียบเทียบ:**  
เหมือนการตั้งปลุก - กำหนดว่า "เมื่อไหร่" ให้ทำงาน

---

### 2.3 Jobs (งานหลัก)

**คืออะไร:**  
Job คือ "ชุดงาน" ที่ประกอบด้วยหลาย steps ทำงานบนเครื่องเดียวกัน

**ลักษณะการทำงาน:**
- หลาย jobs ทำงาน **parallel** (พร้อมกัน) ตามค่าเริ่มต้น
- สามารถกำหนดให้ job หนึ่ง รอ job อื่นเสร็จก่อน (`needs`)

**ตัวอย่าง:**
```yaml
jobs:
  build:                          # Job 1: Build
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
  
  test:                           # Job 2: Test
    runs-on: ubuntu-latest
    needs: build                  # รอ build เสร็จก่อน
    steps:
      - run: npm test
  
  deploy:                         # Job 3: Deploy
    runs-on: ubuntu-latest
    needs: [build, test]          # รอ build และ test เสร็จ
    steps:
      - run: npm run deploy
```

**เปรียบเทียบ:**  
เหมือนทีมงาน - แต่ละคนทำงานคนละส่วน

---

### 2.4 Steps (ขั้นตอนย่อย)

**คืออะไร:**  
Step คือ "ขั้นตอนย่อย ๆ" ภายใน job ที่ทำงานตามลำดับ

**ประเภท Steps:**
1. **uses** - เรียกใช้ Action สำเร็จรูป
2. **run** - รันคำสั่ง shell

**ตัวอย่าง:**
```yaml
steps:
  # Step 1: ดาวน์โหลด code จาก repo
  - uses: actions/checkout@v4
  
  # Step 2: ติดตั้ง Node.js
  - uses: actions/setup-node@v4
    with:
      node-version: 20
  
  # Step 3: ติดตั้ง dependencies
  - run: npm install
  
  # Step 4: รัน tests
  - run: npm test
  
  # Step 5: Build production
  - run: npm run build
```

**เปรียบเทียบ:**  
เหมือนสูตรทำอาหาร - ทำทีละขั้นตอน ตามลำดับ

---

### 2.5 Runners (เครื่องรัน)

**คืออะไร:**  
Runner คือ "เครื่องคอมพิวเตอร์" ที่รัน workflow

**ประเภท Runners:**

**1. GitHub-hosted (GitHub จัดให้):**
- `ubuntu-latest` (Linux) - แนะนำ เร็ว ถูก
- `windows-latest` (Windows) - สำหรับ .NET, PowerShell
- `macos-latest` (macOS) - สำหรับ iOS, Swift

**2. Self-hosted (ติดตั้งเอง):**
- รันบนเครื่อง server ของเราเอง
- ควบคุมได้มากกว่า แต่ต้องดูแลเอง

**ตัวอย่าง:**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest        # ใช้ Ubuntu
  
  build-windows:
    runs-on: windows-latest       # ใช้ Windows
  
  build-mac:
    runs-on: macos-latest         # ใช้ macOS
```

**ค่าใช้จ่าย (สำหรับ private repo):**
- Linux: 1 นาที = 1 นาที
- Windows: 1 นาที = 2 นาที
- macOS: 1 นาที = 10 นาที

💡 **คำแนะนำ:** ใช้ `ubuntu-latest` เพื่อประหยัดเวลา  

## 3. Contexts & Variables (ตัวแปรและข้อมูล)

### 📦 Contexts คืออะไร
Contexts คือ "ข้อมูลที่ GitHub Actions เตรียมไว้ให้" ที่เราสามารถเรียกใช้ใน workflow ได้

### 🔑 ตัวแปรที่ใช้บ่อย

**1. github (ข้อมูลเกี่ยวกับ repository/event)**
```yaml
${{ github.repository }}        # ชื่อ repo (เช่น owner/repo-name)
${{ github.ref }}               # branch/tag ปัจจุบัน (refs/heads/main)
${{ github.sha }}               # commit SHA
${{ github.actor }}             # คนที่ trigger workflow
${{ github.event_name }}        # event ที่ trigger (push, pull_request)
```

**2. runner (ข้อมูลเกี่ยวกับเครื่องที่รัน)**
```yaml
${{ runner.os }}                # ระบบปฏิบัติการ (Linux, Windows, macOS)
${{ runner.temp }}              # ตำแหน่ง temp directory
${{ runner.tool_cache }}        # ตำแหน่ง tool cache
```

**3. secrets (ข้อมูลลับ)**
```yaml
${{ secrets.MY_SECRET }}        # ค่าที่เก็บใน GitHub Secrets
${{ secrets.API_KEY }}          # API key
${{ secrets.DEPLOY_TOKEN }}     # Deploy token
```

**4. env (ตัวแปร environment)**
```yaml
env:
  NODE_ENV: production
  API_URL: https://api.example.com

steps:
  - run: echo ${{ env.NODE_ENV }}    # ใช้งาน env variable
```

### 💡 ตัวอย่างการใช้งานจริง

**ตัวอย่างที่ 1: ใช้ชื่อ branch**
```yaml
- name: แสดงชื่อ branch
  run: echo "Branch: ${{ github.ref_name }}"
```

**ตัวอย่างที่ 2: Run เฉพาะ branch หลัก**
```yaml
- name: Deploy to production
  if: github.ref == 'refs/heads/main'
  run: npm run deploy
```

**ตัวอย่างที่ 3: ใช้ secrets**
```yaml
- name: Deploy with token
  run: |
    echo "Token: ${{ secrets.DEPLOY_TOKEN }}"
  env:
    API_KEY: ${{ secrets.API_KEY }}
```

**ตัวอย่างที่ 4: ใช้ข้อมูล runner**
```yaml
- name: แสดงข้อมูลเครื่อง
  run: |
    echo "OS: ${{ runner.os }}"
    echo "Temp: ${{ runner.temp }}"
```

### 🔐 การตั้งค่า Secrets

**วิธีเพิ่ม Secret:**
1. ไปที่ GitHub Repository → **Settings** → **Secrets and variables** → **Actions**
2. คลิก **New repository secret**
3. ใส่ Name (เช่น `DEPLOY_TOKEN`) และ Value
4. คลิก **Add secret**

**ใช้ Secret ใน workflow:**
```yaml
steps:
  - name: Deploy
    run: ./deploy.sh
    env:
      DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
      API_KEY: ${{ secrets.API_KEY }}
```

⚠️ **ข้อควรระวัง:** Secrets จะไม่แสดงใน logs (ปลอดภัย)

## 4. ตัวอย่าง Workflow แบบละเอียด

### 4.1 Node.js CI (Test อัตโนมัติ)

**เป้าหมาย:**  
รัน test ทุกครั้งที่มี push หรือ pull request ไปยัง main branch

**ไฟล์:** `.github/workflows/ci.yml`

```yaml
name: CI                          # ชื่อ workflow (แสดงใน GitHub Actions tab)

on:                               # เมื่อไหร่ให้ทำงาน
  push:
    branches: [main]              # เมื่อ push ไป main
  pull_request:
    branches: [main]              # เมื่อมี PR ไป main

jobs:                             # งานที่ต้องทำ
  build:                          # ชื่อ job
    runs-on: ubuntu-latest        # รันบน Ubuntu

    steps:                        # ขั้นตอนการทำงาน
      # Step 1: ดาวน์โหลด code จาก repo
      - name: Checkout code
        uses: actions/checkout@v4

      # Step 2: ติดตั้ง Node.js version 20
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'            # cache npm dependencies เพื่อความเร็ว

      # Step 3: ติดตั้ง dependencies
      - name: Install dependencies
        run: npm install

      # Step 4: รัน linter (ตรวจสอบโค้ด)
      - name: Run linter
        run: npm run lint

      # Step 5: รัน tests
      - name: Run tests
        run: npm test

      # Step 6: Build production
      - name: Build
        run: npm run build
```

**ผลลัพธ์:**
- ✅ Test ผ่าน → แสดง green checkmark
- ❌ Test fail → แสดง red X และแจ้งเตือน

---

### 4.2 Deploy to Production (SSH)

**เป้าหมาย:**  
Deploy code ขึ้น production server ผ่าน SSH เมื่อ push ไปที่ main

**ไฟล์:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]              # Deploy เมื่อ push ไป main เท่านั้น

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      # Step 1: ดาวน์โหลด code
      - name: Checkout code
        uses: actions/checkout@v4

      # Step 2: Setup SSH key
      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H ${{ secrets.SERVER_IP }} >> ~/.ssh/known_hosts

      # Step 3: Deploy via SSH
      - name: Deploy to server
        run: |
          ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_IP }} << 'EOF'
            cd /var/www/myapp
            git pull origin main
            npm install --production
            npm run build
            pm2 restart myapp
          EOF

      # Step 4: Health check
      - name: Verify deployment
        run: |
          sleep 5
          curl -f https://myapp.com/health || exit 1
```

**Secrets ที่ต้องตั้ง:**
- `SSH_PRIVATE_KEY` - SSH private key
- `SERVER_IP` - IP address ของ server
- `SERVER_USER` - Username สำหรับ SSH

---

### 4.3 Deploy to GitHub Pages (Static Site)

**เป้าหมาย:**  
Deploy static website ขึ้น GitHub Pages อัตโนมัติ

**ไฟล์:** `.github/workflows/pages.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install and Build
        run: |
          npm install
          npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'          # โฟลเดอร์ที่ build เสร็จ

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

---

### 4.4 Multi-Environment Deploy (Dev → Staging → Prod)

**เป้าหมาย:**  
Deploy ไปยังหลาย environments ตามชื่อ branch

**ไฟล์:** `.github/workflows/multi-env.yml`

```yaml
name: Multi Environment Deploy

on:
  push:
    branches: [develop, staging, main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      # Deploy to Dev environment
      - name: Deploy to Dev
        if: github.ref == 'refs/heads/develop'
        run: |
          echo "Deploying to DEV..."
          npm run deploy:dev
        env:
          API_URL: ${{ secrets.DEV_API_URL }}

      # Deploy to Staging environment
      - name: Deploy to Staging
        if: github.ref == 'refs/heads/staging'
        run: |
          echo "Deploying to STAGING..."
          npm run deploy:staging
        env:
          API_URL: ${{ secrets.STAGING_API_URL }}

      # Deploy to Production environment
      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        run: |
          echo "Deploying to PRODUCTION..."
          npm run deploy:prod
        env:
          API_URL: ${{ secrets.PROD_API_URL }}
```

---

### 4.5 Schedule Workflow (Cron Job)

**เป้าหมาย:**  
รัน backup database ทุกวันเวลา 2:00 น.

**ไฟล์:** `.github/workflows/backup.yml`

```yaml
name: Daily Database Backup

on:
  schedule:
    - cron: '0 2 * * *'           # ทุกวัน เวลา 02:00 UTC
  workflow_dispatch:              # อนุญาตให้รันด้วยมือได้

jobs:
  backup:
    runs-on: ubuntu-latest
    
    steps:
      - name: Backup database
        run: |
          echo "Running backup at $(date)"
          # mysqldump commands here
          
      - name: Upload to S3
        run: |
          aws s3 cp backup.sql s3://my-backups/
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET }}
```

**Cron Syntax:**
```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-6, Sunday=0)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

**ตัวอย่าง Cron:**
- `0 2 * * *` - ทุกวันเวลา 02:00
- `0 0 * * 0` - ทุกวันอาทิตย์เวลา 00:00
- `*/15 * * * *` - ทุก 15 นาที
- `0 9-17 * * 1-5` - ทุกชั่วโมง 9-17 น. วันจันทร์-ศุกร์

## 5. GitHub Marketplace (แหล่งรวม Actions สำเร็จรูป)

### 🛒 GitHub Marketplace คืออะไร
Marketplace คือ "ร้านค้า Actions สำเร็จรูป" ที่ใครก็ตามสามารถสร้างและแชร์ Actions ได้

**เว็บไซต์:** https://github.com/marketplace?type=actions

---

### ⭐ Actions ยอดนิยมที่ควรรู้จัก

#### 1. actions/checkout
**ทำอะไร:** ดาวน์โหลด code จาก repository

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0              # ดาวน์โหลด history ทั้งหมด
```

**เมื่อไหร่ใช้:** ใช้เกือบทุก workflow (ข้อแรกเสมอ)

---

#### 2. actions/setup-node
**ทำอะไร:** ติดตั้ง Node.js และ npm

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'          # หรือ 18, 16
    cache: 'npm'                # cache dependencies
```

**ทำไมต้องใช้:** เพื่อให้รัน npm commands ได้

---

#### 3. actions/setup-python
**ทำอะไร:** ติดตั้ง Python

```yaml
- uses: actions/setup-python@v5
  with:
    python-version: '3.11'
    cache: 'pip'
```

**เหมาะกับ:** โปรเจค Python, Django, Flask

---

#### 4. docker/build-push-action
**ทำอะไร:** Build Docker image และ push ขึ้น registry

```yaml
- uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: myapp:latest
```

**เหมาะกับ:** โปรเจคที่ใช้ Docker

---

#### 5. actions/upload-artifact & download-artifact
**ทำอะไร:** แชร์ไฟล์ระหว่าง jobs

```yaml
# Upload artifact
- uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: dist/

# Download artifact (ใน job อื่น)
- uses: actions/download-artifact@v4
  with:
    name: build-output
```

**เมื่อไหร่ใช้:** เมื่อต้องส่ง build output จาก job หนึ่งไป job อื่น

---

#### 6. peaceiris/actions-gh-pages
**ทำอะไร:** Deploy static site ขึ้น GitHub Pages

```yaml
- uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

**เหมาะกับ:** Documentation, Portfolio, Static websites

---

#### 7. actions/cache
**ทำอะไร:** Cache dependencies เพื่อความเร็ว

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

**ผลลัพธ์:** ลดเวลา install dependencies

---

#### 8. codecov/codecov-action
**ทำอะไร:** อัพโหลด code coverage report

```yaml
- uses: codecov/codecov-action@v4
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    files: ./coverage/coverage.xml
```

**เหมาะกับ:** โปรเจคที่ต้องการ track test coverage

---

#### 9. softprops/action-gh-release
**ทำอะไร:** สร้าง GitHub Release อัตโนมัติ

```yaml
- uses: softprops/action-gh-release@v1
  with:
    files: |
      dist/*.zip
      LICENSE.txt
```

**เมื่อไหร่ใช้:** เมื่อต้องการสร้าง release และแนบไฟล์

---

#### 10. slack-send
**ทำอะไร:** ส่ง notification ไปยัง Slack

```yaml
- uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Deploy ✅ สำเร็จ!"
      }
```

**เหมาะกับ:** แจ้งเตือนทีมเมื่อ deploy สำเร็จ/ล้มเหลว

---

### 🔍 วิธีหา Actions ที่เหมาะสม

**1. ค้นหาใน Marketplace:**
- ไปที่ https://github.com/marketplace?type=actions
- ค้นหาด้วยคำว่า "deploy", "docker", "test" ฯลฯ

**2. ดูจาก Awesome Lists:**
- [Awesome Actions](https://github.com/sdras/awesome-actions)

**3. ดูจากโปรเจคอื่น:**
- เข้าไปดู `.github/workflows/` ของโปรเจคยอดนิยม

---

### 💡 Best Practices เมื่อใช้ Actions

✅ **ระบุ version ให้ชัดเจน**
```yaml
# ดี
- uses: actions/checkout@v4

# ไม่ดี
- uses: actions/checkout@main    # version เปลี่ยนได้ ไม่ stable
```

✅ **อ่าน README ก่อนใช้**  
ดูว่า Action ต้องการ inputs อะไรบ้าง

✅ **ตรวจสอบ permissions**  
บาง Actions ต้องการ permissions พิเศษ

---

### 📚 ตัวอย่าง Workflow ที่ใช้หลาย Actions

```yaml
name: Full CI/CD Pipeline

on: [push]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      # 1. Checkout code
      - uses: actions/checkout@v4
      
      # 2. Setup Node.js
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      # 3. Install dependencies
      - run: npm ci
      
      # 4. Run tests with coverage
      - run: npm test -- --coverage
      
      # 5. Upload coverage to Codecov
      - uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
      
      # 6. Build
      - run: npm run build
      
      # 7. Upload build artifact
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
      
      # 8. Deploy to GitHub Pages
      - uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
      
      # 9. Notify Slack
      - uses: slackapi/slack-github-action@v1
        if: always()
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "Deploy ${{ job.status }}"
            }
```

---

## 6. เคล็ดลับและ Best Practices

### ✅ ควรทำ (Do's)

1. **ใช้ cache เพื่อความเร็ว**
   ```yaml
   - uses: actions/cache@v4
     with:
       path: ~/.npm
       key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
   ```

2. **ใช้ matrix strategy สำหรับหลาย version**
   ```yaml
   strategy:
     matrix:
       node-version: [18, 20, 22]
   ```

3. **ตั้งชื่อ steps ให้ชัดเจน**
   ```yaml
   - name: Install dependencies
     run: npm install
   ```

4. **ใช้ secrets สำหรับข้อมูลลับ**
   ```yaml
   env:
     API_KEY: ${{ secrets.API_KEY }}
   ```

5. **ตั้ง timeout เผื่อ workflow ค้าง**
   ```yaml
   jobs:
     build:
       timeout-minutes: 10
   ```

### ❌ ไม่ควรทำ (Don'ts)

1. **อย่าใส่ secrets ในโค้ด**
   ```yaml
   # ❌ อย่าทำ
   - run: echo "API_KEY=abc123"
   
   # ✅ ใช้แบบนี้แทน
   - run: echo "API_KEY=${{ secrets.API_KEY }}"
   ```

2. **อย่า hardcode values**
   ```yaml
   # ❌ อย่าทำ
   - run: deploy.sh production
   
   # ✅ ใช้ env variable
   - run: deploy.sh ${{ env.ENVIRONMENT }}
   ```

3. **อย่ารัน workflow บ่อยเกินไป**
   - ใช้ `paths` filter เพื่อจำกัดว่าไฟล์ไหนถึงจะ trigger
   ```yaml
   on:
     push:
       paths:
         - 'src/**'
         - 'package.json'
   ```

---

## 7. Debugging GitHub Actions

### 🐛 วิธีแก้ปัญหาเมื่อ Workflow ล้มเหลว

**1. ดู Logs ใน GitHub Actions Tab**
- คลิกที่ failed workflow
- ดู step ไหนที่ fail
- อ่าน error message

**2. เปิด Debug Logging**
```yaml
- name: Debug step
  run: |
    echo "Node version: $(node -v)"
    echo "Working directory: $(pwd)"
    ls -la
```

**3. ใช้ act เพื่อรัน locally**
```bash
# ติดตั้ง act
brew install act        # macOS
choco install act       # Windows

# รัน workflow locally
act push
```

**4. ใช้ tmate สำหรับ SSH debug**
```yaml
- name: Setup tmate session
  uses: mxschmitt/action-tmate@v3
```

---

## 8. สรุป

### 📝 สิ่งที่เราได้เรียนรู้

1. **GitHub Actions = ผู้ช่วยอัตโนมัติ** ที่ช่วย build, test, deploy
2. **Workflow** = สูตรการทำงาน (YAML file)
3. **Event** = เหตุการณ์ที่กระตุ้น (push, PR, schedule)
4. **Job** = ชุดงาน (สามารถทำงานพร้อมกันได้)
5. **Step** = ขั้นตอนย่อย (ทำงานตามลำดับ)
6. **Runner** = เครื่องที่รัน (ubuntu, windows, macos)
7. **Marketplace** = ร้านรวม Actions สำเร็จรูป

### 🎯 Next Steps

1. สร้าง workflow แรกของคุณ (เริ่มจาก CI ง่าย ๆ)
2. ทดลองใช้ Actions จาก Marketplace
3. เพิ่ม deploy workflow
4. ตั้ง secrets สำหรับ production

### 📚 แหล่งเรียนรู้เพิ่มเติม

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Awesome Actions List](https://github.com/sdras/awesome-actions)  


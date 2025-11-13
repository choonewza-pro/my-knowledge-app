# Step 05 – Migrate หน้า Knowledge Pages

## 🎯 Goal

แปลงหน้าความรู้ทั้งหมดจาก `old-website/knowledges/` มาเป็น React components โดยรักษาเนื้อหา, formatting และ structure ให้เหมือนเดิม พร้อมทั้งเพิ่มฟีเจอร์ที่ดีกว่าเช่น syntax highlighting และ table of contents

---

## ✅ Tasks (Checklist)

### 1. วิเคราะห์โครงสร้างหน้า Knowledge

- [ ] **ศึกษาโครงสร้างของหน้า knowledge แต่ละหน้า**
  - `git-commands-reference.html`
  - `git-naming-guide.html`
  - `git-naming-summary-tables.html`
  - `git-workflow-add-feature.html`
  - `git-workflow-bugfix.html`
  - `git-workflow-hotfix.html`
  - `github-actions-guide.html`
  - `github-guide.html`

- [ ] **จดบันทึก common patterns**
  - Section headings
  - Code blocks
  - Tables
  - Warning/note boxes
  - Command examples
  - Diagrams (ถ้ามี)

### 2. ติดตั้ง Dependencies สำหรับ Code Highlighting (Optional)

- [ ] **ติดตั้ง Syntax Highlighting library**
  - **Option 1**: Prism.js
    ```powershell
    npm install prismjs @types/prismjs
    ```
  - **Option 2**: Highlight.js
    ```powershell
    npm install highlight.js
    ```
  - **Option 3**: react-syntax-highlighter
    ```powershell
    npm install react-syntax-highlighter @types/react-syntax-highlighter
    ```

- [ ] **ตั้งค่า syntax highlighting**
  - Import CSS theme ใน `src/index.css`
  ```css
  @import "tailwindcss";
  @import "prismjs/themes/prism-tomorrow.css"; /* หรือ theme อื่น */
  ```

### 3. สร้าง Knowledge Components

#### 3.1 CodeBlock Component

- [ ] **สร้าง `src/components/common/CodeBlock.tsx`**
  - Component สำหรับแสดง code snippets
  - รองรับ syntax highlighting
  - รองรับ copy to clipboard
  ```tsx
  import { useState } from 'react';
  import Prism from 'prismjs';
  import 'prismjs/components/prism-bash';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/components/prism-typescript';

  interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
    showLineNumbers?: boolean;
  }

  export function CodeBlock({
    code,
    language = 'bash',
    title,
    showLineNumbers = false
  }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const highlighted = Prism.highlight(
      code,
      Prism.languages[language],
      language
    );

    return (
      <div className="my-4 overflow-hidden rounded-lg border border-base-300">
        {title && (
          <div className="flex items-center justify-between bg-base-200 px-4 py-2">
            <span className="text-sm font-semibold">{title}</span>
            <button
              onClick={handleCopy}
              className="btn btn-ghost btn-sm"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
        <pre className={showLineNumbers ? 'line-numbers' : ''}>
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
    );
  }
  ```

#### 3.2 CommandExample Component

- [ ] **สร้าง `src/components/features/CommandExample.tsx`**
  - Component สำหรับแสดง Git command examples
  ```tsx
  interface CommandExampleProps {
    command: string;
    description?: string;
    output?: string;
  }

  export function CommandExample({
    command,
    description,
    output
  }: CommandExampleProps) {
    return (
      <div className="my-6">
        {description && (
          <p className="mb-2 text-sm text-base-content/70">{description}</p>
        )}
        <div className="rounded-lg bg-base-300 p-4 font-mono text-sm">
          <div className="flex items-start gap-2">
            <span className="text-success">$</span>
            <code className="flex-1">{command}</code>
          </div>
          {output && (
            <div className="mt-2 text-base-content/60">
              <pre>{output}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }
  ```

#### 3.3 AlertBox Component

- [ ] **สร้าง `src/components/common/AlertBox.tsx`**
  - Component สำหรับแสดง warnings, notes, tips
  ```tsx
  interface AlertBoxProps {
    type?: 'info' | 'warning' | 'success' | 'error';
    title?: string;
    children: React.ReactNode;
  }

  export function AlertBox({
    type = 'info',
    title,
    children
  }: AlertBoxProps) {
    const styles = {
      info: 'alert-info',
      warning: 'alert-warning',
      success: 'alert-success',
      error: 'alert-error'
    };

    const icons = {
      info: 'bi-info-circle',
      warning: 'bi-exclamation-triangle',
      success: 'bi-check-circle',
      error: 'bi-x-circle'
    };

    return (
      <div className={`alert ${styles[type]} my-4`}>
        <i className={`${icons[type]} text-xl`}></i>
        <div>
          {title && <h4 className="font-bold">{title}</h4>}
          <div>{children}</div>
        </div>
      </div>
    );
  }
  ```

#### 3.4 TableOfContents Component (Optional)

- [ ] **สร้าง `src/components/features/TableOfContents.tsx`**
  - Component สำหรับแสดง table of contents
  - Auto-generate จาก headings
  ```tsx
  interface TOCItem {
    id: string;
    text: string;
    level: number;
  }

  interface TableOfContentsProps {
    items: TOCItem[];
  }

  export function TableOfContents({ items }: TableOfContentsProps) {
    return (
      <aside className="sticky top-20 rounded-lg border border-base-300 bg-base-100 p-6">
        <h3 className="mb-4 text-lg font-bold">สารบัญ</h3>
        <ul className="space-y-2">
          {items.map(item => (
            <li
              key={item.id}
              className={`pl-${(item.level - 1) * 4}`}
            >
              <a
                href={`#${item.id}`}
                className="text-sm hover:text-primary"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
  ```

### 4. สร้าง Knowledge Page Components

#### 4.1 GitCommandsPage

- [ ] **สร้าง `src/pages/knowledge/GitCommandsPage.tsx`**
  - แปลงจาก `old-website/knowledges/git-commands-reference.html`
  - ใช้ KnowledgeLayout
  - แบ่ง sections ตาม commands categories

  ```tsx
  import { KnowledgeLayout } from '@/layouts/KnowledgeLayout';
  import { useDocumentTitle } from '@/hooks';
  import { CodeBlock, AlertBox } from '@/components/common';
  import { CommandExample } from '@/components/features';

  export function GitCommandsPage() {
    useDocumentTitle('Git Commands Reference');

    return (
      <>
        <h1 className="mb-6 text-4xl font-bold">Git Commands Reference</h1>
        <p className="mb-8 text-lg text-base-content/80">
          คู่มืออ้างอิงคำสั่ง Git พื้นฐานและขั้นสูง พร้อมตัวอย่างการใช้งาน
        </p>

        {/* Basic Commands */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">คำสั่งพื้นฐาน</h2>
          
          <h3 className="mb-3 text-xl font-semibold">git init</h3>
          <p className="mb-2">สร้าง Git repository ใหม่</p>
          <CommandExample
            command="git init"
            description="สร้าง repository ใหม่ในโฟลเดอร์ปัจจุบัน"
          />

          <h3 className="mb-3 text-xl font-semibold">git clone</h3>
          <p className="mb-2">Clone repository จาก remote</p>
          <CommandExample
            command="git clone https://github.com/user/repo.git"
            description="Clone repository จาก GitHub"
          />

          {/* เพิ่มคำสั่งอื่น ๆ */}
        </section>

        {/* Advanced Commands */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">คำสั่งขั้นสูง</h2>
          
          {/* ... */}
        </section>

        {/* Warning Box Example */}
        <AlertBox type="warning" title="คำเตือน">
          <p>คำสั่ง <code>git reset --hard</code> จะลบการเปลี่ยนแปลงทั้งหมด ใช้ด้วยความระมัดระวัง!</p>
        </AlertBox>
      </>
    );
  }
  ```

#### 4.2 GitNamingGuidePage

- [ ] **สร้าง `src/pages/knowledge/GitNamingGuidePage.tsx`**
  - แปลงจาก `old-website/knowledges/git-naming-guide.html`
  - แสดง naming conventions สำหรับ branches, commits, tags

  ```tsx
  export function GitNamingGuidePage() {
    useDocumentTitle('Git Naming Guide');

    return (
      <>
        <h1 className="mb-6 text-4xl font-bold">Git Naming Guide</h1>
        
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Branch Naming Conventions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-xl font-semibold">Feature Branches</h3>
              <CodeBlock
                code="feature/user-authentication"
                language="bash"
                title="ตัวอย่าง"
              />
              <p className="mt-2 text-base-content/70">
                ใช้สำหรับพัฒนา feature ใหม่
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">Bugfix Branches</h3>
              <CodeBlock
                code="bugfix/fix-login-error"
                language="bash"
                title="ตัวอย่าง"
              />
            </div>

            {/* เพิ่ม naming patterns อื่น ๆ */}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Commit Message Conventions
          </h2>
          
          <AlertBox type="info" title="Best Practice">
            <p>ใช้ Conventional Commits format:</p>
            <code>type(scope): subject</code>
          </AlertBox>

          {/* ตัวอย่าง commit messages */}
        </section>
      </>
    );
  }
  ```

#### 4.3 GitNamingSummaryPage

- [ ] **สร้าง `src/pages/knowledge/GitNamingSummaryPage.tsx`**
  - แปลงจาก `old-website/knowledges/git-naming-summary-tables.html`
  - ใช้ daisyUI table component

  ```tsx
  export function GitNamingSummaryPage() {
    useDocumentTitle('Git Naming Summary Tables');

    return (
      <>
        <h1 className="mb-6 text-4xl font-bold">Git Naming Summary Tables</h1>
        
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Branch Types
          </h2>
          
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Format</th>
                  <th>Example</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>feature</code></td>
                  <td><code>feature/&lt;name&gt;</code></td>
                  <td><code>feature/user-auth</code></td>
                  <td>New feature development</td>
                </tr>
                <tr>
                  <td><code>bugfix</code></td>
                  <td><code>bugfix/&lt;name&gt;</code></td>
                  <td><code>bugfix/login-error</code></td>
                  <td>Bug fixes</td>
                </tr>
                {/* เพิ่มแถวอื่น ๆ */}
              </tbody>
            </table>
          </div>
        </section>

        {/* เพิ่ม tables อื่น ๆ */}
      </>
    );
  }
  ```

#### 4.4 Workflow Pages

- [ ] **สร้าง `src/pages/knowledge/GitWorkflowFeaturePage.tsx`**
  - แปลงจาก `git-workflow-add-feature.html`
  - แสดง step-by-step workflow พร้อม diagrams

- [ ] **สร้าง `src/pages/knowledge/GitWorkflowBugfixPage.tsx`**
  - แปลงจาก `git-workflow-bugfix.html`

- [ ] **สร้าง `src/pages/knowledge/GitWorkflowHotfixPage.tsx`**
  - แปลงจาก `git-workflow-hotfix.html`

  ```tsx
  export function GitWorkflowFeaturePage() {
    useDocumentTitle('Git Workflow - Add Feature');

    return (
      <>
        <h1 className="mb-6 text-4xl font-bold">
          Git Workflow: Add Feature
        </h1>
        
        <AlertBox type="info">
          <p>Workflow สำหรับการเพิ่ม feature ใหม่ โดยใช้ Git Flow pattern</p>
        </AlertBox>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Step 1: Create Feature Branch
          </h2>
          
          <CommandExample
            command="git checkout -b feature/user-profile"
            description="สร้าง feature branch จาก develop"
          />

          <p className="mt-4">
            สร้าง branch ใหม่จาก develop สำหรับพัฒนา feature
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Step 2: Develop Feature
          </h2>
          
          <CommandExample
            command="git add ."
          />
          <CommandExample
            command='git commit -m "feat: add user profile page"'
          />
        </section>

        {/* เพิ่ม steps อื่น ๆ */}
      </>
    );
  }
  ```

#### 4.5 GitHub Pages

- [ ] **สร้าง `src/pages/knowledge/GitHubActionsPage.tsx`**
  - แปลงจาก `github-actions-guide.html`

- [ ] **สร้าง `src/pages/knowledge/GitHubGuidePage.tsx`**
  - แปลงจาก `github-guide.html`

  ```tsx
  export function GitHubActionsPage() {
    useDocumentTitle('GitHub Actions Guide');

    return (
      <>
        <h1 className="mb-6 text-4xl font-bold">GitHub Actions Guide</h1>
        
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            What is GitHub Actions?
          </h2>
          
          <p className="mb-4">
            GitHub Actions คือ CI/CD platform ที่ช่วยให้คุณสามารถ automate workflows
          </p>

          <AlertBox type="info" title="Key Concepts">
            <ul className="list-inside list-disc space-y-1">
              <li>Workflows</li>
              <li>Events</li>
              <li>Jobs</li>
              <li>Steps</li>
              <li>Actions</li>
            </ul>
          </AlertBox>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Example Workflow
          </h2>
          
          <CodeBlock
            language="yaml"
            title=".github/workflows/ci.yml"
            code={`name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test`}
          />
        </section>
      </>
    );
  }
  ```

### 5. Export Knowledge Pages

- [ ] **สร้าง `src/pages/knowledge/index.ts`**
  ```tsx
  export { GitCommandsPage } from './GitCommandsPage';
  export { GitNamingGuidePage } from './GitNamingGuidePage';
  export { GitNamingSummaryPage } from './GitNamingSummaryPage';
  export { GitWorkflowFeaturePage } from './GitWorkflowFeaturePage';
  export { GitWorkflowBugfixPage } from './GitWorkflowBugfixPage';
  export { GitWorkflowHotfixPage } from './GitWorkflowHotfixPage';
  export { GitHubActionsPage } from './GitHubActionsPage';
  export { GitHubGuidePage } from './GitHubGuidePage';
  ```

### 6. ทดสอบ Knowledge Pages

- [ ] **ทดสอบการแสดงผล**
  - ตรวจสอบ headings hierarchy
  - ตรวจสอบ code blocks (syntax highlighting)
  - ตรวจสอบ tables
  - ตรวจสอบ alert boxes

- [ ] **ทดสอบ Responsive Design**
  - Tables ควร scroll ได้บน mobile
  - Code blocks ควร scroll ได้

- [ ] **ทดสอบ Copy to Clipboard**
  - ทดสอบ copy button ใน CodeBlock

- [ ] **ทดสอบ Navigation**
  - Table of contents links
  - Breadcrumb navigation

---

## 📝 Notes / Best Practices

### 1. Content Structure

- **Consistent headings**: ใช้ h1 สำหรับ page title, h2 สำหรับ sections, h3 สำหรับ sub-sections
- **Semantic HTML**: ใช้ `<section>`, `<article>` อย่างถูกต้อง
- **Accessibility**: เพิ่ม id ให้ headings สำหรับ deep linking

### 2. Code Highlighting

- **Choose the right library**: Prism.js เบา, Highlight.js ครอบคลุม languages มากกว่า
- **Language support**: ติดตั้งเฉพาะ languages ที่ใช้ (bash, javascript, yaml, etc.)
- **Theme consistency**: เลือก theme ที่เข้ากับ overall design

### 3. Tables

- **Responsive tables**: ใช้ `overflow-x-auto` wrapper
- **daisyUI table**: ใช้ `table` class จาก daisyUI
- **Zebra stripes**: ใช้ `table-zebra` สำหรับ readability

### 4. Alert Boxes

- **Consistent styling**: ใช้ AlertBox component สำหรับทุก warnings/notes
- **Clear icons**: ใช้ icons ที่บ่งบอกความหมาย (warning, info, etc.)
- **ARIA attributes**: เพิ่ม role และ aria-label

### 5. Performance

- **Code splitting**: แต่ละหน้าจะถูก lazy load อัตโนมัติ
- **Image optimization**: ถ้ามี diagrams ให้ใช้ WebP format
- **Lazy load syntax highlighter**: Import เฉพาะเมื่อต้องการ

---

## ⚠️ สิ่งที่ควรระวัง

1. **Content accuracy**: ตรวจสอบว่าเนื้อหาถูกต้องเหมือนเดิม
2. **Code examples**: ทดสอบ commands ก่อน copy มา
3. **Links**: ตรวจสอบ internal/external links
4. **Tables overflow**: ทดสอบบน mobile
5. **Syntax highlighting performance**: อาจทำให้ initial load ช้า

---

## ✨ Expected Outcome

หลังจากจบ Step 05 แล้ว ควรได้:

✅ Knowledge page components ครบทั้ง 8 หน้า  
✅ CodeBlock component พร้อม syntax highlighting  
✅ CommandExample component สำหรับ Git commands  
✅ AlertBox component สำหรับ warnings/notes  
✅ Tables แสดงผลดีบนทุก device  
✅ Content ครบถ้วนเหมือนกับ old-website  
✅ Responsive design ทำงานได้ดี  
✅ Code copy-to-clipboard ทำงานได้  

---

**หมายเหตุ**: Knowledge pages คือเนื้อหาหลักของเว็บไซต์ ใช้เวลาแปลงให้ดีและครบถ้วน ตรวจสอบความถูกต้องของเนื้อหาก่อน commit

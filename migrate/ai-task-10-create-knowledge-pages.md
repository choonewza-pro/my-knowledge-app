# AI Task 10 - Create Knowledge Pages

## 🎯 Task Goal
สร้าง 8 หน้า Knowledge Pages โดยแปลงจากไฟล์ HTML ในโฟลเดอร์ `old-website/knowledges/` มาเป็น React components พร้อม markdown content

---

## 📋 Requirements

### 1. สร้างโครงสร้างโฟลเดอร์
```
src/
  pages/
    knowledge/
      GitCommandsPage.tsx
      GitNamingGuidePage.tsx
      GitNamingSummaryPage.tsx
      GitWorkflowFeaturePage.tsx
      GitWorkflowBugfixPage.tsx
      GitWorkflowHotfixPage.tsx
      GitHubActionsPage.tsx
      GitHubGuidePage.tsx
      index.ts
```

### 2. สร้าง Shared Knowledge Component

**ไฟล์:** `src/components/features/KnowledgeContent.tsx`

**ต้องการ:**
- Component สำหรับแสดง markdown content
- ใช้ breadcrumb
- มี sidebar navigation (Table of Contents)
- Responsive layout

```tsx
import { useState, useEffect } from 'react';
import { Card } from '@/components/common';

interface KnowledgeContentProps {
  title: string;
  category: string;
  icon: string;
  children: React.ReactNode;
}

export function KnowledgeContent({
  title,
  category,
  icon,
  children,
}: KnowledgeContentProps) {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  // Extract headings for Table of Contents
  useEffect(() => {
    const content = document.querySelector('.knowledge-content');
    if (!content) return;

    const h2Elements = content.querySelectorAll('h2, h3');
    const extractedHeadings = Array.from(h2Elements).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.substring(1)),
      };
    });

    setHeadings(extractedHeadings);
  }, [children]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_250px]">
        {/* Main Content */}
        <div>
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-purple-700 text-2xl text-white">
                <i className={icon}></i>
              </div>
              <div>
                <div className="text-sm text-base-content/60">{category}</div>
                <h1 className="text-3xl font-bold">{title}</h1>
              </div>
            </div>
          </div>

          {/* Content */}
          <Card variant="elevated" className="p-8">
            <div className="knowledge-content prose max-w-none">
              {children}
            </div>
          </Card>
        </div>

        {/* Sidebar - Table of Contents */}
        <div className="hidden lg:block">
          <div className="sticky top-4">
            <Card variant="bordered" className="p-4">
              <h3 className="mb-4 text-lg font-bold">สารบัญ</h3>
              <nav className="space-y-2">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`block w-full text-left text-sm hover:text-primary ${
                      heading.level === 3 ? 'pl-4' : ''
                    }`}
                  >
                    {heading.text}
                  </button>
                ))}
              </nav>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
```

อัพเดท `src/components/features/index.ts`:
```tsx
export * from './Hero';
export * from './KnowledgeCard';
export * from './TeamCard';
export * from './KnowledgeContent';
```

### 3. สร้าง Knowledge Pages (ตัวอย่าง)

**ไฟล์:** `src/pages/knowledge/GitCommandsPage.tsx`

**อ้างอิงจาก:** `old-website/knowledges/git-commands-reference.html`

```tsx
import { useDocumentTitle } from '@/hooks';
import { KnowledgeContent } from '@/components/features';

export function GitCommandsPage() {
  useDocumentTitle('Git Commands Reference');

  return (
    <KnowledgeContent
      title="Git Commands Reference"
      category="Git"
      icon="bi-terminal"
    >
      {/* คัดลอก content จาก old-website/knowledges/git-commands-reference.html */}
      <h2 id="basic-commands">คำสั่งพื้นฐาน</h2>
      
      <h3 id="git-init">git init</h3>
      <p>สร้าง Git repository ใหม่</p>
      <pre>
        <code>git init</code>
      </pre>

      <h3 id="git-clone">git clone</h3>
      <p>Clone repository จาก remote</p>
      <pre>
        <code>git clone &lt;repository-url&gt;</code>
      </pre>

      <h3 id="git-status">git status</h3>
      <p>ตรวจสอบสถานะของ working directory</p>
      <pre>
        <code>git status</code>
      </pre>

      {/* เพิ่ม content เต็มๆ ตามไฟล์ HTML เดิม */}
      
      <h2 id="branching">Branching</h2>
      
      <h3 id="git-branch">git branch</h3>
      <p>จัดการ branches</p>
      <pre>
        <code>{`# ดู branches ทั้งหมด
git branch

# สร้าง branch ใหม่
git branch <branch-name>

# ลบ branch
git branch -d <branch-name>`}</code>
      </pre>

      {/* ... เพิ่ม sections อื่นๆ */}
    </KnowledgeContent>
  );
}
```

**ไฟล์:** `src/pages/knowledge/GitNamingGuidePage.tsx`

**อ้างอิงจาก:** `old-website/knowledges/git-naming-guide.html`

```tsx
import { useDocumentTitle } from '@/hooks';
import { KnowledgeContent } from '@/components/features';

export function GitNamingGuidePage() {
  useDocumentTitle('Git Naming Guide');

  return (
    <KnowledgeContent
      title="Git Naming Guide"
      category="Git"
      icon="bi-tags"
    >
      {/* คัดลอก content จาก HTML */}
      <h2 id="branch-naming">การตั้งชื่อ Branch</h2>
      
      <h3 id="branch-types">ประเภทของ Branch</h3>
      <ul>
        <li><code>feature/</code> - สำหรับ feature ใหม่</li>
        <li><code>bugfix/</code> - สำหรับแก้ bug</li>
        <li><code>hotfix/</code> - สำหรับแก้ bug ใน production</li>
        <li><code>release/</code> - สำหรับเตรียม release</li>
      </ul>

      <h3 id="branch-examples">ตัวอย่าง</h3>
      <pre>
        <code>{`feature/user-authentication
bugfix/fix-login-error
hotfix/critical-security-patch
release/v1.2.0`}</code>
      </pre>

      {/* ... เพิ่ม sections อื่นๆ */}
    </KnowledgeContent>
  );
}
```

**ทำเช่นเดียวกันสำหรับหน้าอื่นๆ:**
- `GitNamingSummaryPage.tsx` (อ้างอิง `git-naming-summary-tables.html`)
- `GitWorkflowFeaturePage.tsx` (อ้างอิง `git-workflow-add-feature.html`)
- `GitWorkflowBugfixPage.tsx` (อ้างอิง `git-workflow-bugfix.html`)
- `GitWorkflowHotfixPage.tsx` (อ้างอิง `git-workflow-hotfix.html`)
- `GitHubActionsPage.tsx` (อ้างอิง `github-actions-guide.html`)
- `GitHubGuidePage.tsx` (อ้างอิง `github-guide.html`)

### 4. สร้าง Barrel Export

**ไฟล์:** `src/pages/knowledge/index.ts`

```tsx
export * from './GitCommandsPage';
export * from './GitNamingGuidePage';
export * from './GitNamingSummaryPage';
export * from './GitWorkflowFeaturePage';
export * from './GitWorkflowBugfixPage';
export * from './GitWorkflowHotfixPage';
export * from './GitHubActionsPage';
export * from './GitHubGuidePage';
```

### 5. เพิ่ม Prose Styles

**ไฟล์:** `src/index.css`

**เพิ่ม custom styles สำหรับ markdown content:**

```css
/* Prose styles for knowledge content */
.prose {
  @apply text-base-content;
}

.prose h2 {
  @apply mb-4 mt-8 text-2xl font-bold;
  @apply border-b border-base-300 pb-2;
}

.prose h3 {
  @apply mb-3 mt-6 text-xl font-bold;
}

.prose p {
  @apply mb-4 leading-relaxed;
}

.prose ul,
.prose ol {
  @apply mb-4 ml-6 space-y-2;
}

.prose ul {
  @apply list-disc;
}

.prose ol {
  @apply list-decimal;
}

.prose li {
  @apply leading-relaxed;
}

.prose code {
  @apply rounded bg-base-200 px-1.5 py-0.5 text-sm font-mono;
}

.prose pre {
  @apply mb-4 overflow-x-auto rounded-lg bg-base-300 p-4;
}

.prose pre code {
  @apply bg-transparent p-0;
}

.prose table {
  @apply mb-4 w-full border-collapse;
}

.prose th,
.prose td {
  @apply border border-base-300 px-4 py-2;
}

.prose th {
  @apply bg-base-200 font-semibold;
}

.prose a {
  @apply text-primary hover:underline;
}

.prose blockquote {
  @apply my-4 border-l-4 border-primary pl-4 italic text-base-content/80;
}
```

---

## ✅ Acceptance Criteria

1. ✅ สร้าง KnowledgeContent component
2. ✅ สร้างครบ 8 knowledge pages
3. ✅ ทุกหน้ามี Table of Contents (sidebar)
4. ✅ Content แปลงจาก HTML ถูกต้อง
5. ✅ Code blocks แสดงผลถูกต้อง
6. ✅ Headings มี IDs สำหรับ anchor links
7. ✅ Smooth scroll ใน TOC ทำงาน
8. ✅ Responsive layout (sidebar hide on mobile)
9. ✅ Document titles ตั้งค่าถูกต้อง
10. ✅ ไม่มี TypeScript errors

---

## 🧪 Testing

### KnowledgeContent Component:
- ✅ Table of Contents extract headings
- ✅ Click TOC items scroll to section
- ✅ Sidebar sticky on scroll
- ✅ Responsive: sidebar hide < lg

### Individual Pages:
- ✅ Content แสดงผลถูกต้อง
- ✅ Code blocks มี syntax highlighting
- ✅ Tables แสดงผลถูกต้อง
- ✅ Lists แสดงผลถูกต้อง

### Styling:
- ✅ Prose styles apply ถูกต้อง
- ✅ Headings มี bottom border
- ✅ Code blocks มี background

---

## 📝 Implementation Notes

1. **Content Migration:**
   - คัดลอก HTML content จากไฟล์เดิม
   - แปลง HTML tags เป็น JSX
   - ใช้ `{``}` สำหรับ multiline code
   - Escape `<` `>` ใน code blocks

2. **Table of Contents:**
   - Auto-extract จาก h2, h3
   - Generate IDs ถ้าไม่มี
   - Indent h3 items

3. **Prose Styles:**
   - ใช้ utility classes จาก Tailwind
   - Override ใน index.css
   - Support dark mode ด้วย base-content

4. **IDs:**
   - ใช้ kebab-case สำหรับ heading IDs
   - ตัวอย่าง: `id="basic-commands"`, `id="git-init"`

---

## 🔗 References

อ้างอิงจาก:
- `old-website/knowledges/*.html` - HTML content เดิม
- `docs/*.md` - Markdown files ในโปรเจกต์

---

## 📦 Example Content Structure

แต่ละหน้าควรมีโครงสร้างดังนี้:

```tsx
export function [PageName]() {
  useDocumentTitle('[Title]');

  return (
    <KnowledgeContent
      title="[Title]"
      category="[Category]"
      icon="bi-[icon]"
    >
      <h2 id="section-1">Section 1</h2>
      <p>Content...</p>
      
      <h3 id="subsection-1-1">Subsection 1.1</h3>
      <p>Content...</p>
      <pre><code>Code example</code></pre>

      <h2 id="section-2">Section 2</h2>
      <p>Content...</p>
      
      {/* ... more sections */}
    </KnowledgeContent>
  );
}
```

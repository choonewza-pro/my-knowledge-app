# AI Task 09 - Create Main Pages (About, Product, Contact, Map)

## 🎯 Task Goal
สร้าง 4 หน้าหลักที่เหลือ: AboutPage, ProductPage, ContactPage, MapPage โดยแปลงจากไฟล์ HTML เดิม

---

## 📋 Requirements

### 1. สร้างไฟล์
```
src/
  pages/
    AboutPage.tsx
    ProductPage.tsx
    ContactPage.tsx
    MapPage.tsx
```

---

## 1. AboutPage Component

**อ้างอิงจาก:** `old-website/about.html`

**ไฟล์:** `src/pages/AboutPage.tsx`

```tsx
import { Card } from '@/components/common';
import { TeamCard } from '@/components/features';
import { useDocumentTitle } from '@/hooks';
import { teamMembers } from '@/data';

export function AboutPage() {
  useDocumentTitle('เกี่ยวกับเรา');

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="hero-gradient py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-center text-5xl font-bold">เกี่ยวกับฉัน</h1>
          <p className="mx-auto max-w-2xl text-center text-xl opacity-90">
            นักพัฒนาโปรแกรมที่หลงใหลในการเรียนรู้และบันทึกความรู้
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-4xl font-bold">
              แนวคิดของฉัน
            </h2>

            <Card variant="elevated" className="mb-8 p-8">
              <p className="mb-4 text-lg leading-relaxed">
                My Knowledge Base เกิดจากความต้องการจัดระเบียบและบันทึกความรู้
                ที่ได้เรียนรู้มาในด้านต่างๆ ไว้อย่างเป็นระบบ เพื่อให้สามารถกลับมา
                ทบทวนหรือแชร์ความรู้ได้ง่าย
              </p>
              <p className="mb-4 text-lg leading-relaxed">
                ฉันเชื่อว่าการบันทึกความรู้เป็นวิธีที่ดีในการเรียนรู้และทำความเข้าใจ
                สิ่งต่างๆ ให้ลึกซึ้งยิ่งขึ้น ไม่ว่าจะเป็นเรื่องการพัฒนาโปรแกรม 
                การสร้างระบบ AI หรือแม้แต่ทักษะในชีวิตประจำวันอย่างการชงกาแฟ
              </p>
            </Card>

            {/* Values */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card variant="bordered" className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600">
                  <i className="bi-journal-code"></i>
                </div>
                <h3 className="mb-2 text-xl font-bold">การเรียนรู้</h3>
                <p className="text-base-content/70">
                  บันทึกและทบทวนความรู้อย่างต่อเนื่อง
                </p>
              </Card>

              <Card variant="bordered" className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
                  <i className="bi-diagram-3"></i>
                </div>
                <h3 className="mb-2 text-xl font-bold">ความหลากหลาย</h3>
                <p className="text-base-content/70">
                  ครอบคลุมความรู้หลากหลายสาขา
                </p>
              </Card>

              <Card variant="bordered" className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl text-purple-600">
                  <i className="bi-search"></i>
                </div>
                <h3 className="mb-2 text-xl font-bold">ค้นหาง่าย</h3>
                <p className="text-base-content/70">
                  จัดระเบียบให้เข้าถึงได้สะดวก
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-4xl font-bold">ผู้เขียน</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-base-content/70">
            นักพัฒนาโปรแกรมที่หลงใหลในการเรียนรู้สิ่งใหม่ๆ
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## 2. ProductPage Component

**อ้างอิงจาก:** `old-website/product.html`

**ไฟล์:** `src/pages/ProductPage.tsx`

```tsx
import { Card } from '@/components/common';
import { useDocumentTitle } from '@/hooks';

export function ProductPage() {
  useDocumentTitle('หมวดหมู่');

  const categories = [
    {
      id: 'programming',
      title: 'การพัฒนาโปรแกรม',
      description: 'บันทึกความรู้เกี่ยวกับการเขียนโค้ด frameworks และ tools',
      articleCount: '25 บทความ',
      level: 'All Levels',
      topics: ['Git & GitHub', 'React & TypeScript', 'Node.js', 'Database'],
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description: 'ความรู้เกี่ยวกับการสร้างระบบ AI และ Machine Learning',
      articleCount: '15 บทความ',
      level: 'Intermediate',
      topics: ['LLM', 'Prompt Engineering', 'Model Training', 'AI Tools'],
    },
    {
      id: 'lifestyle',
      title: 'ความรู้ทั่วไป',
      description: 'บันทึกความรู้และประสบการณ์ในชีวิตประจำวัน',
      articleCount: '10 บทความ',
      level: 'Beginner',
      topics: [
        'Coffee Brewing',
        'Productivity Tips',
        'Book Notes',
        'Life Hacks',
      ],
    },
  ];

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="hero-gradient py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-center text-5xl font-bold">หมวดหมู่</h1>
          <p className="mx-auto max-w-2xl text-center text-xl opacity-90">
            สำรวจความรู้ในหมวดหมู่ต่างๆ ที่ฉันได้บันทึกไว้
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.id} variant="elevated" hover>
                {/* Badge */}
                <div className="mb-4">
                  <span
                    className={`badge ${
                      category.level === 'Beginner'
                        ? 'badge-success'
                        : category.level === 'All Levels'
                        ? 'badge-info'
                        : 'badge-warning'
                    }`}
                  >
                    {category.level}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-2xl font-bold">{category.title}</h3>
                <p className="mb-4 text-base-content/70">
                  {category.description}
                </p>

                {/* Meta */}
                <div className="mb-4 flex items-center gap-4 text-sm text-base-content/60">
                  <span>
                    <i className="bi-file-text mr-1"></i>
                    {category.articleCount}
                  </span>
                </div>

                {/* Topics */}
                <div className="mb-6">
                  <h4 className="mb-2 font-semibold">หัวข้อที่น่าสนใจ:</h4>
                  <ul className="space-y-1 text-sm">
                    {category.topics.map((topic, index) => (
                      <li key={index} className="flex items-start">
                        <i className="bi-check-circle-fill mr-2 mt-0.5 text-success"></i>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button className="btn btn-primary btn-block">
                  ดูบทความ
                </button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            สนใจเรื่องอื่นๆ?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-base-content/70">
            ดูแผนผังเว็บไซต์เพื่อค้นหาบทความที่คุณสนใจ
          </p>
          <a href="/map" className="btn btn-primary btn-lg">
            ดูแผนผังเว็บไซต์
          </a>
        </div>
      </section>
    </div>
  );
}
```

---

## 3. ContactPage Component

**อ้างอิงจาก:** `old-website/contact.html`

**ไฟล์:** `src/pages/ContactPage.tsx`

```tsx
import { Card } from '@/components/common';
import { useDocumentTitle } from '@/hooks';

export function ContactPage() {
  useDocumentTitle('ติดต่อเรา');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement form submission (e.g., EmailJS, API endpoint)
    alert('ขอบคุณสำหรับข้อความของคุณ! ฉันจะติดต่อกลับโดยเร็วที่สุด');
  };

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="hero-gradient py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-center text-5xl font-bold">ติดต่อฉัน</h1>
          <p className="mx-auto max-w-2xl text-center text-xl opacity-90">
            มีคำถามหรือข้อเสนอแนะ? ยินดีรับฟัง
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">ข้อมูลติดต่อ</h2>

              <Card variant="bordered" className="mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-2xl text-blue-600">
                    <i className="bi-envelope"></i>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">อีเมล</h3>
                    <p className="text-base-content/70">
                      your.email@example.com
                    </p>
                  </div>
                </div>
              </Card>

              <Card variant="bordered" className="mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100 text-2xl text-green-600">
                    <i className="bi-github"></i>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">GitHub</h3>
                    <a
                      href="https://github.com/choonewza-pro"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @choonewza-pro
                    </a>
                  </div>
                </div>
              </Card>

              <Card variant="bordered">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-2xl text-purple-600">
                    <i className="bi-linkedin"></i>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">LinkedIn</h3>
                    <p className="text-base-content/70">
                      เชื่อมต่อกับฉันบน LinkedIn
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">ส่งข้อความถึงเรา</h2>

              <Card variant="elevated">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="label">
                      <span className="label-text">ชื่อ</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="label">
                      <span className="label-text">อีเมล</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="label">
                      <span className="label-text">หัวข้อ</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="label">
                      <span className="label-text">ข้อความ</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="textarea textarea-bordered w-full"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    ส่งข้อความ
                    <i className="bi-send ml-2"></i>
                  </button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## 4. MapPage Component

**อ้างอิงจาก:** `old-website/map.html`

**ไฟล์:** `src/pages/MapPage.tsx`

```tsx
import { Link } from 'react-router-dom';
import { Card } from '@/components/common';
import { useDocumentTitle } from '@/hooks';
import { knowledgeItems } from '@/data';

export function MapPage() {
  useDocumentTitle('แผนผังเว็บไซต์');

  // Group knowledge items by category
  const knowledgeByCategory = knowledgeItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof knowledgeItems>
  );

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="hero-gradient py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-center text-5xl font-bold">
            แผนผังเว็บไซต์
          </h1>
          <p className="mx-auto max-w-2xl text-center text-xl opacity-90">
            ภาพรวมเนื้อหาทั้งหมดในเว็บไซต์
          </p>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Main Pages */}
            <Card variant="elevated" className="mb-8">
              <h2 className="mb-6 text-2xl font-bold">
                <i className="bi-house-door mr-2"></i>
                หน้าหลัก
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="link-hover link text-lg">
                    <i className="bi-chevron-right mr-2"></i>
                    หน้าแรก
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="link-hover link text-lg">
                    <i className="bi-chevron-right mr-2"></i>
                    เกี่ยวกับเรา
                  </Link>
                </li>
                <li>
                  <Link to="/product" className="link-hover link text-lg">
                    <i className="bi-chevron-right mr-2"></i>
                    หลักสูตร
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="link-hover link text-lg">
                    <i className="bi-chevron-right mr-2"></i>
                    ติดต่อเรา
                  </Link>
                </li>
              </ul>
            </Card>

            {/* Knowledge Pages by Category */}
            {Object.entries(knowledgeByCategory).map(([category, items]) => (
              <Card key={category} variant="elevated" className="mb-8">
                <h2 className="mb-6 text-2xl font-bold">
                  <i className="bi-book mr-2"></i>
                  {category}
                </h2>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.id}>
                      <Link to={item.link} className="link-hover link text-lg">
                        <i className={`${item.icon} mr-2`}></i>
                        {item.title}
                      </Link>
                      <p className="ml-8 mt-1 text-sm text-base-content/60">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## ✅ Acceptance Criteria

1. ✅ ทุกหน้ามี Hero section พร้อม gradient
2. ✅ AboutPage แสดง team cards ถูกต้อง
3. ✅ ProductPage แสดง courses พร้อม topics
4. ✅ ContactPage มี form และ contact info
5. ✅ MapPage group knowledge items by category
6. ✅ ทุกหน้า responsive ทำงานได้ดี
7. ✅ Document titles ตั้งค่าถูกต้อง
8. ✅ Links ทั้งหมดใช้ react-router-dom
9. ✅ ไม่มี TypeScript errors

---

## 🧪 Testing

### AboutPage:
- ✅ Hero section แสดงผล
- ✅ Mission content แสดงผล
- ✅ Values cards (3 items) แสดงผล
- ✅ Team cards แสดงผลถูกต้อง

### ProductPage:
- ✅ Courses cards (3 items) แสดงผล
- ✅ Topics list แสดงผล
- ✅ Badge levels แสดงสีถูกต้อง

### ContactPage:
- ✅ Contact info cards แสดงผล
- ✅ Form validation ทำงาน
- ✅ Submit แสดง alert

### MapPage:
- ✅ Main pages links แสดงผล
- ✅ Knowledge items grouped by category
- ✅ ทุก link clickable

---

## 📝 Implementation Notes

1. **Shared Patterns:**
   - ทุกหน้าใช้ `hero-gradient` class
   - ทุกหน้าใช้ `useDocumentTitle` hook
   - Container: `container mx-auto px-4`

2. **Data:**
   - AboutPage: `teamMembers` จาก data
   - ProductPage: inline courses data
   - MapPage: `knowledgeItems` จาก data

3. **Forms:**
   - ContactPage ใช้ daisyUI form classes
   - Form submit เป็น placeholder (TODO)

4. **Grouping:**
   - MapPage ใช้ `Array.reduce()` แบ่งกลุ่ม knowledge items

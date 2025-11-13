# AI Task 08 - Create HomePage

## 🎯 Task Goal
สร้าง HomePage component โดยแปลงจาก `old-website/index.html` พร้อม Hero, Features และ Knowledge Cards sections

---

## 📋 Requirements

### 1. สร้างไฟล์
```
src/
  pages/
    HomePage.tsx
```

### 2. HomePage Component

**ไฟล์:** `src/pages/HomePage.tsx`

**ต้องการ:**
- Hero section พร้อม CTA
- Features section (6 features)
- Knowledge Cards section (8 cards)
- ใช้ components ที่สร้างไว้แล้ว
- ใช้ data จาก data files
- ใช้ `useDocumentTitle` hook

```tsx
import { Link } from 'react-router-dom';
import { Hero, KnowledgeCard } from '@/components/features';
import { Card } from '@/components/common';
import { useDocumentTitle } from '@/hooks';
import { knowledgeItems, features } from '@/data';
import { ROUTES } from '@/utils/constants';

export function HomePage() {
  useDocumentTitle(
    'My Knowledge Base - บันทึกและสรุปความรู้',
    '' // ไม่ต่อ suffix
  );

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="My Knowledge Base"
        subtitle="บันทึกและสรุปความรู้ในหัวข้อต่างๆ ทั้งการพัฒนาโปรแกรม การสร้างระบบ AI และความรู้ทั่วไป"
        ctaText="สำรวจความรู้"
        ctaLink="#knowledge"
      />

      {/* Features Section */}
      <section className="bg-base-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-4xl font-bold">
            จุดเด่นของแอป
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-base-content/70">
            แพลตฟอร์มบันทึกความรู้ที่ออกแบบมาให้จัดการและค้นหาข้อมูลได้ง่าย
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.id}
                variant="elevated"
                hover
                className="text-center transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-purple-700 text-3xl text-white">
                  <i className={feature.icon}></i>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Cards Section */}
      <section id="knowledge" className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-4xl font-bold">
            เนื้อหาความรู้
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-base-content/70">
            เลือกหัวข้อที่คุณสนใจเพื่อเริ่มเรียนรู้
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {knowledgeItems.map((item) => (
              <Link key={item.id} to={item.link} className="block">
                <KnowledgeCard
                  icon={<i className={item.icon}></i>}
                  title={item.title}
                  description={item.description}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-purple-500 to-purple-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            เริ่มสำรวจความรู้
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg opacity-90">
            ค้นพบบทความและบันทึกความรู้ที่น่าสนใจในหัวข้อต่างๆ
          </p>
          <Link
            to={ROUTES.KNOWLEDGE.GIT_COMMANDS}
            className="btn btn-lg bg-white text-purple-700 hover:bg-gray-100"
          >
            ดูบทความทั้งหมด
            <i className="bi-arrow-right ml-2"></i>
          </Link>
        </div>
      </section>
    </>
  );
}
```

---

## ✅ Acceptance Criteria

1. ✅ Hero section แสดง gradient background ถูกต้อง
2. ✅ Features section แสดง 6 features พร้อม icons
3. ✅ Knowledge Cards section แสดง 8 cards
4. ✅ ทุก card คลิกได้ (Link ไป knowledge pages)
5. ✅ CTA sections มี gradient backgrounds
6. ✅ Responsive design ทำงานได้ดี
7. ✅ Document title ตั้งค่าถูกต้อง
8. ✅ Scroll to #knowledge section ทำงานได้
9. ✅ ไม่มี TypeScript errors

---

## 🎨 Design Reference

**Hero Section:**
- Background: `hero-gradient` class
- Text: white, centered
- CTA button: white background + purple text

**Features Section:**
- Background: `bg-base-100`
- Layout: 3 columns desktop, 2 columns tablet, 1 column mobile
- Icons: rounded-full, gradient background, 64x64px
- Cards: elevated variant, hover effect

**Knowledge Cards Section:**
- Background: `bg-base-200`
- Layout: 4 columns desktop, 3 tablet, 2 mobile, 1 small mobile
- Cards: ใช้ KnowledgeCard component

**CTA Section:**
- Background: gradient purple
- Text: white, centered
- Button: white background

---

## 📝 Implementation Notes

1. **Sections:**
   - แต่ละ section มี padding `py-16`
   - Container: `container mx-auto px-4`
   - Headings: `text-4xl font-bold`

2. **Grid Layout:**
   - Features: `grid gap-8 md:grid-cols-2 lg:grid-cols-3`
   - Knowledge: `grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`

3. **Links:**
   - ใช้ `<Link>` จาก react-router-dom
   - Wrap ทั้ง KnowledgeCard ด้วย Link
   - Anchor link (#knowledge) สำหรับ CTA

4. **Icons:**
   - ใช้ Bootstrap Icons
   - Render ใน features loop: `<i className={feature.icon}></i>`

---

## 🧪 Testing

### Visual Testing:
1. Hero section:
   - ✅ Gradient background แสดงผล
   - ✅ Pattern overlay แสดงผล
   - ✅ CTA button clickable

2. Features section:
   - ✅ 6 cards แสดงผลครบ
   - ✅ Icons แสดงผลถูกต้อง
   - ✅ Hover animation ทำงาน

3. Knowledge Cards:
   - ✅ 8 cards แสดงผลครบ
   - ✅ Hover animation ทำงาน
   - ✅ Click ไป knowledge page (ยังไม่ต้องมีหน้าจริง)

### Responsive Testing:
- Desktop (>1280px): 4 columns knowledge, 3 columns features
- Tablet (768-1024px): 3 columns knowledge, 2 columns features
- Mobile (<768px): 1-2 columns

### Browser Tab:
- Title: "My Knowledge Base - บันทึกและสรุปความรู้"

---

## 🔗 Reference

อ้างอิงจาก:
- `old-website/index.html` - โครงสร้างหน้าเดิม
- Design colors: Purple (#667eea, #764ba2)
- เน้นการแสดงผลที่เป็นส่วนตัว (personal knowledge base)

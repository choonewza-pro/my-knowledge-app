# Step 04 – Migrate หน้า Main Pages (Home, About, Contact, Product, Map)

## 🎯 Goal

แปลงหน้า static HTML หลัก (index.html, about.html, contact.html, product.html, map.html) มาเป็น React components โดยใช้ components และ layouts ที่สร้างไว้ใน Step 02-03 พร้อมทั้งรักษา design และ functionality เดิมไว้

---

## ✅ Tasks (Checklist)

### 1. เตรียมข้อมูล Static Data

#### 1.1 Knowledge Items Data

- [ ] **สร้าง `src/data/knowledgeItems.ts`**
  - ข้อมูล knowledge cards ที่แสดงในหน้าแรก
  ```tsx
  import type { KnowledgeItem } from '@/types';
  import { ROUTES } from '@/utils/constants';

  export const knowledgeItems: KnowledgeItem[] = [
    {
      id: 'git-commands',
      title: 'Git Commands Reference',
      description: 'คู่มืออ้างอิงคำสั่ง Git พื้นฐานและขั้นสูง พร้อมตัวอย่างการใช้งาน',
      icon: 'bi-terminal',
      category: 'Git',
      link: ROUTES.KNOWLEDGE.GIT_COMMANDS,
    },
    {
      id: 'git-naming-guide',
      title: 'Git Naming Guide',
      description: 'แนวทางการตั้งชื่อ branches, commits, และ tags อย่างมืออาชีพ',
      icon: 'bi-tags',
      category: 'Git',
      link: ROUTES.KNOWLEDGE.GIT_NAMING_GUIDE,
    },
    // ... เพิ่มอีกตาม knowledge pages ที่มี
  ];
  ```

#### 1.2 Team Members Data (สำหรับ About page)

- [ ] **สร้าง `src/data/teamMembers.ts`**
  - ข้อมูลสมาชิกในทีม (ถ้ามี)
  ```tsx
  import type { TeamMember } from '@/types';

  export const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Lead Developer',
      bio: 'Full-stack developer with 10+ years experience',
      image: '/images/team/john.jpg', // optional
      social: {
        github: 'https://github.com/johndoe',
      }
    },
    // ... เพิ่มสมาชิกคนอื่น ๆ
  ];
  ```

#### 1.3 Features Data (สำหรับ Home/About page)

- [ ] **สร้าง `src/data/features.ts`**
  - ข้อมูล features/benefits ที่แสดงในหน้าแรก
  ```tsx
  export const features = [
    {
      id: '1',
      icon: 'bi-book',
      title: 'คู่มือครบถ้วน',
      description: 'เอกสารและตัวอย่างที่ครอบคลุมทุกแง่มุมของ Git และ GitHub',
    },
    {
      id: '2',
      icon: 'bi-lightning',
      title: 'เรียนรู้ง่าย',
      description: 'อธิบายด้วยภาษาที่เข้าใจง่าย พร้อมตัวอย่างโค้ดจริง',
    },
    // ... เพิ่มอีก
  ];
  ```

### 2. สร้าง HomePage Component

- [ ] **สร้าง `src/pages/HomePage.tsx`**
  - แปลงจาก `old-website/index.html`
  - ใช้ MainLayout เป็น wrapper
  - แบ่ง sections ตามโครงสร้างเดิม:
    - Hero section
    - Features section
    - Knowledge cards section
    - CTA section

- [ ] **สร้าง Hero Section**
  ```tsx
  import { Hero } from '@/components/features';
  
  <Hero
    title="Git Workshop"
    subtitle="เรียนรู้การจัดการ Source Code อย่างมืออาชีพ"
    ctaText="เริ่มเรียนรู้เลย"
    ctaLink="#knowledge"
  />
  ```

- [ ] **สร้าง Features Section**
  - Map ข้อมูลจาก `features.ts`
  - ใช้ Card component แสดงแต่ละ feature
  ```tsx
  <section className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="mb-12 text-center text-4xl font-bold">
        ทำไมต้องเรียนกับเรา
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map(feature => (
          <Card key={feature.id} variant="elevated" hover>
            <div className="icon-box">
              <i className={feature.icon}></i>
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="mt-2 text-base-content/70">{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
  ```

- [ ] **สร้าง Knowledge Cards Section**
  - Map ข้อมูลจาก `knowledgeItems.ts`
  - ใช้ KnowledgeCard component
  - ใช้ Link จาก react-router-dom
  ```tsx
  import { Link } from 'react-router-dom';
  import { knowledgeItems } from '@/data/knowledgeItems';
  import { KnowledgeCard } from '@/components/features';

  <section id="knowledge" className="bg-base-200 py-16">
    <div className="container mx-auto px-4">
      <h2 className="mb-12 text-center text-4xl font-bold">
        เนื้อหาความรู้
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {knowledgeItems.map(item => (
          <Link key={item.id} to={item.link}>
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
  ```

- [ ] **เพิ่ม useDocumentTitle hook**
  ```tsx
  import { useDocumentTitle } from '@/hooks';
  
  export function HomePage() {
    useDocumentTitle('Git Workshop - เรียนรู้การจัดการ Source Code อย่างมืออาชีพ', '');
    
    return (
      <MainLayout>
        {/* ... */}
      </MainLayout>
    );
  }
  ```

### 3. สร้าง AboutPage Component

- [ ] **สร้าง `src/pages/AboutPage.tsx`**
  - แปลงจาก `old-website/about.html`
  - ใช้ MainLayout
  - Sections:
    - Hero/Header section
    - Mission/Vision section
    - Values section
    - Team section (ถ้ามี)

- [ ] **สร้าง Mission Section**
  ```tsx
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-5xl font-bold">เกี่ยวกับเรา</h1>
        <p className="text-lg text-base-content/80">
          Git Workshop คือแหล่งเรียนรู้ที่ครอบคลุมทุกแง่มุมของ Git และ GitHub
          เราเชื่อว่าการจัดการ source code ที่ดีเป็นรากฐานสำคัญของการพัฒนาซอฟต์แวร์
        </p>
      </div>
    </div>
  </section>
  ```

- [ ] **สร้าง Values Section**
  - ใช้ Card component
  - แสดง values/principles

- [ ] **สร้าง Team Section**
  - Map ข้อมูลจาก `teamMembers.ts`
  - ใช้ TeamCard component
  ```tsx
  import { teamMembers } from '@/data/teamMembers';
  import { TeamCard } from '@/components/features';

  <section className="bg-base-200 py-16">
    <div className="container mx-auto px-4">
      <h2 className="mb-12 text-center text-4xl font-bold">ทีมงาน</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map(member => (
          <TeamCard key={member.id} {...member} />
        ))}
      </div>
    </div>
  </section>
  ```

- [ ] **เพิ่ม useDocumentTitle hook**
  ```tsx
  useDocumentTitle('เกี่ยวกับเรา');
  ```

### 4. สร้าง ContactPage Component

- [ ] **สร้าง `src/pages/ContactPage.tsx`**
  - แปลงจาก `old-website/contact.html`
  - ใช้ MainLayout
  - Sections:
    - Contact form
    - Contact information
    - Social links

- [ ] **สร้าง Contact Form**
  - ใช้ daisyUI form components
  - รองรับ form validation
  ```tsx
  import { useState } from 'react';

  export function ContactPage() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission
      console.log('Form data:', formData);
    };

    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="mb-8 text-4xl font-bold">ติดต่อเรา</h1>
          
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">ชื่อ</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">อีเมล</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">ข้อความ</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">
                  ส่งข้อความ
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">ข้อมูลติดต่อ</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <i className="bi-envelope text-2xl"></i>
                  <div>
                    <h3 className="font-semibold">อีเมล</h3>
                    <p>contact@gitworkshop.com</p>
                  </div>
                </div>
                {/* เพิ่ม contact info อื่น ๆ */}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  ```

- [ ] **เพิ่ม useDocumentTitle hook**
  ```tsx
  useDocumentTitle('ติดต่อเรา');
  ```

### 5. สร้าง ProductPage Component

- [ ] **สร้าง `src/pages/ProductPage.tsx`**
  - แปลงจาก `old-website/product.html`
  - ใช้ MainLayout
  - แสดง products/services

- [ ] **สร้าง Product Grid**
  - ใช้ Card component
  - แสดง product features

- [ ] **เพิ่ม useDocumentTitle hook**
  ```tsx
  useDocumentTitle('ผลิตภัณฑ์');
  ```

### 6. สร้าง MapPage Component

- [ ] **สร้าง `src/pages/MapPage.tsx`**
  - แปลงจาก `old-website/map.html`
  - ใช้ MainLayout
  - Embed Google Maps หรือ map service อื่น ๆ

- [ ] **Embed Map**
  ```tsx
  <div className="container mx-auto px-4 py-16">
    <h1 className="mb-8 text-4xl font-bold">แผนที่</h1>
    
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=..."
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
    
    <div className="mt-8">
      <h2 className="text-2xl font-bold">ที่อยู่</h2>
      <p className="mt-2">123 ถนน...</p>
    </div>
  </div>
  ```

- [ ] **เพิ่ม useDocumentTitle hook**
  ```tsx
  useDocumentTitle('แผนที่');
  ```

### 7. ทดสอบทุกหน้า

- [ ] **ทดสอบการแสดงผล**
  - เปรียบเทียบกับ old-website
  - ตรวจสอบ layout, spacing, typography

- [ ] **ทดสอบ Responsive Design**
  - Mobile (< 768px)
  - Tablet (768px - 1024px)
  - Desktop (> 1024px)

- [ ] **ทดสอบ Navigation**
  - คลิกลิงก์ทุกตัว
  - ตรวจสอบ active states

- [ ] **ทดสอบ Forms**
  - Contact form validation
  - Submit behavior

- [ ] **ทดสอบ Performance**
  - ใช้ Lighthouse audit
  - ตรวจสอบ load time

---

## 📝 Notes / Best Practices

### 1. Component Composition

- **แยก sections เป็น components**: ถ้า section ใหญ่ ให้แตกออกเป็น component ย่อย
- **Reuse components**: ใช้ Card, Button, Badge ที่สร้างไว้แล้ว
- **Props drilling**: ถ้า props ลึกเกิน 2-3 levels ให้พิจารณาใช้ Context

### 2. Data Management

- **Static data**: เก็บใน `src/data/` folder
- **Type safety**: ใช้ TypeScript types สำหรับทุก data structure
- **Separation of concerns**: แยก data ออกจาก UI logic

### 3. Form Handling

- **Controlled components**: ใช้ useState สำหรับ form inputs
- **Validation**: ใช้ HTML5 validation หรือ library เช่น React Hook Form
- **Error handling**: แสดง error messages ที่ชัดเจน
- **Accessibility**: ใส่ labels และ aria-attributes

### 4. Performance

- **Lazy load images**: ใช้ `loading="lazy"` attribute
- **Code splitting**: แต่ละ page จะถูก split อัตโนมัติ (ใน Step 06)
- **Optimize re-renders**: ใช้ React.memo() สำหรับ expensive components

### 5. SEO Considerations

- **Document titles**: ใช้ useDocumentTitle hook
- **Meta descriptions**: เพิ่มใน Step 07
- **Semantic HTML**: ใช้ h1, h2, article, section อย่างถูกต้อง
- **Alt texts**: เพิ่มให้ทุกรูปภาพ

### 6. Accessibility (a11y)

- **Keyboard navigation**: ทดสอบด้วย Tab key
- **ARIA labels**: เพิ่มให้ icons และ interactive elements
- **Color contrast**: ตรวจสอบด้วย WCAG tools
- **Focus states**: ใช้ Tailwind focus utilities

---

## ⚠️ สิ่งที่ควรระวัง

1. **อย่าคัดลอก HTML โดยตรง**: แปลงเป็น JSX และใช้ components
2. **Inline styles**: หลีกเลี่ยง, ใช้ Tailwind classes แทน
3. **Bootstrap classes**: แทนที่ด้วย Tailwind + daisyUI
4. **Form submission**: ใช้ preventDefault() เพื่อไม่ให้ reload หน้า
5. **Map iframes**: ตรวจสอบ loading performance

---

## ✨ Expected Outcome

หลังจากจบ Step 04 แล้ว ควรได้:

✅ HomePage พร้อม Hero, Features, Knowledge Cards sections  
✅ AboutPage พร้อม Mission, Values, Team sections  
✅ ContactPage พร้อม Contact Form และ Contact Info  
✅ ProductPage แสดง products/services  
✅ MapPage พร้อม embedded map  
✅ Static data files (`knowledgeItems.ts`, `teamMembers.ts`, etc.)  
✅ ทุกหน้าใช้ MainLayout และ responsive  
✅ ทุกหน้ามี document title ถูกต้อง  
✅ Navigation links ทำงานได้ (หลังจาก setup routing ใน Step 06)  

---

**หมายเหตุ**: หน้าเหล่านี้เป็น main pages ของเว็บไซต์ ทำให้ดีและครบถ้วนก่อนไป migrate knowledge pages ใน Step 05

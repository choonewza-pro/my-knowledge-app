# AI Task 05 - Create Feature Components (Hero, KnowledgeCard, TeamCard)

## 🎯 Task Goal
สร้าง feature-specific components ที่ใช้ในหน้าต่าง ๆ ของเว็บไซต์

---

## 📋 Requirements

### 1. สร้างโครงสร้างโฟลเดอร์
```
src/
  components/
    features/
      Hero.tsx
      KnowledgeCard.tsx
      FeatureBadge.tsx
      TeamCard.tsx
      index.ts
```

### 2. Hero Component

**ไฟล์:** `src/components/features/Hero.tsx`

**ต้องการ:**
- Gradient background พร้อม pattern overlay
- รองรับ title, subtitle, CTA button
- Responsive text sizes

```tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function Hero({ title, subtitle, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="hero-gradient py-20 text-white md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        
        {subtitle && (
          <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl opacity-90">
            {subtitle}
          </p>
        )}
        
        {ctaText && ctaLink && (
          <Link to={ctaLink}>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100"
            >
              {ctaText}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
```

### 3. KnowledgeCard Component

**ไฟล์:** `src/components/features/KnowledgeCard.tsx`

**ต้องการ:**
- Card พร้อม icon, title, description
- Hover animation (lift + shadow)
- Icon box with gradient background

```tsx
import { ReactNode } from 'react';
import { Card } from '@/components/common';

interface KnowledgeCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function KnowledgeCard({ icon, title, description }: KnowledgeCardProps) {
  return (
    <Card
      variant="elevated"
      hover
      className="transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Icon Box */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 to-purple-700 text-3xl text-white">
        {icon}
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-base-content/70">{description}</p>
    </Card>
  );
}
```

### 4. FeatureBadge Component

**ไฟล์:** `src/components/features/FeatureBadge.tsx`

**ต้องการ:**
- Badge พร้อม gradient background
- Box shadow สำหรับ depth
- Rounded pill shape

```tsx
interface FeatureBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function FeatureBadge({ children, className = '' }: FeatureBadgeProps) {
  return (
    <span
      className={`
        inline-block rounded-full bg-linear-to-r from-pink-500 to-red-500
        px-4 py-2 text-sm font-semibold text-white shadow-lg
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
}
```

### 5. TeamCard Component

**ไฟล์:** `src/components/features/TeamCard.tsx`

**ต้องการ:**
- Card พร้อมรูปภาพ (placeholder)
- ชื่อ, ตำแหน่ง, bio
- Social links
- Hover effect

```tsx
import { Card } from '@/components/common';

interface TeamCardProps {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export function TeamCard({ name, role, bio, image, social }: TeamCardProps) {
  return (
    <Card
      variant="elevated"
      hover
      className="transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image/Avatar */}
      <div className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-purple-500 to-purple-700">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-6xl text-white/50">
            <i className="bi-person-circle"></i>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="mb-2 text-sm text-primary">{role}</p>
      
      {bio && (
        <p className="mb-4 text-sm text-base-content/70">{bio}</p>
      )}

      {/* Social Links */}
      {social && (
        <div className="flex gap-3 text-lg">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <i className="bi-github"></i>
            </a>
          )}
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <i className="bi-twitter"></i>
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <i className="bi-linkedin"></i>
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
```

### 6. Barrel Export

**ไฟล์:** `src/components/features/index.ts`

```tsx
export { Hero } from './Hero';
export { KnowledgeCard } from './KnowledgeCard';
export { FeatureBadge } from './FeatureBadge';
export { TeamCard } from './TeamCard';
```

### 7. อัพเดท Components Index

**ไฟล์:** `src/components/index.ts`

```tsx
export * from './common';
export * from './layout';
export * from './features';
```

---

## ✅ Acceptance Criteria

1. ✅ Hero component แสดง gradient background ถูกต้อง
2. ✅ KnowledgeCard มี icon box พร้อม gradient
3. ✅ KnowledgeCard มี hover animation (lift + shadow)
4. ✅ FeatureBadge มี gradient background + shadow
5. ✅ TeamCard รองรับ image และ placeholder
6. ✅ TeamCard แสดง social links ได้
7. ✅ ทุก component responsive
8. ✅ ไม่มี TypeScript errors

---

## 🎨 Design Reference

**Hero:**
- Background: `hero-gradient` class (from index.css)
- Text: white with opacity variations
- Padding: `py-20 md:py-32`

**KnowledgeCard:**
- Icon box: 64x64px, rounded-2xl, gradient background
- Hover: `-translate-y-2`, `shadow-2xl`
- Transition: `duration-300`

**FeatureBadge:**
- Shape: `rounded-full`
- Gradient: pink-500 → red-500
- Shadow: `shadow-lg`

**TeamCard:**
- Image: 280px height (if provided)
- Placeholder: gradient background + person icon
- Social icons: Bootstrap Icons

---

## 🧪 Testing

สร้างหน้าทดสอบใน `src/pages/ComponentShowcase.tsx`:

```tsx
import { Hero, KnowledgeCard, FeatureBadge, TeamCard } from '@/components/features';

export function ComponentShowcase() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <Hero
        title="Welcome to Git Workshop"
        subtitle="Learn version control the right way"
        ctaText="Get Started"
        ctaLink="/knowledge"
      />

      {/* Knowledge Cards */}
      <section className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Knowledge Cards</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <KnowledgeCard
            icon={<i className="bi-terminal"></i>}
            title="Git Commands"
            description="Essential Git commands for daily use"
          />
          <KnowledgeCard
            icon={<i className="bi-book"></i>}
            title="Best Practices"
            description="Industry-standard workflows"
          />
        </div>
      </section>

      {/* Feature Badges */}
      <section className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Feature Badges</h2>
        <div className="flex gap-2">
          <FeatureBadge>New</FeatureBadge>
          <FeatureBadge>Popular</FeatureBadge>
          <FeatureBadge>Featured</FeatureBadge>
        </div>
      </section>

      {/* Team Cards */}
      <section className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Team Cards</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <TeamCard
            name="John Doe"
            role="Lead Developer"
            bio="Full-stack developer with 10+ years experience"
            social={{
              github: 'https://github.com/johndoe',
              twitter: 'https://twitter.com/johndoe'
            }}
          />
        </div>
      </section>
    </div>
  );
}
```

---

## 📝 Implementation Notes

1. **Gradients:**
   - ใช้ Tailwind v4 syntax: `bg-linear-to-br`
   - Colors: purple-500, purple-700, pink-500, red-500

2. **Icons:**
   - รองรับ ReactNode สำหรับความยืดหยุ่น
   - ใช้ Bootstrap Icons

3. **Hover effects:**
   - Transform: `-translate-y-2`
   - Shadow: `shadow-2xl`
   - Transition: `transition-all duration-300`

4. **Responsive:**
   - Text sizes: `text-4xl md:text-5xl lg:text-6xl`
   - Grid: `grid-cols-1 md:grid-cols-3`

# AI Task 02 - Create Common Components

## 🎯 Task Goal
สร้าง reusable common components (Button, Card, Badge, Icon) พร้อม TypeScript types และ variants ต่าง ๆ

---

## 📋 Requirements

### 1. สร้างโครงสร้างโฟลเดอร์
```
src/
  components/
    common/
      Button.tsx
      Card.tsx
      Badge.tsx
      index.ts
```

### 2. Button Component

**ไฟล์:** `src/components/common/Button.tsx`

**ต้องการ:**
- รองรับ variants: `primary`, `secondary`, `ghost`, `outline`
- รองรับ sizes: `sm`, `md`, `lg`
- รองรับ loading state
- รองรับ disabled state
- Extend HTMLButtonElement attributes

```tsx
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // TODO: Implement component
  // - ใช้ daisyUI btn classes
  // - จัดการ loading state (แสดง loading spinner)
  // - Combine className กับ props
}
```

### 3. Card Component

**ไฟล์:** `src/components/common/Card.tsx`

**ต้องการ:**
- รองรับ variants: `default`, `bordered`, `elevated`, `gradient`
- รองรับ padding options: `none`, `sm`, `md`, `lg`
- รองรับ hover effects

```tsx
interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  children,
}: CardProps) {
  // TODO: Implement component
  // - ใช้ daisyUI card classes
  // - variant 'elevated': shadow-xl
  // - variant 'bordered': border-2
  // - variant 'gradient': bg-gradient-to-br
  // - hover: transition + transform on hover
}
```

### 4. Badge Component

**ไฟล์:** `src/components/common/Badge.tsx`

**ต้องการ:**
- รองรับ variants: `primary`, `secondary`, `success`, `warning`, `error`, `info`
- รองรับ sizes: `sm`, `md`, `lg`

```tsx
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: BadgeProps) {
  // TODO: Implement component
  // - ใช้ daisyUI badge classes
  // - แตก sizes เป็น badge-sm, badge-md, badge-lg
}
```

### 5. Barrel Export

**ไฟล์:** `src/components/common/index.ts`

```tsx
export { Button } from './Button';
export { Card } from './Card';
export { Badge } from './Badge';
```

---

## ✅ Acceptance Criteria

1. ✅ ทุก component มี TypeScript interface ครบถ้วน
2. ✅ ทุก component ใช้ daisyUI classes
3. ✅ Button มี loading state (แสดง spinner)
4. ✅ Card มี hover effect (transform + shadow)
5. ✅ Badge มีสีตาม variant ที่ถูกต้อง
6. ✅ Export ผ่าน barrel file (index.ts)
7. ✅ ไม่มี TypeScript errors

---

## 🎨 Design Reference

**Colors:**
- Primary: `#667eea` (purple)
- Secondary: `#764ba2` (deep purple)
- Success: `#10b981` (green)
- Warning: `#f59e0b` (orange)
- Error: `#ef4444` (red)

**Shadows:**
- Elevated card: `shadow-xl`
- Hover card: `shadow-2xl`

**Transitions:**
- Duration: `transition-all duration-300`
- Ease: `ease-in-out`

---

## 📝 Implementation Tips

1. ใช้ `cn()` utility สำหรับ combine classNames (ถ้ามี)
2. ใช้ daisyUI classes เป็นหลัก: `btn`, `card`, `badge`
3. Loading spinner: ใช้ `<span className="loading loading-spinner"></span>`
4. Hover transform: `hover:-translate-y-1 hover:shadow-2xl`

---

## 🧪 Testing

สร้างหน้าทดสอบ components:
```tsx
// src/pages/ComponentShowcase.tsx (temporary)
import { Button, Card, Badge } from '@/components/common';

export function ComponentShowcase() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <div className="space-x-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Cards</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card variant="default">Default Card</Card>
          <Card variant="bordered">Bordered Card</Card>
          <Card variant="elevated" hover>Elevated Card</Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Badges</h2>
        <div className="space-x-2">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </section>
    </div>
  );
}
```

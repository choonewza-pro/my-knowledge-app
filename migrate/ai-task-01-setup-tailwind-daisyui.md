# AI Task 01 - Setup Tailwind CSS v4 + daisyUI Configuration

## 🎯 Task Goal
ตั้งค่า Tailwind CSS v4 และ daisyUI ให้พร้อมใช้งาน พร้อมกำหนด theme colors ตาม design ของเว็บไซต์เดิม

---

## 📋 Requirements

### 1. แก้ไข `src/index.css`
- ใช้ `@import "tailwindcss"` สำหรับ Tailwind v4
- เพิ่ม CSS variables สำหรับ primary/secondary colors
- เพิ่ม custom utilities สำหรับ `.hero-gradient`

**ต้องการ:**
```css
@import "tailwindcss";

/* Custom CSS Variables for theme */
:root {
  --color-primary: 102 126 234; /* #667eea - purple gradient start */
  --color-secondary: 118 75 162; /* #764ba2 - purple gradient end */
}

/* Custom Utility Classes */
@layer components {
  .hero-gradient {
    @apply bg-linear-to-br from-purple-500 to-purple-700 relative overflow-hidden;
  }
  
  .hero-gradient::before {
    content: '';
    @apply absolute inset-0 opacity-30;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
}
```

### 2. ตรวจสอบ `package.json`
- ยืนยันว่ามี dependencies ครบ:
  - `tailwindcss: ^4.1.17`
  - `daisyui: ^5.5.3`
  - `@tailwindcss/vite: ^4.1.17`

### 3. ทดสอบ
สร้างไฟล์ทดสอบชั่วคราว `src/App.tsx`:
```tsx
function App() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Test Tailwind */}
      <div className="hero-gradient p-8 text-white">
        <h1 className="text-4xl font-bold">Tailwind + daisyUI Test</h1>
      </div>
      
      {/* Test daisyUI */}
      <div className="container mx-auto p-8">
        <button className="btn btn-primary">Primary Button</button>
        <button className="btn btn-secondary ml-4">Secondary Button</button>
        
        <div className="card mt-8 bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>This is a daisyUI card component</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
```

---

## ✅ Acceptance Criteria

1. ✅ `src/index.css` มี Tailwind v4 import และ custom utilities
2. ✅ Hero gradient แสดงผลถูกต้อง (purple gradient + pattern overlay)
3. ✅ daisyUI components (button, card) ทำงานได้
4. ✅ รัน `npm run dev` ได้โดยไม่มี error
5. ✅ ไม่มี Tailwind v3 syntax (`@tailwind base/components/utilities`)

---

## 📝 Notes
- Tailwind CSS v4 ใช้ `@import` แทน `@tailwind` directives
- Gradient classes ใน v4 ใช้ `bg-linear-to-*` แทน `bg-gradient-to-*`
- daisyUI v5 มี theme system ใหม่ ใช้ CSS variables

---

## 🔗 References
- Tailwind CSS v4 docs: https://tailwindcss.com/docs
- daisyUI v5 docs: https://daisyui.com

ช่วยสร้าง migration TODO สำหรับการแปลง static HTML website จากโฟลเดอร์ `/old-website` มายังโปรเจกต์นี้ โดยให้เขียนเป็นไฟล์ `.md` เก็บไว้ในโฟลเดอร์ `/migrate` ตามรายละเอียดดังนี้

## ข้อมูลโปรเจกต์ปัจจุบัน
- เป็นโปรเจกต์ React เวอร์ชัน 19.2.0 ที่สร้างจาก Vite
- ใช้ Tailwind CSS เวอร์ชัน 4.1.17
- ใช้ daisyUI เวอร์ชัน 5.5.3
- ใช้ react-router-dom เวอร์ชัน 7.9.5
- ต้องการทำทุกอย่างตาม best practice ทั้งในมุม frontend architecture, file structure, routing และการจัดการ asset

## สิ่งที่ต้องสร้าง

ให้สร้าง **เนื้อหาไฟล์ Markdown** (ไม่ต้องสร้างไฟล์จริง แค่เขียน content ออกมา) ดังนี้:

1. `migrate/project-structure.md`  
   อธิบาย:
   - โครงสร้างโฟลเดอร์และไฟล์ของโปรเจกต์หลัง migrate เสร็จ (ใช้ tree structure แสดงโครงสร้าง)
   - แต่ละโฟลเดอร์/ไฟล์มีหน้าที่อะไร เช่น `src/routes`, `src/components`, `src/layouts`, `src/pages`, `src/assets` ฯลฯ
   - แนวทาง mapping จากโครงสร้างใน `/old-website` มายังโครงสร้าง React + Vite + Tailwind + daisyUI (เช่น HTML เดิมไปเป็น component ไหน, asset เดิมไปไว้ที่ไหน)
   - แนวทางตั้งชื่อ component, route, และไฟล์ตาม best practice

2. `migrate/step-01-*.md`, `migrate/step-02-*.md`, … ไปเรื่อย ๆ  
   - จำนวน step ให้กำหนดเองตามความจำเป็นจนกว่าจะสามารถรัน `npm run build` และแสดงหน้าเว็บได้ครบถ้วน
   - แต่ละไฟล์ให้เขียนในรูปแบบ:
     - หัวข้อไฟล์: `Step X – <สรุปงานหลักของ step นี้>`
     - ส่วน **Goal:** อธิบายเป้าหมายของ step นั้น
     - ส่วน **Tasks (Checklist):** เขียนเป็น checklist `- [ ] ...` แยกงานย่อยที่ต้องทำอย่างละเอียด เช่น
       - ตั้งค่า Tailwind / daisyUI ใน Vite
       - ออกแบบโครง layout หลัก
       - แปลงหน้า static HTML แต่ละหน้าเป็น React component / route
       - ย้าย asset (ภาพ, CSS เดิม, JS เดิม) และ refactor ให้เข้ากับ Tailwind + daisyUI
       - ตั้งค่า routing ด้วย react-router-dom ให้รองรับทุกหน้า
       - ทดสอบการ build และการแสดงผล
     - ส่วน **Notes / Best Practices:** สรุปแนวทางที่ควรระวังหรือ best practice ที่เกี่ยวข้องกับ step นั้น เช่น การแตก component, การหลีกเลี่ยง inline style เดิม, การจัดการ global state (ถ้าจำเป็น)

## ข้อกำหนดเพิ่มเติม

- ให้คิด process แบบ full migration: ตั้งแต่การวิเคราะห์โครงสร้าง `/old-website`, การออกแบบโครงใหม่, การแปลงหน้า, การตรวจสอบลิงก์/เมนู, การจัดการ SEO เบื้องต้น (เช่น title, meta tags ผ่าน React), ไปจนถึงการทดสอบ `npm run dev` และ `npm run build`
- อธิบายด้วยภาษาที่อ่านง่าย แต่มีความเป็นเชิงวิชาการ เหมาะสำหรับใช้เป็นคู่มือให้ทีม dev คนอื่นทำตามได้
- ให้ตอบออกมาเป็น Markdown ล้วน ๆ และแยกแต่ละไฟล์ด้วยหัวข้อระดับ H1 ชัดเจน (เช่น `# migrate/project-structure.md`, `# migrate/step-01-...md` เป็นต้น)

***โต้ตอบกับฉันเป็นภาษาไทยด้วยนะ****

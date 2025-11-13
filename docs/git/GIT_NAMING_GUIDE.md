# Git Naming & Commit Standards Guide

## 1. การตั้งชื่อ Branch

### 1.1 โครงสร้างมาตรฐาน
```
<type>/<scope>-<short-description>
```

**type ที่นิยมใช้:**  
- feat – ฟีเจอร์ใหม่  
- fix – แก้บั๊ก  
- refactor – ปรับโครงสร้างโค้ด  
- chore – งานจิปาถะ  
- hotfix – แก้ด่วน  
- test – เพิ่ม/แก้ test  
- docs – เอกสาร  
- perf – ปรับประสิทธิภาพ  

**scope** เช่น auth, api, dashboard  
**short‑description** สั้น กระชับ ใช้ dash

**ตัวอย่าง**
- feat/auth-add-login-otp  
- fix/api-timezone-bug  
- refactor/core-service-layer  

---

## 2. การตั้งชื่อ Tags

ใช้ Semantic Versioning  
```
v<major>.<minor>.<patch>
```

### ตัวอย่าง
- v1.0.0  
- v1.1.0  
- v1.1.1  

### Pre-release
- v2.0.0-alpha.1  
- v2.0.0-beta.1  
- v2.0.0-rc.1  

---

## 3. Commit Message (Conventional Commits)

### โครงสร้างพื้นฐาน
```
<type>(scope): short summary

body (optional)

footer (optional)
```

### รายละเอียด type ที่นิยมใช้

#### feat — เพิ่มฟีเจอร์ใหม่
ใช้เมื่อเพิ่มความสามารถใหม่ เช่น API, UI ใหม่

#### fix — แก้บั๊ก
เมื่อโค้ดทำงานผิดพลาดและแก้ไขให้ถูกต้อง

#### refactor — ปรับโครงสร้างโค้ด
เปลี่ยนโครงสร้างโดยไม่เปลี่ยน behavior

#### chore — งานระบบทั่วไป
update dependency, config, script

#### docs — เอกสาร
README, API spec

#### style — ปรับรูปแบบโค้ด
formatting, spacing, lint ไม่มีผลต่อโค้ด

#### test — เพิ่มหรือแก้ test
unit test / integration test

#### perf — ปรับประสิทธิภาพ
ลด latency, ลด memory

#### build — แก้ระบบ build
Dockerfile, webpack, vite

#### ci — แก้ workflow CI/CD
GitHub Actions, Jenkins

#### revert — ย้อนการเปลี่ยนแปลง
ใช้ revert commit

---

### ตัวอย่าง Commit
```
feat(auth): add otp verification

Add OTP verification to login process.
Closes #221
```

```
fix(api): correct timezone conversion issue
```

---

## 4. การตั้งชื่อ Pull Request (PR)
```
[type]: summary of change
```
ตัวอย่าง  
- feat: implement dashboard filters  
- fix: resolve worker memory leak  

---

## 5. การตั้งชื่อ Release Branch
- release/2025.03  
- release/v1.4.0  
- release/sprint-32  

---

## 6. การตั้งชื่อ Environment Branch
- dev  
- staging  
- uat  
- production  

---

## 7. สรุปการเลือก type แบบเร่งด่วน

| สิ่งที่ทำ | type |
|----------|------|
| เพิ่มฟีเจอร์ใหม่ | feat |
| แก้บั๊ก | fix |
| ปรับโครงสร้าง | refactor |
| เอกสาร | docs |
| จัด format | style |
| test | test |
| ปรับ performance | perf |
| config/dependency | chore |
| build system | build |
| CI/CD | ci |
| ย้อน commit | revert |

---

## 8. แนะนำเครื่องมือเสริม
- commitlint – บังคับมาตรฐาน commit  
- husky – pre-commit hooks  
- lint-staged – format ก่อน commit  
- semantic-release – ทำ release อัตโนมัติ  
- pre-push test – รัน test ก่อน push  

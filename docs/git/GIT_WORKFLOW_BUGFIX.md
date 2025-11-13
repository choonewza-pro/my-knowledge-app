# Git Workflow: การทำ Bugfix แบบปกติ (Step by Step)

## สถานะเริ่มต้น
- **Branch ปัจจุบัน:** `main`
- **ปัญหา:** พบ bug ที่ต้องแก้ไข (ไม่เร่งด่วน)
- **เป้าหมาย:** แก้ไข bug และ merge กลับเข้า main โดยไม่ต้อง release ทันที

## โครงสร้าง Branch
- **main**: Development branch หลัก
- **bugfix/***: Branch สำหรับแก้ไข bug แบบปกติ

---

## เมื่อไหร่ควรใช้ Bugfix แบบปกติ?

**ใช้ Bugfix แบบปกติเมื่อ:**
- ⚠️ Bug ที่ไม่กระทบการใช้งานหลัก
- ⚠️ Bug ที่สามารถรอ release ถัดไปได้
- ⚠️ Bug ใน development environment
- ⚠️ Minor bugs ที่ไม่ส่งผลกระทบต่อผู้ใช้
- ⚠️ UI/UX issues ที่ไม่เร่งด่วน

**ไม่ใช้ Bugfix แบบปกติเมื่อ:**
- 🔴 Critical bug ใน production (ใช้ Bugfix Production แทน)
- 🔴 Security vulnerability
- 🔴 Data loss หรือ system crash
- 🔴 ฟีเจอร์หลักไม่ทำงาน

---

## Step 1: Pull Main Branch

ดึง code ล่าสุดจาก main branch

```bash
# เปลี่ยนไปที่ main branch
git checkout main

# Pull การเปลี่ยนแปลงล่าสุดจาก remote
git pull origin main

# ตรวจสอบสถานะ
git status
git log --oneline -5
```

**ผลลัพธ์ที่คาดหวัง:**
```
Already on 'main'
Your branch is up to date with 'origin/main'.
```

---

## Step 2: สร้าง Bugfix Branch จาก Main

สร้าง bugfix branch จาก main branch

```bash
# สร้าง bugfix branch จาก main (ที่เรากำลังอยู่)
git checkout -b bugfix/fix-login-validation

# ตรวจสอบว่าสร้าง branch สำเร็จ
git branch
# * bugfix/fix-login-validation
#   main
```

**รูปแบบการตั้งชื่อ Bugfix Branch:**
- `bugfix/fix-login-validation`
- `bugfix/fix-cart-calculation`
- `bugfix/fix-image-upload`
- `bugfix/fix-form-validation`
- `bugfix/fix-responsive-layout`

**Best Practices การตั้งชื่อ:**
- ใช้ `bugfix/` prefix
- ใช้ชื่อที่สื่อความหมายชัดเจน
- ใช้ kebab-case (lowercase + dash)
- ระบุส่วนที่แก้ไข

---

## Step 3: แก้ไข Bug และทดสอบ

แก้ไขโค้ดให้ทำงานถูกต้อง

```bash
# แก้ไขไฟล์ที่มีปัญหา เช่น login.js, validation.ts

# ทดสอบให้แน่ใจว่าแก้ไขถูกต้อง
# - Run unit tests
# - Test manually
# - Check error logs

# ตรวจสอบการเปลี่ยนแปลง
git status
git diff
```

**Best Practices:**
- ✅ แก้ไขเฉพาะ bug ที่เกี่ยวข้อง
- ✅ ทำการทดสอบอย่างละเอียด
- ✅ เขียน unit tests ถ้าเป็นไปได้
- ✅ Document สาเหตุของ bug และวิธีแก้

---

## Step 4: Commit การแก้ไข

```bash
# Add ไฟล์ที่แก้ไข
git add login.js
git add validation.ts

# หรือเพิ่มทุกไฟล์ที่เปลี่ยนแปลง
git add .

# Commit พร้อม message ที่ชัดเจน (ใช้ fix: สำหรับ bugfix)
git commit -m "fix: แก้ไข login validation ไม่ตรวจสอบ email format

- เพิ่ม regex validation สำหรับ email
- แก้ไข error message ให้ชัดเจน
- เพิ่ม unit tests สำหรับ validation

Fixes #456"
```

**Commit Message Format สำหรับ Bugfix:**
```
fix: <สรุปปัญหาที่แก้>

- รายละเอียดการแก้ไข 1
- รายละเอียดการแก้ไข 2
- รายละเอียดการแก้ไข 3

Fixes #<issue-number>
```

**Commit Prefix ที่ใช้:**
- `fix:` - แก้ไข bug
- `test:` - เพิ่ม tests สำหรับ bug fix
- `refactor:` - ปรับปรุงโค้ดระหว่างแก้ไข bug

---

## Step 5: Push Bugfix Branch ขึ้น Remote (Optional)

ถ้าต้องการให้ทีม review หรือ backup

```bash
# Push bugfix branch ขึ้น remote
git push -u origin bugfix/fix-login-validation

# ตรวจสอบว่า push สำเร็จ
git log --oneline -3
```

**เมื่อไหร่ควร Push:**
- ✅ ต้องการให้ทีม review code
- ✅ ต้องการ backup งาน
- ✅ ทำงานร่วมกับคนอื่น
- ✅ ต้องการให้ CI/CD run tests

---

## Step 6: สร้าง Pull Request (Optional)

ถ้าทีมใช้ Pull Request workflow

### ทาง GitHub UI:
1. ไปที่ repository บน GitHub
2. คลิก **"Compare & pull request"**
3. กำหนด:
   - **Base:** `main`
   - **Compare:** `bugfix/fix-login-validation`
4. กรอกรายละเอียด PR:
   ```
   Title: Fix: แก้ไข login validation ไม่ตรวจสอบ email format
   
   ## ปัญหาที่พบ
   - Login form ไม่ตรวจสอบ email format
   - User สามารถกรอก email ผิดรูปแบบได้
   
   ## การแก้ไข
   - เพิ่ม regex validation สำหรับ email
   - แก้ไข error message
   - เพิ่ม unit tests
   
   ## การทดสอบ
   - ✅ Unit tests passed
   - ✅ Manual testing completed
   
   Fixes #456
   ```
5. Label: `bug`, `bugfix`
6. Reviewers: เลือกผู้ review
7. คลิก **"Create pull request"**

---

## Step 7: Review และแก้ไขตาม Feedback (ถ้ามี PR)

ถ้ามี reviewer แนะนำให้แก้ไข

```bash
# แก้ไขตาม feedback
# ... edit files ...

# Add และ commit
git add .
git commit -m "fix: ปรับปรุงตาม code review - เพิ่ม test cases"

# Push การเปลี่ยนแปลงขึ้น remote
git push

# PR จะอัพเดทอัตโนมัติ
```

---

## Step 8: Merge Bugfix เข้า Main Branch

Merge bugfix กลับเข้า main

### ทาง GitHub (ถ้ามี PR):
1. คลิก **"Merge pull request"**
2. เลือกวิธี merge:
   - **Create a merge commit** (เก็บประวัติ)
   - **Squash and merge** (รวม commits)
   - **Rebase and merge** (เรียง commits)
3. คลิก **"Confirm merge"**
4. (Optional) คลิก **"Delete branch"** เพื่อลบ remote branch

### ทาง Command Line:
```bash
# เปลี่ยนกลับไปที่ main branch
git checkout main

# Pull ล่าสุดจาก remote (ป้องกัน conflict)
git pull origin main

# Merge bugfix เข้า main
git merge --no-ff bugfix/fix-login-validation

# กรณีมี conflict ให้แก้ไข
# 1. เปิดไฟล์ที่ conflict
# 2. แก้ไข conflict markers (<<<<<<<, =======, >>>>>>>)
# 3. git add <ไฟล์ที่แก้แล้ว>
# 4. git commit -m "fix: resolve merge conflict"

# Push main branch ขึ้น remote
git push origin main
```

**ผลลัพธ์ที่คาดหวัง:**
```
Merge made by the 'recursive' strategy.
 login.js      | 15 +++++++++++----
 validation.ts |  8 ++++++--
 2 files changed, 17 insertions(+), 6 deletions(-)
```

**หมายเหตุ:**
- ใช้ `--no-ff` เพื่อสร้าง merge commit เก็บประวัติ
- Bug fix จะอยู่ใน main และรอ release ถัดไป
- ไม่ต้อง tag version ทันที

---

## Step 9: ลบ Bugfix Branch

ลบ bugfix branch ที่ใช้งานเสร็จแล้ว

```bash
# ตรวจสอบว่าอยู่บน main แล้ว
git branch
# * main

# ลบ local bugfix branch
git branch -d bugfix/fix-login-validation

# ถ้า branch ยังไม่ merge และต้องการบังคับลบ
# git branch -D bugfix/fix-login-validation

# ลบ remote bugfix branch (ถ้า push ไว้)
git push origin --delete bugfix/fix-login-validation

# ตรวจสอบ branches ที่เหลือ
git branch -a
# * main
#   remotes/origin/main
```

**ผลลัพธ์ที่คาดหวัง:**
```
Deleted branch bugfix/fix-login-validation (was a1b2c3d).
```

---

## Step 10: Verify และ Test

ตรวจสอบว่า main branch ทำงานปกติ

```bash
# Pull main ล่าสุด
git checkout main
git pull origin main

# ตรวจสอบ log
git log --oneline -5

# Run tests
npm test
# or
npm run test:unit

# Test manually
npm run dev
```

---

## สรุป Bugfix Workflow

```bash
# 1. Pull main branch
git checkout main
git pull origin main

# 2. สร้าง bugfix branch จาก main
git checkout -b bugfix/fix-login-validation

# 3. แก้ไข bug และทดสอบ
# ... edit files ...
# ... test thoroughly ...

# 4. Commit การแก้ไข
git add .
git commit -m "fix: แก้ไข login validation ไม่ตรวจสอบ email format"

# 5. (Optional) Push branch ขึ้น remote
git push -u origin bugfix/fix-login-validation

# 6. (Optional) สร้าง Pull Request บน GitHub

# 7. (Optional) Review และแก้ไขตาม feedback

# 8. Merge bugfix เข้า main
git checkout main
git pull origin main
git merge --no-ff bugfix/fix-login-validation
git push origin main

# 9. ลบ bugfix branch
git branch -d bugfix/fix-login-validation
git push origin --delete bugfix/fix-login-validation

# 10. Verify
git pull origin main
npm test
```

---

## Visual Workflow Diagram

```
main (development)
  │
  ├── pull origin main
  │
  ├── checkout -b bugfix/fix-login-validation
  │
  ├── แก้ไข bug
  │   - edit files
  │   - test
  │   - commit -m "fix: ..."
  │
  ├── (Optional) push to remote
  │   git push -u origin bugfix/fix-login-validation
  │
  ├── (Optional) Create Pull Request
  │   - Review
  │   - Approve
  │
  ├── checkout main
  │
  ├── merge bugfix → main
  │   git merge --no-ff bugfix/fix-login-validation
  │
  ├── push main
  │   git push origin main
  │
  └── delete bugfix branch
      git branch -d bugfix/fix-login-validation

Result:
  - main: มี bug fix แล้ว
  - bugfix branch: ลบแล้ว
  - รอ release ถัดไป (ไม่ต้อง tag ทันที)

Timeline: 30 minutes - 4 hours
```

---

## Bugfix แบบปกติ vs Bugfix Production

| Aspect | Bugfix แบบปกติ | Bugfix (Production) |
|--------|-----------------|---------------------|
| **Urgency** | ⚠️ Normal - ไม่เร่งด่วน | 🔴 Critical - เร่งด่วนมาก |
| **Branch Source** | `main` | `production` |
| **Target Branch** | `main` only | `production` → `main` |
| **Release** | รอ release ถัดไป | Release ทันที (v1.1.1 → v1.1.2) |
| **Testing** | Full testing | Focus test เฉพาะส่วนที่แก้ |
| **Review** | Standard review | Fast-track review |
| **Deploy** | ตาม schedule ปกติ | Deploy ทันทีหลัง merge |
| **Impact** | Low - ไม่กระทบ production | High - กระทบผู้ใช้งานจริง |

---

## Best Practices สำหรับ Bugfix แบบปกติ

1. **Pull ก่อนเสมอ**: Pull main ก่อนสร้าง branch ทุกครั้ง
2. **ชื่อ Branch ที่ชัดเจน**: ใช้ `bugfix/` prefix และชื่อที่สื่อความหมาย
3. **Commit Message ที่ดี**: ใช้ `fix:` prefix และอธิบายชัดเจน
4. **Test ให้ครบ**: Run tests ก่อน merge
5. **Code Review**: ใช้ PR เพื่อให้ทีม review
6. **Merge แบบ no-ff**: เก็บประวัติการ merge
7. **ลบ Branch**: ลบ branch หลัง merge เสร็จ
8. **Document**: อธิบายสาเหตุและวิธีแก้ใน commit message
9. **Small Changes**: แก้ไขเฉพาะที่จำเป็น ไม่เพิ่ม feature ใหม่
10. **Link Issue**: ใช้ `Fixes #<issue-number>` ใน commit message

---

## Common Bugfix Scenarios

### Scenario 1: Form Validation Bug
```bash
git checkout main && git pull origin main
git checkout -b bugfix/fix-form-validation

# แก้ไข validation
git add src/components/Form.tsx
git commit -m "fix: แก้ไข form validation ไม่ตรวจสอบ required fields"

git checkout main
git merge --no-ff bugfix/fix-form-validation
git push origin main
git branch -d bugfix/fix-form-validation
```

### Scenario 2: Calculation Error
```bash
git checkout main && git pull origin main
git checkout -b bugfix/fix-cart-total

# แก้ไข calculation
git add src/utils/cart.js
git commit -m "fix: แก้ไข cart total คำนวณผิดเมื่อมี discount"

git checkout main
git merge --no-ff bugfix/fix-cart-total
git push origin main
git branch -d bugfix/fix-cart-total
```

### Scenario 3: UI Layout Bug
```bash
git checkout main && git pull origin main
git checkout -b bugfix/fix-responsive-header

# แก้ไข CSS/layout
git add src/styles/header.css
git commit -m "fix: แก้ไข header layout เพี้ยนบน mobile"

git checkout main
git merge --no-ff bugfix/fix-responsive-header
git push origin main
git branch -d bugfix/fix-responsive-header
```

---

## Troubleshooting

### ปัญหา: Merge Conflict
```bash
# หลัง git merge มี conflict
git status
# ดูไฟล์ที่ conflict

# แก้ไข conflict ในไฟล์
# ลบ markers: <<<<<<<, =======, >>>>>>>

# Add ไฟล์ที่แก้แล้ว
git add <file>

# Commit
git commit -m "fix: resolve merge conflict"
```

### ปัญหา: Commit ผิด Branch
```bash
# ยกเลิก commit (เก็บการเปลี่ยนแปลง)
git reset --soft HEAD~1

# เปลี่ยนไป branch ที่ถูกต้อง
git checkout bugfix/correct-branch

# Commit ใหม่
git add .
git commit -m "fix: correct message"
```

### ปัญหา: ต้องการแก้ไข Commit Message
```bash
# แก้ commit ล่าสุด
git commit --amend -m "fix: new message"

# ถ้า push ไปแล้ว (ระวัง!)
git push --force-with-lease origin bugfix/branch-name
```

---

## Checklist สำหรับ Bugfix

### ก่อน Merge:
- [ ] Pull main branch ล่าสุด
- [ ] สร้าง bugfix branch จาก main
- [ ] แก้ไข bug ตรงจุด
- [ ] เขียน unit tests (ถ้าเป็นไปได้)
- [ ] Run tests ทั้งหมดให้ผ่าน
- [ ] Test manually
- [ ] Commit message ชัดเจน
- [ ] Code review (ถ้าใช้ PR)

### หลัง Merge:
- [ ] Verify ว่า main ทำงานปกติ
- [ ] Run tests อีกครั้ง
- [ ] ลบ local bugfix branch
- [ ] ลบ remote bugfix branch (ถ้ามี)
- [ ] Update Jira/Linear ticket
- [ ] Bug fix จะออกใน release ถัดไป

---

## Git Commands Reference

```bash
# สร้าง bugfix branch
git checkout -b bugfix/<name>

# Commit
git commit -m "fix: <description>"

# Merge กลับ main
git checkout main
git merge --no-ff bugfix/<name>

# ลบ branch
git branch -d bugfix/<name>
git push origin --delete bugfix/<name>

# ดู diff
git diff main..bugfix/<name>

# ดู log
git log --oneline --graph

# ยกเลิก merge (ถ้ายังไม่ push)
git reset --hard HEAD~1

# Stash changes ชั่วคราว
git stash
git stash pop
```

---

## เครื่องมือที่ช่วยในการทำ Bugfix

### Testing
- **Jest / Vitest**: Unit testing
- **Playwright / Cypress**: E2E testing
- **ESLint / Prettier**: Code quality

### Code Review
- **GitHub Pull Requests**: Code review platform
- **GitLab Merge Requests**: Alternative platform
- **Code Climate**: Automated code review

### CI/CD
- **GitHub Actions**: Automated testing
- **GitLab CI**: Continuous integration
- **CircleCI**: Cloud CI/CD

---

**สร้างโดย:** Git Workshop - DevOps Course  
**Version:** 1.0.0  
**Last Updated:** November 13, 2025  
**Related:**
- [GIT_WORKFLOW_ADD_FEATURE.md](./GIT_WORKFLOW_ADD_FEATURE.md)
- [GIT_WORKFLOW_BUGFIX_PRODUCTION.md](./GIT_WORKFLOW_BUGFIX_PRODUCTION.md)
- [GIT_WORKFLOW_HOTFIX.md](./GIT_WORKFLOW_HOTFIX.md)

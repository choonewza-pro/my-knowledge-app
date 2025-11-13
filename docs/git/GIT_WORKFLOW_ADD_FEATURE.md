# Git Workflow: การเพิ่ม Feature ใหม่ (Step by Step)

## สถานะเริ่มต้น
- **Branch ปัจจุบัน:** `main`
- **Production Release:** `v1.0.0`
- **เป้าหมาย:** เพิ่ม feature ใหม่เข้าไปในโปรเจค

---

## Step 1: ตรวจสอบสถานะปัจจุบัน

ก่อนเริ่มทำงาน ควรตรวจสอบว่าคุณอยู่ที่ branch ไหนและมีการเปลี่ยนแปลงค้างอยู่หรือไม่

```bash
# ตรวจสอบ branch ปัจจุบันและสถานะของไฟล์
git status

# ตรวจสอบว่าอยู่ที่ branch main หรือไม่
git branch

# ดูประวัติ commit ล่าสุด
git log --oneline -5
```

**ผลลัพธ์ที่คาดหวัง:**
- อยู่บน branch `main`
- ไม่มีไฟล์ที่ยังไม่ได้ commit (working directory clean)

---

## Step 2: Pull การเปลี่ยนแปลงล่าสุดจาก Remote

ดึงโค้ดล่าสุดจาก GitHub เพื่อให้แน่ใจว่าเรามีโค้ดเวอร์ชันล่าสุด

```bash
# ดึงการเปลี่ยนแปลงล่าสุดจาก origin/main
git pull origin main

# หรือใช้คำสั่งนี้ถ้าตั้งค่า upstream แล้ว
git pull
```

**หมายเหตุ:** หากมี conflict ให้แก้ไขก่อนดำเนินการต่อ

---

## Step 3: สร้าง Branch ใหม่สำหรับ Feature

สร้าง branch แยกออกมาจาก `main` เพื่อพัฒนา feature ใหม่

```bash
# สร้าง branch ใหม่และเปลี่ยนไปใช้งานทันที
git checkout -b feature/add-new-feature

# หรือใช้คำสั่งแยกเป็น 2 ขั้นตอน
git branch feature/add-new-feature
git checkout feature/add-new-feature
```

**ตัวอย่างชื่อ branch ที่ดี:**
- `feature/add-login-page`
- `feature/add-payment-gateway`
- `feature/improve-search-function`

**ตรวจสอบว่าอยู่บน branch ใหม่แล้ว:**
```bash
git branch
# ผลลัพธ์จะแสดง * ที่หน้า feature/add-new-feature
```

---

## Step 4: พัฒนา Feature และ Commit การเปลี่ยนแปลง

เริ่มเขียนโค้ดและ commit งานเป็นระยะ ๆ

```bash
# แก้ไขไฟล์ต่าง ๆ ด้วย editor
# เช่น เพิ่มไฟล์ product.html, แก้ไข styles.css เป็นต้น

# ตรวจสอบไฟล์ที่มีการเปลี่ยนแปลง
git status

# เพิ่มไฟล์เข้า Staging Area (เลือกไฟล์ที่ต้องการ)
git add product.html
git add css/styles.css

# หรือเพิ่มทุกไฟล์ที่เปลี่ยนแปลง
git add .

# Commit การเปลี่ยนแปลงพร้อมข้อความที่ชัดเจน
git commit -m "feat: เพิ่มหน้า product list และ navbar item"

# ถ้ามีการแก้ไขเพิ่มเติม ทำซ้ำ
git add about.html
git commit -m "feat: เพิ่มหน้า about us พร้อม team section"
```

**Best Practices สำหรับ Commit Message:**
- `feat:` เพิ่ม feature ใหม่
- `fix:` แก้ไข bug
- `docs:` อัพเดท documentation
- `style:` แก้ไข formatting, จัด code
- `refactor:` ปรับปรุงโค้ดโดยไม่เปลี่ยนการทำงาน
- `test:` เพิ่มหรือแก้ไข tests
- `chore:` งานอื่น ๆ เช่น update dependencies

---

## Step 5: ดู Log และตรวจสอบการเปลี่ยนแปลง

ตรวจสอบว่า commit ทั้งหมดถูกต้อง

```bash
# ดู commit history
git log --oneline

# ดู commit แบบละเอียด
git log

# ดูความแตกต่างระหว่าง branch ปัจจุบันกับ main
git diff main

# ดูไฟล์ที่เปลี่ยนแปลงไปจาก main
git diff --name-only main
```

---

## Step 6: Push Branch ขึ้น Remote Repository (GitHub)

อัพโหลด branch ของคุณขึ้น GitHub

```bash
# Push branch ใหม่ขึ้น GitHub (ครั้งแรก)
git push -u origin feature/add-new-feature

# ครั้งถัดไปสามารถใช้คำสั่งสั้น ๆ ได้
git push
```

**หมายเหตุ:** 
- `-u` หรือ `--set-upstream` จะทำให้ Git จำ remote branch ไว้
- หลังจากนี้ใช้แค่ `git push` ก็เพียงพอ

---

## Step 7: สร้าง Pull Request (PR) บน GitHub

1. เปิด browser ไปที่ repository บน GitHub
2. GitHub จะแสดงข้อความแจ้งเตือน branch ใหม่ ให้คลิก **"Compare & pull request"**
3. กรอกรายละเอียด Pull Request:
   - **Title:** ชื่อที่สื่อความหมายชัดเจน เช่น "เพิ่ม Product List Feature"
   - **Description:** อธิบายว่าทำอะไรบ้าง, ทำไมถึงทำ, ผลลัพธ์ที่คาดหวัง
   - **Reviewers:** (ถ้ามี) เลือกคนที่จะ review โค้ด
   - **Labels:** กำหนด label เช่น `feature`, `enhancement`
4. คลิก **"Create pull request"**

---

## Step 8: Code Review และแก้ไขตาม Feedback (ถ้ามี)

หากมี reviewer แนะนำให้แก้ไข

```bash
# แก้ไขไฟล์ตาม feedback
# เช่น แก้ไข product.html

# Add และ commit การเปลี่ยนแปลง
git add product.html
git commit -m "fix: แก้ไขตาม code review - ปรับ responsive layout"

# Push การเปลี่ยนแปลงขึ้น GitHub
git push

# Pull Request จะอัพเดทอัตโนมัติ
```

---

## Step 9: Merge Pull Request เข้า Main Branch

เมื่อ PR ได้รับการอนุมัติแล้ว

**ทาง GitHub UI:**
1. ไปที่หน้า Pull Request
2. คลิก **"Merge pull request"**
3. เลือกประเภทการ merge:
   - **Create a merge commit** (default): เก็บประวัติ commit ทั้งหมด
   - **Squash and merge**: รวม commit ทั้งหมดเป็น 1 commit
   - **Rebase and merge**: เรียง commit ตามลำดับเวลา
4. คลิก **"Confirm merge"**
5. (Optional) คลิก **"Delete branch"** เพื่อลบ branch ที่ merge แล้ว

**ทาง Command Line (ถ้าต้องการ):**
```bash
# เปลี่ยนกลับไปที่ main branch
git checkout main

# Pull การเปลี่ยนแปลงล่าสุด (รวม merge ที่เกิดขึ้นบน GitHub)
git pull origin main

# Merge feature branch เข้า main (ถ้าทำเองโดยไม่ผ่าน GitHub)
git merge feature/add-new-feature

# Push ขึ้น GitHub
git push origin main
```

---

## Step 10: ลบ Branch ที่ไม่ใช้แล้ว (Clean up)

หลังจาก merge เสร็จแล้ว ควรลบ branch ที่ไม่ใช้งานแล้ว

```bash
# เปลี่ยนไปที่ main branch ก่อน
git checkout main

# ลบ branch local
git branch -d feature/add-new-feature

# ถ้า branch ยังไม่ได้ merge และต้องการบังคับลบ
git branch -D feature/add-new-feature

# ลบ branch บน remote (GitHub)
git push origin --delete feature/add-new-feature

# ดู branch ที่เหลืออยู่
git branch -a
```

---

## Step 11: Tag Release Version ใหม่ (Optional)

ถ้า feature ใหม่พร้อมสำหรับ production release

```bash
# ตรวจสอบว่าอยู่บน main และมีโค้ดล่าสุด
git checkout main
git pull origin main

# สร้าง tag สำหรับ version ใหม่
git tag -a v1.1.0 -m "Release version 1.1.0 - เพิ่ม Product List Feature"

# Push tag ขึ้น GitHub
git push origin v1.1.0

# หรือ push tag ทั้งหมดพร้อมกัน
git push --tags

# ดู tag ทั้งหมด
git tag -l
```

**Semantic Versioning:**
- `v1.0.0` → `v1.1.0` (Minor update: เพิ่ม feature ใหม่)
- `v1.1.0` → `v1.1.1` (Patch: แก้ไข bug)
- `v1.1.0` → `v2.0.0` (Major: มีการเปลี่ยนแปลงใหญ่ที่ไม่ compatible กับเวอร์ชันเก่า)

---

## Step 12: Sync Local Repository

ให้แน่ใจว่า local repository ของคุณเป็นเวอร์ชันล่าสุด

```bash
# Pull การเปลี่ยนแปลงทั้งหมดจาก main
git checkout main
git pull origin main

# ดึงข้อมูล remote branches และ tags ล่าสุด
git fetch --all --prune --tags

# ตรวจสอบ branches ทั้งหมด (รวม remote)
git branch -a

# ตรวจสอบ tags
git tag -l
```

---

## สรุป Git Workflow ทั้งหมด

```bash
# 1. ตรวจสอบสถานะ
git status
git branch

# 2. Pull โค้ดล่าสุด
git pull origin main

# 3. สร้าง feature branch
git checkout -b feature/add-new-feature

# 4. พัฒนาและ commit
git add .
git commit -m "feat: เพิ่ม feature ใหม่"

# 5. Push ขึ้น GitHub
git push -u origin feature/add-new-feature

# 6. สร้าง Pull Request บน GitHub

# 7. Review และแก้ไข (ถ้ามี)
git add .
git commit -m "fix: แก้ไขตาม feedback"
git push

# 8. Merge PR บน GitHub

# 9. Clean up local
git checkout main
git pull origin main
git branch -d feature/add-new-feature

# 10. Tag version (optional)
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0
```

---

## คำสั่ง Git ที่ใช้บ่อย

### ตรวจสอบและดูข้อมูล
```bash
git status                    # ดูสถานะไฟล์ปัจจุบัน
git log --oneline            # ดู commit history แบบย่อ
git log --graph --all        # ดู commit graph ทุก branch
git diff                     # ดูความแตกต่างที่ยังไม่ add
git diff --staged            # ดูความแตกต่างใน staging area
git branch                   # ดู local branches
git branch -a                # ดูทุก branch (รวม remote)
git tag -l                   # ดู tags ทั้งหมด
```

### การทำงานกับ Branches
```bash
git checkout -b <branch>     # สร้างและเปลี่ยนไป branch ใหม่
git checkout <branch>        # เปลี่ยนไปใช้ branch อื่น
git branch -d <branch>       # ลบ branch (ถ้า merge แล้ว)
git branch -D <branch>       # บังคับลบ branch
git merge <branch>           # merge branch เข้ามาใน branch ปัจจุบัน
```

### Sync กับ Remote
```bash
git pull                     # ดึงและ merge จาก remote
git fetch                    # ดึงข้อมูลจาก remote (ไม่ merge)
git push                     # push ขึ้น remote
git push -u origin <branch>  # push และ set upstream
git remote -v                # ดู remote repositories
```

### Undo และแก้ไข
```bash
git reset HEAD <file>        # ยกเลิก staging ของไฟล์
git checkout -- <file>       # ยกเลิกการแก้ไขไฟล์
git reset --soft HEAD~1      # ยกเลิก commit ล่าสุด (เก็บการเปลี่ยนแปลง)
git reset --hard HEAD~1      # ยกเลิก commit ล่าสุด (ลบการเปลี่ยนแปลง)
git commit --amend           # แก้ไข commit ล่าสุด
git revert <commit>          # สร้าง commit ใหม่เพื่อยกเลิก commit เก่า
```

---

## Best Practices

1. **Commit บ่อย ๆ**: แบ่ง commit เป็นชิ้นเล็ก ๆ ที่มีความหมายชัดเจน
2. **ใช้ชื่อ branch ที่สื่อความหมาย**: `feature/`, `bugfix/`, `hotfix/`
3. **เขียน commit message ที่ดี**: ใช้ Conventional Commits (feat, fix, docs, etc.)
4. **Pull ก่อนเริ่มงานทุกครั้ง**: ป้องกัน conflict
5. **ใช้ Pull Request**: ให้ทีมได้ review โค้ดก่อน merge
6. **Test ก่อน commit**: ตรวจสอบว่าโค้ดทำงานได้
7. **ลบ branch ที่ไม่ใช้**: เก็บ repository ให้สะอาด
8. **ใช้ .gitignore**: ป้องกันไม่ให้ commit ไฟล์ที่ไม่จำเป็น
9. **Tag สำหรับ Release**: ใช้ Semantic Versioning
10. **Backup สม่ำเสมอ**: Push ขึ้น remote บ่อย ๆ

---

## Troubleshooting

### ลืม pull ก่อนเริ่มทำงาน มี conflict
```bash
git pull origin main
# แก้ไข conflict ในไฟล์
git add .
git commit -m "fix: แก้ไข merge conflict"
```

### ต้องการยกเลิกการเปลี่ยนแปลงทั้งหมด
```bash
git reset --hard HEAD
git clean -fd  # ลบไฟล์ที่ยังไม่ได้ track
```

### Commit ผิด branch
```bash
# ยกเลิก commit (เก็บการเปลี่ยนแปลง)
git reset --soft HEAD~1

# เปลี่ยนไป branch ที่ถูกต้อง
git checkout correct-branch

# Commit ใหม่
git add .
git commit -m "commit message"
```

### ต้องการดึง branch ของคนอื่นมาใช้
```bash
git fetch origin
git checkout feature/other-person-branch
```

---

## เพิ่มเติม

- **GitHub Actions**: ตั้งค่า CI/CD pipeline เพื่อ auto deploy
- **Protected Branches**: ตั้งค่าใน GitHub ให้ main branch ต้อง review ก่อน merge
- **Branch Policies**: กำหนดกฎเช่น ต้อง pass tests ก่อน merge

---

**สร้างโดย:** Git Workshop - DevOps Course  
**Version:** 1.0.0  
**Last Updated:** November 13, 2025

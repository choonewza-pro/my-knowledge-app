# Git Workflow: การทำ Bugfix บน Production (Step by Step)

## สถานะเริ่มต้น
- **Branches:** `main`, `production`
- **Production Release:** `v1.1.1`
- **ปัญหา:** พบ critical bug ใน production ที่ต้องแก้ไขทันที
- **เป้าหมาย:** แก้ไข bug และ deploy ขึ้น production โดยเร็ว → Release `v1.1.2`

## โครงสร้าง Branch
- **main**: Development branch (ล่าสุด)
- **production**: Production branch (ที่กำลังใช้งานจริง)
- **bugfix/***: Branch สำหรับแก้ไข bug ใน production

---

## เมื่อไหร่ควรใช้ Bugfix (Production)?

**ใช้ Bugfix เมื่อ:**
- 🔴 พบ critical bug ใน production ที่ส่งผลกระทบต่อผู้ใช้
- 🔴 Security vulnerability ที่ต้องแก้ไขด่วน
- 🔴 Data loss หรือ system crash
- 🔴 Payment gateway ไม่ทำงาน
- 🔴 ฟีเจอร์หลักใช้งานไม่ได้

**ไม่ใช้ Bugfix (Production) เมื่อ:**
- ✅ Bug เล็กน้อยที่ไม่กระทบการใช้งานหลัก (แก้ใน main แล้วรอ release ถัดไป)
- ✅ Feature request ใหม่
- ✅ Performance improvement ที่ไม่เร่งด่วน
- ✅ UI/UX tweaks

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

## Step 2: Pull Production Branch

ดึง code ล่าสุดจาก production branch

```bash
# Pull production branch จาก remote
git pull origin production

# ดูข้อมูล branches ทั้งหมด
git branch -a

# ตรวจสอบว่ามี production branch แล้ว
# * main
#   remotes/origin/main
#   remotes/origin/production
```

**หมายเหตุ:** Production branch คือ branch ที่ใช้งานจริงบน production server

---

## Step 3: Checkout Production Branch

เปลี่ยนไปใช้ production branch

```bash
# เปลี่ยนไปที่ production branch
git checkout production

# ตรวจสอบว่าอยู่บน production แล้ว
git branch
# * production
#   main

# ดู commit ล่าสุดของ production
git log --oneline -5
```

**ผลลัพธ์ที่คาดหวัง:**
```
Switched to branch 'production'
Your branch is up to date with 'origin/production'.
```

---

## Step 4: สร้าง Bugfix Branch จาก Production

สร้าง bugfix branch จาก production branch

```bash
# สร้าง bugfix branch จาก production (ที่เรากำลังอยู่)
git checkout -b bugfix/fix-payment-error

# ตรวจสอบว่าสร้าง branch สำเร็จ
git branch
# * bugfix/fix-payment-error
#   production
#   main
```

**รูปแบบการตั้งชื่อ Bugfix Branch:**
- `bugfix/fix-payment-error`
- `bugfix/security-patch`
- `bugfix/fix-crash-on-login`
- `bugfix/critical-data-loss`
- `bugfix/fix-database-timeout`

---

## Step 5: แก้ไข Bug และทดสอบ

แก้ไขโค้ดให้ทำงานถูกต้อง

```bash
# แก้ไขไฟล์ที่มีปัญหา เช่น payment.js, checkout.php

# ทดสอบให้แน่ใจว่าแก้ไขถูกต้อง
# - Run unit tests
# - Test manually
# - Check error logs

# ตรวจสอบการเปลี่ยนแปลง
git status
git diff
```

**Best Practices:**
- ✅ แก้ไขเฉพาะสิ่งที่จำเป็น - ไม่เพิ่ม feature ใหม่
- ✅ ทำการทดสอบอย่างละเอียด
- ✅ เขียน commit message ที่ชัดเจน
- ✅ Document สาเหตุของ bug และวิธีแก้

---

## Step 6: Commit การแก้ไข

```bash
# Add ไฟล์ที่แก้ไข
git add payment.js
git add checkout.php

# หรือเพิ่มทุกไฟล์ที่เปลี่ยนแปลง
git add .

# Commit พร้อม message ที่ชัดเจน (ใช้ fix: สำหรับ bugfix)
git commit -m "fix: แก้ไข payment gateway timeout error

- เพิ่ม retry mechanism สำหรับ payment API
- ปรับ timeout จาก 5s เป็น 15s
- เพิ่ม error logging สำหรับ debug

Fixes #123"
```

**Commit Message Format สำหรับ Bugfix:**
```
fix: <สรุปปัญหาที่แก้>

- รายละเอียดการแก้ไข 1
- รายละเอียดการแก้ไข 2
- รายละเอียดการแก้ไข 3

Fixes #<issue-number>
```

**Commit Prefix:**
- `fix:` - แก้ไข bug (ใช้สำหรับ bugfix)
- `hotfix:` - แก้ไข critical bug ฉุกเฉิน
- `security:` - แก้ไขช่องโหว่ด้านความปลอดภัย

---

## Step 7: Merge Bugfix เข้า Production Branch

Merge bugfix branch เข้า production เพื่อเตรียม deploy

```bash
# เปลี่ยนกลับไปที่ production branch
git checkout production

# Merge bugfix เข้า production (ใช้ --no-ff เพื่อเก็บประวัติ)
git merge --no-ff bugfix/fix-payment-error

# กรณีมี conflict ให้แก้ไขก่อน
# git add .
# git commit -m "fix: resolve merge conflict"

# ตรวจสอบว่า merge สำเร็จ
git log --oneline -5
```

**ผลลัพธ์ที่คาดหวัง:**
```
Merge made by the 'recursive' strategy.
 payment.js  | 10 +++++-----
 checkout.php | 5 +++--
 2 files changed, 8 insertions(+), 7 deletions(-)
```

---

## Step 8: สร้าง Production Release Tag

สร้าง tag version ใหม่สำหรับ production (เพิ่มตัวเลขสุดท้าย)

```bash
# ตรวจสอบว่าอยู่บน production branch
git branch
# * production

# ดู tag ปัจจุบัน
git tag -l
# v1.0.0
# v1.1.0
# v1.1.1

# สร้าง tag version ใหม่ (v1.1.1 -> v1.1.2)
# เพิ่มตัวเลขสุดท้าย (patch version) เนื่องจากเป็นการแก้ไข bug
git tag -a v1.1.2 -m "Release v1.1.2: แก้ไข payment gateway timeout error

- Fix payment API timeout issue
- Add retry mechanism
- Improve error logging

Fixes #123"

# Push production branch และ tag ขึ้น remote
git push origin production
git push origin v1.1.2

# หรือ push tags ทั้งหมด
git push --tags
```

**Semantic Versioning สำหรับ Bugfix:**
- `v1.1.1` → `v1.1.2` (Patch: แก้ไข bug - เพิ่มตัวเลขสุดท้าย)
- `v1.1.2` → `v1.1.3` (Patch: แก้ไข bug อีกครั้ง)
- `v1.1.0` → `v1.2.0` (Minor: เพิ่ม feature ใหม่)
- `v1.0.0` → `v2.0.0` (Major: breaking changes)

**ตรวจสอบ tag:**
```bash
# ดู tag ทั้งหมด
git tag -l

# ดูรายละเอียดของ tag
git show v1.1.2
```

---

## Step 9: Merge Production เข้า Main Branch

Merge production กลับเข้า main เพื่อให้ bug ใน main ถูกแก้ไขด้วย

```bash
# เปลี่ยนไปที่ main branch
git checkout main

# Pull ล่าสุดจาก remote (ป้องกัน conflict)
git pull origin main

# Merge production เข้า main
git merge --no-ff production

# กรณีมี conflict ให้แก้ไข
# 1. เปิดไฟล์ที่ conflict
# 2. แก้ไข conflict markers (<<<<<<<, =======, >>>>>>>)
# 3. git add <ไฟล์ที่แก้แล้ว>
# 4. git commit -m "chore: merge production v1.1.2 into main"

# Push main branch ขึ้น remote
git push origin main
```

**ผลลัพธ์ที่คาดหวัง:**
```
Merge made by the 'recursive' strategy.
 payment.js  | 10 +++++-----
 checkout.php | 5 +++--
 2 files changed, 8 insertions(+), 7 deletions(-)
```

**หมายเหตุ:**
- การ merge production → main ทำให้ bug fix ที่แก้ไขใน production ถูก sync กลับมาที่ main
- ป้องกันไม่ให้ bug เดิมกลับมาปรากฏใน development ในอนาคต
- ใช้ `--no-ff` เพื่อสร้าง merge commit เก็บประวัติการ merge

---

## Step 10: Deploy Production Release

Deploy production version ใหม่ขึ้น production server

```bash
# Checkout ไปที่ production tag
git checkout v1.1.2

# Verify ว่าโค้ดถูกต้อง
git log --oneline -5

# Deploy ตามขั้นตอนของทีม
# - Build production artifacts
# - Run production tests
# - Deploy to production server
# - Verify deployment

# ตัวอย่างคำสั่ง deploy (ขึ้นกับ infrastructure)
# npm run build
# npm run deploy:production
# docker build -t myapp:v1.1.2 .
# docker push myapp:v1.1.2
# kubectl set image deployment/myapp myapp=myapp:v1.1.2
```

**Deployment Checklist:**
- [ ] Build production artifacts สำเร็จ
- [ ] Tests ผ่านหมด
- [ ] Deploy ขึ้น production
- [ ] Health check ผ่าน
- [ ] Smoke tests ผ่าน
- [ ] Monitor logs ไม่มี error

---

## Step 11: Verify Production และ Monitor

ตรวจสอบว่า production ทำงานปกติหลัง deploy

```bash
# ตรวจสอบว่า production ทำงานปกติ
# - Check application logs
# - Monitor error rates
# - Check user reports
# - Verify metrics/dashboards
```

**Monitoring Checklist:**
- ✅ Error rate ลดลงหรือไม่?
- ✅ Payment success rate เพิ่มขึ้นหรือไม่?
- ✅ ไม่มี error ใหม่เกิดขึ้น
- ✅ Performance metrics ปกติ
- ✅ User feedback ดีขึ้น
- ✅ API response time ปกติ
- ✅ Database queries ทำงานได้

**ตัวอย่างการ Monitor:**
```bash
# ดู logs บน server
ssh production-server
tail -f /var/log/app.log

# ตรวจสอบ health check
curl https://api.example.com/health

# ดู metrics
# - Open monitoring dashboard (Grafana, Datadog, etc.)
# - Check error rates
# - Check response times
```

---

## Step 12: Clean Up Bugfix Branch

ลบ bugfix branch ที่ใช้งานเสร็จแล้ว

```bash
# เปลี่ยนกลับไปที่ main หรือ production
git checkout main

# ลบ local bugfix branch
git branch -d bugfix/fix-payment-error

# ถ้า branch ยังไม่ merge และต้องการบังคับลบ
# git branch -D bugfix/fix-payment-error

# ถ้า push bugfix branch ขึ้น remote ให้ลบด้วย
# git push origin --delete bugfix/fix-payment-error

# ตรวจสอบ branches ที่เหลือ
git branch -a
# * main
#   production
#   remotes/origin/main
#   remotes/origin/production
```

**หมายเหตุ:**
- ลบ branch หลังจาก merge และ deploy สำเร็จแล้ว
- เก็บ repository ให้สะอาด
- ป้องกันความสับสนจาก branch เก่า ๆ

---

## Step 13: อัพเดท Documentation และ Communication

บันทึกและแจ้งทีม

```bash
# สร้าง release notes
# สร้าง incident report (ถ้าจำเป็น)
# แจ้งทีม และ stakeholders
# อัพเดท CHANGELOG.md
```

**ตัวอย่าง Release Notes:**
```markdown
# Release v1.1.2 (Bugfix)

## Release Date
November 13, 2025 - 14:30 UTC

## Bug Fix
- แก้ไข Payment Gateway timeout error
- ผู้ใช้สามารถชำระเงินได้สำเร็จ

## Changes
- เพิ่ม retry mechanism สำหรับ payment API
- ปรับ timeout จาก 5s เป็น 15s
- เพิ่ม error logging สำหรับการ debug

## Impact
- Downtime: 0 minutes
- Affected Users: ~500 users
- Success Rate: จาก 85% เป็น 99.5%

## Rollback Plan
- Tag: v1.1.1 (previous stable version)
- Rollback time: ~5 minutes
```

**Communication Channels:**
- 📧 Email to stakeholders
- 💬 Slack/Teams announcement
- 📝 Update Jira/Linear tickets
- 📊 Update status page

---

## Step 14: สร้าง Post-Mortem (ถ้าจำเป็น)

วิเคราะห์สาเหตุและวางแผนป้องกัน

ดู [Post-Mortem Template](#post-mortem-template) ด้านล่าง

---

## Step 15: Sync และตรวจสอบ Branches

ให้แน่ใจว่าทุก branch เป็นเวอร์ชันล่าสุด

```bash
# Pull ทุก branch
git checkout main
git pull origin main

git checkout production
git pull origin production

# Fetch ข้อมูล remote ทั้งหมด
git fetch --all --prune --tags

# ตรวจสอบ branches และ tags
git branch -a
git tag -l

# ตรวจสอบว่า main และ production sync กันแล้ว
git log --oneline --graph --all -10
```

---

## สรุป Bugfix Workflow

```bash
# 1. Pull main branch
git checkout main
git pull origin main

# 2. Pull production branch
git pull origin production

# 3. Checkout production branch
git checkout production

# 4. สร้าง bugfix branch จาก production
git checkout -b bugfix/fix-payment-error

# 5. แก้ไข bug และทดสอบ
# ... edit files ...
# ... test thoroughly ...

# 6. Commit การแก้ไข
git add .
git commit -m "fix: แก้ไข payment gateway timeout error"

# 7. Merge bugfix เข้า production
git checkout production
git merge --no-ff bugfix/fix-payment-error

# 8. สร้าง production release tag (เพิ่มตัวเลขสุดท้าย)
# v1.1.1 -> v1.1.2
git tag -a v1.1.2 -m "Release v1.1.2: แก้ไข payment timeout"
git push origin production
git push origin v1.1.2

# 9. Merge production เข้า main (เพื่อให้ bug ใน main ถูกแก้ไข)
git checkout main
git merge --no-ff production
git push origin main

# 10. Deploy production release
git checkout v1.1.2
# ... deploy process ...

# 11. Verify production
# ... monitor logs, metrics ...

# 12. Clean up bugfix branch
git checkout main
git branch -d bugfix/fix-payment-error

# 13. อัพเดท documentation และแจ้งทีม
```

---

## Visual Workflow Diagram

```
main (development)
  │
  ├── pull origin main
  │
  └── pull origin production

production (v1.1.1) - พบ bug!
  │
  ├── checkout production
  │
  ├── checkout -b bugfix/fix-payment-error
  │
  ├── แก้ไข bug
  │   - edit files
  │   - test
  │
  ├── commit -m "fix: ..."
  │
  ├── checkout production
  │
  ├── merge bugfix → production
  │
  ├── tag v1.1.2 (เพิ่มตัวเลขสุดท้าย)
  │   push production + tags
  │
  ├── deploy v1.1.2 to production server
  │
  └── checkout main
      │
      └── merge production → main (ให้ bug fix sync กลับ main)
          push main

Result:
  - production: v1.1.2 (deployed)
  - main: มี bug fix แล้ว
  - bugfix branch: ลบได้

Timeline: 30 minutes - 2 hours
```

---

## Bugfix (Production) vs Regular Bug Fix

| Aspect | Bugfix (Production) | Regular Bug Fix |
|--------|---------------------|-----------------|
| **Urgency** | 🔴 Critical - ภายใน 1-2 ชั่วโมง | ⚠️ Normal - ใน sprint ถัดไป |
| **Scope** | แก้เฉพาะ bug ที่เกิด | อาจรวม refactoring |
| **Testing** | Focus test เฉพาะส่วนที่แก้ | Full regression test |
| **Review** | Fast-track review | Standard review process |
| **Branch** | `bugfix/*` จาก production branch | `bugfix/*` จาก main |
| **Merge Target** | production → main | main only |
| **Version** | Patch version (v1.1.1 → v1.1.2) | รวมใน release ถัดไป |
| **Deploy** | ทันที หลัง merge | ตามปกติ |

---

## Rollback Plan (ถ้า Bugfix มีปัญหา)

```bash
# 1. ตรวจสอบ production tag ก่อนหน้า
git tag -l
# v1.0.0
# v1.1.0
# v1.1.1  <-- stable version
# v1.1.2  <-- มีปัญหา

# 2. Checkout ไปที่ version เก่าที่ stable
git checkout v1.1.1

# 3. Verify ว่าเป็น version ที่ถูกต้อง
git log --oneline -5

# 4. Deploy version เก่ากลับขึ้น production
# ... rollback deployment process ...
# npm run deploy:rollback v1.1.1
# docker run myapp:v1.1.1
# kubectl rollout undo deployment/myapp

# 5. สร้าง revert commit (alternative approach)
git checkout production
git revert HEAD  # revert commit ล่าสุด
git tag -a v1.1.3 -m "Rollback v1.1.2"
git push origin production
git push origin v1.1.3

# 6. Merge rollback กลับเข้า main
git checkout main
git merge --no-ff production
git push origin main

# 7. แจ้งทีม และเตรียม bugfix ใหม่
```

**Rollback Checklist:**
- [ ] ระบุ version ที่ stable (ก่อนหน้า)
- [ ] Deploy version เก่า
- [ ] Verify ว่าทำงานปกติ
- [ ] แจ้งทีมและ stakeholders
- [ ] วิเคราะห์สาเหตุที่ bugfix ล้มเหลว
- [ ] วางแผน bugfix ใหม่

---

## Bugfix Checklist

### ก่อน Deploy:
- [ ] ระบุและทำความเข้าใจ root cause ของ bug
- [ ] แก้ไขตรงจุด ไม่เพิ่มของใหม่
- [ ] ทดสอบใน staging environment
- [ ] ผ่าน unit tests และ integration tests
- [ ] Code review โดยอย่างน้อย 1 คน
- [ ] เตรียม rollback plan
- [ ] แจ้งทีมและ stakeholders
- [ ] Backup database (ถ้าจำเป็น)

### หลัง Deploy:
- [ ] Verify production ทำงานปกติ
- [ ] Monitor logs และ metrics
- [ ] ตรวจสอบ user feedback
- [ ] อัพเดท documentation
- [ ] สร้าง incident report (ถ้าจำเป็น)
- [ ] Merge production กลับ main
- [ ] Clean up bugfix branch
- [ ] Schedule post-mortem meeting (ถ้าจำเป็น)

---

## คำสั่ง Git สำหรับ Bugfix

```bash
# Pull branches
git checkout main && git pull origin main
git pull origin production

# สร้าง bugfix branch จาก production
git checkout production
git checkout -b bugfix/<name>

# Commit bugfix
git commit -m "fix: <description>"

# Merge bugfix เข้า production
git checkout production
git merge --no-ff bugfix/<name>

# Tag production version (เพิ่มตัวเลขสุดท้าย)
git tag -a v<x.y.z> -m "Release v<x.y.z>: <description>"

# Merge production เข้า main
git checkout main
git merge --no-ff production

# Merge แบบ no-fast-forward (เก็บประวัติ)
git merge --no-ff <branch-name>

# Force push tag (ถ้าจำเป็น - ระวัง!)
git push --force origin v<x.y.z>

# Revert bugfix
git checkout production
git revert <commit-hash>

# ดู diff ระหว่าง tags
git diff v1.1.1..v1.1.2

# ดู commits ระหว่าง tags
git log v1.1.1..v1.1.2 --oneline

# ดู diff ระหว่าง branches
git diff main..production
```

---

## Common Bugfix Scenarios

### Scenario 1: Database Migration Error
```bash
# Pull และ checkout production
git checkout main && git pull origin main
git pull origin production
git checkout production

# สร้าง bugfix branch
git checkout -b bugfix/fix-db-migration

# แก้ไข migration script
git add migrations/
git commit -m "fix: แก้ไข database migration error"

# Merge เข้า production
git checkout production
git merge --no-ff bugfix/fix-db-migration

# Tag และ deploy
git tag -a v1.1.2 -m "Release v1.1.2: fix db migration"
git push origin production v1.1.2

# Merge กลับ main
git checkout main
git merge --no-ff production
git push origin main
```

### Scenario 2: API Breaking Change
```bash
git checkout main && git pull origin main
git pull origin production && git checkout production
git checkout -b bugfix/fix-api-compatibility

# Restore API compatibility
git add api/
git commit -m "fix: restore API backward compatibility"

git checkout production
git merge --no-ff bugfix/fix-api-compatibility
git tag -a v1.1.2 -m "Release v1.1.2: fix API compatibility"
git push origin production v1.1.2

git checkout main
git merge --no-ff production
git push origin main
```

### Scenario 3: Security Vulnerability
```bash
git checkout main && git pull origin main
git pull origin production && git checkout production
git checkout -b bugfix/security-patch

# Apply security patch
git add .
git commit -m "fix: fix SQL injection vulnerability (CVE-2025-XXXX)"

git checkout production
git merge --no-ff bugfix/security-patch
git tag -a v1.1.2 -m "Release v1.1.2: security patch"
git push origin production v1.1.2

# Immediate deploy
git checkout v1.1.2
# ... urgent deploy ...

# Merge กลับ main
git checkout main
git merge --no-ff production
git push origin main
```

---

## Best Practices สำหรับ Bugfix

1. **ความเร็ว vs คุณภาพ**: รวดเร็วแต่ไม่ลด quality
2. **แก้เฉพาะที่จำเป็น**: อย่าเพิ่ม feature หรือ refactor
3. **ทดสอบให้ครบ**: แม้เร่งรีบก็ต้อง test
4. **Documentation**: บันทึกทุกอย่างสำหรับ post-mortem
5. **Communication**: แจ้งทีมและ stakeholders
6. **Rollback Ready**: เตรียมแผน rollback ไว้เสมอ
7. **Monitor Closely**: ดู production อย่างใกล้ชิดหลัง deploy
8. **Post-Mortem**: วิเคราะห์ว่าทำไมถึงเกิด และป้องกันอนาคต
9. **Sync กลับ Main**: Merge production กลับ main ทุกครั้ง
10. **Version Control**: ใช้ semantic versioning อย่างถูกต้อง

---

## Post-Mortem Template

```markdown
# Incident Post-Mortem: Payment Gateway Timeout

## Incident Summary
- **Date**: November 13, 2025
- **Duration**: 2 hours 15 minutes
- **Severity**: Critical
- **Impact**: ~500 users ไม่สามารถชำระเงินได้

## Timeline
- 12:00 - ผู้ใช้รายงานปัญหา payment
- 12:15 - ทีม dev ยืนยันปัญหา
- 12:30 - เริ่มทำ bugfix
- 13:00 - Deploy bugfix v1.1.2
- 14:15 - ยืนยัน issue แก้ไขสำเร็จ

## Root Cause
- Payment API provider เปลี่ยน timeout policy
- Application timeout (5s) ต่ำกว่า API timeout (10s)

## Solution
- เพิ่ม timeout เป็น 15s
- เพิ่ม retry mechanism
- Improve error logging

## Lessons Learned
- ควรมี monitoring สำหรับ payment success rate
- ควรมี health check กับ external APIs
- ควรมี alert เมื่อ error rate เพิ่มขึ้น

## Action Items
- [ ] เพิ่ม monitoring dashboard
- [ ] Setup alerts สำหรับ critical metrics
- [ ] Review timeout ของ APIs อื่น ๆ
- [ ] เพิ่ม integration tests กับ payment gateway

## Prevention
- Implement better monitoring
- Regular health checks
- Better communication กับ API providers
```

---

## เครื่องมือที่ช่วยในการทำ Bugfix

### Monitoring & Alerting
- **Sentry / New Relic**: Error tracking
- **Datadog / Grafana**: Metrics และ logs
- **PagerDuty / Opsgenie**: Alert และ incident management

### CI/CD
- **GitHub Actions**: Automated testing
- **Jenkins / GitLab CI**: Build และ deploy
- **ArgoCD / Flux**: GitOps deployment

### Communication
- **Slack / Teams**: ทีม communication
- **Jira / Linear**: Issue tracking
- **Confluence / Notion**: Documentation

---

## Emergency Contacts

```markdown
# Bugfix Emergency Contacts

## On-Call Engineers
- Primary: [Name] - [Phone] - [Slack]
- Secondary: [Name] - [Phone] - [Slack]

## DevOps Team
- Lead: [Name] - [Contact]

## Product Owner
- Name: [Name] - [Contact]

## Escalation Path
1. On-Call Engineer
2. Team Lead
3. Engineering Manager
4. CTO
```

---

**สร้างโดย:** Git Workshop - DevOps Course  
**Version:** 1.0.0  
**Last Updated:** November 13, 2025  
**Related:**
- [GIT_WORKFLOW_ADD_FEATURE.md](./GIT_WORKFLOW_ADD_FEATURE.md)
- [GIT_WORKFLOW_HOTFIX.md](./GIT_WORKFLOW_HOTFIX.md)

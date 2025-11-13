# Git Naming Summary Tables

## 1. ประเภท type ที่ใช้ร่วมกัน

| type | ใช้เมื่อ | ตัวอย่าง |
|------|----------|----------|
| feat | เพิ่มฟีเจอร์ใหม่ | feat/auth-add-login |
| fix | แก้บั๊ก | fix/api-timezone |
| refactor | ปรับโครงสร้างโค้ด | refactor/user-service |
| chore | งานระบบ config/dependency | chore/update-eslint |
| docs | เอกสาร | docs/api-spec |
| style | formatting ไม่มีผลโค้ด | style/format-code |
| test | เพิ่ม/แก้ test | test/login-service |
| perf | ปรับประสิทธิภาพ | perf/cache-optimization |
| build | ระบบ build เช่น Docker | build/optimize-dockerfile |
| ci | workflow CI/CD | ci/update-github-actions |
| hotfix | แก้ด่วน production | hotfix/payment-error |
| revert | ย้อน commit ก่อนหน้า | revert/incorrect-change |

## 2. Branch Naming

| องค์ประกอบ | รูปแบบ | ตัวอย่าง |
|------------|--------|----------|
| โครงสร้าง | `<type>/<scope>-<description>` | feat/auth-add-otp |
| scope | module/service | auth, dashboard |
| description | ย่อ ใช้ dash | add-otp |

## 3. Tags (SemVer)

| ประเภท | รูปแบบ | ตัวอย่าง |
|--------|--------|----------|
| Release | v<major>.<minor>.<patch> | v1.4.2 |
| Pre-release | v<version>-alpha.x | v2.0.0-alpha.1 |
| RC | v<version>-rc.x | v2.0.0-rc.3 |

## 4. Commit Message

| ส่วน | อธิบาย | ตัวอย่าง |
|------|--------|----------|
| โครงสร้าง | `<type>(scope): summary` | feat(auth): add otp |
| body | รายละเอียดเพิ่มเติม | optional |
| footer | issue mapping | Closes #221 |

## 5. Pull Request

| รูปแบบ | ตัวอย่าง |
|--------|----------|
| [type]: summary | feat: add otp verification |

## 6. Release Branch

| รูปแบบ | ตัวอย่าง |
|--------|----------|
| release/<version> | release/v1.4.0 |
| release/<period> | release/2025.03 |
| release/<sprint> | release/sprint-32 |

## 7. Environment Branch

| Environment | ชื่อ |
|------------|------|
| Development | dev |
| Staging | staging |
| UAT | uat |
| Production | production |

## 8. ตารางเลือก type แบบเร็ว

| สิ่งที่ทำ | type |
|-----------|------|
| เพิ่มฟีเจอร์ | feat |
| แก้บั๊ก | fix |
| ปรับโครงสร้าง | refactor |
| เอกสาร | docs |
| formatting | style |
| เพิ่ม test | test |
| ปรับ performance | perf |
| config/dependency | chore |
| build system | build |
| CI/CD | ci |
| แก้ด่วน | hotfix |
| ย้อน commit | revert |

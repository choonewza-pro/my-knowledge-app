# Linux Commands Reference

## BASIC LINUX COMMANDS

### chmod
user : group : other

**รูปแบบการใช้งาน:**
```bash
chmod [options] [permissions] [file/directory]
```

**Options ที่ใช้บ่อย:**
- `-R` (Recursive) - เปลี่ยน permission ทุกไฟล์และโฟลเดอร์ภายในแบบเรียกซ้ำ
- `-v` (Verbose) - แสดงรายละเอียดการเปลี่ยนแปลง
- `-c` (Changes) - แสดงเฉพาะไฟล์ที่มีการเปลี่ยนแปลงจริง
- `-f` (Force) - ไม่แสดง error message

**ความหมายของตัวเลข:**
- 4: read (อ่าน)
- 2: write (เขียน)
- 1: execute (รันโปรแกรม)
- 0: no permission (ไม่มีสิทธิ์)

**ตัวอย่างการใช้งาน:**
- `chmod 777` - ทำได้หมดในทุกๆ ตำแหน่ง (user, group, other สามารถอ่าน เขียน และรันได้)
- `chmod 755` - user:ทำได้หมด, group:อ่านและรันได้, other:อ่านและรันได้
- `chmod 754` - user:ทำได้หมด, group:อ่านและรันได้, other:อ่านได้อย่างเดียว
- `chmod 700` - user:ทำได้หมด, group:ไม่มีสิทธิ์, other:ไม่มีสิทธิ์
- `chmod 711` - user:ทำได้หมด, group:รันได้อย่างเดียว, other:รันได้อย่างเดียว

---

### cp (Copy)
**รูปแบบการใช้งาน:**
```bash
cp [options] source destination
```

**Options ที่ใช้บ่อย:**
- `-r` หรือ `-R` (Recursive) - คัดลอกโฟลเดอร์และไฟล์ภายในทั้งหมด
- `-v` (Verbose) - แสดงรายละเอียดการคัดลอก
- `-i` (Interactive) - ถามก่อนเขียนทับไฟล์
- `-f` (Force) - บังคับเขียนทับโดยไม่ถาม
- `-p` (Preserve) - รักษา attributes เดิม (permission, timestamp)
- `-u` (Update) - คัดลอกเฉพาะไฟล์ที่ใหม่กว่า

**ตัวอย่างการใช้งาน:**
```bash
cp file1.txt file2.txt              # คัดลอกไฟล์
cp -r folder1/ folder2/             # คัดลอกโฟลเดอร์
cp -v *.txt backup/                 # คัดลอกไฟล์ .txt ทั้งหมดพร้อมแสดงรายละเอียด
```

---

### mv (Move/Rename)
**รูปแบบการใช้งาน:**
```bash
mv [options] source destination
```

**Options ที่ใช้บ่อย:**
- `-v` (Verbose) - แสดงรายละเอียดการย้าย
- `-i` (Interactive) - ถามก่อนเขียนทับไฟล์
- `-f` (Force) - บังคับเขียนทับโดยไม่ถาม
- `-u` (Update) - ย้ายเฉพาะไฟล์ที่ใหม่กว่า
- `-n` (No clobber) - ไม่เขียนทับไฟล์ที่มีอยู่แล้ว

**ตัวอย่างการใช้งาน:**
```bash
mv file1.txt file2.txt              # เปลี่ยนชื่อไฟล์
mv file.txt /path/to/directory/     # ย้ายไฟล์ไปยังโฟลเดอร์อื่น
mv -v *.log logs/                   # ย้ายไฟล์ .log ทั้งหมด
```

---

### rm (Remove)
**รูปแบบการใช้งาน:**
```bash
rm [options] file/directory
```

**Options ที่ใช้บ่อย:**
- `-r` หรือ `-R` (Recursive) - ลบโฟลเดอร์และไฟล์ภายในทั้งหมด
- `-f` (Force) - บังคับลบโดยไม่ถาม
- `-i` (Interactive) - ถามก่อนลบแต่ละไฟล์
- `-v` (Verbose) - แสดงรายละเอียดการลบ
- `-d` (Directory) - ลบโฟลเดอร์เปล่า

**ตัวอย่างการใช้งาน:**
```bash
rm file.txt                         # ลบไฟล์
rm -r folder/                       # ลบโฟลเดอร์และไฟล์ภายใน
rm -rf temp/                        # ลบบังคับโดยไม่ถาม (ระวัง!)
rm -i *.log                         # ลบไฟล์ .log พร้อมถามยืนยัน
```

**⚠️ คำเตือน:** คำสั่ง `rm -rf` จะลบทุกอย่างโดยไม่ถามยืนยัน ใช้ด้วยความระมัดระวัง!

---

### mkdir (Make Directory)
**รูปแบบการใช้งาน:**
```bash
mkdir [options] directory_name
```

**Options ที่ใช้บ่อย:**
- `-p` (Parents) - สร้างโฟลเดอร์หลายชั้นพร้อมกัน
- `-v` (Verbose) - แสดงรายละเอียดการสร้าง
- `-m` (Mode) - กำหนด permission ตั้งแต่สร้าง

**ตัวอย่างการใช้งาน:**
```bash
mkdir newfolder                     # สร้างโฟลเดอร์
mkdir -p path/to/nested/folder      # สร้างโฟลเดอร์หลายชั้น
mkdir -m 755 public_folder          # สร้างโฟลเดอร์พร้อมกำหนด permission
```

---

### ls (List)
**รูปแบบการใช้งาน:**
```bash
ls [options] [path]
```

**Options ที่ใช้บ่อย:**
- `-l` (Long) - แสดงรายละเอียดแบบเต็ม
- `-a` (All) - แสดงไฟล์ซ่อน (ขึ้นต้นด้วย .)
- `-h` (Human-readable) - แสดงขนาดไฟล์แบบอ่านง่าย (KB, MB, GB)
- `-R` (Recursive) - แสดงไฟล์ในโฟลเดอร์ย่อยทั้งหมด
- `-t` (Time) - เรียงตามเวลาแก้ไข (ใหม่สุดก่อน)
- `-S` (Size) - เรียงตามขนาดไฟล์ (ใหญ่สุดก่อน)

**ตัวอย่างการใช้งาน:**
```bash
ls                                  # แสดงรายการไฟล์
ls -la                              # แสดงรายละเอียดพร้อมไฟล์ซ่อน
ls -lh                              # แสดงรายละเอียดพร้อมขนาดแบบอ่านง่าย
ls -lt                              # เรียงตามเวลาแก้ไข
```

---

### cat (Concatenate)
**รูปแบบการใช้งาน:**
```bash
cat [options] file
```

**Options ที่ใช้บ่อย:**
- `-n` (Number) - แสดงเลขบรรทัด
- `-b` (Number nonblank) - แสดงเลขบรรทัดเฉพาะบรรทัดที่มีข้อความ
- `-v` (Show nonprinting) - แสดง non-printing characters
- `-E` (Show ends) - แสดง $ ที่ท้ายบรรทัด

**ตัวอย่างการใช้งาน:**
```bash
cat file.txt                        # แสดงเนื้อหาไฟล์
cat file1.txt file2.txt             # แสดงหลายไฟล์ต่อกัน
cat -n file.txt                     # แสดงพร้อมเลขบรรทัด
cat file1.txt > file2.txt           # คัดลอกเนื้อหา (overwrite)
cat file1.txt >> file2.txt          # เพิ่มเนื้อหาต่อท้าย (append)
```

---

### touch
**รูปแบบการใช้งาน:**
```bash
touch [options] filename
```

**การใช้งาน:**
- สร้างไฟล์เปล่า
- อัพเดท timestamp ของไฟล์ที่มีอยู่แล้ว

**ตัวอย่างการใช้งาน:**
```bash
touch newfile.txt                   # สร้างไฟล์ใหม่
touch file1.txt file2.txt file3.txt # สร้างหลายไฟล์พร้อมกัน
```

---

### pwd (Print Working Directory)
**รูปแบบการใช้งาน:**
```bash
pwd
```

**การใช้งาน:**
- แสดง path ของโฟลเดอร์ปัจจุบันที่อยู่

**ตัวอย่างการใช้งาน:**
```bash
pwd                                 # แสดง /home/user/documents
```

---

### top (Task Manager)
**รูปแบบการใช้งาน:**
```bash
top [options]
```

**การใช้งาน:**
- แสดงกระบวนการ (processes) ที่กำลังทำงานแบบ real-time
- แสดงข้อมูล CPU, Memory, และ resource usage

**Options ที่ใช้บ่อย:**
- `-d` (Delay) - กำหนดเวลาอัพเดท (วินาที)
- `-u` (User) - แสดงเฉพาะ process ของ user ที่กำหนด
- `-p` (PID) - แสดงเฉพาะ process ID ที่กำหนด
- `-n` (Number) - กำหนดจำนวนครั้งที่อัพเดทแล้วออก

**คำสั่งภายใน top:**
- `q` - ออกจากโปรแกรม top
- `k` - kill process (ต้องใส่ PID)
- `h` - แสดงความช่วยเหลือ
- `P` - เรียงตาม CPU usage
- `M` - เรียงตาม Memory usage
- `1` - แสดง CPU แต่ละ core
- `u` - กรอง process ตาม username

**วิธีออกจาก top:**
- กด `q` หรือ `Ctrl + C`

**ตัวอย่างการใช้งาน:**
```bash
top                                 # เปิด top แบบปกติ
top -d 5                            # อัพเดททุก 5 วินาที
top -u username                     # แสดงเฉพาะ process ของ user
top -n 3                            # อัพเดท 3 ครั้งแล้วออก
```
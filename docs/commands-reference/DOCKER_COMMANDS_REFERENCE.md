# Docker Commands Reference

## BASIC DOCKER COMMANDS

### docker run
**รูปแบบการใช้งาน:**
```bash
docker run [options] <image> [command] [args]
```

**การใช้งาน:**
- สร้างและรัน container ใหม่จาก image

**Options ที่ใช้บ่อย:**
- `-d` (Detach) - รัน container ใน background
- `-it` (Interactive + TTY) - รันแบบ interactive mode
- `-p` (Publish) - map port (host:container)
- `-v` (Volume) - mount volume (host:container)
- `-e` (Environment) - ตั้งค่า environment variable
- `--name` - ตั้งชื่อ container
- `--rm` - ลบ container อัตโนมัติเมื่อหยุด
- `-w` (Workdir) - กำหนด working directory
- `--network` - เชื่อมต่อกับ network
- `--restart` - กำหนดนโยบายการ restart

**ตัวอย่างการใช้งาน:**
```bash
docker run hello-world                           # รันทดสอบ
docker run -d nginx                              # รัน nginx ใน background
docker run -it ubuntu bash                       # รัน Ubuntu แบบ interactive
docker run -d -p 8080:80 nginx                   # map port 8080 -> 80
docker run -d -p 8080:80 --name web nginx        # ตั้งชื่อ container
docker run -d -v /host/path:/container/path nginx # mount volume
docker run -d -e MYSQL_ROOT_PASSWORD=secret mysql # ตั้งค่า env variable
docker run -d --rm --name temp nginx             # ลบอัตโนมัติเมื่อหยุด
docker run -d --restart always nginx             # restart อัตโนมัติ
docker run -d --network mynet nginx              # ใช้ custom network
```

---

### docker ps
**รูปแบบการใช้งาน:**
```bash
docker ps [options]
```

**การใช้งาน:**
- แสดงรายการ containers ที่กำลังรัน

**Options ที่ใช้บ่อย:**
- `-a` (All) - แสดงทุก containers (รวมที่หยุดแล้ว)
- `-q` (Quiet) - แสดงเฉพาะ container ID
- `-s` (Size) - แสดงขนาดไฟล์
- `-f` (Filter) - กรองตามเงื่อนไข
- `--format` - กำหนดรูปแบบการแสดงผล

**ตัวอย่างการใช้งาน:**
```bash
docker ps                                        # แสดง containers ที่รันอยู่
docker ps -a                                     # แสดงทุก containers
docker ps -q                                     # แสดงเฉพาะ IDs
docker ps -a -f "status=exited"                  # แสดง containers ที่หยุดแล้ว
docker ps -a -f "name=web"                       # กรองตามชื่อ
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"  # custom format
```

---

### docker images
**รูปแบบการใช้งาน:**
```bash
docker images [options] [repository[:tag]]
```

**การใช้งาน:**
- แสดงรายการ images ที่มีในเครื่อง

**Options ที่ใช้บ่อย:**
- `-a` (All) - แสดงทุก images (รวม intermediate)
- `-q` (Quiet) - แสดงเฉพาะ image ID
- `-f` (Filter) - กรองตามเงื่อนไข
- `--digests` - แสดง digest
- `--format` - กำหนดรูปแบบการแสดงผล

**ตัวอย่างการใช้งาน:**
```bash
docker images                                    # แสดง images ทั้งหมด
docker images -a                                 # แสดงทุก images
docker images -q                                 # แสดงเฉพาะ IDs
docker images nginx                              # แสดงเฉพาะ nginx images
docker images -f "dangling=true"                 # แสดง dangling images
```

---

### docker pull
**รูปแบบการใช้งาน:**
```bash
docker pull [options] <image>[:tag]
```

**การใช้งาน:**
- ดาวน์โหลด image จาก registry (Docker Hub)

**Options ที่ใช้บ่อย:**
- `-a` (All tags) - ดาวน์โหลดทุก tags
- `--platform` - ระบุ platform (linux/amd64, linux/arm64)

**ตัวอย่างการใช้งาน:**
```bash
docker pull ubuntu                               # pull ubuntu:latest
docker pull ubuntu:20.04                         # pull tag เฉพาะ
docker pull nginx:alpine                         # pull nginx alpine version
docker pull mysql:8.0                            # pull MySQL version 8.0
docker pull --platform linux/amd64 nginx         # pull สำหรับ platform เฉพาะ
```

---

### docker push
**รูปแบบการใช้งาน:**
```bash
docker push [options] <image>[:tag]
```

**การใช้งาน:**
- อัพโหลด image ไปยัง registry

**ตัวอย่างการใช้งาน:**
```bash
docker push username/myimage:latest              # push image
docker push myregistry.com/myimage:v1.0          # push ไปยัง private registry
```

**💡 หมายเหตุ:** ต้อง login ด้วย `docker login` ก่อน

---

### docker build
**รูปแบบการใช้งาน:**
```bash
docker build [options] <path>
```

**การใช้งาน:**
- สร้าง image จาก Dockerfile

**Options ที่ใช้บ่อย:**
- `-t` (Tag) - ตั้งชื่อและ tag ให้ image
- `-f` (File) - ระบุชื่อ Dockerfile
- `--build-arg` - ส่ง build arguments
- `--no-cache` - build โดยไม่ใช้ cache
- `--target` - build ถึง stage ที่กำหนด (multi-stage)
- `--platform` - กำหนด target platform

**ตัวอย่างการใช้งาน:**
```bash
docker build .                                   # build จาก Dockerfile ปัจจุบัน
docker build -t myapp:latest .                   # build พร้อมตั้งชื่อ
docker build -t myapp:v1.0 -f Dockerfile.prod .  # ระบุ Dockerfile
docker build --no-cache -t myapp .               # build ใหม่ทั้งหมด
docker build --build-arg VERSION=1.0 -t myapp .  # ส่ง build argument
docker build --target production -t myapp .      # build ถึง stage ที่กำหนด
```

---

### docker stop
**รูปแบบการใช้งาน:**
```bash
docker stop [options] <container> [container...]
```

**การใช้งาน:**
- หยุด container ที่กำลังรัน (graceful shutdown)

**Options ที่ใช้บ่อย:**
- `-t` (Time) - รอก่อน force kill (default: 10 วินาที)

**ตัวอย่างการใช้งาน:**
```bash
docker stop mycontainer                          # หยุด container
docker stop container1 container2                # หยุดหลาย containers
docker stop $(docker ps -q)                      # หยุดทุก containers ที่รันอยู่
docker stop -t 30 mycontainer                    # รอ 30 วินาทีก่อน kill
```

---

### docker start
**รูปแบบการใช้งาน:**
```bash
docker start [options] <container> [container...]
```

**การใช้งาน:**
- เริ่ม container ที่หยุดไว้

**Options ที่ใช้บ่อย:**
- `-a` (Attach) - attach STDOUT/STDERR
- `-i` (Interactive) - attach STDIN

**ตัวอย่างการใช้งาน:**
```bash
docker start mycontainer                         # เริ่ม container
docker start container1 container2               # เริ่มหลาย containers
docker start -ai mycontainer                     # เริ่มและ attach
```

---

### docker restart
**รูปแบบการใช้งาน:**
```bash
docker restart [options] <container> [container...]
```

**การใช้งาน:**
- restart container (stop แล้ว start ใหม่)

**Options ที่ใช้บ่อย:**
- `-t` (Time) - รอก่อน kill (default: 10 วินาที)

**ตัวอย่างการใช้งาน:**
```bash
docker restart mycontainer                       # restart container
docker restart -t 30 mycontainer                 # restart โดยรอ 30 วินาที
```

---

### docker rm
**รูปแบบการใช้งาน:**
```bash
docker rm [options] <container> [container...]
```

**การใช้งาน:**
- ลบ container ที่หยุดแล้ว

**Options ที่ใช้บ่อย:**
- `-f` (Force) - force ลบแม้กำลังรันอยู่
- `-v` (Volumes) - ลบ volumes ที่เกี่ยวข้อง

**ตัวอย่างการใช้งาน:**
```bash
docker rm mycontainer                            # ลบ container
docker rm -f mycontainer                         # force ลบ
docker rm $(docker ps -aq)                       # ลบทุก containers
docker rm $(docker ps -aq -f "status=exited")    # ลบ containers ที่หยุดแล้ว
```

**⚠️ คำเตือน:** การลบ container จะลบถาวร ข้อมูลใน container จะหาย

---

### docker rmi
**รูปแบบการใช้งาน:**
```bash
docker rmi [options] <image> [image...]
```

**การใช้งาน:**
- ลบ image

**Options ที่ใช้บ่อย:**
- `-f` (Force) - force ลบ
- `--no-prune` - ไม่ลบ untagged parent images

**ตัวอย่างการใช้งาน:**
```bash
docker rmi myimage:latest                        # ลบ image
docker rmi -f myimage                            # force ลบ
docker rmi $(docker images -q)                   # ลบทุก images
docker rmi $(docker images -f "dangling=true" -q) # ลบ dangling images
```

---

### docker logs
**รูปแบบการใช้งาน:**
```bash
docker logs [options] <container>
```

**การใช้งาน:**
- แสดง logs ของ container

**Options ที่ใช้บ่อย:**
- `-f` (Follow) - แสดง logs แบบ real-time
- `--tail` - แสดงจำนวนบรรทัดล่าสุด
- `-t` (Timestamps) - แสดง timestamps
- `--since` - แสดง logs ตั้งแต่เวลาที่กำหนด
- `--until` - แสดง logs จนถึงเวลาที่กำหนด

**ตัวอย่างการใช้งาน:**
```bash
docker logs mycontainer                          # แสดง logs
docker logs -f mycontainer                       # ดู logs แบบ real-time
docker logs --tail 100 mycontainer               # แสดง 100 บรรทัดล่าสุด
docker logs -t mycontainer                       # แสดงพร้อม timestamps
docker logs --since 1h mycontainer               # แสดง logs 1 ชั่วโมงล่าสุด
docker logs --since "2024-01-01" mycontainer     # แสดง logs ตั้งแต่วันที่
```

---

### docker exec
**รูปแบบการใช้งาน:**
```bash
docker exec [options] <container> <command> [args]
```

**การใช้งาน:**
- รันคำสั่งใน container ที่กำลังรัน

**Options ที่ใช้บ่อย:**
- `-it` (Interactive + TTY) - รันแบบ interactive
- `-d` (Detach) - รัน background
- `-u` (User) - ระบุ user ที่จะรัน
- `-w` (Workdir) - กำหนด working directory
- `-e` (Environment) - ตั้งค่า environment variable

**ตัวอย่างการใช้งาน:**
```bash
docker exec mycontainer ls /app                  # รันคำสั่ง ls
docker exec -it mycontainer bash                 # เข้า shell แบบ interactive
docker exec -it mycontainer sh                   # เข้า sh (สำหรับ alpine)
docker exec -u root mycontainer whoami           # รันในฐานะ root
docker exec -w /app mycontainer pwd              # รันใน working directory
docker exec -e VAR=value mycontainer env         # ตั้งค่า environment variable
```

---

### docker inspect
**รูปแบบการใช้งาน:**
```bash
docker inspect [options] <container|image> [...]
```

**การใช้งาน:**
- แสดงข้อมูลรายละเอียดของ container หรือ image (JSON format)

**Options ที่ใช้บ่อย:**
- `-f` (Format) - ใช้ Go template เพื่อแสดงข้อมูลเฉพาะ
- `--type` - ระบุประเภท (container, image, network, volume)

**ตัวอย่างการใช้งาน:**
```bash
docker inspect mycontainer                       # แสดงข้อมูล container
docker inspect myimage                           # แสดงข้อมูล image
docker inspect -f '{{.State.Status}}' mycontainer # แสดง status
docker inspect -f '{{.NetworkSettings.IPAddress}}' mycontainer # แสดง IP
docker inspect -f '{{json .Config.Env}}' mycontainer # แสดง env variables
```

---

### docker cp
**รูปแบบการใช้งาน:**
```bash
docker cp [options] <container>:<src_path> <dest_path>
docker cp [options] <src_path> <container>:<dest_path>
```

**การใช้งาน:**
- คัดลอกไฟล์/โฟลเดอร์ระหว่าง container และ host

**Options ที่ใช้บ่อย:**
- `-L` (Follow link) - ทำตาม symbolic links

**ตัวอย่างการใช้งาน:**
```bash
docker cp mycontainer:/app/file.txt .            # คัดลอกจาก container
docker cp ./file.txt mycontainer:/app/           # คัดลอกไปยัง container
docker cp mycontainer:/app/logs ./logs           # คัดลอกโฟลเดอร์
```

---

### docker stats
**รูปแบบการใช้งาน:**
```bash
docker stats [options] [container...]
```

**การใช้งาน:**
- แสดง resource usage ของ containers แบบ real-time

**Options ที่ใช้บ่อย:**
- `-a` (All) - แสดงทุก containers
- `--no-stream` - แสดงเพียงครั้งเดียว
- `--format` - กำหนดรูปแบบการแสดงผล

**ตัวอย่างการใช้งาน:**
```bash
docker stats                                     # แสดง stats ทุก running containers
docker stats mycontainer                         # แสดง stats container เดียว
docker stats -a                                  # แสดงทุก containers
docker stats --no-stream                         # แสดงครั้งเดียวแล้วออก
```

**💡 หมายเหตุ:** กด `Ctrl + C` เพื่อออก

---

### docker top
**รูปแบบการใช้งาน:**
```bash
docker top <container> [ps options]
```

**การใช้งาน:**
- แสดง processes ที่กำลังรันใน container

**ตัวอย่างการใช้งาน:**
```bash
docker top mycontainer                           # แสดง processes
docker top mycontainer aux                       # แสดงแบบละเอียด
```

---

### docker attach
**รูปแบบการใช้งาน:**
```bash
docker attach [options] <container>
```

**การใช้งาน:**
- attach ไปยัง container ที่กำลังรัน (STDIN/STDOUT/STDERR)

**Options ที่ใช้บ่อย:**
- `--no-stdin` - ไม่ attach STDIN
- `--sig-proxy` - proxy signals (default: true)

**ตัวอย่างการใช้งาน:**
```bash
docker attach mycontainer                        # attach ไปยัง container
```

**💡 หมายเหตุ:** 
- กด `Ctrl + P, Ctrl + Q` เพื่อ detach โดยไม่หยุด container
- กด `Ctrl + C` จะส่ง signal ไปยัง container (อาจทำให้หยุด)

---

## NETWORK COMMANDS

### docker network ls
**รูปแบบการใช้งาน:**
```bash
docker network ls [options]
```

**การใช้งาน:**
- แสดงรายการ networks

**ตัวอย่างการใช้งาน:**
```bash
docker network ls                                # แสดง networks ทั้งหมด
docker network ls -f "driver=bridge"             # กรองตาม driver
```

---

### docker network create
**รูปแบบการใช้งาน:**
```bash
docker network create [options] <network-name>
```

**การใช้งาน:**
- สร้าง network ใหม่

**Options ที่ใช้บ่อย:**
- `-d` (Driver) - กำหนด network driver (bridge, overlay, host)
- `--subnet` - กำหนด subnet
- `--gateway` - กำหนด gateway

**ตัวอย่างการใช้งาน:**
```bash
docker network create mynetwork                  # สร้าง bridge network
docker network create -d bridge mybridge         # สร้างโดยระบุ driver
docker network create --subnet=172.20.0.0/16 mynet # กำหนด subnet
```

---

### docker network connect
**รูปแบบการใช้งาน:**
```bash
docker network connect [options] <network> <container>
```

**การใช้งาน:**
- เชื่อมต่อ container เข้ากับ network

**ตัวอย่างการใช้งาน:**
```bash
docker network connect mynetwork mycontainer     # เชื่อมต่อ container
```

---

### docker network disconnect
**รูปแบบการใช้งาน:**
```bash
docker network disconnect [options] <network> <container>
```

**การใช้งาน:**
- ตัดการเชื่อมต่อ container จาก network

**ตัวอย่างการใช้งาน:**
```bash
docker network disconnect mynetwork mycontainer  # ตัดการเชื่อมต่อ
```

---

### docker network rm
**รูปแบบการใช้งาน:**
```bash
docker network rm <network> [network...]
```

**การใช้งาน:**
- ลบ network

**ตัวอย่างการใช้งาน:**
```bash
docker network rm mynetwork                      # ลบ network
```

---

### docker network inspect
**รูปแบบการใช้งาน:**
```bash
docker network inspect <network> [network...]
```

**การใช้งาน:**
- แสดงข้อมูลรายละเอียดของ network

**ตัวอย่างการใช้งาน:**
```bash
docker network inspect mynetwork                 # แสดงข้อมูล network
```

---

## VOLUME COMMANDS

### docker volume ls
**รูปแบบการใช้งาน:**
```bash
docker volume ls [options]
```

**การใช้งาน:**
- แสดงรายการ volumes

**ตัวอย่างการใช้งาน:**
```bash
docker volume ls                                 # แสดง volumes ทั้งหมด
docker volume ls -f "dangling=true"              # แสดง dangling volumes
```

---

### docker volume create
**รูปแบบการใช้งาน:**
```bash
docker volume create [options] [volume-name]
```

**การใช้งาน:**
- สร้าง volume ใหม่

**Options ที่ใช้บ่อย:**
- `-d` (Driver) - กำหนด volume driver
- `--label` - ตั้งค่า labels

**ตัวอย่างการใช้งาน:**
```bash
docker volume create myvolume                    # สร้าง volume
docker volume create --label env=prod myvolume   # สร้างพร้อม label
```

---

### docker volume rm
**รูปแบบการใช้งาน:**
```bash
docker volume rm <volume> [volume...]
```

**การใช้งาน:**
- ลบ volume

**ตัวอย่างการใช้งาน:**
```bash
docker volume rm myvolume                        # ลบ volume
```

---

### docker volume inspect
**รูปแบบการใช้งาน:**
```bash
docker volume inspect <volume> [volume...]
```

**การใช้งาน:**
- แสดงข้อมูลรายละเอียดของ volume

**ตัวอย่างการใช้งาน:**
```bash
docker volume inspect myvolume                   # แสดงข้อมูล volume
```

---

### docker volume prune
**รูปแบบการใช้งาน:**
```bash
docker volume prune [options]
```

**การใช้งาน:**
- ลบ volumes ที่ไม่ได้ใช้งาน (dangling)

**Options ที่ใช้บ่อย:**
- `-f` (Force) - ไม่ถามยืนยัน

**ตัวอย่างการใช้งาน:**
```bash
docker volume prune                              # ลบ unused volumes
docker volume prune -f                           # ลบโดยไม่ถาม
```

---

## SYSTEM COMMANDS

### docker system df
**รูปแบบการใช้งาน:**
```bash
docker system df [options]
```

**การใช้งาน:**
- แสดงการใช้ disk space ของ Docker

**Options ที่ใช้บ่อย:**
- `-v` (Verbose) - แสดงรายละเอียด

**ตัวอย่างการใช้งาน:**
```bash
docker system df                                 # แสดงการใช้ disk
docker system df -v                              # แสดงรายละเอียด
```

---

### docker system prune
**รูปแบบการใช้งาน:**
```bash
docker system prune [options]
```

**การใช้งาน:**
- ลบ unused data (containers, networks, images, build cache)

**Options ที่ใช้บ่อย:**
- `-a` (All) - ลบทุก unused images (ไม่เฉพาะ dangling)
- `-f` (Force) - ไม่ถามยืนยัน
- `--volumes` - ลบ volumes ด้วย

**ตัวอย่างการใช้งาน:**
```bash
docker system prune                              # ลบ unused data
docker system prune -a                           # ลบทุก unused images
docker system prune -af --volumes                # ลบทุกอย่างที่ไม่ใช้
```

**⚠️ คำเตือน:** `docker system prune -a --volumes` จะลบทุกอย่างที่ไม่ได้ใช้ ระวัง!

---

### docker system info
**รูปแบบการใช้งาน:**
```bash
docker system info [options]
docker info [options]
```

**การใช้งาน:**
- แสดงข้อมูลระบบ Docker

**ตัวอย่างการใช้งาน:**
```bash
docker info                                      # แสดงข้อมูลระบบ
docker system info                               # เหมือนกับ docker info
```

---

### docker version
**รูปแบบการใช้งาน:**
```bash
docker version [options]
```

**การใช้งาน:**
- แสดง version ของ Docker Client และ Server

**ตัวอย่างการใช้งาน:**
```bash
docker version                                   # แสดง version
```

---

## REGISTRY & AUTHENTICATION

### docker login
**รูปแบบการใช้งาน:**
```bash
docker login [options] [server]
```

**การใช้งาน:**
- login เข้า Docker registry

**Options ที่ใช้บ่อย:**
- `-u` (Username) - ระบุ username
- `-p` (Password) - ระบุ password (ไม่แนะนำ)
- `--password-stdin` - อ่าน password จาก stdin (ปลอดภัยกว่า)

**ตัวอย่างการใช้งาน:**
```bash
docker login                                     # login Docker Hub
docker login -u username                         # login พร้อม username
echo "mypassword" | docker login -u username --password-stdin # login ปลอดภัย
docker login myregistry.com                      # login private registry
```

---

### docker logout
**รูปแบบการใช้งาน:**
```bash
docker logout [server]
```

**การใช้งาน:**
- logout จาก Docker registry

**ตัวอย่างการใช้งาน:**
```bash
docker logout                                    # logout Docker Hub
docker logout myregistry.com                     # logout private registry
```

---

### docker search
**รูปแบบการใช้งาน:**
```bash
docker search [options] <term>
```

**การใช้งาน:**
- ค้นหา images บน Docker Hub

**Options ที่ใช้บ่อย:**
- `--filter` - กรองผลการค้นหา
- `--limit` - จำกัดจำนวนผลลัพธ์ (default: 25)
- `--format` - กำหนดรูปแบบการแสดงผล

**ตัวอย่างการใช้งาน:**
```bash
docker search nginx                              # ค้นหา nginx
docker search --filter stars=100 nginx           # กรอง stars >= 100
docker search --filter is-official=true nginx    # เฉพาะ official images
docker search --limit 5 nginx                    # จำกัด 5 ผลลัพธ์
```

---

## ADVANCED COMMANDS

### docker commit
**รูปแบบการใช้งาน:**
```bash
docker commit [options] <container> [repository[:tag]]
```

**การใช้งาน:**
- สร้าง image ใหม่จาก container ที่มีการเปลี่ยนแปลง

**Options ที่ใช้บ่อย:**
- `-a` (Author) - ระบุชื่อผู้สร้าง
- `-m` (Message) - ระบุ commit message
- `-c` (Change) - ใช้ Dockerfile instructions

**ตัวอย่างการใช้งาน:**
```bash
docker commit mycontainer mynewimage:v1          # สร้าง image ใหม่
docker commit -m "Add nginx config" mycontainer mynewimage # พร้อม message
docker commit -a "John Doe" mycontainer mynewimage # ระบุผู้สร้าง
```

**💡 หมายเหตุ:** แนะนำใช้ Dockerfile แทน docker commit

---

### docker tag
**รูปแบบการใช้งาน:**
```bash
docker tag <source-image>[:tag] <target-image>[:tag]
```

**การใช้งาน:**
- สร้าง tag ใหม่ให้กับ image

**ตัวอย่างการใช้งาน:**
```bash
docker tag myimage:latest myimage:v1.0           # สร้าง tag ใหม่
docker tag myimage username/myimage:latest       # tag สำหรับ push
docker tag myimage:latest myregistry.com/myimage:latest # tag สำหรับ private registry
```

---

### docker save
**รูปแบบการใช้งาน:**
```bash
docker save [options] <image> [image...]
```

**การใช้งาน:**
- บันทึก image เป็นไฟล์ tar

**Options ที่ใช้บ่อย:**
- `-o` (Output) - ระบุชื่อไฟล์ output

**ตัวอย่างการใช้งาน:**
```bash
docker save -o myimage.tar myimage:latest        # บันทึกเป็นไฟล์ tar
docker save myimage:latest | gzip > myimage.tar.gz # บันทึกและบีบอัด
```

---

### docker load
**รูปแบบการใช้งาน:**
```bash
docker load [options]
```

**การใช้งาน:**
- โหลด image จากไฟล์ tar

**Options ที่ใช้บ่อย:**
- `-i` (Input) - ระบุชื่อไฟล์ input
- `-q` (Quiet) - ไม่แสดง output

**ตัวอย่างการใช้งาน:**
```bash
docker load -i myimage.tar                       # โหลดจากไฟล์
docker load < myimage.tar                        # โหลดจาก stdin
gunzip -c myimage.tar.gz | docker load           # โหลดจากไฟล์บีบอัด
```

---

### docker export
**รูปแบบการใช้งาน:**
```bash
docker export [options] <container>
```

**การใช้งาน:**
- export filesystem ของ container เป็นไฟล์ tar

**Options ที่ใช้บ่อย:**
- `-o` (Output) - ระบุชื่อไฟล์ output

**ตัวอย่างการใช้งาน:**
```bash
docker export -o container.tar mycontainer       # export เป็นไฟล์
docker export mycontainer > container.tar        # export ผ่าน stdout
```

---

### docker import
**รูปแบบการใช้งาน:**
```bash
docker import [options] <file|URL> [repository[:tag]]
```

**การใช้งาน:**
- import filesystem จากไฟล์ tar เป็น image

**ตัวอย่างการใช้งาน:**
```bash
docker import container.tar myimage:latest       # import จากไฟล์
cat container.tar | docker import - myimage:latest # import จาก stdin
```

---

### docker pause
**รูปแบบการใช้งาน:**
```bash
docker pause <container> [container...]
```

**การใช้งาน:**
- หยุด processes ชั่วคราวใน container

**ตัวอย่างการใช้งาน:**
```bash
docker pause mycontainer                         # pause container
```

---

### docker unpause
**รูปแบบการใช้งาน:**
```bash
docker unpause <container> [container...]
```

**การใช้งาน:**
- เริ่ม processes ที่ pause ไว้

**ตัวอย่างการใช้งาน:**
```bash
docker unpause mycontainer                       # unpause container
```

---

### docker rename
**รูปแบบการใช้งาน:**
```bash
docker rename <old-name> <new-name>
```

**การใช้งาน:**
- เปลี่ยนชื่อ container

**ตัวอย่างการใช้งาน:**
```bash
docker rename oldname newname                    # เปลี่ยนชื่อ container
```

---

### docker wait
**รูปแบบการใช้งาน:**
```bash
docker wait <container> [container...]
```

**การใช้งาน:**
- รอจนกว่า container จะหยุด แล้วแสดง exit code

**ตัวอย่างการใช้งาน:**
```bash
docker wait mycontainer                          # รอจน container หยุด
```

---

### docker kill
**รูปแบบการใช้งาน:**
```bash
docker kill [options] <container> [container...]
```

**การใช้งาน:**
- ส่ง signal ไปยัง container (force kill)

**Options ที่ใช้บ่อย:**
- `-s` (Signal) - ระบุ signal (default: SIGKILL)

**ตัวอย่างการใช้งาน:**
```bash
docker kill mycontainer                          # kill container
docker kill -s SIGTERM mycontainer               # ส่ง SIGTERM signal
```

**⚠️ คำเตือน:** `docker kill` จะหยุด container ทันที โดยไม่ graceful shutdown

---

## TIPS & BEST PRACTICES

### การทำความสะอาด Docker
```bash
# ลบ stopped containers
docker rm $(docker ps -aq -f "status=exited")

# ลบ dangling images
docker rmi $(docker images -f "dangling=true" -q)

# ลบทุกอย่างที่ไม่ได้ใช้
docker system prune -a --volumes

# ดู disk usage
docker system df -v
```

---

### การ Debug Containers
```bash
# ดู logs
docker logs -f --tail 100 mycontainer

# เข้าไปใน container
docker exec -it mycontainer bash

# ดู processes ใน container
docker top mycontainer

# ดู resource usage
docker stats mycontainer

# ดูข้อมูลรายละเอียด
docker inspect mycontainer
```

---

### การจัดการ Resources
```bash
# จำกัด memory
docker run -m 512m myimage

# จำกัด CPU
docker run --cpus=".5" myimage

# จำกัดทั้ง memory และ CPU
docker run -m 1g --cpus="2" myimage
```

---

### Container Health Check
```bash
# ตรวจสอบ health status
docker inspect --format='{{.State.Health.Status}}' mycontainer

# ดู health check logs
docker inspect --format='{{json .State.Health}}' mycontainer
```

---

### การใช้ Environment Variables
```bash
# ตั้งค่า env variable
docker run -e NODE_ENV=production myimage

# ใช้ env file
docker run --env-file .env myimage

# แสดง env variables ของ container
docker exec mycontainer env
```

---

### การใช้ Volumes
```bash
# สร้างและใช้ named volume
docker volume create mydata
docker run -v mydata:/data myimage

# ใช้ bind mount
docker run -v /host/path:/container/path myimage

# ใช้ read-only volume
docker run -v mydata:/data:ro myimage

# ดู volume mount points
docker inspect -f '{{json .Mounts}}' mycontainer
```

---

### การใช้ Networks
```bash
# สร้าง custom network
docker network create mynetwork

# รัน containers ใน network เดียวกัน
docker run -d --name db --network mynetwork mysql
docker run -d --name web --network mynetwork nginx

# containers สามารถเชื่อมต่อกันโดยใช้ชื่อ container
# เช่น: web สามารถเชื่อมต่อกับ db โดยใช้ hostname "db"
```

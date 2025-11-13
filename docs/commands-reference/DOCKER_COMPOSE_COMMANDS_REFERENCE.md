# Docker Compose Commands Reference

## BASIC DOCKER COMPOSE COMMANDS

### docker compose up
**รูปแบบการใช้งาน:**
```bash
docker compose up [options] [service...]
```

**การใช้งาน:**
- สร้างและเริ่ม containers ตาม docker-compose.yml

**Options ที่ใช้บ่อย:**
- `-d` (Detach) - รัน background
- `--build` - build images ก่อน start
- `--force-recreate` - สร้าง containers ใหม่ทั้งหมด
- `--no-deps` - ไม่ start services ที่ depend
- `--scale` - กำหนดจำนวน containers ของ service
- `--remove-orphans` - ลบ containers ที่ไม่ได้ใช้
- `-V` (Volumes) - สร้าง anonymous volumes ใหม่

**ตัวอย่างการใช้งาน:**
```bash
docker compose up                    # start ทุก services
docker compose up -d                 # start background
docker compose up --build            # build ก่อน start
docker compose up web db             # start เฉพาะ web และ db services
docker compose up --scale web=3      # start web 3 instances
docker compose up --force-recreate   # สร้างใหม่ทั้งหมด
docker compose up --remove-orphans   # ลบ containers เก่า
```

---

### docker compose down
**รูปแบบการใช้งาน:**
```bash
docker compose down [options]
```

**การใช้งาน:**
- หยุดและลบ containers, networks

**Options ที่ใช้บ่อย:**
- `-v` (Volumes) - ลบ volumes ด้วย
- `--rmi` - ลบ images (all หรือ local)
- `--remove-orphans` - ลบ containers ที่ไม่ได้ใช้

**ตัวอย่างการใช้งาน:**
```bash
docker compose down                  # หยุดและลบ containers
docker compose down -v               # ลบ containers และ volumes
docker compose down --rmi all        # ลบ containers และ images ทั้งหมด
docker compose down --rmi local      # ลบเฉพาะ local images
docker compose down --remove-orphans # ลบ orphan containers
```

**⚠️ คำเตือน:** `docker compose down -v` จะลบ volumes ด้วย ข้อมูลจะหาย!

---

### docker compose start
**รูปแบบการใช้งาน:**
```bash
docker compose start [service...]
```

**การใช้งาน:**
- เริ่ม containers ที่หยุดไว้

**ตัวอย่างการใช้งาน:**
```bash
docker compose start                 # start ทุก services
docker compose start web             # start เฉพาะ web service
docker compose start web db          # start web และ db
```

---

### docker compose stop
**รูปแบบการใช้งาน:**
```bash
docker compose stop [options] [service...]
```

**การใช้งาน:**
- หยุด containers (ไม่ลบ)

**Options ที่ใช้บ่อย:**
- `-t` (Timeout) - timeout ก่อน kill (default: 10 วินาที)

**ตัวอย่างการใช้งาน:**
```bash
docker compose stop                  # หยุดทุก services
docker compose stop web              # หยุดเฉพาะ web service
docker compose stop -t 30            # หยุดโดยรอ 30 วินาที
```

---

### docker compose restart
**รูปแบบการใช้งาน:**
```bash
docker compose restart [options] [service...]
```

**การใช้งาน:**
- restart containers

**Options ที่ใช้บ่อย:**
- `-t` (Timeout) - timeout ก่อน kill

**ตัวอย่างการใช้งาน:**
```bash
docker compose restart               # restart ทุก services
docker compose restart web           # restart เฉพาะ web service
docker compose restart -t 30 web     # restart โดยรอ 30 วินาที
```

---

### docker compose ps
**รูปแบบการใช้งาน:**
```bash
docker compose ps [options] [service...]
```

**การใช้งาน:**
- แสดงรายการ containers

**Options ที่ใช้บ่อย:**
- `-a` (All) - แสดงทุก containers
- `-q` (Quiet) - แสดงเฉพาะ IDs
- `--services` - แสดงเฉพาะชื่อ services
- `--format` - กำหนดรูปแบบ output

**ตัวอย่างการใช้งาน:**
```bash
docker compose ps                    # แสดง running containers
docker compose ps -a                 # แสดงทุก containers
docker compose ps web                # แสดงเฉพาะ web service
docker compose ps --services         # แสดงชื่อ services
```

---

### docker compose logs
**รูปแบบการใช้งาน:**
```bash
docker compose logs [options] [service...]
```

**การใช้งาน:**
- แสดง logs ของ services

**Options ที่ใช้บ่อย:**
- `-f` (Follow) - แสดง logs real-time
- `--tail` - จำนวนบรรทัดล่าสุด
- `-t` (Timestamps) - แสดง timestamps
- `--since` - แสดง logs ตั้งแต่เวลาที่กำหนด
- `--no-log-prefix` - ไม่แสดงชื่อ service

**ตัวอย่างการใช้งาน:**
```bash
docker compose logs                  # แสดง logs ทุก services
docker compose logs -f               # ดู logs real-time
docker compose logs web              # logs ของ web service
docker compose logs --tail 100 web   # 100 บรรทัดล่าสุด
docker compose logs -f --tail 50     # ดู logs real-time 50 บรรทัดล่าสุด
docker compose logs --since 1h       # logs 1 ชั่วโมงล่าสุด
```

---

### docker compose exec
**รูปแบบการใช้งาน:**
```bash
docker compose exec [options] <service> <command>
```

**การใช้งาน:**
- รันคำสั่งใน running container

**Options ที่ใช้บ่อย:**
- `-d` (Detach) - รัน background
- `-T` - ไม่ใช้ pseudo-TTY
- `-u` (User) - ระบุ user
- `-w` (Workdir) - กำหนด working directory
- `-e` (Env) - ตั้งค่า environment variable

**ตัวอย่างการใช้งาน:**
```bash
docker compose exec web bash         # เข้า shell ของ web service
docker compose exec web ls /app      # รันคำสั่ง ls
docker compose exec db psql -U postgres # เข้า PostgreSQL
docker compose exec -u root web bash # เข้า shell ในฐานะ root
docker compose exec web env          # แสดง environment variables
```

---

### docker compose run
**รูปแบบการใช้งาน:**
```bash
docker compose run [options] <service> [command]
```

**การใช้งาน:**
- สร้าง container ใหม่และรันคำสั่ง (one-off command)
- แตกต่างจาก exec คือสร้าง container ใหม่

**Options ที่ใช้บ่อย:**
- `-d` (Detach) - รัน background
- `--rm` - ลบ container หลังใช้งาน
- `-e` (Env) - ตั้งค่า environment variable
- `-p` (Publish) - publish ports
- `--no-deps` - ไม่ start dependencies
- `-u` (User) - ระบุ user
- `-v` (Volume) - mount volume
- `-T` - ไม่ใช้ pseudo-TTY

**ตัวอย่างการใช้งาน:**
```bash
docker compose run web python manage.py migrate    # รัน migration
docker compose run --rm web npm test                # รัน tests
docker compose run --rm web bash                    # เข้า shell
docker compose run -e DEBUG=1 web python app.py     # ตั้งค่า env
docker compose run --no-deps web python script.py   # ไม่ start dependencies
docker compose run -p 3001:3000 web                 # กำหนด port
```

---

### docker compose build
**รูปแบบการใช้งาน:**
```bash
docker compose build [options] [service...]
```

**การใช้งาน:**
- build หรือ rebuild images

**Options ที่ใช้บ่อย:**
- `--no-cache` - build โดยไม่ใช้ cache
- `--pull` - pull base images ใหม่
- `--parallel` - build หลาย services พร้อมกัน
- `--build-arg` - ส่ง build arguments

**ตัวอย่างการใช้งาน:**
```bash
docker compose build                 # build ทุก services
docker compose build web             # build เฉพาะ web service
docker compose build --no-cache      # build ใหม่ทั้งหมด
docker compose build --pull          # pull base images ใหม่
docker compose build --build-arg VERSION=1.0 # ส่ง build arg
```

---

### docker compose pull
**รูปแบบการใช้งาน:**
```bash
docker compose pull [options] [service...]
```

**การใช้งาน:**
- pull images ที่ระบุใน compose file

**Options ที่ใช้บ่อย:**
- `-q` (Quiet) - ไม่แสดง progress
- `--ignore-pull-failures` - เพิกเฉยข้อผิดพลาด

**ตัวอย่างการใช้งาน:**
```bash
docker compose pull                  # pull ทุก images
docker compose pull web              # pull เฉพาะ web image
docker compose pull -q               # pull แบบเงียบ
```

---

### docker compose push
**รูปแบบการใช้งาน:**
```bash
docker compose push [service...]
```

**การใช้งาน:**
- push images ไปยัง registry

**ตัวอย่างการใช้งาน:**
```bash
docker compose push                  # push ทุก images
docker compose push web              # push เฉพาะ web image
```

---

### docker compose config
**รูปแบบการใช้งาน:**
```bash
docker compose config [options]
```

**การใช้งาน:**
- ตรวจสอบและแสดง compose file หลังจาก merge และ resolve

**Options ที่ใช้บ่อย:**
- `--services` - แสดงเฉพาะชื่อ services
- `--volumes` - แสดงเฉพาะชื่อ volumes
- `-q` (Quiet) - ตรวจสอบเฉยๆ ไม่แสดงผล

**ตัวอย่างการใช้งาน:**
```bash
docker compose config                # แสดง config ทั้งหมด
docker compose config --services     # แสดงชื่อ services
docker compose config --volumes      # แสดงชื่อ volumes
docker compose config -q             # ตรวจสอบ syntax
```

---

### docker compose images
**รูปแบบการใช้งาน:**
```bash
docker compose images [service...]
```

**การใช้งาน:**
- แสดงรายการ images ที่ใช้โดย services

**ตัวอย่างการใช้งาน:**
```bash
docker compose images                # แสดง images ทั้งหมด
docker compose images web            # แสดง image ของ web service
```

---

### docker compose top
**รูปแบบการใช้งาน:**
```bash
docker compose top [service...]
```

**การใช้งาน:**
- แสดง running processes ของ services

**ตัวอย่างการใช้งาน:**
```bash
docker compose top                   # แสดง processes ทั้งหมด
docker compose top web               # แสดง processes ของ web service
```

---

### docker compose pause
**รูปแบบการใช้งาน:**
```bash
docker compose pause [service...]
```

**การใช้งาน:**
- pause services (หยุดชั่วคราว)

**ตัวอย่างการใช้งาน:**
```bash
docker compose pause                 # pause ทุก services
docker compose pause web             # pause เฉพาะ web service
```

---

### docker compose unpause
**รูปแบบการใช้งาน:**
```bash
docker compose unpause [service...]
```

**การใช้งาน:**
- unpause services

**ตัวอย่างการใช้งาน:**
```bash
docker compose unpause               # unpause ทุก services
docker compose unpause web           # unpause เฉพาะ web service
```

---

### docker compose port
**รูปแบบการใช้งาน:**
```bash
docker compose port [options] <service> <private_port>
```

**การใช้งาน:**
- แสดง public port ที่ map กับ private port

**ตัวอย่างการใช้งาน:**
```bash
docker compose port web 80           # แสดง public port ของ web:80
docker compose port db 5432          # แสดง public port ของ db:5432
```

---

### docker compose events
**รูปแบบการใช้งาน:**
```bash
docker compose events [options] [service...]
```

**การใช้งาน:**
- แสดง events real-time จาก containers

**ตัวอย่างการใช้งาน:**
```bash
docker compose events                # ดู events ทุก services
docker compose events web            # ดู events ของ web service
```

---

### docker compose kill
**รูปแบบการใช้งาน:**
```bash
docker compose kill [options] [service...]
```

**การใช้งาน:**
- force kill containers

**Options ที่ใช้บ่อย:**
- `-s` (Signal) - ส่ง signal เฉพาะ

**ตัวอย่างการใช้งาน:**
```bash
docker compose kill                  # kill ทุก services
docker compose kill web              # kill เฉพาะ web service
docker compose kill -s SIGTERM web   # ส่ง SIGTERM
```

---

### docker compose rm
**รูปแบบการใช้งาน:**
```bash
docker compose rm [options] [service...]
```

**การใช้งาน:**
- ลบ stopped containers

**Options ที่ใช้บ่อย:**
- `-f` (Force) - ไม่ถามยืนยัน
- `-s` (Stop) - หยุดก่อนลบ
- `-v` (Volumes) - ลบ volumes ด้วย

**ตัวอย่างการใช้งาน:**
```bash
docker compose rm                    # ลบ stopped containers
docker compose rm -f                 # ลบโดยไม่ถาม
docker compose rm -s -f              # หยุดและลบ
docker compose rm -v                 # ลบรวม volumes
```

---

## DOCKER COMPOSE FILE (YAML)

### Basic Structure
```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
  
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
```

---

### version
**การใช้งาน:**
- ระบุเวอร์ชันของ Compose file format

**ตัวอย่าง:**
```yaml
version: '3.8'
```

**💡 หมายเหตุ:** Docker Compose V2 ไม่จำเป็นต้องระบุ version แล้ว

---

### services
**การใช้งาน:**
- กำหนด services ที่จะรัน

**Properties ที่ใช้บ่อย:**
- `image` - ระบุ image ที่จะใช้
- `build` - กำหนดการ build image
- `ports` - map ports
- `volumes` - mount volumes
- `environment` - environment variables
- `command` - override CMD
- `entrypoint` - override ENTRYPOINT
- `depends_on` - กำหนด dependencies
- `networks` - เชื่อมต่อ networks
- `restart` - นโยบาย restart
- `healthcheck` - health check configuration
- `deploy` - deployment configuration (Swarm mode)

---

### image
**การใช้งาน:**
- ระบุ image ที่จะใช้

**ตัวอย่าง:**
```yaml
services:
  web:
    image: nginx:alpine
  
  db:
    image: postgres:15
  
  redis:
    image: redis:7-alpine
```

---

### build
**การใช้งาน:**
- กำหนดการ build image จาก Dockerfile

**ตัวอย่าง:**
```yaml
services:
  web:
    build: .
  
  app:
    build:
      context: ./app
      dockerfile: Dockerfile.prod
      args:
        - NODE_ENV=production
        - VERSION=1.0
      target: production
  
  api:
    build:
      context: .
      cache_from:
        - myapp:latest
```

---

### ports
**การใช้งาน:**
- map ports (host:container)

**ตัวอย่าง:**
```yaml
services:
  web:
    ports:
      - "8080:80"                    # host:container
      - "443:443"
      - "3000-3005:3000-3005"        # port range
      - "127.0.0.1:8080:80"          # bind specific IP
      - target: 80                   # long syntax
        published: 8080
        protocol: tcp
        mode: host
```

---

### expose
**การใช้งาน:**
- expose ports เฉพาะใน internal network (ไม่ publish ออก host)

**ตัวอย่าง:**
```yaml
services:
  web:
    expose:
      - "3000"
      - "8000"
```

---

### volumes
**การใช้งาน:**
- mount volumes หรือ bind mounts

**ตัวอย่าง:**
```yaml
services:
  web:
    volumes:
      # Named volume
      - data:/var/lib/mysql
      
      # Bind mount
      - ./app:/app
      - ./config:/etc/config:ro      # read-only
      
      # Anonymous volume
      - /var/log
      
      # Long syntax
      - type: bind
        source: ./app
        target: /app
      
      - type: volume
        source: data
        target: /data
        volume:
          nocopy: true

volumes:
  data:                              # declare named volume
```

---

### environment
**การใช้งาน:**
- ตั้งค่า environment variables

**ตัวอย่าง:**
```yaml
services:
  web:
    environment:
      NODE_ENV: production
      DEBUG: "false"
      PORT: 3000
  
  db:
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=mydb
```

---

### env_file
**การใช้งาน:**
- โหลด environment variables จากไฟล์

**ตัวอย่าง:**
```yaml
services:
  web:
    env_file:
      - .env
      - .env.production
```

**.env file:**
```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgres://localhost/mydb
```

---

### command
**การใช้งาน:**
- override คำสั่ง CMD ใน Dockerfile

**ตัวอย่าง:**
```yaml
services:
  web:
    command: python app.py
  
  worker:
    command: ["celery", "worker", "-A", "tasks"]
  
  dev:
    command: npm run dev
```

---

### entrypoint
**การใช้งาน:**
- override ENTRYPOINT ใน Dockerfile

**ตัวอย่าง:**
```yaml
services:
  web:
    entrypoint: /app/docker-entrypoint.sh
  
  app:
    entrypoint: ["python", "-m", "flask"]
```

---

### depends_on
**การใช้งาน:**
- กำหนด dependencies ระหว่าง services

**ตัวอย่าง:**
```yaml
services:
  web:
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15
  
  redis:
    image: redis:alpine

# With conditions (long syntax)
services:
  web:
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
  
  db:
    healthcheck:
      test: ["CMD", "pg_isready"]
      interval: 10s
      timeout: 5s
      retries: 5
```

**💡 หมายเหตุ:** depends_on ไม่รอให้ service "ready" เพียงแค่รอให้ "started"

---

### networks
**การใช้งาน:**
- เชื่อมต่อ service กับ networks

**ตัวอย่าง:**
```yaml
services:
  web:
    networks:
      - frontend
      - backend
  
  db:
    networks:
      - backend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
```

---

### restart
**การใช้งาน:**
- กำหนดนโยบายการ restart

**ค่าที่ใช้ได้:**
- `no` - ไม่ restart
- `always` - restart เสมอ
- `on-failure` - restart เมื่อ exit code != 0
- `unless-stopped` - restart เสมอ ยกเว้นหยุดด้วยตนเอง

**ตัวอย่าง:**
```yaml
services:
  web:
    restart: always
  
  worker:
    restart: on-failure
  
  db:
    restart: unless-stopped
```

---

### healthcheck
**การใช้งาน:**
- กำหนด health check

**ตัวอย่าง:**
```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
  
  db:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
  
  # ปิด healthcheck
  api:
    healthcheck:
      disable: true
```

---

### labels
**การใช้งาน:**
- เพิ่ม metadata

**ตัวอย่าง:**
```yaml
services:
  web:
    labels:
      com.example.description: "Web application"
      com.example.version: "1.0"
      environment: "production"
```

---

### logging
**การใช้งาน:**
- กำหนดการ logging

**ตัวอย่าง:**
```yaml
services:
  web:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
  
  app:
    logging:
      driver: "syslog"
      options:
        syslog-address: "tcp://192.168.0.42:123"
```

---

### container_name
**การใช้งาน:**
- ตั้งชื่อ container เฉพาะ

**ตัวอย่าง:**
```yaml
services:
  web:
    container_name: my-web-server
```

**⚠️ คำเตือน:** ไม่สามารถ scale service ที่มี container_name ได้

---

### hostname
**การใช้งาน:**
- กำหนด hostname ภายใน container

**ตัวอย่าง:**
```yaml
services:
  web:
    hostname: webserver
```

---

### user
**การใช้งาน:**
- กำหนด user ที่จะรัน

**ตัวอย่าง:**
```yaml
services:
  web:
    user: "1000:1000"
  
  app:
    user: node
```

---

### working_dir
**การใช้งาน:**
- กำหนด working directory

**ตัวอย่าง:**
```yaml
services:
  web:
    working_dir: /app
```

---

### deploy (Swarm mode)
**การใช้งาน:**
- กำหนดการ deploy ใน Swarm mode

**ตัวอย่าง:**
```yaml
services:
  web:
    deploy:
      replicas: 3
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

---

## COMPLETE EXAMPLES

### Web Application (LEMP Stack)
```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./app:/var/www/html
      - ./certs:/etc/nginx/certs:ro
    depends_on:
      - php
    networks:
      - frontend
    restart: unless-stopped

  php:
    build:
      context: ./php
      dockerfile: Dockerfile
    volumes:
      - ./app:/var/www/html
    networks:
      - frontend
      - backend
    environment:
      - DB_HOST=mysql
      - DB_NAME=myapp
      - DB_USER=user
      - DB_PASS=secret
    restart: unless-stopped

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootsecret
      MYSQL_DATABASE: myapp
      MYSQL_USER: user
      MYSQL_PASSWORD: secret
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mysql_data:

networks:
  frontend:
  backend:
```

---

### Node.js Application with Redis
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NODE_ENV: production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    volumes:
      - ./logs:/app/logs
    depends_on:
      redis:
        condition: service_healthy
    networks:
      - app-network
    restart: always
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network
    restart: always
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  redis_data:

networks:
  app-network:
    driver: bridge
```

---

### Python Flask + PostgreSQL + Redis
```yaml
version: '3.8'

services:
  web:
    build: ./web
    command: gunicorn -w 4 -b 0.0.0.0:5000 app:app
    ports:
      - "5000:5000"
    env_file:
      - .env
    environment:
      - FLASK_ENV=production
      - DATABASE_URL=postgresql://postgres:secret@db:5432/myapp
      - REDIS_URL=redis://redis:6379/0
    volumes:
      - ./web:/app
    depends_on:
      - db
      - redis
    networks:
      - backend
    restart: unless-stopped

  celery:
    build: ./web
    command: celery -A tasks worker --loglevel=info
    env_file:
      - .env
    environment:
      - DATABASE_URL=postgresql://postgres:secret@db:5432/myapp
      - REDIS_URL=redis://redis:6379/0
    volumes:
      - ./web:/app
    depends_on:
      - db
      - redis
    networks:
      - backend
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - backend
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - backend
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:

networks:
  backend:
```

---

### Development Environment with Hot Reload
```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      target: development
    ports:
      - "3000:3000"
      - "9229:9229"  # Node.js debugger
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://postgres:secret@db:5432/dev
    volumes:
      - ./src:/app/src
      - ./package.json:/app/package.json
      - /app/node_modules  # anonymous volume
    command: npm run dev
    depends_on:
      - db
    networks:
      - dev-network

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - dev-network

  adminer:
    image: adminer
    ports:
      - "8080:8080"
    depends_on:
      - db
    networks:
      - dev-network

volumes:
  postgres_data:

networks:
  dev-network:
```

---

## BEST PRACTICES

### 1. ใช้ .env file
```yaml
# docker-compose.yml
services:
  web:
    env_file:
      - .env
```

```bash
# .env
NODE_ENV=production
DATABASE_URL=postgres://localhost/mydb
SECRET_KEY=changeme
```

**💡 อย่าลืม:** เพิ่ม `.env` ใน `.gitignore`

---

### 2. ใช้ named volumes สำหรับข้อมูลสำคัญ
```yaml
services:
  db:
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

### 3. กำหนด health checks
```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

---

### 4. ใช้ networks แยก services
```yaml
services:
  web:
    networks:
      - frontend
  
  api:
    networks:
      - frontend
      - backend
  
  db:
    networks:
      - backend

networks:
  frontend:
  backend:
```

---

### 5. กำหนด restart policy
```yaml
services:
  web:
    restart: unless-stopped
  
  db:
    restart: always
```

---

### 6. ใช้ depends_on กับ healthcheck
```yaml
services:
  web:
    depends_on:
      db:
        condition: service_healthy
  
  db:
    healthcheck:
      test: ["CMD", "pg_isready"]
      interval: 10s
```

---

### 7. จำกัด resources (production)
```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

---

### 8. ใช้ logging driver
```yaml
services:
  web:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

---

### 9. แยก config สำหรับ dev และ production
```bash
# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

**docker-compose.dev.yml:**
```yaml
services:
  web:
    build:
      target: development
    volumes:
      - ./src:/app/src
    environment:
      - NODE_ENV=development
```

**docker-compose.prod.yml:**
```yaml
services:
  web:
    build:
      target: production
    environment:
      - NODE_ENV=production
    restart: always
```

---

### 10. ใช้ .dockerignore
```
node_modules
npm-debug.log
.git
.env
*.md
```

---

## COMMON PATTERNS

### Override compose file
```bash
docker compose -f docker-compose.yml -f docker-compose.override.yml up
```

### Multiple compose files
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

### Set project name
```bash
docker compose -p myproject up
```

### Build and run
```bash
docker compose up --build
```

### Scale services
```bash
docker compose up --scale web=3
```

### View resource usage
```bash
docker compose stats
```

### Clean up everything
```bash
docker compose down -v --rmi all --remove-orphans
```

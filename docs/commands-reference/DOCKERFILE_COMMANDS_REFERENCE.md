# Dockerfile Commands Reference

## DOCKERFILE INSTRUCTIONS

### FROM
**รูปแบบการใช้งาน:**
```dockerfile
FROM <image>[:<tag>] [AS <name>]
FROM <image>[@<digest>] [AS <name>]
```

**การใช้งาน:**
- กำหนด base image สำหรับ build
- **ต้องเป็นคำสั่งแรก** ใน Dockerfile (ยกเว้น ARG ก่อน FROM)

**ตัวอย่างการใช้งาน:**
```dockerfile
FROM ubuntu:20.04
FROM node:18-alpine
FROM nginx:latest
FROM python:3.11-slim
FROM scratch                         # สร้าง image จากศูนย์

# Multi-stage build
FROM node:18 AS builder
FROM nginx:alpine AS production
```

**💡 หมายเหตุ:** 
- `scratch` คือ empty image สำหรับ static binaries
- สามารถมี FROM หลายตัวได้ (multi-stage builds)

---

### RUN
**รูปแบบการใช้งาน:**
```dockerfile
RUN <command>                        # shell form
RUN ["executable", "param1", "param2"] # exec form
```

**การใช้งาน:**
- รันคำสั่งระหว่าง build image
- สร้าง layer ใหม่ในแต่ละ RUN

**ตัวอย่างการใช้งาน:**
```dockerfile
# Shell form (รันใน /bin/sh -c)
RUN apt-get update && apt-get install -y \
    curl \
    vim \
    git

# Exec form (ไม่ผ่าน shell)
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "curl"]

# รวมหลายคำสั่ง (ลด layers)
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# ใช้กับ Python
RUN pip install --no-cache-dir \
    flask \
    gunicorn \
    redis

# ใช้กับ Node.js
RUN npm install --production && \
    npm cache clean --force
```

**💡 Best Practices:**
- รวมคำสั่งที่เกี่ยวข้องเป็น RUN เดียว เพื่อลด layers
- ใช้ `&&` แทน `;` เพื่อให้หยุดเมื่อมี error
- ลบ cache หลัง install (เช่น `apt-get clean`, `npm cache clean`)

---

### CMD
**รูปแบบการใช้งาน:**
```dockerfile
CMD ["executable", "param1", "param2"]  # exec form (แนะนำ)
CMD ["param1", "param2"]                # เป็น parameter ของ ENTRYPOINT
CMD command param1 param2               # shell form
```

**การใช้งาน:**
- กำหนดคำสั่งเริ่มต้นเมื่อรัน container
- **มีได้เพียง 1 CMD** ใน Dockerfile (ถ้ามีหลายตัว ใช้ตัวสุดท้าย)
- สามารถ override ได้เมื่อรัน container

**ตัวอย่างการใช้งาน:**
```dockerfile
# Exec form (แนะนำ)
CMD ["nginx", "-g", "daemon off;"]
CMD ["python", "app.py"]
CMD ["node", "server.js"]

# Shell form
CMD nginx -g "daemon off;"
CMD python app.py

# ใช้ร่วมกับ ENTRYPOINT
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
```

**ความแตกต่าง CMD vs RUN:**
- `RUN` = รันระหว่าง **build** image
- `CMD` = รันเมื่อ **start** container

---

### ENTRYPOINT
**รูปแบบการใช้งาน:**
```dockerfile
ENTRYPOINT ["executable", "param1", "param2"]  # exec form (แนะนำ)
ENTRYPOINT command param1 param2               # shell form
```

**การใช้งาน:**
- กำหนดคำสั่งหลักที่จะรันเมื่อ start container
- **ไม่สามารถ override ได้ง่าย** (ต้องใช้ `--entrypoint`)
- มักใช้ร่วมกับ CMD

**ตัวอย่างการใช้งาน:**
```dockerfile
# ใช้เดี่ยว
ENTRYPOINT ["python", "app.py"]
ENTRYPOINT ["/docker-entrypoint.sh"]

# ใช้ร่วมกับ CMD
ENTRYPOINT ["python"]
CMD ["app.py"]
# รัน: python app.py
# Override: docker run myimage test.py -> python test.py

# สร้าง wrapper script
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
```

**ตัวอย่าง docker-entrypoint.sh:**
```bash
#!/bin/bash
set -e

# Setup environment
echo "Starting application..."

# Run migrations
python manage.py migrate

# Execute CMD
exec "$@"
```

**ความแตกต่าง ENTRYPOINT vs CMD:**
- `ENTRYPOINT` = คำสั่งหลักที่ต้องรัน (ยากต่อการ override)
- `CMD` = parameter เริ่มต้น (ง่ายต่อการ override)

---

### COPY
**รูปแบบการใช้งาน:**
```dockerfile
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

**การใช้งาน:**
- คัดลอกไฟล์/โฟลเดอร์จาก host ไปยัง image
- **ไม่รองรับ URL** หรือ auto-extraction

**ตัวอย่างการใช้งาน:**
```dockerfile
# คัดลอกไฟล์
COPY app.py /app/
COPY package.json package-lock.json /app/

# คัดลอกโฟลเดอร์
COPY src/ /app/src/
COPY . /app/

# ตั้งค่า ownership
COPY --chown=www-data:www-data app.py /app/
COPY --chown=1000:1000 . /app/

# ใช้ wildcard
COPY *.py /app/
COPY requirements*.txt /app/

# จาก build stage อื่น (multi-stage)
COPY --from=builder /app/dist /app/dist
COPY --from=0 /app/build /app/
```

**💡 Best Practices:**
- คัดลอก dependency files ก่อน (เช่น `package.json`) เพื่อใช้ cache
- ใช้ `.dockerignore` เพื่อไม่คัดลอกไฟล์ที่ไม่จำเป็น

---

### ADD
**รูปแบบการใช้งาน:**
```dockerfile
ADD [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

**การใช้งาน:**
- คัดลอกไฟล์/โฟลเดอร์จาก host ไปยัง image
- **รองรับ URL** และ **auto-extract tar files**

**ตัวอย่างการใช้งาน:**
```dockerfile
# คัดลอกไฟล์ (เหมือน COPY)
ADD app.py /app/

# ดาวน์โหลดจาก URL
ADD https://example.com/file.tar.gz /tmp/

# Auto-extract tar file
ADD archive.tar.gz /app/
# จะแตกไฟล์อัตโนมัติไปที่ /app/

# ตั้งค่า ownership
ADD --chown=www-data:www-data app.tar.gz /app/
```

**ความแตกต่าง COPY vs ADD:**
- `COPY` = คัดลอกธรรมดา (แนะนำใช้)
- `ADD` = คัดลอก + ดาวน์โหลด URL + แตกไฟล์

**💡 Best Practices:**
- **ใช้ COPY เป็นหลัก** เพราะชัดเจนกว่า
- ใช้ ADD เฉพาะเมื่อต้องการ auto-extract tar files

---

### WORKDIR
**รูปแบบการใช้งาน:**
```dockerfile
WORKDIR /path/to/workdir
```

**การใช้งาน:**
- กำหนด working directory สำหรับคำสั่งที่ตามหลัง
- สร้างโฟลเดอร์อัตโนมัติถ้ายังไม่มี
- ใช้ได้กับ `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, `ADD`

**ตัวอย่างการใช้งาน:**
```dockerfile
WORKDIR /app
COPY . .
RUN npm install

# ใช้ได้หลายครั้ง
WORKDIR /app
WORKDIR src
# ตอนนี้อยู่ที่ /app/src

# ใช้กับ ENV
ENV APP_HOME /application
WORKDIR $APP_HOME
```

**💡 Best Practices:**
- **ใช้ WORKDIR แทนการ `RUN cd`**
- ใช้ absolute path จะชัดเจนกว่า

**❌ ไม่ดี:**
```dockerfile
RUN cd /app && npm install
```

**✅ ดี:**
```dockerfile
WORKDIR /app
RUN npm install
```

---

### ENV
**รูปแบบการใช้งาน:**
```dockerfile
ENV <key>=<value> ...
ENV <key> <value>
```

**การใช้งาน:**
- ตั้งค่า environment variables
- ใช้ได้ทั้งระหว่าง build และเมื่อรัน container

**ตัวอย่างการใช้งาน:**
```dockerfile
# ตั้งค่าตัวเดียว
ENV NODE_ENV production
ENV PORT 3000

# ตั้งค่าหลายตัวพร้อมกัน (แนะนำ)
ENV NODE_ENV=production \
    PORT=3000 \
    APP_HOME=/app

# ใช้ใน Dockerfile
ENV APP_DIR /application
WORKDIR $APP_DIR
COPY . $APP_DIR

# ตัวอย่างการใช้งานจริง
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

ENV NODE_ENV=production \
    NPM_CONFIG_LOGLEVEL=warn
```

**💡 หมายเหตุ:**
- ENV ตั้งค่าถาวรใน image
- ถ้าต้องการใช้แค่ระหว่าง build ให้ใช้ ARG

---

### ARG
**รูปแบบการใช้งาน:**
```dockerfile
ARG <name>[=<default value>]
```

**การใช้งาน:**
- กำหนดตัวแปรสำหรับใช้ระหว่าง build เท่านั้น
- ไม่ถูกเก็บใน image
- สามารถ override ด้วย `--build-arg`

**ตัวอย่างการใช้งาน:**
```dockerfile
# กำหนด ARG พร้อม default value
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}

ARG APP_DIR=/app
WORKDIR ${APP_DIR}

# ใช้หลาย ARG
ARG PYTHON_VERSION=3.11
ARG ENVIRONMENT=development
FROM python:${PYTHON_VERSION}
ENV ENV=${ENVIRONMENT}

# ARG ก่อน FROM (สำหรับเลือก base image)
ARG BASE_IMAGE=ubuntu:20.04
FROM ${BASE_IMAGE}
```

**การ override เมื่อ build:**
```bash
docker build --build-arg NODE_VERSION=20 .
docker build --build-arg ENVIRONMENT=production .
```

**ความแตกต่าง ARG vs ENV:**
- `ARG` = ใช้เฉพาะระหว่าง **build** (ไม่อยู่ใน image)
- `ENV` = ใช้ระหว่าง **build และ runtime** (อยู่ใน image)

**ตัวอย่างการใช้ร่วมกัน:**
```dockerfile
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}

ARG BUILD_DATE
ENV APP_BUILD_DATE=${BUILD_DATE}
```

---

### EXPOSE
**รูปแบบการใช้งาน:**
```dockerfile
EXPOSE <port> [<port>/<protocol>...]
```

**การใช้งาน:**
- ระบุ port ที่ container จะรับ connections
- **เป็นเพียงเอกสาร** ไม่ได้ publish port จริง
- ต้องใช้ `-p` เมื่อรัน container

**ตัวอย่างการใช้งาน:**
```dockerfile
EXPOSE 80
EXPOSE 443
EXPOSE 3000
EXPOSE 8080/tcp
EXPOSE 53/udp

# หลาย ports
EXPOSE 80 443
EXPOSE 8000 8001 8002
```

**การใช้งานจริง:**
```dockerfile
FROM nginx:alpine
EXPOSE 80
```

```bash
# ต้อง publish port เมื่อรัน
docker run -p 8080:80 myimage
```

**💡 หมายเหตุ:**
- EXPOSE ไม่ได้ทำให้ port เปิดจริง
- ใช้เป็นเอกสารบอก port ที่ควรใช้

---

### VOLUME
**รูปแบบการใช้งาน:**
```dockerfile
VOLUME ["/path/to/volume"]
VOLUME /path/to/volume1 /path/to/volume2
```

**การใช้งาน:**
- สร้าง mount point สำหรับเก็บข้อมูลถาวร
- ข้อมูลจะไม่หายเมื่อ container หยุด

**ตัวอย่างการใช้งาน:**
```dockerfile
# ตัวเดียว
VOLUME /data
VOLUME /var/log

# หลายตัว
VOLUME ["/var/lib/mysql", "/var/log/mysql"]

# ตัวอย่างการใช้งานจริง
FROM mysql:8.0
VOLUME /var/lib/mysql

FROM nginx:alpine
VOLUME /var/log/nginx
```

**การใช้งานจริง:**
```bash
# Docker จะสร้าง anonymous volume อัตโนมัติ
docker run -d myimage

# หรือระบุ named volume
docker run -d -v mydata:/data myimage
```

**💡 Best Practices:**
- ใช้สำหรับข้อมูลที่ต้องการเก็บถาวร (database, logs, uploads)
- ไม่ควรใส่ source code ใน VOLUME

---

### USER
**รูปแบบการใช้งาน:**
```dockerfile
USER <user>[:<group>]
USER <UID>[:<GID>]
```

**การใช้งาน:**
- กำหนด user ที่จะใช้รันคำสั่งที่ตามหลัง
- ใช้กับ `RUN`, `CMD`, `ENTRYPOINT`

**ตัวอย่างการใช้งาน:**
```dockerfile
# สร้าง user ก่อน
RUN useradd -m -u 1000 appuser
USER appuser

# ใช้ user:group
USER www-data:www-data

# ใช้ UID:GID
USER 1000:1000

# ตัวอย่างการใช้งานจริง
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chown -R node:node /app
USER node
CMD ["node", "server.js"]
```

**💡 Best Practices:**
- **ไม่ควรรัน container ในฐานะ root**
- สร้าง non-root user เพื่อความปลอดภัย

**ตัวอย่างแบบเต็ม:**
```dockerfile
FROM python:3.11-slim

# สร้าง user
RUN groupadd -r appgroup && \
    useradd -r -g appgroup -u 1001 appuser

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY --chown=appuser:appgroup . .

# เปลี่ยนเป็น non-root user
USER appuser

CMD ["python", "app.py"]
```

---

### LABEL
**รูปแบบการใช้งาน:**
```dockerfile
LABEL <key>=<value> <key>=<value> ...
```

**การใช้งาน:**
- เพิ่ม metadata ให้กับ image
- ใช้สำหรับเก็บข้อมูล version, description, maintainer, etc.

**ตัวอย่างการใช้งาน:**
```dockerfile
# ตัวเดียว
LABEL version="1.0"
LABEL description="My application"

# หลายตัวพร้อมกัน (แนะนำ)
LABEL version="1.0" \
      description="My Node.js application" \
      maintainer="john@example.com" \
      created="2024-01-01"

# ใช้ standard labels
LABEL org.opencontainers.image.title="My App" \
      org.opencontainers.image.description="A sample application" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.authors="John Doe <john@example.com>" \
      org.opencontainers.image.url="https://github.com/user/repo" \
      org.opencontainers.image.source="https://github.com/user/repo"
```

**ดู labels ของ image:**
```bash
docker inspect --format='{{json .Config.Labels}}' myimage
```

---

### ONBUILD
**รูปแบบการใช้งาน:**
```dockerfile
ONBUILD <INSTRUCTION>
```

**การใช้งาน:**
- เพิ่มคำสั่งที่จะรันเมื่อ image นี้ถูกใช้เป็น base image
- ใช้สำหรับสร้าง base image ให้คนอื่นใช้

**ตัวอย่างการใช้งาน:**
```dockerfile
# Base image (mybase:latest)
FROM node:18
WORKDIR /app
ONBUILD COPY package*.json ./
ONBUILD RUN npm install
ONBUILD COPY . .
```

```dockerfile
# Child image ใช้ base image
FROM mybase:latest
# คำสั่ง ONBUILD จะถูกรันอัตโนมัติที่นี่
CMD ["npm", "start"]
```

**💡 หมายเหตุ:**
- ไม่ค่อยได้ใช้งานบ่อย
- อาจทำให้สับสนได้

---

### STOPSIGNAL
**รูปแบบการใช้งาน:**
```dockerfile
STOPSIGNAL signal
```

**การใช้งาน:**
- กำหนด signal ที่ใช้หยุด container (default: SIGTERM)

**ตัวอย่างการใช้งาน:**
```dockerfile
STOPSIGNAL SIGTERM
STOPSIGNAL SIGKILL
STOPSIGNAL SIGQUIT
```

---

### HEALTHCHECK
**รูปแบบการใช้งาน:**
```dockerfile
HEALTHCHECK [OPTIONS] CMD command
HEALTHCHECK NONE                     # ปิด healthcheck
```

**OPTIONS:**
- `--interval=<duration>` - ช่วงเวลาระหว่าง check (default: 30s)
- `--timeout=<duration>` - timeout ของการ check (default: 30s)
- `--start-period=<duration>` - เวลาเริ่มต้นก่อน check (default: 0s)
- `--retries=<number>` - จำนวนครั้งที่ล้มเหลวก่อนถือว่า unhealthy (default: 3)

**ตัวอย่างการใช้งาน:**
```dockerfile
# ตรวจสอบ HTTP endpoint
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# ตรวจสอบ database
HEALTHCHECK --interval=10s --timeout=5s --start-period=40s \
  CMD pg_isready -U postgres || exit 1

# ตรวจสอบ Node.js app
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD node healthcheck.js

# ปิด healthcheck ที่มีใน base image
HEALTHCHECK NONE
```

**ตัวอย่าง healthcheck.js:**
```javascript
const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000
};

const request = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', (err) => {
  process.exit(1);
});

request.end();
```

**ดู health status:**
```bash
docker inspect --format='{{.State.Health.Status}}' mycontainer
```

---

### SHELL
**รูปแบบการใช้งาน:**
```dockerfile
SHELL ["executable", "parameters"]
```

**การใช้งาน:**
- กำหนด default shell สำหรับ shell form ของ RUN, CMD, ENTRYPOINT

**ตัวอย่างการใช้งาน:**
```dockerfile
# เปลี่ยนจาก /bin/sh เป็น bash
SHELL ["/bin/bash", "-c"]

# Windows
SHELL ["powershell", "-command"]
SHELL ["cmd", "/S", "/C"]

# ตัวอย่างการใช้งาน
FROM ubuntu:20.04
SHELL ["/bin/bash", "-c"]
RUN echo "This runs in bash"
```

---

## MULTI-STAGE BUILDS

**การใช้งาน:**
- สร้าง image ที่มีขนาดเล็กลง
- แยก build environment และ runtime environment

**ตัวอย่าง Node.js:**
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
ENV NODE_ENV=production
USER node
CMD ["node", "dist/server.js"]
```

**ตัวอย่าง Go:**
```dockerfile
# Build stage
FROM golang:1.21 AS builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Production stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
```

**ตัวอย่าง Python:**
```dockerfile
# Build stage
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
ENV PYTHONUNBUFFERED=1
CMD ["python", "app.py"]
```

**การ build ถึง stage ที่กำหนด:**
```bash
# Build เฉพาะ builder stage
docker build --target builder -t myapp:builder .

# Build ถึง production stage (default)
docker build -t myapp:latest .
```

---

## BEST PRACTICES

### 1. เรียงลำดับคำสั่งเพื่อใช้ cache
```dockerfile
# ❌ ไม่ดี - cache ไม่มีประโยชน์
FROM node:18
WORKDIR /app
COPY . .
RUN npm install

# ✅ ดี - ใช้ cache ได้ดี
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
```

### 2. รวมคำสั่ง RUN เพื่อลด layers
```dockerfile
# ❌ ไม่ดี - หลาย layers
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y vim
RUN apt-get clean

# ✅ ดี - layer เดียว
RUN apt-get update && \
    apt-get install -y \
      curl \
      vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### 3. ใช้ .dockerignore
```
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.vscode
*.log
```

### 4. ใช้ official base images
```dockerfile
# ✅ ดี
FROM node:18-alpine
FROM python:3.11-slim
FROM nginx:alpine

# ❌ ไม่ดี
FROM ubuntu:latest
RUN apt-get install -y nodejs
```

### 5. ไม่รัน container ในฐานะ root
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chown -R node:node /app
USER node
CMD ["node", "server.js"]
```

### 6. ใช้ specific tags แทน latest
```dockerfile
# ❌ ไม่ดี
FROM node:latest

# ✅ ดี
FROM node:18.17.0-alpine3.18
```

### 7. ลบ cache หลัง install packages
```dockerfile
# Python
RUN pip install --no-cache-dir -r requirements.txt

# Node.js
RUN npm install --production && \
    npm cache clean --force

# Ubuntu/Debian
RUN apt-get update && \
    apt-get install -y package && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Alpine
RUN apk add --no-cache package
```

### 8. ใช้ multi-stage builds
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/server.js"]
```

### 9. ใช้ HEALTHCHECK
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost/ || exit 1
```

### 10. ตั้งค่า WORKDIR อย่างชัดเจน
```dockerfile
# ❌ ไม่ดี
RUN cd /app && npm install

# ✅ ดี
WORKDIR /app
RUN npm install
```

---

## DOCKERFILE TEMPLATES

### Node.js Application
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
USER nodejs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD node healthcheck.js
CMD ["node", "dist/server.js"]
```

### Python Flask Application
```dockerfile
FROM python:3.11-slim
WORKDIR /app
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1
RUN groupadd -r appgroup && \
    useradd -r -g appgroup -u 1001 appuser
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY --chown=appuser:appgroup . .
USER appuser
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=3s \
  CMD python healthcheck.py
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

### Go Application
```dockerfile
# Build stage
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Production stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1
CMD ["./main"]
```

### Static Website (Nginx)
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
```

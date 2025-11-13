# 🔐 Security Headers - คู่มือความรู้ฉบับสมบูรณ์

## 📚 สารบัญ
1. [Security Headers คืออะไร?](#security-headers-คืออะไร)
2. [ทำไมต้องใช้ Security Headers](#ทำไมต้องใช้-security-headers)
3. [Headers แต่ละตัวอธิบายละเอียด](#headers-แต่ละตัวอธิบายละเอียด)
4. [Architecture & Flow](#architecture--flow)
5. [วิธีใช้งานใน Project](#วิธีใช้งานใน-project)
6. [Backend Integration](#backend-integration)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Security Headers คืออะไร?

**Security Headers** คือ HTTP Headers พิเศษที่ส่งไปพร้อมกับทุก request จาก Frontend ไปยัง Backend เพื่อ:

- 🔍 **ระบุตัวตน** - บอกว่า request มาจากไหน
- 📊 **ติดตาม** - Track request ผ่านหลายระบบ
- 🛡️ **ความปลอดภัย** - ป้องกันการโจมตี และ abuse
- 📈 **วิเคราะห์** - เก็บข้อมูลสำหรับ analytics
- 🐛 **Debug** - ช่วยแก้ปัญหาได้รวดเร็ว

---

## 💡 ทำไมต้องใช้ Security Headers?

### ปัญหาที่เกิดขึ้นถ้าไม่มี:

❌ **ไม่สามารถติดตาม Request**
```
User: "ฉันกดปุ่มแล้วมันไม่ทำงาน!"
Dev: "ไม่รู้ว่า request ไหน ไปหา log ไม่เจอ..."
```

❌ **ไม่รู้ว่า User ใช้ Version เก่า**
```
User: "App ฉันใช้ไม่ได้"
Dev: "ตรวจสอบแล้วเจอว่าใช้ version 1.0 (deprecated 6 เดือนแล้ว)"
```

❌ **ถูก Abuse โดยไม่รู้ตัว**
```
Hacker: ส่ง 10,000 requests จาก 1 device
System: รับหมดเพราะไม่มี rate limiting
```

### แก้ได้อย่างไร:

✅ **มี Request ID = ติดตามได้ทุก Log**
```
User: "Request ID: req-1234-5678"
Dev: grep "req-1234-5678" logs/*
→ เจอปัญหาภายใน 30 วินาที!
```

✅ **มี Version Check = บังคับ Update**
```
Backend: "Version 1.0 ไม่รองรับแล้ว"
→ แสดง dialog "กรุณา update app"
```

✅ **มี Device ID = Rate Limiting ได้**
```
Backend: Device "dev-abc" ส่ง 1000 req/min
→ Block ทันที!
```

---

## 📋 Headers แต่ละตัวอธิบายละเอียด

### 1. 🎫 X-Request-ID

**คืออะไร:** รหัสประจำตัว Request ที่ไม่ซ้ำกัน

**รูปแบบ:**
```
X-Request-ID: req-1729512345678-x7k9m2p4q
                   ↑ timestamp    ↑ random
```

**ทำไมต้องมี:**
- ติดตาม request จาก frontend → backend → database → response
- Link logs จากหลายระบบเข้าด้วยกัน
- Debug ง่าย แค่รู้ Request ID ก็หา log ได้ทันที

**ตัวอย่างการใช้งาน:**

**Scenario 1: User Report Bug**
```
User: "ฉันสั่งซื้อไม่สำเร็จ"
Dev: "ขอ Request ID หน่อยครับ"
User: "req-1234-5678"

Dev (ค้นหา logs):
→ Frontend log: req-1234-5678 → POST /api/orders
→ Backend log: req-1234-5678 → Database timeout!
→ Database log: req-1234-5678 → Connection pool full

แก้ไข: เพิ่ม connection pool size
```

**Scenario 2: Performance Monitoring**
```
Monitor: Request req-1234-5678 ใช้เวลา 5 วินาที

Trace:
Frontend → 0.1s
Network → 0.2s
Backend → 4.5s (ช้า!)
  ↳ Database query → 4.2s (ปัญหาอยู่ตรงนี้!)
  
Action: Optimize query หรือเพิ่ม index
```

**Scenario 3: Error Tracking**
```
Sentry Alert:
Error: Payment failed
Request ID: req-1234-5678
User: john@example.com
Time: 2025-10-21 10:30:00

→ Click ดู full stack trace
→ ดู related logs ทั้งหมด
→ Reproduce ได้ทันที
```

---

### 2. 📱 X-Client-Version

**คืออะไร:** Version ของ App/Website

**รูปแบบ:**
```
X-Client-Version: 2.1.5
```

**ทำไมต้องมี:**
- บังคับให้ user update app เมื่อ version เก่าเกินไป
- Debug ปัญหาเฉพาะ version
- วิเคราะห์ว่า user ส่วนใหญ่ใช้ version ไหน
- วางแผน deprecate API เก่า

**ตัวอย่างการใช้งาน:**

**Scenario 1: Force Update**
```javascript
// Backend
if (clientVersion < '2.0.0') {
  return {
    error: 'UPGRADE_REQUIRED',
    message: 'กรุณา update app เป็น version ล่าสุด',
    minVersion: '2.0.0',
    downloadUrl: 'https://...'
  }
}

// Frontend แสดง Dialog
┌─────────────────────────────────┐
│  📱 ต้องการ Update                │
│                                 │
│  App version ของคุณเก่าเกินไป    │
│  กรุณา update เป็น v2.0.0       │
│                                 │
│  [ดาวน์โหลดเลย] [ทีหลัง]        │
└─────────────────────────────────┘
```

**Scenario 2: Version-Specific Bug**
```
Bug Report:
- Version 2.1.0-2.1.3: แสดงรูปไม่ได้
- Version 2.1.4+: แก้แล้ว

Backend Check:
if (clientVersion >= '2.1.0' && clientVersion < '2.1.4') {
  logger.warn('User with buggy version', { clientVersion });
  // อาจส่ง notification แนะนำให้ update
}
```

**Scenario 3: Analytics**
```sql
-- Query: Version Distribution
SELECT 
  client_version,
  COUNT(*) as users,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM requests
WHERE date = '2025-10-21'
GROUP BY client_version
ORDER BY users DESC;

Results:
┌─────────────┬───────┬────────────┐
│ Version     │ Users │ Percentage │
├─────────────┼───────┼────────────┤
│ 2.1.5       │ 5420  │ 54.2%      │
│ 2.1.4       │ 2310  │ 23.1%      │
│ 2.0.0       │ 1850  │ 18.5%      │
│ 1.9.0       │  420  │  4.2%      │ ← ควร deprecate
└─────────────┴───────┴────────────┘

Decision: Deprecate version 1.x.x
```

---

### 3. 💻 X-Client-Platform

**คืออะไร:** Platform ที่ใช้งาน

**รูปแบบ:**
```
X-Client-Platform: web | ios | android | mobile-web | tablet-web | server
```

**ทำไมต้องมี:**
- แยก analytics ตาม platform
- Debug ปัญหาเฉพาะ platform
- ปรับ response ให้เหมาะกับ platform
- A/B testing แยกตาม platform

**ตัวอย่างการใช้งาน:**

**Scenario 1: Platform-Specific Bug**
```
Bug Report: "iOS 16 ไม่แสดงวิดีโอ"

Backend Log:
platform=ios, version=16.0 → video_error
platform=ios, version=17.0 → OK
platform=android → OK
platform=web → OK

→ พบว่าเป็น bug เฉพาะ iOS 16
→ ส่ง fallback สำหรับ iOS 16 เท่านั้น
```

**Scenario 2: Optimize Response Size**
```javascript
// Backend
if (platform === 'mobile-web' || platform === 'ios' || platform === 'android') {
  // ส่งรูปขนาดเล็ก + ข้อมูลแบบสรุป
  return {
    images: images.map(img => img.thumbnail),
    data: summaryData
  }
} else {
  // ส่งรูปขนาดใหญ่ + ข้อมูลแบบละเอียด
  return {
    images: images.map(img => img.fullsize),
    data: fullData
  }
}
```

**Scenario 3: Platform Analytics**
```
Daily Report - Oct 21, 2025:

Revenue by Platform:
┌─────────────┬──────────┬────────────┐
│ Platform    │ Revenue  │ Sessions   │
├─────────────┼──────────┼────────────┤
│ ios         │ $5,420   │ 12,450     │ ← Highest revenue
│ android     │ $3,210   │ 18,320     │
│ web         │ $2,850   │ 25,640     │
│ mobile-web  │ $1,120   │  8,450     │
└─────────────┴──────────┴────────────┘

Insight: iOS users มี conversion rate สูงสุด
Action: เพิ่ม marketing budget สำหรับ iOS
```

---

### 4. 📱 X-Device-ID

**คืออะไร:** รหัสประจำตัวอุปกรณ์ (ไม่ซ้ำกัน ถาวร)

**รูปแบบ:**
```
X-Device-ID: dev-550e8400-e29b-41d4-a716-446655440000
```

**จัดเก็บ:** localStorage (ถาวร แม้ปิด browser)

**ทำไมต้องมี:**
- ตรวจจับ suspicious activities
- Rate limiting ต่อ device
- Block device ที่ abuse
- Track unique devices

**ตัวอย่างการใช้งาน:**

**Scenario 1: Detect Account Sharing**
```javascript
// Backend Security Check
const user = await User.findById(userId);
const devices = await getDevicesForUser(userId);

if (devices.length > 5) {
  logger.warn('Suspicious: User has too many devices', {
    userId,
    deviceCount: devices.length
  });
  
  // อาจส่ง email แจ้งเตือน
  sendSecurityAlert(user.email, 'หลายอุปกรณ์เข้าใช้งานบัญชีของคุณ');
}
```

**Scenario 2: Rate Limiting**
```javascript
// Backend Rate Limiter
const deviceId = req.headers['x-device-id'];
const key = `rate_limit:${deviceId}`;

const requestCount = await redis.incr(key);
await redis.expire(key, 60); // 1 minute

if (requestCount > 100) {
  return res.status(429).json({
    error: 'TOO_MANY_REQUESTS',
    message: 'กรุณารอสักครู่แล้วลองใหม่',
    retryAfter: 60
  });
}
```

**Scenario 3: Block Abusive Device**
```javascript
// Backend
const deviceId = req.headers['x-device-id'];
const isBlocked = await redis.get(`blocked:${deviceId}`);

if (isBlocked) {
  return res.status(403).json({
    error: 'DEVICE_BLOCKED',
    message: 'อุปกรณ์นี้ถูกระงับการใช้งาน',
    reason: 'Abuse detected',
    contact: 'support@example.com'
  });
}

// Detect abuse
const errorCount = await countErrors(deviceId, last24Hours);
if (errorCount > 1000) {
  await redis.set(`blocked:${deviceId}`, '1', 'EX', 86400); // Block 24h
  logger.error('Device blocked due to abuse', { deviceId, errorCount });
}
```

**Scenario 4: Analytics - Unique Devices**
```sql
-- Query: Daily Active Devices
SELECT 
  DATE(created_at) as date,
  COUNT(DISTINCT device_id) as unique_devices,
  COUNT(*) as total_requests
FROM requests
WHERE created_at >= NOW() - INTERVAL 30 DAY
GROUP BY DATE(created_at);

Results:
┌────────────┬─────────────────┬────────────────┐
│ Date       │ Unique Devices  │ Total Requests │
├────────────┼─────────────────┼────────────────┤
│ 2025-10-21 │ 15,420          │ 125,340        │
│ 2025-10-20 │ 14,850          │ 118,920        │
│ 2025-10-19 │ 15,120          │ 121,450        │
└────────────┴─────────────────┴────────────────┘

Metric: Average 8.1 requests per device per day
```

---

### 5. 🎫 X-Session-ID

**คืออะไร:** รหัสประจำตัว Session (ชั่วคราว)

**รูปแบบ:**
```
X-Session-ID: sess-1729512345678-550e8400-e29b-41d4-a716
```

**จัดเก็บ:** sessionStorage (หายเมื่อปิด tab)

**ทำไมต้องมี:**
- Track user journey ใน 1 session
- วิเคราะห์ behavior
- Session timeout detection
- Funnel analysis

**ตัวอย่างการใช้งาน:**

**Scenario 1: User Journey Tracking**
```javascript
// Backend: Track pages visited in this session
const sessionId = req.headers['x-session-id'];

await logPageView({
  sessionId,
  page: req.path,
  timestamp: Date.now()
});

// Query session
const journey = await getSessionJourney(sessionId);

Result:
┌──────────┬─────────────────────┬─────────────┐
│ Time     │ Page                │ Duration    │
├──────────┼─────────────────────┼─────────────┤
│ 10:00:00 │ /                   │ 15s         │
│ 10:00:15 │ /products           │ 45s         │
│ 10:01:00 │ /products/iphone-15 │ 2m 30s      │
│ 10:03:30 │ /cart               │ 1m 15s      │
│ 10:04:45 │ /checkout           │ 3m 20s      │
│ 10:08:05 │ /order/success      │ -           │
└──────────┴─────────────────────┴─────────────┘

Insight: Session นี้ convert! (จาก landing → purchase)
```

**Scenario 2: Funnel Analysis**
```javascript
// Backend: E-commerce Funnel
const funnelSteps = [
  '/products',      // Step 1: Browse
  '/cart',          // Step 2: Add to cart
  '/checkout',      // Step 3: Checkout
  '/payment',       // Step 4: Payment
  '/order/success'  // Step 5: Success
];

const funnel = await analyzeFunnel(funnelSteps, lastWeek);

Results:
┌───────┬──────────────────┬──────────┬──────────────┐
│ Step  │ Page             │ Sessions │ Drop-off %   │
├───────┼──────────────────┼──────────┼──────────────┤
│ 1     │ /products        │ 10,000   │ -            │
│ 2     │ /cart            │  5,500   │ 45%  ⚠️      │
│ 3     │ /checkout        │  3,200   │ 42%          │
│ 4     │ /payment         │  2,800   │ 12%          │
│ 5     │ /order/success   │  2,650   │  5%          │
└───────┴──────────────────┴──────────┴──────────────┘

Problem: Drop-off สูงมากที่ step 2 (Add to cart → Checkout)
Action: ปรับปรุง UX ของ cart page
```

**Scenario 3: Session Timeout**
```javascript
// Backend: Check session activity
const sessionId = req.headers['x-session-id'];
const lastActivity = await redis.get(`session:${sessionId}:last_activity`);

if (lastActivity) {
  const idleTime = Date.now() - parseInt(lastActivity);
  const maxIdleTime = 30 * 60 * 1000; // 30 minutes
  
  if (idleTime > maxIdleTime) {
    return res.status(401).json({
      error: 'SESSION_TIMEOUT',
      message: 'Session หมดอายุ กรุณา login ใหม่'
    });
  }
}

// Update last activity
await redis.set(
  `session:${sessionId}:last_activity`, 
  Date.now().toString(),
  'EX',
  3600
);
```

---

### 6. 🌐 X-Browser-Info

**คืออะไร:** ข้อมูล Browser และ Version

**รูปแบบ:**
```
X-Browser-Info: Chrome/120 | Firefox/119 | Safari/17 | Edge/120
```

**ทำไมต้องมี:**
- Debug browser-specific bugs
- Support older browsers
- Analytics browser usage
- Optimize for popular browsers

**ตัวอย่างการใช้งาน:**

**Scenario 1: Browser Compatibility**
```javascript
// Backend
const browserInfo = req.headers['x-browser-info'];
const [browser, version] = browserInfo.split('/');

// Check if browser is too old
const minVersions = {
  'Chrome': 100,
  'Firefox': 100,
  'Safari': 15,
  'Edge': 100
};

if (parseInt(version) < minVersions[browser]) {
  return res.json({
    warning: 'OUTDATED_BROWSER',
    message: 'Browser ของคุณอาจไม่รองรับฟีเจอร์บางอย่าง',
    recommendation: 'กรุณา update browser'
  });
}
```

**Scenario 2: Browser Analytics**
```
Browser Market Share (Last 30 days):
┌──────────┬──────────┬────────────┐
│ Browser  │ Users    │ Percentage │
├──────────┼──────────┼────────────┤
│ Chrome   │ 125,420  │ 62.7%      │
│ Safari   │  45,320  │ 22.7%      │
│ Edge     │  18,950  │  9.5%      │
│ Firefox  │  10,310  │  5.1%      │
└──────────┴──────────┴────────────┘

Decision: Focus testing on Chrome & Safari
```

---

### 7. ⏰ X-Request-Time

**คืออะไร:** เวลาที่ส่ง Request (ISO 8601)

**รูปแบบ:**
```
X-Request-Time: 2025-10-21T10:30:45.123Z
```

**ทำไมต้องมี:**
- คำนวณ latency
- Timezone handling
- Audit trail
- Performance monitoring

**ตัวอย่างการใช้งาน:**

**Scenario 1: Calculate Latency**
```javascript
// Backend
const requestTime = new Date(req.headers['x-request-time']);
const serverTime = new Date();
const networkLatency = serverTime - requestTime;

logger.info('Request latency', {
  requestId: req.headers['x-request-id'],
  latency: networkLatency,
  client_time: requestTime.toISOString(),
  server_time: serverTime.toISOString()
});

if (networkLatency > 5000) { // > 5 seconds
  logger.warn('High latency detected', {
    requestId: req.headers['x-request-id'],
    latency: networkLatency
  });
}
```

---

## 🏗️ Architecture & Flow

### Request Flow:

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USER ACTION                                                  │
│    User clicks button → Send request                            │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. FRONTEND (Http2Service)                                      │
│    ✅ Generate Request ID: req-1729512345678-x7k9m2p4q          │
│    ✅ Get Device ID: dev-550e8400-... (from localStorage)       │
│    ✅ Get Session ID: sess-1729512345678-... (from sessionStorage)│
│    ✅ Detect Platform: web                                      │
│    ✅ Detect Browser: Chrome/120                                │
│    ✅ Get Version: 0.1.0                                        │
│    ✅ Add Timestamp: 2025-10-21T10:30:45.123Z                   │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. HTTP REQUEST                                                 │
│    POST /api/orders                                             │
│    Headers:                                                     │
│      Authorization: Bearer xxx                                  │
│      X-Request-ID: req-1729512345678-x7k9m2p4q                  │
│      X-Device-ID: dev-550e8400-...                              │
│      X-Session-ID: sess-1729512345678-...                       │
│      X-Client-Version: 0.1.0                                    │
│      X-Client-Platform: web                                     │
│      X-Browser-Info: Chrome/120                                 │
│      X-Request-Time: 2025-10-21T10:30:45.123Z                   │
│    Body: { product_id: 123, quantity: 2 }                       │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. BACKEND (API Server)                                         │
│    ✅ Read headers                                              │
│    ✅ Log with Request ID                                       │
│    ✅ Check version (force update if needed)                    │
│    ✅ Rate limiting per device                                  │
│    ✅ Track session journey                                     │
│    ✅ Process business logic                                    │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. DATABASE                                                     │
│    ✅ Log query with Request ID                                 │
│    ✅ Execute query                                             │
│    ✅ Return result                                             │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. RESPONSE                                                     │
│    Status: 200 OK                                               │
│    Headers:                                                     │
│      X-Request-ID: req-1729512345678-x7k9m2p4q (same!)          │
│    Body: { order_id: 789, status: 'success' }                   │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. FRONTEND                                                     │
│    ✅ Receive response                                          │
│    ✅ Log with Request ID (if dev mode)                         │
│    ✅ Show success message                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Log Correlation:

```
Frontend Log (Browser Console):
[10:30:45.123] 🌐 POST /api/orders
├─ Request ID: req-1729512345678-x7k9m2p4q
├─ Device ID: dev-550e8400-...
└─ Session ID: sess-1729512345678-...

Backend Log (Server):
[10:30:45.456] INFO: API Request
├─ requestId: req-1729512345678-x7k9m2p4q  ← Same ID!
├─ deviceId: dev-550e8400-...
├─ userId: user-123
├─ method: POST
├─ path: /api/orders
└─ latency: 333ms (45.456 - 45.123)

Database Log:
[10:30:45.500] QUERY: INSERT INTO orders
├─ requestId: req-1729512345678-x7k9m2p4q  ← Same ID!
├─ duration: 44ms
└─ rows: 1

Backend Log (Response):
[10:30:45.789] INFO: API Response
├─ requestId: req-1729512345678-x7k9m2p4q  ← Same ID!
├─ status: 200
├─ duration: 333ms
└─ bytes: 256

Frontend Log (Browser Console):
[10:30:45.850] ✅ POST /api/orders - 200
├─ Request ID: req-1729512345678-x7k9m2p4q  ← Same ID!
└─ Total time: 727ms (45.850 - 45.123)
```

---

## 💻 วิธีใช้งานใน Project

### 1. Basic Usage (Auto-included):

```typescript
// ทุก request จะมี security headers อัตโนมัติ
const data = await Http2Service.httpGET({
  url: '/api/users',
  accessToken: token
});

// Headers ที่ส่งไป:
// X-Request-ID: req-1729512345678-x7k9m2p4q
// X-Client-Version: 0.1.0
// X-Client-Platform: web
// X-Device-ID: dev-550e8400-...
// X-Session-ID: sess-1729512345678-...
// X-Browser-Info: Chrome/120
// X-Request-Time: 2025-10-21T10:30:45.123Z
```

### 2. Disable Security Headers (if needed):

```typescript
const data = await Http2Service.httpGET({
  url: '/api/public',
  accessToken: null,
  includeSecurityHeaders: false  // ไม่ส่ง security headers
});
```

### 3. Get Current IDs:

```typescript
const ids = Http2Service.getCurrentIds();
console.log(ids);
// {
//   deviceId: "dev-550e8400-...",
//   sessionId: "sess-1729512345678-...",
//   platform: "web",
//   browser: "Chrome/120",
//   version: "0.1.0"
// }
```

### 4. Manual Header Building:

```typescript
const headers = Http2Service.buildSecurityHeaders({
  'Custom-Header': 'custom-value'
});

// headers = {
//   'X-Request-ID': 'req-...',
//   'X-Client-Version': '0.1.0',
//   'X-Client-Platform': 'web',
//   'X-Device-ID': 'dev-...',
//   'X-Session-ID': 'sess-...',
//   'X-Browser-Info': 'Chrome/120',
//   'X-Request-Time': '2025-10-21T10:30:45.123Z',
//   'Custom-Header': 'custom-value'
// }
```

### 5. Clear IDs (Logout):

```typescript
// เรียกตอน logout
Http2Service.clearStoredIds();
// ลบ Device ID และ Session ID ออกจาก storage
```

### 6. Debug Logging:

```typescript
// ดู logs ใน dev mode
Http2Service.logRequest('GET', '/api/users', headers);
Http2Service.logResponse('GET', '/api/users', 200, data);
```

---

## 🔌 Backend Integration

เราจะแบ่งการ integrate ออกเป็น 3 ส่วนหลัก:
1. **Next.js API Routes** (Built-in Backend)
2. **Express.js** (Standalone Backend Server)
3. **NestJS** (Enterprise Backend Framework)

---

## 📘 1. Next.js API Routes Integration

### 1.1 Middleware (Global for all API routes)

```typescript
// middleware.ts (root level)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // ใช้สำหรับ API routes เท่านั้น
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const startTime = Date.now();

  // Read security headers from request
  const requestId = request.headers.get('x-request-id') || generateRequestId();
  const deviceId = request.headers.get('x-device-id');
  const sessionId = request.headers.get('x-session-id');
  const clientVersion = request.headers.get('x-client-version');
  const clientPlatform = request.headers.get('x-client-platform');
  const browserInfo = request.headers.get('x-browser-info');
  const requestTime = request.headers.get('x-request-time');

  // Log request
  console.log('🌐 API Request', {
    requestId,
    deviceId,
    sessionId,
    clientVersion,
    clientPlatform,
    method: request.method,
    path: request.nextUrl.pathname,
    timestamp: new Date().toISOString(),
  });

  // Create response
  const response = NextResponse.next();

  // Add security headers to response
  response.headers.set('X-Request-ID', requestId);
  response.headers.set('X-Response-Time', new Date().toISOString());

  return response;
}

function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export const config = {
  matcher: '/api/:path*', // Apply to all API routes
};
```

### 1.2 API Route with Security Headers

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Helper: Extract security headers
function getSecurityContext(request: NextRequest) {
  return {
    requestId: request.headers.get('x-request-id'),
    deviceId: request.headers.get('x-device-id'),
    sessionId: request.headers.get('x-session-id'),
    clientVersion: request.headers.get('x-client-version'),
    clientPlatform: request.headers.get('x-client-platform'),
    browserInfo: request.headers.get('x-browser-info'),
    requestTime: request.headers.get('x-request-time'),
  };
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const context = getSecurityContext(request);

  try {
    // Log incoming request
    console.log('📥 GET /api/users', context);

    // Your business logic here
    const users = await fetchUsersFromDatabase();

    // Calculate duration
    const duration = Date.now() - startTime;

    // Log success
    console.log('✅ GET /api/users completed', {
      ...context,
      status: 200,
      duration,
      count: users.length,
    });

    // Return response with security headers
    return NextResponse.json(users, {
      status: 200,
      headers: {
        'X-Request-ID': context.requestId || '',
        'X-Response-Time': duration.toString(),
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    // Log error
    console.error('❌ GET /api/users failed', {
      ...context,
      error: error.message,
      duration,
    });

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: 'เกิดข้อผิดพลาด',
        requestId: context.requestId,
      },
      {
        status: 500,
        headers: {
          'X-Request-ID': context.requestId || '',
        },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const context = getSecurityContext(request);

  try {
    const body = await request.json();

    console.log('📥 POST /api/users', {
      ...context,
      body: sanitizeBody(body),
    });

    const user = await createUser(body);

    const duration = Date.now() - startTime;

    console.log('✅ POST /api/users completed', {
      ...context,
      status: 201,
      duration,
      userId: user.id,
    });

    return NextResponse.json(user, {
      status: 201,
      headers: {
        'X-Request-ID': context.requestId || '',
        'X-Response-Time': duration.toString(),
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    console.error('❌ POST /api/users failed', {
      ...context,
      error: error.message,
      duration,
    });

    return NextResponse.json(
      {
        error: 'CREATE_FAILED',
        message: 'ไม่สามารถสร้าง user ได้',
        requestId: context.requestId,
      },
      {
        status: 500,
        headers: {
          'X-Request-ID': context.requestId || '',
        },
      }
    );
  }
}

// Helper: Sanitize sensitive data from logs
function sanitizeBody(body: any) {
  const sanitized = { ...body };
  const sensitiveFields = ['password', 'token', 'secret', 'apiKey'];

  sensitiveFields.forEach((field) => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });

  return sanitized;
}
```

### 1.3 Version Check Middleware

```typescript
// app/api/middleware/version-check.ts
import { NextRequest, NextResponse } from 'next/server';

const MIN_VERSION = '0.1.0';
const DEPRECATED_VERSIONS = ['0.0.1', '0.0.2'];

export function versionCheckMiddleware(request: NextRequest) {
  const clientVersion = request.headers.get('x-client-version');

  if (!clientVersion) {
    return null; // Allow requests without version
  }

  // Check deprecated versions
  if (DEPRECATED_VERSIONS.includes(clientVersion)) {
    return NextResponse.json(
      {
        error: 'VERSION_DEPRECATED',
        message: 'Version นี้ไม่รองรับแล้ว กรุณา update',
        minVersion: MIN_VERSION,
      },
      { status: 426 } // Upgrade Required
    );
  }

  // Compare versions (simple comparison)
  if (compareVersions(clientVersion, MIN_VERSION) < 0) {
    return NextResponse.json(
      {
        error: 'VERSION_TOO_OLD',
        message: 'กรุณา update app เป็น version ล่าสุด',
        currentVersion: clientVersion,
        minVersion: MIN_VERSION,
        downloadUrl: 'https://example.com/download',
      },
      { status: 426 }
    );
  }

  return null; // Pass through
}

function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const num1 = parts1[i] || 0;
    const num2 = parts2[i] || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
}

// Use in API route
export async function GET(request: NextRequest) {
  // Check version first
  const versionError = versionCheckMiddleware(request);
  if (versionError) return versionError;

  // Continue with normal logic
  // ...
}
```

### 1.4 Rate Limiting with Upstash Redis

```typescript
// lib/rate-limiter.ts
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function rateLimit(
  deviceId: string,
  maxRequests: number = 100,
  windowSeconds: number = 60
) {
  const key = `rate_limit:${deviceId}`;

  try {
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, windowSeconds);
    }

    if (count > maxRequests) {
      return {
        limited: true,
        remaining: 0,
        resetTime: windowSeconds,
      };
    }

    return {
      limited: false,
      remaining: maxRequests - count,
      resetTime: await redis.ttl(key),
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    return {
      limited: false,
      remaining: maxRequests,
      resetTime: windowSeconds,
    };
  }
}

// Use in API route
export async function POST(request: NextRequest) {
  const deviceId = request.headers.get('x-device-id');

  if (deviceId) {
    const rateStatus = await rateLimit(deviceId);

    if (rateStatus.limited) {
      return NextResponse.json(
        {
          error: 'TOO_MANY_REQUESTS',
          message: 'คุณส่ง request บ่อยเกินไป กรุณารอสักครู่',
          retryAfter: rateStatus.resetTime,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateStatus.remaining.toString(),
            'X-RateLimit-Reset': rateStatus.resetTime.toString(),
          },
        }
      );
    }
  }

  // Continue with normal logic
  // ...
}
```

---

## 📗 2. Express.js Backend Integration

### 2.1 Security Headers Middleware

```typescript
// middleware/security-headers.middleware.ts
import { Request, Response, NextFunction } from 'express';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      requestContext?: {
        requestId: string;
        deviceId?: string;
        sessionId?: string;
        clientVersion?: string;
        clientPlatform?: string;
        browserInfo?: string;
        requestTime?: string;
        startTime: number;
      };
    }
  }
}

export function securityHeadersMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();

  // Extract security headers
  const requestId =
    req.headers['x-request-id'] ||
    `req-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  const deviceId = req.headers['x-device-id'] as string;
  const sessionId = req.headers['x-session-id'] as string;
  const clientVersion = req.headers['x-client-version'] as string;
  const clientPlatform = req.headers['x-client-platform'] as string;
  const browserInfo = req.headers['x-browser-info'] as string;
  const requestTime = req.headers['x-request-time'] as string;

  // Store in request context
  req.requestContext = {
    requestId,
    deviceId,
    sessionId,
    clientVersion,
    clientPlatform,
    browserInfo,
    requestTime,
    startTime,
  };

  // Log incoming request
  console.log('🌐 Incoming Request', {
    requestId,
    deviceId,
    sessionId,
    clientVersion,
    clientPlatform,
    method: req.method,
    path: req.path,
    ip: req.ip,
  });

  // Set response header
  res.setHeader('X-Request-ID', requestId);

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - startTime;

    console.log('✅ Request Completed', {
      requestId,
      deviceId,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
}
```

### 2.2 Version Check Middleware

```typescript
// middleware/version-check.middleware.ts
import { Request, Response, NextFunction } from 'express';

const MIN_VERSION = '0.1.0';
const DEPRECATED_VERSIONS = ['0.0.1', '0.0.2'];

export function versionCheckMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clientVersion = req.headers['x-client-version'] as string;

  if (!clientVersion) {
    return next(); // Allow requests without version
  }

  // Check deprecated
  if (DEPRECATED_VERSIONS.includes(clientVersion)) {
    return res.status(426).json({
      error: 'VERSION_DEPRECATED',
      message: 'Version นี้ไม่รองรับแล้ว กรุณา update',
      minVersion: MIN_VERSION,
      requestId: req.requestContext?.requestId,
    });
  }

  // Check minimum version
  if (compareVersions(clientVersion, MIN_VERSION) < 0) {
    return res.status(426).json({
      error: 'VERSION_TOO_OLD',
      message: 'กรุณา update app เป็น version ล่าสุด',
      currentVersion: clientVersion,
      minVersion: MIN_VERSION,
      downloadUrl: 'https://example.com/download',
      requestId: req.requestContext?.requestId,
    });
  }

  next();
}

function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const num1 = parts1[i] || 0;
    const num2 = parts2[i] || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
}
```

### 2.3 Rate Limiting Middleware

```typescript
// middleware/rate-limiter.middleware.ts
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export function rateLimiterMiddleware(options?: {
  maxRequests?: number;
  windowSeconds?: number;
}) {
  const maxRequests = options?.maxRequests || 100;
  const windowSeconds = options?.windowSeconds || 60;

  return async (req: Request, res: Response, next: NextFunction) => {
    const deviceId = req.headers['x-device-id'] as string;

    if (!deviceId) {
      return next(); // Skip if no device ID
    }

    try {
      // Check if device is blocked
      const isBlocked = await redis.get(`blocked:${deviceId}`);
      if (isBlocked) {
        return res.status(403).json({
          error: 'DEVICE_BLOCKED',
          message: 'อุปกรณ์นี้ถูกระงับการใช้งาน',
          contact: 'support@example.com',
          requestId: req.requestContext?.requestId,
        });
      }

      // Rate limiting
      const key = `rate_limit:${deviceId}`;
      const count = await redis.incr(key);

      if (count === 1) {
        await redis.expire(key, windowSeconds);
      }

      const ttl = await redis.ttl(key);

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', maxRequests.toString());
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - count).toString());
      res.setHeader('X-RateLimit-Reset', ttl.toString());

      if (count > maxRequests) {
        // Log abuse
        await redis.incr(`abuse:${deviceId}`);

        return res.status(429).json({
          error: 'TOO_MANY_REQUESTS',
          message: 'คุณส่ง request บ่อยเกินไป กรุณารอสักครู่',
          retryAfter: ttl,
          requestId: req.requestContext?.requestId,
        });
      }

      next();
    } catch (error) {
      console.error('Rate limiter error:', error);
      next(); // Fail open
    }
  };
}
```

### 2.4 Session Tracking Middleware

```typescript
// middleware/session-tracker.middleware.ts
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export function sessionTrackerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId = req.headers['x-session-id'] as string;

  if (!sessionId) {
    return next();
  }

  // Track page view
  const pageView = {
    page: req.path,
    method: req.method,
    timestamp: Date.now(),
  };

  redis
    .rpush(`session:${sessionId}:journey`, JSON.stringify(pageView))
    .then(() => redis.expire(`session:${sessionId}:journey`, 3600)) // 1 hour
    .catch((error) => console.error('Session tracking error:', error));

  // Update last activity
  redis
    .set(`session:${sessionId}:last_activity`, Date.now().toString(), 'EX', 1800) // 30 minutes
    .catch((error) => console.error('Last activity update error:', error));

  next();
}

// Helper: Get session journey
export async function getSessionJourney(sessionId: string) {
  const key = `session:${sessionId}:journey`;
  const journey = await redis.lrange(key, 0, -1);
  return journey.map((item) => JSON.parse(item));
}
```

### 2.5 Express App Setup

```typescript
// app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { securityHeadersMiddleware } from './middleware/security-headers.middleware';
import { versionCheckMiddleware } from './middleware/version-check.middleware';
import { rateLimiterMiddleware } from './middleware/rate-limiter.middleware';
import { sessionTrackerMiddleware } from './middleware/session-tracker.middleware';

const app = express();

// Basic middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Security headers middleware (ต้องมาก่อนอันอื่น)
app.use(securityHeadersMiddleware);

// Version check
app.use(versionCheckMiddleware);

// Rate limiting
app.use(
  rateLimiterMiddleware({
    maxRequests: 100,
    windowSeconds: 60,
  })
);

// Session tracking
app.use(sessionTrackerMiddleware);

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await fetchUsers();

    res.json({
      success: true,
      data: users,
      requestId: req.requestContext?.requestId,
    });
  } catch (error) {
    console.error('Error fetching users:', {
      requestId: req.requestContext?.requestId,
      error: error.message,
    });

    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'เกิดข้อผิดพลาด',
      requestId: req.requestContext?.requestId,
    });
  }
});

// Error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', {
    requestId: req.requestContext?.requestId,
    error: error.message,
    stack: error.stack,
  });

  res.status(500).json({
    error: 'INTERNAL_ERROR',
    message: 'เกิดข้อผิดพลาด',
    requestId: req.requestContext?.requestId,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
```

---

## � 3. NuxtJS Backend Integration

> **Nuxt 3** ใช้ **Nitro** เป็น server engine ที่มีความเร็วสูงและรองรับ **Serverless** deployment  
> มี **Server Middleware**, **API Routes**, **Server Utils** ที่ใช้งานง่ายและทรงพลัง

### 3.1 Nuxt Server Middleware (Global):

```typescript
// server/middleware/security-headers.ts
import type { H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  const headers = getRequestHeaders(event)
  
  // Read security headers
  const requestId = headers['x-request-id'] || generateRequestId()
  const deviceId = headers['x-device-id']
  const sessionId = headers['x-session-id']
  const clientVersion = headers['x-client-version']
  const clientPlatform = headers['x-client-platform']
  const browserInfo = headers['x-browser-info']
  const requestTime = headers['x-request-time']
  
  // Store in event context for later use
  event.context.requestContext = {
    requestId,
    deviceId,
    sessionId,
    clientVersion,
    clientPlatform,
    browserInfo,
    requestTime,
    startTime: Date.now()
  }
  
  // Set response header
  setResponseHeader(event, 'X-Request-ID', requestId)
  
  // Log request (optional)
  console.log('📥 Incoming request:', {
    requestId,
    deviceId,
    method: event.node.req.method,
    url: event.node.req.url,
    clientVersion,
    clientPlatform
  })
})

// Helper function
function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
```

### 3.2 Nuxt Version Check Middleware:

```typescript
// server/middleware/version-check.ts
import { createError } from 'h3'
import semver from 'semver'

const MIN_VERSION = '0.1.0'
const DEPRECATED_VERSIONS = ['0.0.1', '0.0.2']

export default defineEventHandler((event) => {
  const headers = getRequestHeaders(event)
  const clientVersion = headers['x-client-version'] as string
  
  // Skip if no version header (backward compatibility)
  if (!clientVersion) {
    return
  }
  
  // Check if version is deprecated
  if (DEPRECATED_VERSIONS.includes(clientVersion)) {
    throw createError({
      statusCode: 426, // Upgrade Required
      statusMessage: 'VERSION_DEPRECATED',
      data: {
        error: 'VERSION_DEPRECATED',
        message: 'Version นี้ไม่รองรับแล้ว กรุณา update',
        minVersion: MIN_VERSION,
        currentVersion: clientVersion
      }
    })
  }
  
  // Check if version is too old
  if (semver.valid(clientVersion) && semver.lt(clientVersion, MIN_VERSION)) {
    throw createError({
      statusCode: 426,
      statusMessage: 'VERSION_TOO_OLD',
      data: {
        error: 'VERSION_TOO_OLD',
        message: 'กรุณา update app เป็น version ล่าสุด',
        currentVersion: clientVersion,
        minVersion: MIN_VERSION,
        downloadUrl: 'https://example.com/download'
      }
    })
  }
})
```

### 3.3 Nuxt Rate Limiting Middleware:

```typescript
// server/middleware/rate-limiter.ts
import { createError } from 'h3'

// Simple in-memory rate limiting (production: use Redis)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  blockDuration: 60 * 60 * 1000 // 1 hour
}

// Blocked devices cache
const blockedDevices = new Set<string>()

export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event)
  const deviceId = headers['x-device-id'] as string
  
  // Skip if no device ID
  if (!deviceId) {
    return
  }
  
  // Check if device is blocked
  if (blockedDevices.has(deviceId)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'DEVICE_BLOCKED',
      data: {
        error: 'DEVICE_BLOCKED',
        message: 'อุปกรณ์นี้ถูกระงับการใช้งาน',
        contact: 'support@example.com'
      }
    })
  }
  
  // Get or create rate limit entry
  const now = Date.now()
  let entry = rateLimitStore.get(deviceId)
  
  if (!entry || now > entry.resetAt) {
    entry = {
      count: 0,
      resetAt: now + RATE_LIMIT_CONFIG.windowMs
    }
    rateLimitStore.set(deviceId, entry)
  }
  
  entry.count++
  
  // Check if rate limit exceeded
  if (entry.count > RATE_LIMIT_CONFIG.maxRequests) {
    // Block device for longer period
    blockedDevices.add(deviceId)
    
    // Auto-unblock after duration
    setTimeout(() => {
      blockedDevices.delete(deviceId)
    }, RATE_LIMIT_CONFIG.blockDuration)
    
    throw createError({
      statusCode: 429,
      statusMessage: 'TOO_MANY_REQUESTS',
      data: {
        error: 'TOO_MANY_REQUESTS',
        message: 'คุณส่ง request บ่อยเกินไป กรุณารอสักครู่',
        retryAfter: Math.ceil((entry.resetAt - now) / 1000),
        limit: RATE_LIMIT_CONFIG.maxRequests,
        current: entry.count
      }
    })
  }
  
  // Set rate limit headers
  setResponseHeaders(event, {
    'X-RateLimit-Limit': String(RATE_LIMIT_CONFIG.maxRequests),
    'X-RateLimit-Remaining': String(RATE_LIMIT_CONFIG.maxRequests - entry.count),
    'X-RateLimit-Reset': String(Math.ceil(entry.resetAt / 1000))
  })
})
```

### 3.4 Nuxt Rate Limiting with Redis (Production):

```typescript
// server/middleware/rate-limiter-redis.ts
import { createError } from 'h3'
import Redis from 'ioredis'

// Initialize Redis client (use Nuxt runtime config)
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379
})

const RATE_LIMIT_CONFIG = {
  windowSeconds: 60,
  maxRequests: 100
}

export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event)
  const deviceId = headers['x-device-id'] as string
  
  if (!deviceId) {
    return
  }
  
  // Check if device is blocked
  const isBlocked = await redis.get(`blocked:${deviceId}`)
  if (isBlocked) {
    throw createError({
      statusCode: 403,
      data: {
        error: 'DEVICE_BLOCKED',
        message: 'อุปกรณ์นี้ถูกระงับการใช้งาน'
      }
    })
  }
  
  // Rate limiting with Redis
  const key = `rate_limit:${deviceId}`
  const requestCount = await redis.incr(key)
  
  if (requestCount === 1) {
    await redis.expire(key, RATE_LIMIT_CONFIG.windowSeconds)
  }
  
  if (requestCount > RATE_LIMIT_CONFIG.maxRequests) {
    // Block device for 1 hour
    await redis.set(`blocked:${deviceId}`, '1', 'EX', 3600)
    
    // Log abuse
    await redis.set(`abuse:${deviceId}`, String(requestCount), 'EX', 3600)
    
    throw createError({
      statusCode: 429,
      data: {
        error: 'TOO_MANY_REQUESTS',
        message: 'คุณส่ง request บ่อยเกินไป',
        retryAfter: RATE_LIMIT_CONFIG.windowSeconds
      }
    })
  }
  
  // Set rate limit headers
  const remaining = RATE_LIMIT_CONFIG.maxRequests - requestCount
  setResponseHeaders(event, {
    'X-RateLimit-Limit': String(RATE_LIMIT_CONFIG.maxRequests),
    'X-RateLimit-Remaining': String(remaining > 0 ? remaining : 0)
  })
})
```

### 3.5 Nuxt API Route with Security Context:

```typescript
// server/api/users/index.get.ts
export default defineEventHandler(async (event) => {
  // Access request context from middleware
  const { requestId, deviceId, sessionId, clientVersion } = event.context.requestContext || {}
  
  try {
    // Log with context
    console.log('📋 Fetching users', {
      requestId,
      deviceId,
      sessionId
    })
    
    // Business logic
    const users = await $fetch('/api/users')
    
    return {
      success: true,
      data: users,
      meta: {
        requestId,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    // Log error with context
    console.error('❌ Failed to fetch users', {
      requestId,
      deviceId,
      error: error.message
    })
    
    throw createError({
      statusCode: 500,
      data: {
        error: 'FETCH_FAILED',
        message: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
        requestId // Return request ID for debugging
      }
    })
  }
})
```

### 3.6 Nuxt Session Tracking with Composable:

```typescript
// server/utils/session-tracker.ts
import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379
})

export const sessionTracker = {
  async trackPageView(sessionId: string, page: string, userId?: string) {
    const key = `session:${sessionId}:journey`
    const data = JSON.stringify({
      page,
      userId,
      timestamp: Date.now()
    })
    
    await redis.rpush(key, data)
    await redis.expire(key, 3600) // 1 hour
  },
  
  async getSessionJourney(sessionId: string) {
    const key = `session:${sessionId}:journey`
    const journey = await redis.lrange(key, 0, -1)
    return journey.map(item => JSON.parse(item))
  },
  
  async updateLastActivity(sessionId: string) {
    const key = `session:${sessionId}:last_activity`
    await redis.set(key, Date.now().toString(), 'EX', 1800) // 30 minutes
  },
  
  async checkSessionTimeout(sessionId: string): Promise<boolean> {
    const key = `session:${sessionId}:last_activity`
    const lastActivity = await redis.get(key)
    
    if (!lastActivity) {
      return true // Session timeout
    }
    
    const idleTime = Date.now() - parseInt(lastActivity)
    const maxIdleTime = 30 * 60 * 1000 // 30 minutes
    
    return idleTime > maxIdleTime
  }
}
```

### 3.7 Use Session Tracker in API Route:

```typescript
// server/api/products/index.get.ts
export default defineEventHandler(async (event) => {
  const { sessionId } = event.context.requestContext || {}
  
  if (sessionId) {
    await sessionTracker.trackPageView(sessionId, '/api/products')
    await sessionTracker.updateLastActivity(sessionId)
  }
  
  const products = await fetchProducts()
  
  return {
    success: true,
    data: products
  }
})
```

### 3.8 Nuxt Error Handler with Request ID:

```typescript
// server/middleware/error-handler.ts
export default defineEventHandler((event) => {
  // This runs AFTER other handlers
  event.node.res.on('finish', () => {
    const statusCode = event.node.res.statusCode
    const { requestId, deviceId } = event.context.requestContext || {}
    const duration = Date.now() - (event.context.requestContext?.startTime || Date.now())
    
    // Log completion
    const logLevel = statusCode >= 500 ? '❌' : statusCode >= 400 ? '⚠️' : '✅'
    console.log(`${logLevel} Request completed`, {
      requestId,
      deviceId,
      method: event.node.req.method,
      url: event.node.req.url,
      statusCode,
      duration: `${duration}ms`
    })
  })
})
```

### 3.9 Nuxt Composable for Frontend:

```typescript
// composables/useSecurityHeaders.ts
export const useSecurityHeaders = () => {
  const deviceId = useState<string>('deviceId', () => {
    // Get from localStorage
    if (process.client) {
      let id = localStorage.getItem('x-device-id')
      if (!id) {
        id = `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('x-device-id', id)
      }
      return id
    }
    return ''
  })
  
  const sessionId = useState<string>('sessionId', () => {
    // Get from sessionStorage
    if (process.client) {
      let id = sessionStorage.getItem('x-session-id')
      if (!id) {
        id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem('x-session-id', id)
      }
      return id
    }
    return ''
  })
  
  const getSecurityHeaders = () => {
    return {
      'X-Request-ID': `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      'X-Device-ID': deviceId.value,
      'X-Session-ID': sessionId.value,
      'X-Client-Version': '1.0.0',
      'X-Client-Platform': process.client ? 'web' : 'server',
      'X-Browser-Info': process.client ? navigator.userAgent : '',
      'X-Request-Time': new Date().toISOString()
    }
  }
  
  return {
    deviceId,
    sessionId,
    getSecurityHeaders
  }
}
```

### 3.10 Use Composable in Nuxt Component:

```vue
<!-- pages/products.vue -->
<script setup lang="ts">
const { getSecurityHeaders } = useSecurityHeaders()

const { data, error } = await useFetch('/api/products', {
  headers: getSecurityHeaders()
})
</script>

<template>
  <div>
    <h1>Products</h1>
    <div v-if="error">Error: {{ error.data?.requestId }}</div>
    <div v-else>{{ data }}</div>
  </div>
</template>
```

### 3.11 Nuxt Plugin for Global Error Handling:

```typescript
// plugins/error-handler.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    const { getSecurityHeaders } = useSecurityHeaders()
    const headers = getSecurityHeaders()
    
    console.error('Vue Error:', {
      error: error.message,
      requestId: headers['X-Request-ID'],
      deviceId: headers['X-Device-ID'],
      info
    })
    
    // Send to error tracking service
    // $fetch('/api/errors', {
    //   method: 'POST',
    //   headers,
    //   body: { error: error.message, stack: error.stack }
    // })
  })
})
```

---

## ✅ Best Practices

### 📝 1. Logging Best Practices

#### 1.1 Always Log with Request ID

```typescript
// ❌ Bad - ไม่มี context
logger.info('User created');

// ✅ Good - มี context ครบถ้วน
logger.info('User created', {
  requestId: req.headers['x-request-id'],
  deviceId: req.headers['x-device-id'],
  sessionId: req.headers['x-session-id'],
  userId: user.id,
  timestamp: new Date().toISOString()
});
```

#### 1.2 Structured Logging

```typescript
// ✅ Good: Use structured logs for easy parsing
logger.info({
  event: 'USER_LOGIN',
  requestId: context.requestId,
  userId: user.id,
  deviceId: context.deviceId,
  platform: context.clientPlatform,
  version: context.clientVersion,
  duration: Date.now() - startTime,
  success: true
});

// ✅ Good: Include severity levels
logger.error({
  event: 'LOGIN_FAILED',
  requestId: context.requestId,
  reason: 'INVALID_PASSWORD',
  attempts: user.failedAttempts,
  severity: 'HIGH'
});
```

#### 1.3 Log Correlation Across Services

```typescript
// ✅ Good: Propagate Request ID to all services
const orderService = await fetch('https://order-service.com/api/orders', {
  headers: {
    'X-Request-ID': req.headers['x-request-id'],
    'X-Parent-Request-ID': parentRequestId, // Track call chain
    'X-Service-Name': 'user-service'
  }
});

// Log with correlation
logger.info('Called order service', {
  requestId: req.headers['x-request-id'],
  parentRequestId,
  targetService: 'order-service',
  endpoint: '/api/orders'
});
```

---

### 🔒 2. Security Best Practices

#### 2.1 Return Request ID in All Error Responses

```typescript
// ❌ Bad - ไม่มี Request ID
return res.status(500).json({
  error: 'INTERNAL_ERROR',
  message: 'เกิดข้อผิดพลาด'
});

// ✅ Good - มี Request ID สำหรับ debugging
try {
  // ... business logic
} catch (error) {
  const requestId = req.headers['x-request-id'];
  
  // Log error with full context
  logger.error('Internal error', {
    requestId,
    error: error.message,
    stack: error.stack
  });
  
  return res.status(500).json({
    error: 'INTERNAL_ERROR',
    message: 'เกิดข้อผิดพลาด',
    requestId, // ← User สามารถส่ง ID นี้ให้ support
    timestamp: new Date().toISOString()
  });
}
```

#### 2.2 Sanitize Headers in Logs

```typescript
// ❌ Bad - อาจ leak sensitive data
logger.info('Request received', { headers: req.headers });

// ✅ Good - Redact sensitive headers
const sanitizeHeaders = (headers: any) => {
  const sanitized = { ...headers };
  const sensitiveKeys = ['authorization', 'cookie', 'x-api-key'];
  
  sensitiveKeys.forEach(key => {
    if (sanitized[key]) {
      sanitized[key] = '***REDACTED***';
    }
  });
  
  return sanitized;
};

logger.info('Request received', {
  requestId: req.headers['x-request-id'],
  headers: sanitizeHeaders(req.headers)
});
```

#### 2.3 Validate All Security Headers

```typescript
// ✅ Good: Validate header formats
const validateSecurityHeaders = (headers: any) => {
  const deviceId = headers['x-device-id'];
  const sessionId = headers['x-session-id'];
  
  // Check format
  if (deviceId && !/^device-\d+-[a-z0-9]{9}$/.test(deviceId)) {
    throw new Error('Invalid device ID format');
  }
  
  if (sessionId && !/^session-\d+-[a-z0-9]{9}$/.test(sessionId)) {
    throw new Error('Invalid session ID format');
  }
  
  return { deviceId, sessionId };
};
```

#### 2.4 Implement Header Signature

```typescript
// ✅ Good: Sign headers to prevent tampering
import crypto from 'crypto';

const signHeaders = (headers: any, secret: string) => {
  const dataToSign = JSON.stringify({
    deviceId: headers['x-device-id'],
    sessionId: headers['x-session-id'],
    timestamp: headers['x-request-time']
  });
  
  return crypto
    .createHmac('sha256', secret)
    .update(dataToSign)
    .digest('hex');
};

// Client-side
headers['X-Signature'] = signHeaders(headers, SECRET_KEY);

// Server-side validation
const isValidSignature = (headers: any, signature: string) => {
  const expectedSignature = signHeaders(headers, SECRET_KEY);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
};
```

---

### ⚡ 3. Performance Best Practices

#### 3.1 Cache Security Headers

```typescript
// ✅ Good: Cache device/session IDs in memory
class HeaderCache {
  private static cache = new Map<string, any>();
  
  static get(key: string) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour
      return cached.value;
    }
    return null;
  }
  
  static set(key: string, value: any) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }
}

// Usage
const deviceId = HeaderCache.get('deviceId') || Http2Service.getDeviceId();
HeaderCache.set('deviceId', deviceId);
```

#### 3.2 Batch Log Writes

```typescript
// ✅ Good: Batch logs to reduce I/O
class BatchLogger {
  private buffer: any[] = [];
  private flushInterval: NodeJS.Timeout;
  
  constructor() {
    this.flushInterval = setInterval(() => this.flush(), 5000); // 5 seconds
  }
  
  log(entry: any) {
    this.buffer.push({
      ...entry,
      timestamp: Date.now()
    });
    
    if (this.buffer.length >= 100) {
      this.flush();
    }
  }
  
  async flush() {
    if (this.buffer.length === 0) return;
    
    const batch = [...this.buffer];
    this.buffer = [];
    
    await logService.batchWrite(batch);
  }
}
```

#### 3.3 Use Compression for Large Headers

```typescript
// ✅ Good: Compress browser info if too large
import zlib from 'zlib';

const compressBrowserInfo = (userAgent: string) => {
  if (userAgent.length > 500) {
    return zlib.gzipSync(userAgent).toString('base64');
  }
  return userAgent;
};

headers['X-Browser-Info'] = compressBrowserInfo(navigator.userAgent);
```

#### 3.4 Lazy Load Session Tracking

```typescript
// ✅ Good: Only track sessions when needed
const trackSession = async (sessionId: string, page: string) => {
  // Skip tracking for static assets
  if (page.match(/\.(js|css|png|jpg|svg)$/)) {
    return;
  }
  
  // Use background job
  await queue.add('session-tracking', {
    sessionId,
    page,
    timestamp: Date.now()
  }, {
    priority: 'low'
  });
};
```

---

### 🔄 4. Rate Limiting Best Practices

#### 4.1 Monitor and Alert

```typescript
// ✅ Good: Alert when rate limit is frequently hit
if (requestCount > RATE_LIMIT * 0.8) {
  await monitoring.sendAlert({
    type: 'RATE_LIMIT_WARNING',
    deviceId,
    current: requestCount,
    limit: RATE_LIMIT,
    timestamp: Date.now()
  });
}
```

#### 4.2 Adaptive Rate Limiting

```typescript
// ✅ Good: Adjust limits based on user behavior
const getAdaptiveLimit = async (deviceId: string) => {
  const trustScore = await getUserTrustScore(deviceId);
  
  // Trusted users get higher limits
  if (trustScore > 0.8) return 200;
  if (trustScore > 0.5) return 100;
  return 50; // New or suspicious users
};
```

#### 4.3 Whitelist Critical Services

```typescript
// ✅ Good: Skip rate limiting for internal services
const isInternalService = (headers: any) => {
  const apiKey = headers['x-api-key'];
  return INTERNAL_API_KEYS.includes(apiKey);
};

if (!isInternalService(req.headers)) {
  await rateLimiter.check(deviceId);
}
```

#### 4.4 Different Limits per Endpoint

```typescript
// ✅ Good: Different limits for different endpoints
const RATE_LIMITS = {
  '/api/auth/login': { max: 5, window: 300 },      // 5 per 5 min
  '/api/users': { max: 100, window: 60 },          // 100 per min
  '/api/search': { max: 50, window: 60 },          // 50 per min
  'default': { max: 100, window: 60 }
};

const limit = RATE_LIMITS[req.path] || RATE_LIMITS.default;
```

---

### 📱 5. Version Management Best Practices

#### 5.1 Version Deprecation Strategy

```typescript
// ✅ Good: Gradual deprecation with warnings
const version = req.headers['x-client-version'];

if (semver.lt(version, '2.0.0')) {
  // Step 1: Warning phase (month 1-2)
  res.setHeader('X-Deprecation-Warning', 'true');
  res.setHeader('X-Min-Version', '2.0.0');
  res.setHeader('X-Deprecation-Date', '2025-12-31');
  
  // Step 2: Soft enforcement (month 3)
  const rolloutPercentage = 0.5; // 50% of users
  if (Math.random() < rolloutPercentage) {
    if (isAfter(new Date(), deprecationDate)) {
      throw new HttpException('VERSION_DEPRECATED', 426);
    }
  }
  
  // Step 3: Full enforcement (month 4+)
  // All users must update
}
```

#### 5.2 Feature Flags per Version

```typescript
// ✅ Good: Enable features based on version
const features = {
  'darkMode': { minVersion: '1.5.0' },
  'aiAssistant': { minVersion: '2.0.0' },
  'videoCall': { minVersion: '2.1.0' }
};

const isFeatureEnabled = (feature: string, version: string) => {
  const config = features[feature];
  return config && semver.gte(version, config.minVersion);
};

// API response
res.json({
  data: products,
  features: {
    darkMode: isFeatureEnabled('darkMode', clientVersion),
    aiAssistant: isFeatureEnabled('aiAssistant', clientVersion)
  }
});
```

#### 5.3 Version Analytics

```typescript
// ✅ Good: Track version adoption
const trackVersionUsage = async (version: string, platform: string) => {
  await analytics.increment(`version.${version}.${platform}`, 1);
  
  // Alert if old version usage is high
  const oldVersionUsage = await analytics.get(`version.1.0.0.*`);
  if (oldVersionUsage > 1000) {
    await alerting.send({
      type: 'OLD_VERSION_HIGH_USAGE',
      version: '1.0.0',
      count: oldVersionUsage
    });
  }
};
```

---

### 🧪 6. Testing Best Practices

#### 6.1 Mock Security Headers in Tests

```typescript
// ✅ Good: Create test helper for headers
export const createMockHeaders = (overrides = {}) => ({
  'x-request-id': `req-test-${Date.now()}`,
  'x-device-id': 'device-test-123',
  'x-session-id': 'session-test-456',
  'x-client-version': '1.0.0',
  'x-client-platform': 'web',
  'x-browser-info': 'Mozilla/5.0 Test',
  'x-request-time': new Date().toISOString(),
  ...overrides
});

// Usage in tests
it('should handle request with security headers', async () => {
  const response = await request(app)
    .get('/api/users')
    .set(createMockHeaders({ 'x-client-version': '2.0.0' }));
  
  expect(response.status).toBe(200);
});
```

#### 6.2 Test Rate Limiting

```typescript
// ✅ Good: Test rate limiting behavior
it('should rate limit after 100 requests', async () => {
  const deviceId = 'device-test-rate-limit';
  
  // Send 100 requests
  for (let i = 0; i < 100; i++) {
    await request(app)
      .get('/api/data')
      .set(createMockHeaders({ 'x-device-id': deviceId }));
  }
  
  // 101st request should be rate limited
  const response = await request(app)
    .get('/api/data')
    .set(createMockHeaders({ 'x-device-id': deviceId }));
  
  expect(response.status).toBe(429);
  expect(response.body.error).toBe('TOO_MANY_REQUESTS');
});
```

#### 6.3 Test Version Compatibility

```typescript
// ✅ Good: Test version compatibility matrix
const versionTests = [
  { version: '0.0.1', expected: 426, message: 'Deprecated' },
  { version: '0.5.0', expected: 426, message: 'Too old' },
  { version: '1.0.0', expected: 200, message: 'Supported' },
  { version: '2.0.0', expected: 200, message: 'Latest' }
];

versionTests.forEach(({ version, expected, message }) => {
  it(`should ${message} for version ${version}`, async () => {
    const response = await request(app)
      .get('/api/data')
      .set(createMockHeaders({ 'x-client-version': version }));
    
    expect(response.status).toBe(expected);
  });
});
```

---

### 📊 7. Monitoring & Observability Best Practices

#### 7.1 Track Key Metrics

```typescript
// ✅ Good: Track important metrics
const metrics = {
  async recordRequest(context: any) {
    await prometheus.counter('http_requests_total', {
      method: context.method,
      path: context.path,
      status: context.status,
      platform: context.clientPlatform,
      version: context.clientVersion
    }).inc();
  },
  
  async recordDuration(context: any, duration: number) {
    await prometheus.histogram('http_request_duration_ms', {
      path: context.path,
      platform: context.clientPlatform
    }).observe(duration);
  },
  
  async recordRateLimit(deviceId: string, blocked: boolean) {
    await prometheus.counter('rate_limit_events', {
      blocked: blocked.toString()
    }).inc();
  }
};
```

#### 7.2 Create Dashboards

```typescript
// ✅ Good: Create meaningful dashboards
const dashboardQueries = {
  // Requests by platform
  requestsByPlatform: `
    rate(http_requests_total[5m]) by (platform)
  `,
  
  // Average response time
  avgResponseTime: `
    avg(http_request_duration_ms) by (path)
  `,
  
  // Rate limit blocks
  rateLimitBlocks: `
    sum(rate(rate_limit_events{blocked="true"}[5m]))
  `,
  
  // Version adoption
  versionAdoption: `
    count(http_requests_total) by (version)
  `
};
```

#### 7.3 Set Up Alerts

```typescript
// ✅ Good: Alert on critical issues
const alerts = [
  {
    name: 'HighErrorRate',
    condition: 'rate(http_requests_total{status=~"5.."}[5m]) > 10',
    severity: 'critical',
    message: 'Error rate exceeded 10 req/s'
  },
  {
    name: 'HighRateLimitBlocks',
    condition: 'rate(rate_limit_events{blocked="true"}[5m]) > 5',
    severity: 'warning',
    message: 'Rate limit blocks exceeded 5/s'
  },
  {
    name: 'OldVersionUsage',
    condition: 'sum(http_requests_total{version=~"0.*"}) > 1000',
    severity: 'info',
    message: 'High usage of deprecated versions'
  }
];
```

---

### 🔐 8. Privacy & Compliance Best Practices

#### 8.1 Data Retention Policy

```typescript
// ✅ Good: Implement data retention
const dataRetention = {
  logs: 30 * 24 * 60 * 60, // 30 days
  sessions: 7 * 24 * 60 * 60, // 7 days
  rateLimit: 24 * 60 * 60, // 24 hours
  
  async cleanupOldData() {
    const now = Date.now();
    
    // Clean old logs
    await db.logs.deleteMany({
      timestamp: { $lt: now - this.logs * 1000 }
    });
    
    // Clean old sessions
    await redis.scan('session:*', async (key) => {
      const ttl = await redis.ttl(key);
      if (ttl < 0) await redis.del(key);
    });
  }
};

// Run cleanup daily
setInterval(() => dataRetention.cleanupOldData(), 24 * 60 * 60 * 1000);
```

#### 8.2 User Consent Management

```typescript
// ✅ Good: Check consent before tracking
const canTrackUser = async (deviceId: string) => {
  const consent = await db.consents.findOne({ deviceId });
  return consent?.analytics === true;
};

const trackPageView = async (sessionId: string, page: string) => {
  const deviceId = await getDeviceIdFromSession(sessionId);
  
  if (await canTrackUser(deviceId)) {
    await analytics.track({ sessionId, page });
  }
};
```

#### 8.3 Anonymize Logs

```typescript
// ✅ Good: Anonymize PII in logs
const anonymizePII = (data: any) => {
  const anonymized = { ...data };
  
  // Hash email
  if (anonymized.email) {
    anonymized.email = crypto
      .createHash('sha256')
      .update(anonymized.email)
      .digest('hex')
      .substr(0, 16);
  }
  
  // Mask IP
  if (anonymized.ip) {
    const parts = anonymized.ip.split('.');
    anonymized.ip = `${parts[0]}.${parts[1]}.xxx.xxx`;
  }
  
  return anonymized;
};
```

---

### 🚀 9. Deployment Best Practices

#### 9.1 Environment-Specific Configuration

```typescript
// ✅ Good: Different configs per environment
const config = {
  development: {
    rateLimit: { max: 1000, window: 60 },
    logLevel: 'debug',
    versionCheck: false
  },
  staging: {
    rateLimit: { max: 500, window: 60 },
    logLevel: 'info',
    versionCheck: true
  },
  production: {
    rateLimit: { max: 100, window: 60 },
    logLevel: 'warn',
    versionCheck: true,
    strictMode: true
  }
};

const currentConfig = config[process.env.NODE_ENV || 'development'];
```

#### 9.2 Health Checks

```typescript
// ✅ Good: Comprehensive health check
app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION,
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      externalApis: await checkExternalAPIs()
    }
  };
  
  const isHealthy = Object.values(health.checks).every(c => c.status === 'ok');
  
  res.status(isHealthy ? 200 : 503).json(health);
});
```

#### 9.3 Graceful Shutdown

```typescript
// ✅ Good: Graceful shutdown with cleanup
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, starting graceful shutdown');
  
  // Stop accepting new requests
  server.close(() => {
    console.log('Server closed');
  });
  
  // Flush logs
  await batchLogger.flush();
  
  // Close connections
  await redis.quit();
  await db.close();
  
  process.exit(0);
});
```

---

### 📖 10. Documentation Best Practices

#### 10.1 Document All Headers

```typescript
/**
 * Security Headers Documentation
 * 
 * @header X-Request-ID - Unique identifier for request tracking
 * @example "req-1634567890-abc123def"
 * @required false
 * 
 * @header X-Device-ID - Persistent device identifier
 * @example "device-1634567890-xyz789"
 * @required true (for authenticated requests)
 * 
 * @header X-Client-Version - Application version
 * @example "1.2.3"
 * @required true
 * @validation semver format
 */
```

#### 10.2 API Response Examples

```typescript
// ✅ Good: Document response format with headers
/**
 * GET /api/users
 * 
 * Request Headers:
 * - X-Request-ID: req-123
 * - X-Device-ID: device-456
 * - X-Client-Version: 1.0.0
 * 
 * Success Response (200):
 * {
 *   "success": true,
 *   "data": [...],
 *   "meta": {
 *     "requestId": "req-123",
 *     "timestamp": "2025-10-21T10:00:00Z"
 *   }
 * }
 * 
 * Error Response (500):
 * {
 *   "error": "INTERNAL_ERROR",
 *   "message": "เกิดข้อผิดพลาด",
 *   "requestId": "req-123",
 *   "timestamp": "2025-10-21T10:00:00Z"
 * }
 */
```

---

## 🐛 Troubleshooting

### Problem 1: Device ID หายหลัง clear browser data

**Solution:**
```typescript
// Generate new device ID
const newDeviceId = Http2Service.getDeviceId();
// Device ID จะถูกสร้างใหม่อัตโนมัติ
```

### Problem 2: Session ID หายหลัง refresh page

**Solution:**
```typescript
// นี่คือ expected behavior
// Session ID ควรถูกสร้างใหม่ทุกครั้งที่เปิด tab ใหม่
// ถ้าต้องการ persist ให้ใช้ Device ID แทน
```

### Problem 3: Request ID ไม่ match ระหว่าง frontend และ backend

**Solution:**
```typescript
// Backend ต้อง return Request ID กลับมา
res.setHeader('X-Request-ID', req.headers['x-request-id']);

// Frontend log response
console.log('Response Request ID:', response.headers['x-request-id']);
```

### Problem 4: Rate limiting block user ที่ใช้งานปกติ

**Solution:**
```typescript
// ปรับ limit ให้เหมาะสม
const limitsPerPlatform = {
  'mobile-web': 50,   // Mobile ใช้น้อยกว่า
  'web': 100,          // Web ปกติ
  'ios': 150,          // App ใช้บ่อยกว่า
  'android': 150
};

const limit = limitsPerPlatform[platform] || 100;
```

### Problem 5: Version check block old users

**Solution:**
```typescript
// Gradual rollout
const rolloutPercentage = 0.1; // 10% of users
const shouldForceUpdate = Math.random() < rolloutPercentage;

if (shouldForceUpdate && isOldVersion(clientVersion)) {
  throw new HttpException('VERSION_DEPRECATED', 426);
}
```

---

## 📚 Summary

### ข้อดีของ Security Headers:

✅ **Debugging ง่ายขึ้น** - Track request ได้ทุก log  
✅ **Security ดีขึ้น** - Detect abuse, rate limiting  
✅ **Analytics ชัดเจน** - แยกตาม platform, version, device  
✅ **User Experience ดีขึ้น** - Force update เมื่อ version เก่า  
✅ **Performance Monitoring** - วัด latency ได้แม่นยำ  

### ข้อควรระวัง:

⚠️ **Privacy** - Device ID ต้องไม่เชื่อมกับข้อมูลส่วนตัว  
⚠️ **GDPR/PDPA** - ต้องมี consent และ data retention policy  
⚠️ **Performance** - Header ขนาดใหญ่เกินไปอาจทำให้ช้า  
⚠️ **Testing** - ต้องมี mock headers ใน unit tests  

---

## � เปรียบเทียบ Backend Frameworks

### ตารางเปรียบเทียบคุณสมบัติ

| Feature | Next.js API Routes | Express.js | NuxtJS (Nitro) |
|---------|-------------------|------------|----------------|
| **Middleware Support** | ✅ Built-in | ✅ Full support | ✅ Server Middleware |
| **TypeScript** | ✅ Native | ⚠️ Needs setup | ✅ Native |
| **Rate Limiting** | ⚠️ External (Upstash) | ✅ redis/memory | ⚠️ Manual/Redis |
| **Logging** | ⚠️ Manual | ⚠️ Manual | ⚠️ Manual |
| **DI Container** | ❌ No | ❌ No | ❌ No |
| **Validation** | ⚠️ Manual | ⚠️ Manual (joi) | ⚠️ Manual (zod) |
| **Setup Complexity** | 🟢 Easy | 🟡 Medium | � Easy |
| **Performance** | 🟢 Fast | 🟢 Fastest | � Very Fast (Nitro) |
| **Learning Curve** | 🟢 Easy | 🟢 Easy | � Easy (Vue devs) |
| **Best For** | Small-Medium | Flexible/Custom | Full-Stack Vue |

### ข้อดี-ข้อเสียแต่ละ Framework

#### 📘 Next.js API Routes

**ข้อดี:**
- ✅ Setup ง่ายมาก ไม่ต้อง config เพิ่ม
- ✅ ใช้ร่วมกับ Frontend ได้ทันที
- ✅ Built-in TypeScript
- ✅ Serverless-ready
- ✅ File-based routing

**ข้อเสีย:**
- ❌ ไม่มี DI container
- ❌ Middleware system จำกัด
- ❌ ต้องใช้ external services สำหรับ rate limiting
- ❌ ไม่เหมาะกับ complex business logic

**เหมาะกับ:**
- 🎯 Small to medium projects
- 🎯 Full-stack Next.js apps
- 🎯 Serverless deployments
- 🎯 Rapid prototyping

---

#### 📗 Express.js

**ข้อดี:**
- ✅ Minimal & flexible
- ✅ Performance สูงสุด
- ✅ Ecosystem ใหญ่มาก
- ✅ Community support ดี
- ✅ Middleware ecosystem ครบ

**ข้อเสีย:**
- ❌ ต้อง setup ทุกอย่างเอง
- ❌ ไม่มี structure แนะนำ
- ❌ TypeScript ต้อง config เอง
- ❌ ไม่มี built-in validation

**เหมาะกับ:**
- 🎯 Custom requirements
- 🎯 Microservices
- 🎯ต้องการ maximum performance
- 🎯 Flexible architecture

---

#### � NuxtJS (Nitro)

**ข้อดี:**
- ✅ Full-stack Vue.js framework
- ✅ TypeScript native support
- ✅ Nitro server engine (fast & lightweight)
- ✅ File-based API routes
- ✅ Auto-imports และ composables
- ✅ SSR, SSG, SPA support
- ✅ Serverless-ready
- ✅ Vue ecosystem integration

**ข้อเสีย:**
- ❌ ต้อง setup rate limiting เอง
- ❌ ไม่มี DI container
- ❌ Logging ต้อง implement เอง
- ❌ Middleware ยังไม่ซับซ้อนเท่า Express

**เหมาะกับ:**
- 🎯 Full-stack Vue.js applications
- 🎯 Vue developers ที่ต้องการ backend
- 🎯 Universal rendering (SSR/SSG)
- 🎯 Modern serverless deployment
- 🎯 Rapid development with Vue

---

## 🎯 แนะนำการเลือกใช้

### Scenario 1: Small Project (MVP, Prototype)
```
✅ Next.js API Routes หรือ NuxtJS
- Setup ง่าย
- Deploy เร็ว
- Maintenance น้อย
```

### Scenario 2: Custom Requirements
```
✅ Express.js
- Maximum flexibility
- Performance สูง
- Full control
```

### Scenario 3: Full-Stack Vue Application
```
✅ NuxtJS (Nitro)
- Native Vue integration
- Universal rendering
- Modern tooling
```

### Scenario 4: Hybrid Approach
```
✅ Next.js/NuxtJS Frontend + Express.js Backend
- Best of both worlds
- Clear separation
- Independent scaling
```

---

## 🚀 Quick Start Checklist

### Next.js API Routes
- [ ] Create `middleware.ts` in root
- [ ] Add security headers extraction
- [ ] Setup Upstash Redis (optional)
- [ ] Add version check in routes
- [ ] Test with frontend

### Express.js
- [ ] Install dependencies: `express cors helmet ioredis`
- [ ] Create middleware folder
- [ ] Add all 4 middlewares (security, version, rate-limit, session)
- [ ] Setup app.ts with middleware order
- [ ] Configure Redis connection
- [ ] Test endpoints

### NuxtJS
- [ ] Create `server/middleware/` folder
- [ ] Add security-headers.ts middleware
- [ ] Add version-check.ts middleware
- [ ] Add rate-limiter.ts middleware (with Redis)
- [ ] Create `composables/useSecurityHeaders.ts`
- [ ] Setup Redis connection (optional)
- [ ] Test API routes with $fetch

---

## �🔗 Related Documents

- [HTTP2 Service Documentation](./http-service-class.md)
- [Error Handling Guide](./error-handling.md)
- [API Integration Guide](./api-integration.md)

---

## 📞 Support & Contact

**Questions?**
- GitHub Issues: [project-issues]
- Email:    choonewza@gmail.com
- Slack: #backend-support

---

**Last Updated:** October 21, 2025  
**Version:** 2.0.0  
**Author:** Development Team

**Changelog:**
- v2.0.0 (2025-10-21): Added Next.js, Express.js, NestJS integration guides
- v1.0.0 (2025-10-21): Initial release with basic concepts


# 📊 การวิเคราะห์ Engagement ของเพจ Facebook ขั้นสูง (Advanced Edition)
**Version:** 2.0 | **Updated:** October 2025  
**เป้าหมาย:** วิเคราะห์และเปรียบเทียบ Engagement Score อย่างครบวงจร รองรับ Algorithm และ Privacy Policy ล่าสุดของ Facebook/Meta

---

## 📑 สารบัญ
1. [ภาพรวม Engagement ในยุค 2025](#1-ภาพรวม-engagement-ในยุค-2025)
2. [ตัวชี้วัดหลัก (Core Metrics)](#2-ตัวชี้วัดหลัก-core-metrics)
3. [สูตรการคำนวณพื้นฐาน](#3-สูตรการคำนวณพื้นฐาน)
4. [สูตรการคำนวณขั้นสูง](#4-สูตรการคำนวณขั้นสูง)
5. [Video & Reels Metrics](#5-video--reels-metrics)
6. [Meaningful Interactions Score](#6-meaningful-interactions-score)
7. [Benchmarking ตามอุตสาหกรรม](#7-benchmarking-ตามอุตสาหกรรม)
8. [การดึงข้อมูลด้วย Meta API](#8-การดึงข้อมูลด้วย-meta-api)
9. [Automation & AI Integration](#9-automation--ai-integration)
10. [ข้อจำกัดและแนวทางแก้ไข](#10-ข้อจำกัดและแนวทางแก้ไข)
11. [Dashboard & Reporting](#11-dashboard--reporting)
12. [เคสสตัดดี้และตัวอย่างจริง](#12-เคสสตัดดีและตัวอย่างจริง)

---

## 🔹 1. ภาพรวม Engagement ในยุค 2025

### 1.1 การเปลี่ยนแปลงสำคัญของ Facebook Algorithm

**2023-2025:** Facebook/Meta ปรับ Algorithm ให้เน้น **"Meaningful Social Interactions"** มากกว่าแค่ยอด Reactions

#### ปัจจัยที่ Algorithm ให้ความสำคัญ:
- 💬 **Conversation Starter** - โพสต์ที่กระตุ้นให้เกิดการสนทนายาว (Comment threads > 3 ข้อความ)
- 🤝 **Active Engagement** - การตอบกลับ Comment จากเพจภายใน 1 ชั่วโมง
- ⏱️ **Time Spent** - ระยะเวลาที่ผู้ใช้อยู่กับ Content (สำคัญมากสำหรับ Video/Reels)
- 🔄 **Share to Close Friends** - การแชร์ไปยังกลุ่มเพื่อนสนิท (น้ำหนักสูงกว่า Public Share)
- 📱 **Cross-Platform Engagement** - การแชร์ไปยัง Instagram, WhatsApp, Threads

### 1.2 Privacy และข้อจำกัดข้อมูล

**ผลกระทบจาก iOS 14.5+ และ GDPR/PDPA:**
- ⚠️ **Attribution Window** ลดลงจาก 28 วัน → 7 วัน
- 🔒 ข้อมูล Demographic ละเอียดลดลง
- 📊 Third-party Analytics ถูกจำกัดการเข้าถึง
- 🎯 Pixel Tracking ไม่แม่นยำเท่าเดิม

**แนวทางแก้ไข:**
- ใช้ **Meta Business Suite** และ **Graph API** อย่างเป็นทางการ
- ใช้ **First-Party Data** จากเว็บไซต์และ CRM ของตัวเอง
- ทำ **Server-Side Tracking** แทน Browser-Side
- ใช้ **Conversion API (CAPI)** ร่วมกับ Pixel

---

## 🔹 2. ตัวชี้วัดหลัก (Core Metrics)

### 2.1 Engagement Metrics พื้นฐาน

| Metric | สัญลักษณ์ | คำอธิบาย | น้ำหนัก (ปี 2025) |
|--------|-----------|----------|-------------------|
| **Reactions** | 👍❤️😮😆😢😡 | ปฏิกิริยาทั้งหมด (Like, Love, Care, Wow, Haha, Sad, Angry) | 1x |
| **Comments** | 💬 | จำนวนคอมเมนต์ (รวมถึง Reply) | 3x |
| **Shares** | 🔁 | การแชร์โพสต์ (Public + Private) | 5x |
| **Saves** | 🔖 | การบันทึกโพสต์ไว้ดูภายหลัง | 4x |
| **Click-through** | 🖱️ | การคลิกลิงก์, ดูเพิ่มเติม, ดูรูปภาพ | 2x |

**หมายเหตุ:** น้ำหนักแนะนำสำหรับอุตสาหกรรมทั่วไป อาจปรับได้ตามบริบท

### 2.2 Reach & Impression Metrics

| Metric | คำอธิบาย | การใช้งาน |
|--------|----------|-----------|
| **Reach (Organic)** | จำนวนบัญชีที่เห็นโพสต์แบบไม่เสียเงิน | คำนวณ Engagement Rate แม่นยำ |
| **Reach (Paid)** | จำนวนบัญชีที่เห็นโพสต์จากการโฆษณา | วัดประสิทธิภาพโฆษณา |
| **Impressions** | จำนวนครั้งที่โพสต์ถูกแสดง (คนเดียวอาจเห็นหลายครั้ง) | วัด Frequency = Impressions/Reach |
| **Viral Reach** | จำนวนคนที่เห็นจากการแชร์ของเพื่อน | วัดความ Viral ของ Content |

### 2.3 Audience Metrics

| Metric | คำอธิบาย | การใช้งาน |
|--------|----------|-----------|
| **Page Followers** | จำนวนผู้ติดตามเพจ | ใช้เป็น Denominator สำหรับ ER |
| **Page Likes** | จำนวนคนกด Like เพจ | น้อยสำคัญกว่า Followers |
| **Active Followers** | ผู้ติดตามที่มี Engagement ใน 30 วันล่าสุด | วัดคุณภาพของ Audience |
| **Daily Active Users (DAU)** | คนที่เข้าเพจต่อวัน | วัดความเป็น Active Community |

### 2.4 Video-Specific Metrics

| Metric | คำอธิบาย | ความสำคัญ |
|--------|----------|-----------|
| **3-Second Views** | จำนวนครั้งที่วิดีโอเล่นถึง 3 วินาที | Baseline Metric |
| **ThruPlay (15s/97%)** | ดูจนจบหรือ 97% ของความยาว (สำหรับวิดีโอ > 15 วินาที) | คุณภาพ Content |
| **Average Watch Time** | ระยะเวลาเฉลี่ยที่คนดู | Retention Quality |
| **Video Completion Rate** | % ของคนที่ดูจบ | สำคัญมากสำหรับ Algorithm |
| **1-Minute Views** | จำนวนครั้งที่ดูถึง 1 นาที | Monetization Criteria |

---

## 🔹 3. สูตรการคำนวณพื้นฐาน

### 3.1 Engagement Rate (ER) แบบมาตรฐาน

#### วิธีที่ 1: ใช้ Reach (แม่นยำที่สุด)
```
ER_post = (Total Engagements / Reach) × 100

โดยที่ Total Engagements = Reactions + Comments + Shares
```

**ตัวอย่าง:**
- Reactions: 500
- Comments: 80
- Shares: 30
- Reach: 15,000

```
ER = (500 + 80 + 30) / 15,000 × 100 = 4.07%
```

#### วิธีที่ 2: ใช้ Followers (เมื่อไม่มีข้อมูล Reach)
```
ER_post = (Total Engagements / Followers) × 100
```

**ข้อควรระวัง:** วิธีนี้อาจได้ค่าต่ำกว่าความเป็นจริง เพราะโพสต์อาจ Reach มากกว่าจำนวน Followers

#### วิธีที่ 3: ใช้ Impressions (สำหรับวัด Frequency)
```
ER_impression = (Total Engagements / Impressions) × 100
```

### 3.2 Average Engagement Rate (ช่วงเวลา)

```
ER_avg = Σ(ER_post₁ + ER_post₂ + ... + ER_postₙ) / N

โดยที่ N = จำนวนโพสต์ในช่วงเวลาที่วิเคราะห์
```

**แนะนำ:** วิเคราะห์ย้อนหลัง 30-90 วัน และตัดโพสต์ที่มี Paid Reach ออก (เพื่อดูผล Organic)

### 3.3 Engagement Score (Normalized 0-100)

ใช้เพื่อเปรียบเทียบเพจที่มีขนาดต่างกัน

```
Engagement Score = (ER_avg - ER_min) / (ER_max - ER_min) × 100

โดยที่:
- ER_avg = ค่าเฉลี่ยของเพจที่วิเคราะห์
- ER_min = ค่าต่ำสุดในกลุ่มเปรียบเทียบ
- ER_max = ค่าสูงสุดในกลุ่มเปรียบเทียบ
```

**ตัวอย่าง:**
```
เพจเรา: ER_avg = 3.5%
เพจในอุตสาหกรรม (5 เพจ): 1.2%, 2.8%, 3.5%, 4.9%, 6.2%

ER_min = 1.2%
ER_max = 6.2%

Score = (3.5 - 1.2) / (6.2 - 1.2) × 100 = 46
```

---

## 🔹 4. สูตรการคำนวณขั้นสูง

### 4.1 Weighted Engagement Rate

ให้น้ำหนักแต่ละประเภท Action ที่ต่างกัน (เพราะ Comment และ Share มีคุณค่ามากกว่า Like)

```
Weighted Engagement = (Reactions × W₁) + (Comments × W₂) + (Shares × W₃) + (Saves × W₄) + (Clicks × W₅)

ER_weighted = Weighted Engagement / Reach × 100
```

**น้ำหนักแนะนำ (General):**
- W₁ (Reactions) = 1
- W₂ (Comments) = 3
- W₃ (Shares) = 5
- W₄ (Saves) = 4
- W₅ (Clicks) = 2

**ตัวอย่าง:**
```
Reactions: 1,000 × 1 = 1,000
Comments: 150 × 3 = 450
Shares: 40 × 5 = 200
Saves: 80 × 4 = 320
Clicks: 300 × 2 = 600

Weighted Engagement = 2,570
Reach = 25,000

ER_weighted = 2,570 / 25,000 × 100 = 10.28%
```

### 4.2 น้ำหนักปรับตามอุตสาหกรรม

| อุตสาหกรรม | Reactions | Comments | Shares | Saves | Clicks |
|-------------|-----------|----------|--------|-------|--------|
| **E-commerce** | 1 | 2 | 4 | 6 | 5 |
| **News/Media** | 1 | 4 | 6 | 2 | 3 |
| **Entertainment** | 2 | 3 | 5 | 3 | 1 |
| **Education** | 1 | 4 | 5 | 6 | 3 |
| **Finance/Banking** | 1 | 5 | 3 | 4 | 4 |
| **B2B/Tech** | 1 | 4 | 5 | 5 | 4 |

### 4.3 Engagement Velocity (ความเร็วของ Engagement)

วัดว่าโพสต์ได้ Engagement รวดเร็วแค่ไหนในชั่วโมงแรก

```
EV = (Engagements in First Hour / Total Reach in First Hour) × 100
```

**การตีความ:**
- **EV > 5%** = Viral Potential สูง (Algorithm จะ Push ต่อ)
- **EV 2-5%** = ปานกลาง
- **EV < 2%** = ต่ำ (Algorithm อาจจำกัด Reach)

### 4.4 Engagement Depth Score

วัด "ความลึก" ของการมีส่วนร่วม (ไม่ใช่แค่ปริมาณ)

```
Depth Score = (
    (Reactions × 1) +
    (Comments × W_comment) +
    (Replies to Comments × W_reply) +
    (Shares with Text × W_share_text) +
    (Saves × W_save)
) / Total Engagements

โดยที่:
- W_comment = คะแนนตามความยาว (Short=1, Medium=2, Long=3)
- W_reply = 4 (เพราะเป็น Conversation)
- W_share_text = 6 (แชร์พร้อมความเห็นมีคุณค่าสูงสุด)
- W_save = 3
```

---

## 🔹 5. Video & Reels Metrics

### 5.1 Video Engagement Rate

สำหรับโพสต์วิดีโอ ควรคำนวณแยกเพราะมี Metric เพิ่มเติม

```
VER = (
    (Reactions × 1) +
    (Comments × 3) +
    (Shares × 5) +
    (3s Views × 0.1) +
    (ThruPlay × 2)
) / Video Views × 100
```

### 5.2 Video Retention Rate

```
Retention Rate = (Average Watch Time / Video Length) × 100
```

**เป้าหมาย:**
- **> 50%** = ดีมาก (Content น่าสนใจ)
- **30-50%** = ปานกลาง
- **< 30%** = ต้องปรับปรุง (Hook ไม่แข็งแรง)

### 5.3 Video Completion Rate

```
Completion Rate = (Completed Views / Total Views) × 100
```

**Completed Views** = ดูจนจบ หรือ 97% ของความยาว

### 5.4 Reels-Specific Metrics

Facebook Reels มี Algorithm แยกต่างหาก:

```
Reels Score = (
    (Plays × 0.5) +
    (Shares × 10) +
    (Comments × 5) +
    (Saves × 8) +
    (Avg Watch Time / Length × 100)
) / Reach
```

**ปัจจัยสำคัญ:**
- 🎯 **Watch Time > 50%** = สำคัญมาก
- 🔁 **Replay Rate** = คนดูซ้ำหรือเปล่า
- 🔊 **Audio Saves** = มีคนบันทึกเสียงไปใช้ไหม
- 📤 **Shares to Stories** = การแชร์ไปยัง Instagram Stories

---

## 🔹 6. Meaningful Interactions Score

Facebook ปรับ Algorithm ให้เน้น **Meaningful Interactions** ตั้งแต่ 2023

### 6.1 Conversation Starter Score

```
CS_Score = (
    (Comments with Replies × 3) +
    (Comment Threads > 3 messages × 5) +
    (Page Response within 1 hour × 2)
) / Total Comments × 100
```

**คำอธิบาย:**
- Comments ที่มีคนตอบกลับ = กระตุ้นให้เกิดบทสนทนา
- Comment Threads ยาว = Community มี Engagement สูง
- เพจตอบเร็ว = สร้างความสัมพันธ์ที่ดี

### 6.2 Quality Engagement Rate

```
QER = (
    (Long Comments > 20 words × 5) +
    (Shares with Personal Text × 6) +
    (Saves × 4) +
    (Click-through × 2)
) / Reach × 100
```

**การตีความ:**
- **QER > 2%** = Content มีคุณภาพสูง
- **QER 1-2%** = ปานกลาง
- **QER < 1%** = Engagement เป็น Passive (แค่กด Like)

### 6.3 Active Response Ratio

```
ARR = (Page Responses / Total Comments) × 100
```

**เป้าหมาย:**
- **> 70%** = ดีเยี่ยม
- **40-70%** = ดี
- **< 40%** = ควรปรับปรุง

---

## 🔹 7. Benchmarking ตามอุตสาหกรรม

### 7.1 Engagement Rate เฉลี่ยตามอุตสาหกรรม (2025)

| อุตสาหกรรม | ER เฉลี่ย | ER ดีมาก | ตัวอย่างเพจ |
|-------------|-----------|----------|-------------|
| **E-commerce** | 0.8-1.5% | > 2.5% | Shopee, Lazada |
| **Food & Beverage** | 2.0-4.0% | > 6.0% | KFC, Starbucks |
| **Entertainment/Media** | 1.5-3.0% | > 5.0% | Netflix, GMM |
| **Tech/Software** | 0.5-1.0% | > 2.0% | Apple, Microsoft |
| **Fashion/Beauty** | 1.8-3.5% | > 5.5% | Sephora, H&M |
| **Travel & Tourism** | 2.5-4.5% | > 7.0% | Airbnb, Agoda |
| **Education** | 1.2-2.5% | > 4.0% | Coursera, Khan Academy |
| **Finance/Banking** | 0.6-1.2% | > 2.0% | Kasikorn, SCB |
| **Healthcare** | 1.0-2.0% | > 3.5% | โรงพยาบาล, คลินิก |
| **Non-Profit/NGO** | 2.0-4.0% | > 6.5% | WWF, Red Cross |
| **Sports & Fitness** | 2.8-5.0% | > 8.0% | Nike, Adidas |
| **Automotive** | 1.2-2.2% | > 4.0% | Tesla, Toyota |

**หมายเหตุ:** ข้อมูลอ้างอิงจาก Social Media Benchmarks 2025 (Rival IQ, Hootsuite)

### 7.2 การคำนวณ Industry Benchmark Score

```
IBS = (Your ER / Industry Average ER) × 100

โดยที่:
- IBS = 100 = ปานกลาง (เทียบเท่าอุตสาหกรรม)
- IBS > 150 = ดีกว่าค่าเฉลี่ย 50%
- IBS < 80 = ต่ำกว่าค่าเฉลี่ย 20%
```

**ตัวอย่าง:**
```
เพจ E-commerce ของเรา: ER = 1.8%
ค่าเฉลี่ยอุตสาหกรรม: ER = 1.2%

IBS = (1.8 / 1.2) × 100 = 150
→ ดีกว่าค่าเฉลี่ย 50%
```

---

## 🔹 8. การดึงข้อมูลด้วย Meta API

### 8.1 Graph API v19.0+ (2025)

Facebook/Meta อัพเดท API เป็นประจำ ต้องใช้ **Graph API** อย่างเป็นทางการ

#### ขั้นตอนการใช้งาน:

**1. สร้าง App ใน Meta for Developers**
```
https://developers.facebook.com/apps/
```

**2. ขอ Access Token**
- User Access Token (อายุ 1-2 ชั่วโมง)
- Page Access Token (ถาวร)
- Long-Lived Token (60 วัน)

**3. API Endpoints สำคัญ**

#### ดึงข้อมูลโพสต์
```http
GET https://graph.facebook.com/v19.0/{page-id}/posts
    ?fields=message,created_time,shares,reactions.summary(true),comments.summary(true)
    &access_token={access-token}
```

#### ดึง Insights ของโพสต์
```http
GET https://graph.facebook.com/v19.0/{post-id}/insights
    ?metric=post_impressions,post_impressions_organic,post_impressions_paid,
            post_engaged_users,post_clicks,post_reactions_by_type_total
    &access_token={access-token}
```

#### ดึงข้อมูล Video Metrics
```http
GET https://graph.facebook.com/v19.0/{video-id}
    ?fields=views,length,post_views,video_insights{metric(total_video_views,
            total_video_views_organic,total_video_complete_views,
            total_video_avg_time_watched,total_video_impressions)}
    &access_token={access-token}
```

#### ดึงข้อมูลเพจ
```http
GET https://graph.facebook.com/v19.0/{page-id}
    ?fields=name,fan_count,followers_count,engagement
    &access_token={access-token}
```

### 8.2 Metrics ที่ดึงได้จาก API

| Metric Name (API) | คำอธิบาย | Type |
|-------------------|----------|------|
| `post_impressions` | จำนวนครั้งที่โพสต์ถูกแสดง | Total |
| `post_impressions_organic` | Impressions แบบ Organic | Organic |
| `post_impressions_paid` | Impressions จากโฆษณา | Paid |
| `post_engaged_users` | จำนวนคนที่ทำ Action กับโพสต์ | Engagement |
| `post_clicks` | จำนวนคลิกทั้งหมด | Click |
| `post_reactions_by_type_total` | แยกตาม Reaction แต่ละแบบ | Breakdown |
| `post_video_views` | จำนวนครั้งที่วิดีโอเล่น | Video |
| `post_video_complete_views` | จำนวนครั้งที่ดูวิดีโอจบ | Video |

### 8.3 Rate Limits (2025)

- **Standard Tier:** 200 calls/hour/user
- **Advanced Tier:** 400 calls/hour/user
- **Business Verification:** จำเป็นสำหรับ Advanced Features

**แนวทางแก้ปัญหา Rate Limit:**
- Cache ข้อมูลใน Database
- ดึงข้อมูลครั้งละหลายโพสต์ (batch requests)
- ใช้ Webhooks สำหรับ Real-time Updates

---

## 🔹 9. Automation & AI Integration

### 9.1 เครื่องมือ Automation (2025)

| เครื่องมือ | ข้อดี | ข้อเสีย | ราคา |
|-----------|-------|---------|------|
| **Make.com** | Visual workflow, รองรับ Meta API | ราคาแพงสำหรับ Operations มาก | $9-29/เดือน |
| **n8n** | Open-source, ติดตั้งเองได้ | ต้องจัดการ Hosting เอง | ฟรี (Self-hosted) |
| **Zapier** | ใช้ง่าย, Integration เยอะ | ราคาแพง, จำกัด Actions | $20-50/เดือน |
| **Apify** | Scraping ได้ดี | ถูกจำกัดโดย Facebook | $49-99/เดือน |
| **Meta Business Suite** | Official, ฟรี | จำกัด Customization | ฟรี |

### 9.2 Workflow Automation แนะนำ

#### Workflow 1: Daily Engagement Report
```
[Schedule: 9:00 AM] 
    → [Meta Graph API: ดึงโพสต์ 24 ชม. ล่าสุด]
    → [Python/Node: คำนวณ ER, Weighted Score]
    → [Google Sheets: บันทึกข้อมูล]
    → [Gmail/Slack: ส่งรายงาน]
```

#### Workflow 2: Competitor Monitoring
```
[Schedule: Daily]
    → [ดึงโพสต์คู่แข่ง via API]
    → [คำนวณ Benchmark Score]
    → [เปรียบเทียบกับเพจเรา]
    → [Alert ถ้าคู่แข่งมี Viral Post]
```

#### Workflow 3: Auto-Response Comments
```
[Webhook: New Comment]
    → [AI Sentiment Analysis]
    → [ถ้า Negative: Alert Admin]
    → [ถ้า Question: Auto-Reply FAQ]
    → [บันทึก Log]
```

### 9.3 AI Integration

#### การใช้ AI ในการวิเคราะห์:

**1. Sentiment Analysis**
```python
# ตัวอย่างใช้ OpenAI API
from openai import OpenAI

client = OpenAI(api_key="your-api-key")

def analyze_sentiment(comments):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{
            "role": "user",
            "content": f"วิเคราะห์ Sentiment ของคอมเมนต์เหล่านี้: {comments}"
        }]
    )
    return response.choices[0].message.content
```

**2. Content Categorization**
- แยกประเภท Content (Product, Promotion, Educational, Entertainment)
- หา Pattern ว่า Content แบบไหนได้ ER สูง

**3. Trend Prediction**
- ใช้ Machine Learning ทำนาย ER ของโพสต์ก่อนโพสต์
- วิเคราะห์เวลาที่เหมาะสมในการโพสต์

**4. Auto-Caption Generation**
- ใช้ AI เขียน Caption พร้อมแนะนำ Hashtag

### 9.4 ตัวอย่าง Python Script

```python
import requests
import pandas as pd
from datetime import datetime, timedelta

# Configuration
PAGE_ID = "your-page-id"
ACCESS_TOKEN = "your-access-token"
API_VERSION = "v19.0"

def get_page_posts(page_id, access_token, days=30):
    """ดึงโพสต์ย้อนหลัง N วัน"""
    since = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
    
    url = f"https://graph.facebook.com/{API_VERSION}/{page_id}/posts"
    params = {
        'fields': 'message,created_time,shares,reactions.summary(true),comments.summary(true),insights.metric(post_impressions,post_engaged_users)',
        'since': since,
        'access_token': access_token
    }
    
    response = requests.get(url, params=params)
    return response.json()

def calculate_engagement_rate(post):
    """คำนวณ Engagement Rate"""
    reactions = post['reactions']['summary']['total_count']
    comments = post['comments']['summary']['total_count']
    shares = post.get('shares', {}).get('count', 0)
    
    # หา Impressions จาก Insights
    impressions = 0
    if 'insights' in post:
        for insight in post['insights']['data']:
            if insight['name'] == 'post_impressions':
                impressions = insight['values'][0]['value']
    
    total_engagement = reactions + comments + shares
    
    if impressions > 0:
        er = (total_engagement / impressions) * 100
    else:
        er = 0
    
    return {
        'post_id': post['id'],
        'created_time': post['created_time'],
        'reactions': reactions,
        'comments': comments,
        'shares': shares,
        'impressions': impressions,
        'total_engagement': total_engagement,
        'engagement_rate': round(er, 2)
    }

def calculate_weighted_er(post, weights={'reactions': 1, 'comments': 3, 'shares': 5}):
    """คำนวณ Weighted Engagement Rate"""
    reactions = post['reactions']
    comments = post['comments']
    shares = post['shares']
    impressions = post['impressions']
    
    weighted_engagement = (
        reactions * weights['reactions'] +
        comments * weights['comments'] +
        shares * weights['shares']
    )
    
    if impressions > 0:
        weighted_er = (weighted_engagement / impressions) * 100
    else:
        weighted_er = 0
    
    return round(weighted_er, 2)

# Main Execution
if __name__ == "__main__":
    # ดึงข้อมูล
    data = get_page_posts(PAGE_ID, ACCESS_TOKEN, days=30)
    
    # วิเคราะห์
    results = []
    for post in data.get('data', []):
        result = calculate_engagement_rate(post)
        result['weighted_er'] = calculate_weighted_er(result)
        results.append(result)
    
    # สร้าง DataFrame
    df = pd.DataFrame(results)
    
    # คำนวณค่าเฉลี่ย
    avg_er = df['engagement_rate'].mean()
    avg_weighted_er = df['weighted_er'].mean()
    
    print(f"Average ER: {avg_er:.2f}%")
    print(f"Average Weighted ER: {avg_weighted_er:.2f}%")
    
    # Export to CSV
    df.to_csv('facebook_engagement_report.csv', index=False)
    print("Report saved to facebook_engagement_report.csv")
```

---

## 🔹 10. ข้อจำกัดและแนวทางแก้ไข

### 10.1 ข้อจำกัดจาก Facebook/Meta

| ปัญหา | สาเหตุ | แนวทางแก้ไข |
|-------|--------|--------------|
| **ไม่สามารถดึงข้อมูล Reach ของโพสต์เก่า** | API จำกัด Historical Data | ดึงและเก็บข้อมูลทุกวันอัตโนมัติ |
| **Reach ลดลงอย่างต่อเนื่อง** | Algorithm เน้น Paid Content | เพิ่มงบโฆษณา หรือสร้าง Highly Engaging Content |
| **ข้อมูล Demographic ไม่ละเอียด** | Privacy Policy (iOS 14.5+) | ใช้ First-Party Data จาก Website/CRM |
| **API Rate Limit** | การเรียก API มากเกินไป | ใช้ Batch Requests, Cache Data |
| **Competitor Data หาได้ยาก** | API ไม่เปิดให้ดึงข้อมูลเพจอื่น | ใช้ Third-Party Tools (CrowdTangle, Socialbakers) |
| **Video Insights ไม่ครบ** | ต้องมี Watch Time ขั้นต่ำ | โพสต์วิดีโอต่อเนื่อง, เข้าโปรแกรม Creator |

### 10.2 Privacy & Compliance

#### PDPA Compliance (Personal Data Protection Act)
- ✅ ขอ Consent ก่อนเก็บข้อมูลลูกค้า
- ✅ ไม่เก็บข้อมูลส่วนบุคคลที่ไม่จำเป็น (เช่น Comment ที่มีเบอร์โทร)
- ✅ มี Data Retention Policy (เก็บข้อมูลนานแค่ไหน)

#### GDPR Compliance (ถ้าทำงานกับ EU)
- ✅ Right to be Forgotten (ลบข้อมูลเมื่อลูกค้าขอ)
- ✅ Data Portability (ส่งออกข้อมูลให้ลูกค้าได้)

### 10.3 Ethical Considerations

❌ **ไม่ควรทำ:**
- Scrape ข้อมูลส่วนตัวของ Users โดยไม่ได้รับอนุญาต
- ซื้อ Fake Engagement (Bot Likes/Comments)
- เปรียบเทียบคู่แข่งโดยใช้ข้อมูลผิดกฎหมาย

✅ **ควรทำ:**
- ใช้ Official API เท่านั้น
- เคารพ Privacy ของ Users
- โปร่งใสในการเก็บและใช้ข้อมูล

---

## 🔹 11. Dashboard & Reporting

### 11.1 เครื่องมือ Dashboard

| Tool | ข้อดี | ข้อเสีย | ราคา |
|------|-------|---------|------|
| **Meta Business Suite** | ฟรี, Official | จำกัด Customization | ฟรี |
| **Metabase** | Open-source, Flexible | ต้อง Setup เอง | ฟรี |
| **Google Data Studio (Looker)** | ฟรี, ง่าย, Integration ดี | จำกัด Data Source | ฟรี |
| **Tableau** | Professional, สวยงาม | แพง | $70/เดือน |
| **Power BI** | Integration Microsoft ดี | Complex | $10-20/เดือน |
| **Supermetrics** | Connector สำหรับ Meta API | แพง | $99/เดือน |

### 11.2 Dashboard Template

#### แบบ Simple (สำหรับรายงานผู้บริหาร)
```
📊 Facebook Engagement Dashboard

[Period: Last 30 Days]

━━━━━━━━━━━━━━━━━━━━━━━━
📈 Overview
━━━━━━━━━━━━━━━━━━━━━━━━
Total Posts: 45
Avg Engagement Rate: 3.8%
Total Reach: 580,000
Total Engagements: 22,040

━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Benchmarking
━━━━━━━━━━━━━━━━━━━━━━━━
Industry Avg: 2.5%
Your Score: 152 (Better than average)
Rank: #2 out of 8 competitors

━━━━━━━━━━━━━━━━━━━━━━━━
⭐ Top Performing Posts
━━━━━━━━━━━━━━━━━━━━━━━━
1. [Video] Product Launch - ER: 8.2%
2. [Image] Customer Story - ER: 6.5%
3. [Carousel] Tips & Tricks - ER: 5.9%

━━━━━━━━━━━━━━━━━━━━━━━━
📉 Trends
━━━━━━━━━━━━━━━━━━━━━━━━
Week 1: 3.2%
Week 2: 3.6%
Week 3: 4.1%
Week 4: 4.3% ↑
```

#### แบบ Advanced (สำหรับทีมการตลาด)
```
Sections:
1. Executive Summary
2. Engagement Breakdown (Reactions/Comments/Shares)
3. Content Performance by Type (Video/Image/Carousel/Link)
4. Posting Time Analysis
5. Competitor Comparison
6. Sentiment Analysis
7. Top Hashtags
8. Audience Demographics (Age/Gender/Location)
9. Paid vs Organic Performance
10. Recommendations
```

### 11.3 KPI Tracking

#### สำคัญ (Must-Have):
- 📊 Engagement Rate (ER)
- 📈 Reach Growth Rate
- 👥 Follower Growth Rate
- 💬 Response Time
- ⭐ Top Performing Content Types

#### เสริม (Nice-to-Have):
- 🎯 Engagement Velocity
- 🔥 Viral Coefficient
- 💰 Cost per Engagement (สำหรับ Paid)
- 🧠 Sentiment Score
- 🏆 Industry Benchmark Score

---

## 🔹 12. เคสสตัดดีและตัวอย่างจริง

### 12.1 Case Study: E-commerce Brand

**บริบท:**
- อุตสาหกรรม: Fashion E-commerce
- Followers: 180,000
- ช่วงวิเคราะห์: 3 เดือน
- เป้าหมาย: เพิ่ม ER จาก 1.2% → 2.5%

**กลยุทธ์:**
1. ✅ เปลี่ยนจาก Product Shots → User-Generated Content (UGC)
2. ✅ ทำ Live Video ทุกสัปดาห์
3. ✅ เพิ่มการตอบ Comment ภายใน 30 นาที
4. ✅ ใช้ Poll และ Quiz เพิ่มขึ้น

**ผลลัพธ์:**
- ER เพิ่มจาก 1.2% → 2.8% (+133%)
- Comments เพิ่ม 250%
- Shares เพิ่ม 180%
- Conversion Rate เพิ่ม 40%

**Insight:**
- UGC ได้ ER สูงกว่า Product Shots ถึง 3 เท่า
- Live Video ได้ Comments มากที่สุด
- Poll/Quiz ได้ Engagement เร็ว (EV สูง)

### 12.2 Case Study: News Media

**บริบท:**
- อุตสาหกรรม: Digital News
- Followers: 2.5M
- ปัญหา: Reach ลดลง 40% ใน 6 เดือน
- เป้าหมาย: ฟื้น Organic Reach

**กลยุทธ์:**
1. ✅ เน้น Conversation Starter Content
2. ✅ ถาม Opinion ในทุกโพสต์
3. ✅ สร้าง Debate Topics
4. ✅ ตอบ Comment แบบ Conversational (ไม่ใช่ Copy-Paste)

**ผลลัพธ์:**
- Organic Reach ฟื้นตัว +65%
- Average Comments per Post: 50 → 240
- Comment Threads (>3 messages): เพิ่ม 400%
- Quality Engagement Rate: เพิ่มจาก 0.8% → 2.1%

**Insight:**
- Algorithm ชอบโพสต์ที่มี "บทสนทนา" มากกว่า "คอมเมนต์ตื้น ๆ"
- ตอบ Comment อย่างมีคุณภาพ = Algorithm Push ต่อ

### 12.3 Case Study: Restaurant Chain

**บริบท:**
- อุตสาหกรรม: Fast Food
- Followers: 450,000
- ปัญหา: Competitors มี ER สูงกว่า 2 เท่า
- เป้าหมาย: เพิ่ม Market Share

**กลยุทธ์:**
1. ✅ Behind-the-Scenes Video
2. ✅ Staff Spotlight (แนะนำพนักงาน)
3. ✅ User Recipe Challenge
4. ✅ Respond to Reviews (ทั้งบวกและลบ)

**ผลลัพธ์:**
- ER เพิ่มจาก 2.1% → 4.5%
- Video Completion Rate: 35% → 62%
- Saves เพิ่ม 320% (สูตรอาหาร)
- Brand Sentiment: +25%

**Insight:**
- คนชอบดู "มนุษย์หลังแบรนด์" มากกว่าแค่ภาพอาหาร
- Recipe Videos มี Save Rate สูงมาก
- การตอบ Negative Reviews แบบสร้างสรรค์ = Positive PR

---

## 🔹 13. เครื่องมือและทรัพยากรเพิ่มเติม

### 13.1 Free Tools

| Tool | ประโยชน์ | Link |
|------|----------|------|
| **Meta Business Suite** | จัดการเพจและดู Insights | business.facebook.com |
| **CrowdTangle** | ติดตาม Trending Content | crowdtangle.com |
| **Meta Brand Collabs Manager** | หา Influencers | facebook.com/collabsmanager |
| **Facebook IQ** | Research & Insights | facebook.com/iq |

### 13.2 Paid Tools

| Tool | ฟีเจอร์ | ราคา |
|------|---------|------|
| **Socialbakers (Emplifi)** | Competitor Analysis, Benchmarking | $200+/เดือน |
| **Hootsuite Analytics** | Multi-Platform Analytics | $99+/เดือน |
| **Sprout Social** | Complete Social Suite | $249+/เดือน |
| **Brand24** | Social Listening | $49+/เดือน |
| **Rival IQ** | Competitive Intelligence | $199+/เดือน |

### 13.3 Learning Resources

#### คอร์สเรียน:
- 📚 Meta Blueprint (ฟรี) - facebook.com/blueprint
- 📚 HubSpot Social Media Certification (ฟรี)
- 📚 Coursera: Social Media Marketing Specialization

#### Communities:
- 💬 Facebook Marketing & Advertising Group
- 💬 Social Media Examiner Community
- 💬 r/socialmedia (Reddit)

---

## 📝 สรุป: 5 ข้อสำคัญที่ต้องจำ

1. **🎯 Engagement Rate ไม่ใช่ทุกอย่าง**  
   Focus ที่ "Meaningful Interactions" และ "Quality over Quantity"

2. **📊 Benchmark กับอุตสาหกรรม**  
   อย่าเปรียบเทียบข้ามอุตสาหกรรม เพราะแต่ละอุตสาหกรรมมี Average ER ต่างกัน

3. **🤖 Automate + AI**  
   ใช้เทคโนโลยีช่วยวิเคราะห์ แต่ "Human Touch" ยังสำคัญในการตอบโต้

4. **🔄 Test & Iterate**  
   Algorithm เปลี่ยนตลอด ต้อง Test Content หลากหลายรูปแบบและวัดผล

5. **🔐 Privacy First**  
   ใช้ Official API, เคารพ Privacy, Comply กับ PDPA/GDPR

---

## 📎 Appendix

### A. สูตรทั้งหมด (Quick Reference)

```
# Basic ER
ER = (Reactions + Comments + Shares) / Reach × 100

# Weighted ER
ER_weighted = (R×1 + C×3 + S×5) / Reach × 100

# Engagement Score
Score = (ER_avg - ER_min) / (ER_max - ER_min) × 100

# Industry Benchmark Score
IBS = (Your ER / Industry Avg ER) × 100

# Video Retention
Retention = (Avg Watch Time / Video Length) × 100

# Conversation Starter Score
CS = (Comments with Replies × 3 + Threads>3 × 5) / Total Comments × 100

# Quality Engagement Rate
QER = (Long Comments×5 + Shares w/ Text×6 + Saves×4) / Reach × 100
```

### B. Checklist การวิเคราะห์

✅ ดึงข้อมูลอย่างน้อย 30-90 วัน  
✅ แยก Organic vs Paid  
✅ คำนวณทั้ง Basic ER และ Weighted ER  
✅ เปรียบเทียบกับอุตสาหกรรม  
✅ วิเคราะห์ Content Type ที่ทำได้ดี  
✅ ดู Engagement Velocity  
✅ วัด Response Time  
✅ ทำ Sentiment Analysis  
✅ สร้าง Dashboard สำหรับ Stakeholders  
✅ ให้ Actionable Recommendations  

### C. Common Mistakes ที่ควรหลีกเลี่ยง

❌ เอาแค่ยอด Like มาวัด (ต้องดู Comments และ Shares ด้วย)  
❌ ไม่แยก Organic กับ Paid  
❌ ไม่คำนึงถึง Reach (ใช้แค่ Followers)  
❌ เปรียบเทียบกับเพจข้ามอุตสาหกรรม  
❌ มองแค่ปริมาณ ไม่มองคุณภาพ  
❌ ไม่ Track Trends ตามเวลา  
❌ ไม่วิเคราะห์ Sentiment  
❌ ไม่ Test หลายรูปแบบ Content  

---

## 👨‍💻 Credits & References

**เอกสารจัดทำโดย:**  
บอฟ (Choopong Phoopamorn)  
NT Social Intelligence Lab

**แหล่งอ้างอิง:**
- Meta Business Help Center (2025)
- Meta Graph API Documentation v19.0
- Rival IQ Social Media Benchmark Report 2025
- Hootsuite Social Trends Report 2025
- Socialbakers Industry Benchmarks Q3 2025
- Sprout Social Index 2025

**เวอร์ชัน:**  
v2.0 - October 2025

**License:**  
© 2025 - For Internal Use Only  
ติดต่อสอบถาม: [your-email@example.com]

---

**📌 หมายเหตุสุดท้าย:**  
เอกสารนี้จะถูกอัพเดทเป็นประจำทุก 6 เดือน เนื่องจาก Facebook/Meta มีการเปลี่ยนแปลง Algorithm และ Policy บ่อยครั้ง

**Next Update:** April 2026

---

## 🔗 Quick Links

- [Meta Business Suite](https://business.facebook.com)
- [Meta for Developers](https://developers.facebook.com)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer)
- [Meta Blueprint Courses](https://www.facebook.com/business/learn)
- [CrowdTangle](https://www.crowdtangle.com)

---

**สิ้นสุดเอกสาร**  
_"Good engagement isn't about big numbers, it's about meaningful connections."_

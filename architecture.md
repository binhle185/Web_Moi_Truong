---

```md
# 📘 SYSTEM ARCHITECTURE DOCUMENT  
## Website: Chấm điểm hành động cá nhân về bảo vệ môi trường không khí

---

## 1. Tổng quan hệ thống

Hệ thống được xây dựng theo mô hình:

- **Frontend:** Single Page Application (SPA)
- **Backend:** Serverless (API Routes)
- **Database:** NoSQL (MongoDB Atlas)
- **Deployment:** Vercel

### 🎯 Mục tiêu:
- Thu thập dữ liệu khảo sát người dùng :contentReference[oaicite:0]{index=0}  
- Phân tích hành vi cá nhân  
- Chấm điểm & đưa ra khuyến nghị  
- Tạo Big Data phục vụ nghiên cứu & chính sách :contentReference[oaicite:1]{index=1}  

---

## 2. Kiến trúc tổng thể

```

Client (Browser)
↓
Next.js (Frontend + API Routes)
↓
Serverless Functions (Vercel)
↓
MongoDB Atlas (Database)
↓
External APIs (AQI / Email / Analytics)

```

---

## 3. Cấu trúc thư mục dự án

```

air-quality-score-web/
│
├── public/                     # Static assets (images, icons, fonts)
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── survey/            # Trang khảo sát
│   │   ├── result/            # Trang kết quả
│   │   ├── dashboard/         # (Admin / analytics)
│   │
│   ├── components/            # UI Components
│   │   ├── common/            # Button, Input, Modal...
│   │   ├── survey/            # Question, StepForm...
│   │   ├── charts/            # Biểu đồ (Chart.js/Recharts)
│   │
│   ├── modules/               # Business logic (QUAN TRỌNG)
│   │   ├── survey/            # Xử lý khảo sát
│   │   ├── scoring/           # Thuật toán chấm điểm
│   │   ├── recommendation/    # Gợi ý cá nhân hóa
│   │   ├── analytics/         # Xử lý dữ liệu lớn
│   │
│   ├── services/              # Gọi API / External services
│   │   ├── api.ts
│   │   ├── aqi.service.ts
│   │   ├── email.service.ts
│   │
│   ├── lib/                   # Utils / helpers
│   │   ├── db.ts              # Kết nối MongoDB
│   │   ├── constants.ts
│   │   ├── scoringRules.ts
│   │
│   ├── models/                # Schema MongoDB
│   │   ├── UserResponse.ts
│   │   ├── Survey.ts
│   │
│   ├── hooks/                 # Custom React Hooks
│   │
│   ├── styles/                # Tailwind config
│
├── pages/api/                 # API Routes (Serverless)
│   ├── survey/
│   │   ├── submit.ts          # Gửi khảo sát
│   │   ├── result.ts          # Lấy kết quả
│   │
│   ├── analytics/
│   │   ├── summary.ts
│
├── .env.local
├── package.json
└── README.md

```

---

## 4. Các module chính

### 4.1 Survey Module (Khảo sát)
- Hiển thị câu hỏi theo từng phần:
  - Thông tin chung
  - Di chuyển
  - Năng lượng
  - Tiêu dùng
  - Nhận thức :contentReference[oaicite:2]{index=2}  

- **Tính năng:**
  - Logic rẽ nhánh (conditional rendering)
  - Lưu progress tạm thời (localStorage)

---

### 4.2 Scoring Engine (Chấm điểm)

- Input: câu trả lời user  
- Output: điểm + phân loại

#### Ví dụ:
```

Xe máy → -10 điểm
Xe điện → +10 điểm
Không tắt điện → -5 điểm

````

- Có thể dùng:
  - Rule-based system
  - Weight scoring

---

### 4.3 Recommendation Engine

- Dựa vào điểm + hành vi
- Output:
  - Gợi ý cá nhân hóa

Ví dụ:
- "Giảm sử dụng xe máy"
- "Chuyển sang phương tiện công cộng"

---

### 4.4 AQI Module

- Lấy dữ liệu từ API ngoài
- Hiển thị:
  - AQI hiện tại
  - Mức độ nguy hiểm
  - Gợi ý hành động

---

### 4.5 Analytics Module (Big Data)

- Tổng hợp:
  - % người dùng dùng xe máy
  - Mức độ nhận thức
- Phục vụ:
  - Báo cáo
  - Nghiên cứu chính sách :contentReference[oaicite:3]{index=3}  

---

## 5. Database Design (MongoDB)

### Collection: `user_responses`

```json
{
  "_id": "ObjectId",
  "age": 20,
  "gender": "female",
  "location": "HCM",
  "answers": {
    "transport": "motorbike",
    "energy": "medium",
    "consumption": "low"
  },
  "score": 65,
  "createdAt": "2026-04-22"
}
````

---

## 6. API Design

### POST `/api/survey/submit`

* Gửi dữ liệu khảo sát
* Trả về điểm + gợi ý

### GET `/api/survey/result`

* Lấy kết quả user

### GET `/api/analytics/summary`

* Dữ liệu tổng hợp

---

## 7. Luồng hoạt động hệ thống

```
User → làm khảo sát
    ↓
Frontend gửi API
    ↓
Backend xử lý + chấm điểm
    ↓
Lưu MongoDB
    ↓
Trả kết quả + gợi ý
    ↓
Hiển thị dashboard + biểu đồ
```

---

## 8. Lưu ý quan trọng (IMPORTANT)

### ⚠️ 1. Performance

* Dùng SSR/ISR của Next.js
* Lazy loading component

### ⚠️ 2. Security

* Validate input (Zod/Yup)
* Rate limit API
* Ẩn danh dữ liệu người dùng

### ⚠️ 3. Scalability

* Serverless → auto-scale
* Tách module rõ ràng

### ⚠️ 4. UX/UI

* Mobile-first
* Step-by-step survey
* Progress bar

### ⚠️ 5. Data Privacy

* Không lưu thông tin nhạy cảm
* Tuân thủ GDPR-like principles

---

## 9. Hướng mở rộng (Future)

* AI recommendation (ML model)
* Dashboard cho cơ quan quản lý
* Gamification (xếp hạng người dùng)
* Mobile app (React Native)

---

## 10. Kết luận

Hệ thống được thiết kế theo hướng:

* **Hiện đại (SPA + Serverless)**
* **Dễ scale**
* **Phù hợp bài thi sáng tạo**
* **Có khả năng triển khai thực tế cao**

---

```
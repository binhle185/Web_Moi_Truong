# Chấm điểm hành động cá nhân về bảo vệ môi trường không khí

Website khảo sát và chấm điểm hành động cá nhân để bảo vệ môi trường không khí.

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Thiết lập biến môi trường trong `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

3. Chạy server phát triển:
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## Cấu trúc dự án

- `app/`: Các trang Next.js
- `src/components/`: Các component UI
- `src/modules/`: Logic nghiệp vụ
- `src/lib/`: Utilities và kết nối DB
- `src/models/`: Schema MongoDB

## API Routes

- `POST /api/survey/submit`: Gửi khảo sát
- `GET /api/survey/result`: Lấy kết quả
- `GET /api/analytics/summary`: Thống kê tổng quan

## Triển khai

Dự án được thiết kế để triển khai trên Vercel với MongoDB Atlas.

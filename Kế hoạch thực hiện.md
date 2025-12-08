---
aliases : Kế hoạch thực hiện
time : 09-12-2025 03:12:25
---
### PHẦN 1: FOUNDATION & API CONNECTION (Tuần 1)
_Mục tiêu: FE và BE "bắt tay" nhau thành công, hiển thị được dữ liệu từ Database ra màn hình._
#### Issue #01: Project Setup & API Client
- **Mô tả:** Khởi tạo dự án và cấu hình thư viện gọi API.
- **Người làm:** Frontend Dev.
- **Công việc:**
    - Setup React + HeroUI + Router + Helmet.
    - Cài đặt `axios` (hoặc cấu hình `fetch`).
    - Tạo file `.env` chứa biến: `VITE_API_BASE_URL=http://localhost:8080/api/v1` (Trỏ về server local của bạn trước).
    - Tạo file `src/services/api.ts`: Viết sẵn các hàm gọi API chung (config Interceptor để xử lý lỗi 401/500 tập trung).
#### Issue #02: Define TypeScript Interfaces
- **Mô tả:** Đảm bảo FE và BE nói chung một ngôn ngữ data.
- **Người làm:** Frontend Dev.
- **Công việc:**
    - Tạo `src/types/index.ts`.
    - Copy y nguyên nội dung từ file **Frontend Data Models.md** vào.
    - **Lưu ý:** Các field như `slug`, `thumbnail`, `type` phải khớp 100% với response JSON mà bạn định trả về từ Backend.
#### Issue #03: Global Layout & Category Menu
- **Mô tả:** Header hiển thị menu động lấy từ Database.
- **Người làm:** Frontend Dev (UI).
- **Công việc:**
    - Gọi API `GET /categories`.
    - Render cây menu đa cấp trên Navbar.
    - Xử lý trạng thái `Loading` (Skeleton menu) khi đang gọi API.
#### Issue #04: Database Seeding (Phần việc của bạn)
- **Mô tả:** Dùng n8n đẩy dữ liệu thật vào Database của bạn.
- **Người làm:** Backend Dev
- **Công việc:**
    - Setup n8n workflow.
    - **Quan trọng:** Thay vì xuất file JSON, hãy cấu hình n8n node để `INSERT` thẳng vào bảng `tbl_posts`, `tbl_categories` trong Database (PostgreSQL/MySQL) của bạn.
    - Đảm bảo có ít nhất 20 bài viết trong DB để team FE test phân trang.
---

### PHẦN 2: CORE DISPLAY (Tuần 2)
_Mục tiêu: Hiển thị danh sách bài và đọc bài chi tiết._
#### Issue #05: Homepage Integration
- **Mô tả:** Gọi API lấy bài viết cho trang chủ.
- **Người làm:** Frontend Dev.
- **Công việc:**
    - Gọi API `GET /posts?pageNo=1&pageSize=10`.
    - Lọc/Sort bài viết theo `isFeatured` (để hiện Slider) và `published_at` (để hiện tin mới).
    - Component `PostCard`: Map dữ liệu từ API vào UI. Chú ý field `type` để render icon Video/Gallery.
#### Issue #06: Post Detail Page (Integration)
- **Mô tả:** Trang đọc báo chi tiết (`/post/:slug`).
- **Người làm:** Frontend Dev.
- **Công việc:**
    - Lấy `slug` từ URL -> Gọi API `GET /posts/{slug}`.
    - **Xử lý 404:** Nếu API trả về lỗi (không tìm thấy bài), redirect sang trang NotFound.
    - Render `content` (HTML) an toàn.
    - Gọi tiếp API (hoặc dùng dữ liệu trả về sẵn) để hiển thị phần `related_posts` (Tin liên quan).

#### Issue #07: Category Page & Pagination
- **Mô tả:** Xem bài viết theo chuyên mục.
- **Người làm:** Frontend Dev.
- **Công việc:**
    - Gọi API `GET /posts?category_slug={slug}&pageNo={page}`.
    - Xử lý phân trang thật (Server-side Pagination): Khi bấm trang 2, gọi lại API với `pageNo=2`.
    - Hiển thị Loading Spinner mỗi khi chuyển trang.
---
### PHẦN 3: INTERACTION & SEARCH (Tuần 3)
_Mục tiêu: User tương tác với hệ thống._
#### Issue #08: Search Feature
- **Mô tả:** Tìm kiếm bài viết.
- **Người làm:** Frontend Dev.
- **Công việc:**
    - Tạo Input Search trên Header.
    - Gọi API `GET /posts?keyword={text}` (Bạn cần hỗ trợ API lọc `LIKE %text%` trong DB).
    - Trang kết quả tìm kiếm hiển thị danh sách bài trả về.
#### Issue #09: Comment System (Integration)
- **Mô tả:** Bình luận bài viết.
- **Người làm:** Full-stack (Cần cả BE và FE).
- **Công việc:**
    - **BE:** API `GET /posts/{id}/comments` và `POST /comments`.
    - **FE:** Form nhập bình luận -> Gọi API POST -> Nếu thành công (200 OK) thì append comment mới vào list hiện tại (hoặc gọi lại API GET để refresh).
---
### PHẦN 4: ADMIN CMS (Tuần 4 - Nếu kịp)
_Mục tiêu: Công cụ nhập liệu cho Phóng viên._
#### Issue #10: Admin Dashboard & Auth
- **Mô tả:** Trang quản trị, yêu cầu đăng nhập.
- **Công việc:**
    - Trang Login: Gọi API `/auth/login` -> Lưu Token vào LocalStorage.
    - Tạo `PrivateRoute`: Nếu không có Token, đá về trang Login.
    - Layout Admin riêng (Sidebar + Content).
#### Issue #11: Create/Edit Post
- **Mô tả:** Form soạn thảo bài viết.
- **Công việc:**
    - Tích hợp Text Editor (TinyMCE/Quill).
    - Upload ảnh: Cần API `POST /upload` (Upload file trả về link ảnh) để insert vào bài viết.
    - Gọi API `POST /posts` (Tạo mới) hoặc `PUT /posts/{id}` (Cập nhật).
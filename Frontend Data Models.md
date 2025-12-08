---
aliases : Frontend Data Models
time : 09-12-2025 02:12:54
---
### **Frontend Type Definitions**
**File Location:** `src/types/index.ts` 
```TypeScript
// 1. ENUMS (Các giá trị cố định)

/** Vai trò người dùng */
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  REPORTER = 'REPORTER',
  USER = 'USER',
}

/** Trạng thái bài viết */
export enum PostStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECT = 'REJECT',
}

/** Loại bài viết để render UI khác nhau */
export enum PostType {
  STANDARD = 'standard', // Bài thường
  VIDEO = 'video',       // Bài có icon video, ưu tiên player
  GALLERY = 'gallery',   // Bài phóng sự ảnh
  MAGAZINE = 'magazine', // Long-form, thiết kế đặc biệt
}

// 2. BASE ENTITIES (Thực thể cơ bản)

/** Thông tin người dùng (Tác giả/User comment) */
export interface User {
  id: string;
  username: string;
  email?: string; // Có thể ẩn nếu là public profile
  avatar?: string;
  role: UserRole;
  fullName?: string; // Tên hiển thị (nếu có)
}

/** Danh mục tin tức */
export interface Category {
  id: string;
  name: string;
  slug: string;
  position?: number;
  parentId?: string | null;
  children?: Category[]; // Cho menu đa cấp
}

/** Thẻ Tag */
export interface Tag {
  id: string;
  name: string;
  slug: string;
}

// 3. POST & CONTENT (Bài viết)

/** * PostSummary: Dùng cho danh sách (Card), Slider
 * Không chứa content HTML để nhẹ payload
 */
export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string; // Sapo
  thumbnail?: string;
  published_at: string; // ISO Date String
  view_count: number;
  type: PostType;
  category: Category;
  author: User;
  isFeatured: boolean;
}

/** * PostDetail: Dùng cho trang chi tiết
 * Kế thừa PostSummary và thêm nội dung chi tiết
 */
export interface PostDetail extends Post {
  content: string; // HTML String (đã sanitized)
  tags: Tag[];
  related_posts?: Post[]; // Gợi ý bài liên quan
  updatedAt?: string;
}

// 4. INTERACTION (Tương tác)

/** Bình luận */
export interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: User;
  parentId?: string | null;
  replies?: Comment[]; // Comment lồng nhau (Reply)
}

// 5. API RESPONSE WRAPPERS (Cấu trúc trả về)

/** Cấu trúc phân trang */
export interface Pagination {
  totalElements: number;
  pageNo: number;
  pageSize: number;
  totalPages: number;
}

/** * Wrapper chuẩn cho mọi API Response 
 * T: Kiểu dữ liệu của data (User, Post[], ...)
 */
export interface ApiResponse<T> {
  status: number;
  message?: string;
  errorCode?: string;
  data: T;
}

/** Wrapper cho danh sách có phân trang */
export interface PaginatedList<T> {
  items: T[];
  pagination: Pagination;
}
```




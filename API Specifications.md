---
aliases : API Specifications
time : 09-12-2025 02:12:47
---
## 1. Quy ước chung (Conventions)

- **Base URL:** `https://api.your-domain.com/v1`
- **Content-Type:** `application/json`
- **Date Format:** ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`)
- **Response Wrapper:** Tất cả API đều trả về theo cấu trúc chuẩn:

```json
// Success Response (HTTP 200)
//đối với hình 
{
  "status": 200,
  "message": "Thành công",
  "data": { ... } // Object hoặc Array
}

// Error Response (HTTP 400, 401, 404, 500)
{
  "status": 400,
  "errorCode": "RESOURCE_NOT_FOUND",
  "message": "Bài viết không tồn tại",
  "timestamp": ''
}
```

## 2. API Danh mục (Categories)

Dùng để render Menu/Navbar và các Tab
### `GET /categories`
Lấy cây danh mục (đã xử lý logic cha-con từ DB).
sponse Example:
```json
{
  "status": 200,
  "data": [
    {
      "id": "uuid-1",
      "name": "Thời sự",
      "slug": "thoi-su",
      "position": 1,
      "children": [
        {
          "id": "uuid-2",
          "name": "Chính trị",
          "slug": "chinh-tri",
          "parent_id": "uuid-1"
        },
        {
          "id": "uuid-3",
          "name": "Dân sinh",
          "slug": "dan-sinh",
          "parent_id": "uuid-1"
        }
      ]
    },
    {
      "id": "uuid-4",
      "name": "Pháp luật",
      "slug": "phap-luat",
      "children": []
    }
  ]
}
```

---
3. API Bài viết (Posts) - Quan trọng nhất

### `POST /posts`

Lấy danh sách bài viết (Dùng cho Trang chủ, Trang chuyên mục).

- **Query body:**
    - `pageNo`: Số trang (Default: 1).
    - `pageSize`: Số lượng bài/trang (Default: 10).
    - `category_slug`: Lọc theo danh mục (VD: `thoi-su`).
    - `tag_slug`: Lọc theo tag.
    - `is_featured`: `true` (Lấy bài nổi bật cho Slider), `false`.
    - `type`: `video`, `magazine`, `gallery` (Lọc theo loại bài).
- **Response Example:**
```json
{
  "status": 200,
  "data": {
    "items": [
      {
        "id": "post-uuid-1",
        "title": "Bão Yagi gây mưa lớn diện rộng",
        "slug": "bao-yagi-gay-mua-lon",
        "summary": "Cơn bão số 3 đã suy yếu nhưng hoàn lưu bão tiếp tục gây mưa...",
        "thumbnail": "https://cdn.domain.com/images/bao-yagi.jpg",
        "published_at": "2025-12-09T10:30:00Z",
        "view_count": 1500,
        "type": "standard",
        "category": {
          "id": "uuid-1",
          "name": "Thời sự",
          "slug": "thoi-su"
        },
        "author": {
          "name": "Nguyễn Văn A",
          "avatar": "https://cdn.../avatar.jpg"
        }
      }
      // ... thêm các bài khác
    ],
    "pagination": {
      "totalElements": 50,
      "pageNo": 1,
      "pageSize": 10,
      "totalPages": 5
    }
  }
}
```

---
### `GET /posts/{slug}`

Lấy chi tiết một bài viết.
- **Path Params:** `slug` (VD: `bao-yagi-gay-mua-lon`).
- **Response Example:**

```JSON
{
  "status": 200,
  "data": {
    "id": "post-uuid-1",
    "title": "Bão Yagi gây mưa lớn diện rộng tại miền Bắc",
    "summary": "Cơn bão số 3 đã suy yếu nhưng hoàn lưu bão...",
    "content": "<p>Sáng nay, tâm bão đi qua tỉnh...</p><figure><img src='...'/></figure>", 
    // ^ Field này chứa HTML đã được làm sạch (Sanitized) từ n8n
    "published_at": "2025-12-09T10:30:00Z",
    "updated_at": "2025-12-09T11:00:00Z",
    "view_count": 1505,
    "type": "standard",
    "author": {
      "id": "user-uuid-99",
      "name": "Phóng viên A",
      "role": "REPORTER"
    },
    "category": {
      "id": "uuid-1",
      "name": "Thời sự",
      "slug": "thoi-su"
    },
    "tags": [
      { "id": "tag-1", "name": "Bão lũ", "slug": "bao-lu" },
      { "id": "tag-2", "name": "Thiên tai", "slug": "thien-tai" }
    ],
    "related_posts": [ // Gợi ý 3-5 bài liên quan ngay dưới
       {
         "title": "Hà Nội ngập sâu do ảnh hưởng bão",
         "slug": "ha-noi-ngap-sau",
         "thumbnail": "..."
       }
    ]
  }
}
```

---
## 4. API Bình luận (Comments)

### `GET /posts/{post_id}/comments`

Lấy danh sách bình luận của một bài viết.
- **Response Example:**
```JSON
{
  "status": 200,
  "data": [
    {
      "id": "cmt-1",
      "content": "Bài viết rất hữu ích, cảm ơn phóng viên.",
      "created_at": "2025-12-09T12:00:00Z",
      "user": {
        "name": "Độc giả A",
        "avatar": "..."
      },
      "replies": [ // Các câu trả lời con (Nested Comments)
        {
          "id": "cmt-2",
          "parent_id": "cmt-1",
          "content": "Tôi cũng thấy vậy.",
          "user": { "name": "Độc giả B" }
        }
      ]
    }
  ]
}
```
### `POST /posts/{post_id}/comments`

Gửi bình luận mới (Cần Token xác thực).
- **Body:**
```JSON
{
  "content": "Mong cơ quan chức năng sớm khắc phục.",
  "parent_id": null // Hoặc UUID của comment cha nếu là reply
}
```
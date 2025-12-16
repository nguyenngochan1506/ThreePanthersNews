import axios from 'axios';

import { ApiResponse, Comment, CommentRequest } from '@/types';

// Han kiểm tra lại port Backend của Han (8080 hay cổng khác)
const API_URL = 'http://localhost:8080/api';

// Hàm lấy token từ LocalStorage để xác thực người dùng
const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken'); // Tên key phải khớp với lúc Han lưu khi login

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const commentService = {
  // 1. Lấy danh sách bình luận (Ai cũng xem được -> Không cần Token)
  getCommentsByPost: async (postId: string) => {
    // Gọi API: GET /api/posts/{postId}/comments
    const response = await axios.get<ApiResponse<Comment[]>>(
      `${API_URL}/posts/${postId}/comments`
    );

    return response.data;
  },

  // 2. Gửi bình luận mới (Cần đăng nhập -> Cần Token)
  createComment: async (postId: string, req: CommentRequest) => {
    // Gọi API: POST /api/posts/{postId}/comments
    const response = await axios.post<ApiResponse<Comment>>(
      `${API_URL}/posts/${postId}/comments`,
      req,
      { headers: getAuthHeader() } // Kèm Token vào header
    );

    return response.data;
  },
};

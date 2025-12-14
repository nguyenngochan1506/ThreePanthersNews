import apiClient from "./axios.client";

import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types";

export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      data,
    );

    return response.data;
  },

  register: async (data: RegisterRequest): Promise<ApiResponse<string>> => {
    const response = await apiClient.post<ApiResponse<string>>(
      "/api/register",
      data,
    );

    return response.data;
  },
};

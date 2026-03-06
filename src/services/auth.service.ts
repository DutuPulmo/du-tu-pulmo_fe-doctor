import api from './api';
import type { LoginCredentials, AuthResponse } from '@/types/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  forgotPasswordOtp: async (email: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/forgot-password-otp', {
      email,
    });
    return response.data;
  },

  resetPasswordOtp: async (
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/reset-password-otp', {
      email,
      otp,
      newPassword,
    });
    return response.data;
  },

   addFcmToken: async (token: string): Promise<void> => {
      await api.post('/users/me/fcm-token', { token });
    },
  
    removeFcmToken: async (token: string): Promise<void> => {
      await api.delete('/users/me/fcm-token', { data: { token } });
    },
  
    testPushNotification: async (): Promise<void> => {
      await api.post('/notifications/test-push', {
        title: '🎉 Test Push Notification',
        content: 'Hello từ Patient Portal! Đây là thông báo đẩy thử nghiệm.',
      });
    },
};

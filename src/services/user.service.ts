import api from './api';
import type {
  UpdateUserProfileDto,
  UserMe,
} from '@/types/profile';

export const userService = {
  getMe: async (): Promise<UserMe> => {
    const response = await api.get<UserMe>('/users/me');
    return response.data;
  },

  update: async (id: string, dto: UpdateUserProfileDto): Promise<UserMe> => {
    const response = await api.patch<UserMe>(`/users/${id}`, dto);
    return response.data;
  },

  uploadAvatar: async (file: File): Promise<UserMe> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<{ user: UserMe }>('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.user ?? (response.data as unknown as UserMe);
  },
};

export default userService;

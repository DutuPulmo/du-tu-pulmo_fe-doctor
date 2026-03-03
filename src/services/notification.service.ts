import api from './api';
import type {
  NotificationListResponse,
  UnreadCountResponse,
} from '@/types/notification';

export const notificationService = {
  getNotifications: async (page = 1, limit = 20): Promise<NotificationListResponse> => {
    const response = await api.get<NotificationListResponse>('/notifications', {
      params: { page, limit },
    });
    return response.data;
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await api.get<UnreadCountResponse>('/notifications/unread-count');
    return response.data?.count ?? 0;
  },

  markAllAsRead: async (): Promise<void> => {
    await api.patch('/notifications/read-all');
  },

  markAsRead: async (id: string): Promise<void> => {
    await api.patch(`/notifications/${id}/read`);
  },
};

export default notificationService;

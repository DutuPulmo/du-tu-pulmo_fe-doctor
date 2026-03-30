import api from "./api";

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName?: string;
  reviewerAvatar?: string;
  doctorId: string;
  doctorName?: string;
  doctorAvatar?: string;
  appointmentId?: string;
  appointmentNumber?: string;
  comment: string;
  rating: number;
  doctorResponse?: string;
  responseAt?: string;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateReviewDto {
  comment?: string;
  rating?: number;
  doctorResponse?: string;
  isAnonymous?: boolean;
}

export const reviewService = {
  /**
   * Lấy danh sách đánh giá của bác sĩ hiện tại
   */
  getMyReviews: async (): Promise<Review[]> => {
    const response = await api.get<Review[]>("/reviews/doctor/me");
    return response.data;
  },

  /**
   * Phản hồi đánh giá
   */
  respondToReview: async (id: string, doctorResponse: string): Promise<Review> => {
    const response = await api.patch<Review>(`/reviews/${id}/response`, {
      doctorResponse,
    });
    return response.data;
  },
};

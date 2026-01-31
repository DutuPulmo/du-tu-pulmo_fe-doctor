import api from './api';
import type {
  TimeSlot,
  CreateTimeSlotDto,
  UpdateTimeSlotDto,
  ToggleSlotAvailabilityDto,
} from '@/types/timeslot';

interface DisableSlotsResponse {
  success: boolean;
  data: {
    disabled: number;
    message: string;
  };
}

export const timeSlotService = {
  // Get all time slots
  getTimeSlots: async (doctorId: string): Promise<TimeSlot[]> => {
    const response = await api.get<TimeSlot[]>(
      `/doctors/${doctorId}/time-slots`
    );
    return response.data;
  },

  // Get available time slots by date
  getAvailableTimeSlots: async (doctorId: string, date: string): Promise<TimeSlot[]> => {
    const response = await api.get<TimeSlot[]>(
      `/doctors/${doctorId}/time-slots/available`,
      { params: { date } }
    );
    return response.data;
  },

  // Get time slot by ID
  getTimeSlotById: async (doctorId: string, id: string): Promise<TimeSlot> => {
    const response = await api.get<TimeSlot>(
      `/doctors/${doctorId}/time-slots/${id}`
    );
    return response.data;
  },

  // Create time slot
  createTimeSlot: async (doctorId: string, data: CreateTimeSlotDto): Promise<TimeSlot> => {
    const response = await api.post<TimeSlot>(
      `/doctors/${doctorId}/time-slots`,
      data
    );
    return response.data;
  },

  // Update time slot
  updateTimeSlot: async (
    doctorId: string,
    id: string,
    data: UpdateTimeSlotDto
  ): Promise<TimeSlot> => {
    const response = await api.put<TimeSlot>(
      `/doctors/${doctorId}/time-slots/${id}`,
      data
    );
    return response.data;
  },

  // Toggle slot availability
  toggleSlotAvailability: async (
    doctorId: string,
    id: string,
    data: ToggleSlotAvailabilityDto
  ): Promise<TimeSlot> => {
    const response = await api.patch<TimeSlot>(
      `/doctors/${doctorId}/time-slots/${id}/availability`,
      data
    );
    return response.data;
  },

  // Delete time slot
  deleteTimeSlot: async (doctorId: string, id: string): Promise<void> => {
    await api.delete(`/doctors/${doctorId}/time-slots/${id}`);
  },

  // Disable all slots for a day
  disableSlotsForDay: async (doctorId: string, date: string): Promise<DisableSlotsResponse> => {
    const response = await api.post<DisableSlotsResponse>(
      `/doctors/${doctorId}/time-slots/disable-day`,
      { date }
    );
    return response.data;
  },
};

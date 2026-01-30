import api from './api';
import type { TimeSlot } from '@/types/timeslot';

export const timeSlotService = {
  // Get available time slots for a specific date
  getAvailableSlots: async (doctorId: string, date: string): Promise<TimeSlot[]> => {
    const response = await api.get<TimeSlot[]>(
      `/doctors/${doctorId}/time-slots/available`,
      { params: { date } }
    );
    return response.data;
  },

  // Get all time slots for a doctor
  getAllSlots: async (doctorId: string): Promise<TimeSlot[]> => {
    const response = await api.get<TimeSlot[]>(
      `/doctors/${doctorId}/time-slots`
    );
    return response.data;
  },

  // Get slot by ID
  getSlotById: async (doctorId: string, id: string): Promise<TimeSlot> => {
    const response = await api.get<TimeSlot>(
      `/doctors/${doctorId}/time-slots/${id}`
    );
    return response.data;
  },
};

import { AppointmentType } from '@/lib/constants';

export interface TimeSlot {
  id: string;
  doctorId: string;
  scheduleId?: string | null;
  allowedAppointmentTypes: AppointmentType[];
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTimeSlotDto {
  startTime: string;
  endTime: string;
  allowedAppointmentTypes: AppointmentType[];
  capacity?: number;
  isAvailable?: boolean;
  scheduleId?: string;
}

export type UpdateTimeSlotDto = Partial<CreateTimeSlotDto>;

export interface ToggleSlotAvailabilityDto {
  isAvailable: boolean;
}

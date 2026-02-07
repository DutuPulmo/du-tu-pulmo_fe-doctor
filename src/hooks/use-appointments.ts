import { useQuery } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointment.service';

// Keys for React Query cache management regarding Appointments
export const APPOINTMENT_KEYS = {
    all: ['appointments'] as const,
    queue: () => [...APPOINTMENT_KEYS.all, 'queue'] as const,
    stats: () => [...APPOINTMENT_KEYS.all, 'stats'] as const,
};

/**
 * Hook to fetch the current Doctor's Queue status.
 * Refreshes every 30 seconds to keep the badge updated.
 */
import type { DoctorQueueDto } from '@/types/appointment';

export function useGetMyQueue() {
    return useQuery<DoctorQueueDto>({
        queryKey: APPOINTMENT_KEYS.queue(),
        queryFn: () => appointmentService.getMyQueue(),
        refetchInterval: 30000,
        staleTime: 10000,
    });
}

export function useGetDoctorStats() {
    return useQuery<any>({
        queryKey: APPOINTMENT_KEYS.stats(),
        queryFn: () => appointmentService.getMyStatistics(),
        refetchInterval: 30000,
        staleTime: 10000,
    });
}

import type { AppointmentQuery, PaginatedAppointment } from '@/types/appointment';


export function useSearchAppointments(params?: AppointmentQuery, enabled = true) {
    return useQuery<PaginatedAppointment>({
        queryKey: [...APPOINTMENT_KEYS.all, 'search', params],
        queryFn: () => appointmentService.searchAppointments(params),
        enabled,
        staleTime: 5000, 
    });
}

export function useGetMyAppointmentsAsDoctor(params?: AppointmentQuery, enabled = true) {
    return useQuery<PaginatedAppointment>({
        queryKey: [...APPOINTMENT_KEYS.all, 'doctor', params],
        queryFn: () => appointmentService.getMyAppointmentsAsDoctor(params),
        enabled,
        staleTime: 5000,
    });
}

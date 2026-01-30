import { useQuery } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointment.service';

// Keys for React Query cache management regarding Appointments
export const APPOINTMENT_KEYS = {
    all: ['appointments'] as const,
    queue: () => [...APPOINTMENT_KEYS.all, 'queue'] as const,
};

/**
 * Hook to fetch the current Doctor's Queue status.
 * Refreshes every 30 seconds to keep the badge updated.
 */
export function useGetMyQueue() {
    return useQuery({
        queryKey: APPOINTMENT_KEYS.queue(),
        queryFn: () => appointmentService.getMyQueue(),
        refetchInterval: 30000,
        staleTime: 10000,
    });
}

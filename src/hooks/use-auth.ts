import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import type { LoginCredentials } from '@/types/auth';

// Keys for React Query cache management regarding Auth (if needed)
export const AUTH_KEYS = {
    all: ['auth'] as const,
};

/**
 * Hook to handle User Login.
 * Uses useMutation to manage loading/error states automatically.
 */
export function useLogin() {
    return useMutation({
        mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    });
}

/**
 * Hook to handle User Logout.
 */
export function useLogout() {
    return useMutation({
        mutationFn: () => authService.logout(),
    });
}

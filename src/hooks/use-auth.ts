import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import type { LoginCredentials } from '@/types/auth';

export const AUTH_KEYS = {
    all: ['auth'] as const,
};

export function useLogin() {
    return useMutation({
        mutationFn: (credentials: LoginCredentials) =>
            authService.login(credentials),

        retry: false,

        onError: (error: any) => {
            console.error('Login failed:', error);
        },
    });
}

export function useLogout() {
    return useMutation({
        mutationFn: () => authService.logout(),
    });
}

export function useForgotPasswordOtp() {
    return useMutation({
        mutationFn: (email: string) =>
            authService.forgotPasswordOtp(email),
    });
}

export function useResetPasswordOtp() {
    return useMutation({
        mutationFn: (payload: {
            email: string;
            otp: string;
            newPassword: string;
        }) =>
            authService.resetPasswordOtp(
                payload.email,
                payload.otp,
                payload.newPassword
            ),
    });
}
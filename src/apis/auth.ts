import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = (email: string, password: string) =>
    API.post('/login', { email, password });

export const register = (name: string, email: string, password: string, phone: string) =>
    API.post('/register', { name, email, password, phone });

export const reissue = (refreshToken: string) =>
    API.post('/reissue', { refreshToken });

export const logout = (refreshToken: string) =>
    API.post('/logout', { refreshToken });

export const findEmail = (name: string, phone: string) =>
    API.post('/find-email', { name, phone });

export const sendResetCode = (email: string) =>
    API.post('/send-reset-code', { email });

export const verifyResetCode = (email: string, code: string) =>
    API.post('/verify-reset-code', { email, code });

export const resetPassword = (email: string, code: string, newPassword: string) =>
    API.post('/reset-password', { email, code, newPassword });

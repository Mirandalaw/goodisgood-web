import API from './axios';
import {RegisterRequest} from "../types/auth.ts";

export const login = async (email: string, password: string) => {
    const { data } = await API.post('/auth/login', { email, password });
    return data;
};

export const register = (payload : RegisterRequest) =>
    API.post('/auth/register',payload);

export const reissue = (refreshToken: string) =>
    API.post('/auth/reissue', { refreshToken });

export const logout = (refreshToken: string) =>
    API.post('/auth/logout', { refreshToken });

export const findEmail = (name: string, phone: string) =>
    API.post('/auth/find-email', { name, phone });

export const sendResetCode = (email: string) =>
    API.post('/auth/send-reset-code', { email });

export const verifyResetCode = (email: string, code: string) =>
    API.post('/auth/verify-reset-code', { email, code });

export const resetPassword = (email: string, code: string, newPassword: string) =>
    API.post('/auth/reset-password', { email, code, newPassword });

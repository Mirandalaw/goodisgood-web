import {create} from 'zustand';

interface AuthState {
    isLoggedIn: boolean;
    accessToken: string | null;
    setAuth: (token: string) => void;
    logout: () =>void;
}

export const useAuthStore = create<AuthState>((set) =>({
    isLoggedIn: !!localStorage.getItem('accessToken'),
    accessToken : localStorage.getItem('accessToken'),
    setAuth: (token: string) =>{
        localStorage.setItem('accessToken',token);
        set({isLoggedIn: true, accessToken: token});
    },
    logout: () =>{
        localStorage.removeItem('accessToken');
        set({isLoggedIn: false, accessToken: null});
    },
}));
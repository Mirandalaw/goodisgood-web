import { useState, useEffect } from 'react';
import ThemeToggle from '../../features/auth/components/ThemeToggle';
import LoginForm from '../../features/auth/components/LoginForm';
import SocialLoginButton from '../../features/auth/components/SocialLoginButton';
import '../../styles/pages/auth/LoginPage.css';

export default function LoginPage() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return (
        <div className="login-page-bg">
            <div className="theme-toggle-wrapper">
                <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>

            <div className="login-card">
                <div className="login-logo-circle">
                    <div className="login-logo-icon">◆</div>
                </div>
                <h1 className="login-title">Jeong Park</h1>

                <LoginForm />
                <SocialLoginButton provider="google" />
            </div>
        </div>
    );
}

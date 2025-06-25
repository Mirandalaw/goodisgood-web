import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

export default function LoginPage() {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!loginInfo.email.includes('@')) {
            setError('올바른 이메일을 입력해주세요.');
            return;
        }
        if (loginInfo.password.length < 6) {
            setError('비밀번호는 최소 6자리 이상이어야 합니다.');
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', loginInfo, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });
            localStorage.setItem('accessToken', res.data.data.accessToken);
            navigate('/home');
        } catch (err) {
            setError('로그인 실패. 이메일 또는 비밀번호를 확인하세요.');
        }
    };

    const handleSocialLogin = (provider: string) => {
        window.location.href = `http://localhost:3000/api/oauth2/authorize/${provider}`;
    };

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return (
        <div className="login-page-bg">
            <div className="theme-toggle-wrapper">
                <button
                    className="theme-toggle-btn"
                    onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                >
                    {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
                </button>
            </div>

            <div className="login-card">
                <div className="login-logo-circle">
                    <div className="login-logo-icon">◆</div>
                </div>
                <h1 className="login-title">Jeong Park</h1>

                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={loginInfo.email}
                        onChange={(e) => setLoginInfo({...loginInfo, email: e.target.value})}
                    />
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            required
                            value={loginInfo.password}
                            onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value})}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="toggle-password-btn"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <button type="submit" className="login-btn">Sign in</button>
                    <div className="login-extra-links">
                        <a href="/find-id">아이디 찾기</a>
                        <span>|</span>
                        <a href="/reset-password">비밀번호 재설정</a>
                    </div>
                </form>

                <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="social-btn google dark-style"
                >
                    <img src="/google.svg" alt="Google" /> Sign in with Google
                </button>

                {error && <p className="error-message">{error}</p>}

                <p className="login-footer">
                    Don't have an account? <a href="/register">Sign up, it's free!</a>
                </p>
            </div>
        </div>
    );
}
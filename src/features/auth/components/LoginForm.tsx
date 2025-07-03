import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../apis/auth';
import { useAuthStore } from '../../../stores/useAuthStore';

export default function LoginForm() {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore(); // 로그인 상태 전역 관리
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!loginInfo.email.includes('@')) {
            return setError('올바른 이메일을 입력해주세요.');
        }
        if (loginInfo.password.length < 6) {
            return setError('비밀번호는 최소 6자리 이상이어야 합니다.');
        }

        try {
            const res = await login(loginInfo.email, loginInfo.password);
            const accessToken = res.data.data.tokens.accessToken;
            localStorage.setItem('accessToken', accessToken);
            setAuth(accessToken); // 상태 반영
            navigate('/home');
        } catch (err:any){
            console.error('로그인 오류',err.response?.data || err.message || err);
            setError('로그인 실패. 이메일 또는 비밀번호를 확인하세요.');
        }
    };

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                required
                value={loginInfo.email}
                onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
            />
            <div className="password-wrapper">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    required
                    value={loginInfo.password}
                    onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="toggle-password-btn"
                    aria-label="비밀번호 보기 전환"
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

            {error && <p className="error-message">{error}</p>}

            <p className="login-footer">
                계정이 없으신가요? <a href="/register">회원가입하기</a>
            </p>
        </form>
    );
}

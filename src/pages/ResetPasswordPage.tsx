import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPasswordPage.css';

export default function ResetPasswordPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const sendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
            setMessage('이메일로 인증코드를 보냈습니다.');
            setStep(2);
            setCooldown(30);
        } catch (err: any) {
            setError(err.response?.data?.message || '이메일 전송 실패');
        } finally {
            setLoading(false);
        }
    };

    const verifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/api/auth/verify-reset-code', { email, code });
            setMessage('인증 완료! 새 비밀번호를 설정해주세요.');
            setStep(3);
        } catch (err: any) {
            setError(err.response?.data?.message || '인증 실패');
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword.length < 8) {
            setError('비밀번호는 최소 8자 이상이어야 합니다.');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:3000/api/auth/reset-password', { email, code, newPassword });
            setMessage('비밀번호가 변경되었습니다. 로그인해주세요.');
            setStep(1);
            setEmail('');
            setCode('');
            setNewPassword('');
            setTimeout(()=>{
                navigate('/login');
            },2000);
        } catch (err: any) {
            setError(err.response?.data?.message || '비밀번호 변경 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-dribbble-wrapper">
            <div className="login-glass-box">
                <div className="login-logo-circle">
                    <div className="login-logo-icon">◆</div>
                </div>
                <h1 className="login-title">비밀번호 재설정</h1>

                {message && <p className="reset-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                {step === 1 && (
                    <form className="login-form" onSubmit={sendCode}>
                        <input
                            type="email"
                            placeholder="가입된 이메일"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className="login-btn" disabled={loading || cooldown > 0}>
                            {cooldown > 0 ? `다시 전송 (${cooldown}s)` : loading ? '전송 중...' : '인증 코드 전송'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form className="login-form" onSubmit={verifyCode}>
                        <input
                            type="text"
                            placeholder="6자리 인증코드 입력"
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? '확인 중...' : '인증 코드 확인'}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form className="login-form" onSubmit={resetPassword}>
                        <input
                            type="password"
                            placeholder="새 비밀번호 (8자 이상)"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? '변경 중...' : '비밀번호 변경'}
                        </button>
                    </form>
                )}

                <p className="login-footer">
                    <a href="/login">로그인 페이지로 돌아가기</a>
                </p>
            </div>
        </div>
    );
}

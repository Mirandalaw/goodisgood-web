import { useState } from 'react';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        agreedToPrivacyPolicy: false,
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', loginInfo, {
                withCredentials: true,
                headers: { "Content-Type": 'application/json' }
            });
            localStorage.setItem('accessToken', res.data.data.accessToken);
            navigate('/me');
        } catch (err) {
            alert('로그인 실패');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/auth/register', registerInfo, {
                withCredentials: true,
                headers: { "Content-Type": 'application/json' }
            });
            alert('회원가입 성공! 로그인해주세요.');
            navigate('/');
        } catch (err: any) {
            alert('회원가입 실패: ' + (err.response?.data?.message || '서버 오류'));
        }
    };

    return (
        <div className="wrapper">
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
                {/* 회원가입 폼 */}
                <div className="sign-up-container">
                    <form onSubmit={handleRegister}>
                        <h1>Create Account</h1>

                        <input
                            type="text"
                            placeholder="Name"
                            required
                            value={registerInfo.name}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={registerInfo.email}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={registerInfo.password}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Phone (010-XXXX-XXXX)"
                            required
                            value={registerInfo.phone}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, phone: e.target.value })}
                        />

                        {/* 개인정보 수집 및 이용 동의 영역 */}
                        <div style={{ marginTop: '20px', textAlign: 'left', width: '100%' }}>
                            <div style={{
                                backgroundColor: '#f8f8f8',
                                padding: '16px',
                                height: '150px',
                                overflowY: 'scroll',
                                fontSize: '13px',
                                lineHeight: '1.5',
                                borderRadius: '12px',
                                boxShadow: 'inset 2px 2px 6px #d1d9e6, inset -2px -2px 6px #ffffff',
                                color: '#333', // ✅ 진한 글씨
                            }}>
                                <strong>[개인정보 수집 및 이용 동의]</strong>
                                <p style={{ margin: '8px 0' }}>수집 항목: 이름, 이메일, 비밀번호, 전화번호</p>
                                <p style={{ margin: '8px 0' }}>수집 목적: 서비스 제공, 회원 관리, 서비스 개선</p>
                                <p style={{ margin: '8px 0' }}>보유 기간: 회원 탈퇴 시까지 (단, 관련 법령에 따라 별도 보관 가능)</p>
                                <p style={{ marginTop: '10px', fontStyle: 'italic', fontSize: '12px' }}>
                                    * 개인정보 제공을 거부할 수 있으며, 거부 시 서비스 이용이 제한될 수 있습니다.
                                </p>
                            </div>

                            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="agree"
                                    required
                                    checked={registerInfo.agreedToPrivacyPolicy}
                                    onChange={(e) => setRegisterInfo({ ...registerInfo, agreedToPrivacyPolicy: e.target.checked })}
                                    style={{ marginRight: '8px' }}
                                />
                                <label htmlFor="agree" style={{ fontSize: '13px', color: '#333' }}>
                                    개인정보 수집 및 이용에 동의합니다.
                                </label>
                            </div>
                        </div>


                        <button className="form_btn">Sign Up</button>
                    </form>
                </div>

                {/* 로그인 폼 */}
                <div className="sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1>Sign In</h1>

                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={loginInfo.email}
                            onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={loginInfo.password}
                            onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                        />
                        <button className="form_btn">Sign In</button>
                    </form>
                </div>

                {/* 패널 전환 */}
                <div className="overlay-container">
                    <div className="overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button onClick={() => setIsSignUp(false)} className="overlay_btn">Sign In</button>
                    </div>
                    <div className="overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button onClick={() => setIsSignUp(true)} className="overlay_btn">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

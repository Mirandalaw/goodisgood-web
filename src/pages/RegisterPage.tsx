import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11); // 숫자만 추출 (최대 11자리)
    if (digits.length < 4) return digits;
    if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};
export default function RegisterPage() {
    const navigate = useNavigate();

    const [step, setStep] = useState<1 | 2>(1);
    const [registerInfo, setRegisterInfo] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        agreedToPrivacyPolicy: false,
    });

    const [agreements, setAgreements] = useState({
        all: false,
        over14: false,
        terms: false,
        marketing: false,
        ads: false,
    });

    const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (name === 'all') {
            setAgreements({
                all: checked,
                over14: checked,
                terms: checked,
                marketing: checked,
                ads: checked,
            });
        } else {
            const updated = { ...agreements, [name]: checked };
            updated.all = updated.over14 && updated.terms && updated.marketing && updated.ads;
            setAgreements(updated);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/auth/register', registerInfo, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });

            const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
                email: registerInfo.email,
                password: registerInfo.password,
            }, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });

            localStorage.setItem('accessToken', loginRes.data.data.accessToken);
            navigate('/me');
        } catch (err: any) {
            alert('회원가입 실패: ' + (err.response?.data?.message || '서버 오류'));
        }
    };

    return (
        <div className="login-dribbble-wrapper">
            <div className="login-glass-box">
                <div className="login-logo-circle">
                    <div className="login-logo-icon">◆</div>
                </div>
                <h1 className="login-title">Join GIS</h1>

                {step === 1 ? (
                    <form className="login-form" onSubmit={(e) => {
                        e.preventDefault();
                        if (!agreements.over14 || !agreements.terms) {
                            alert('필수 약관에 동의해주세요.');
                            return;
                        }

                        setRegisterInfo((prev)=>({
                            ...prev,
                            agreedToPrivacyPolicy: agreements.terms,
                        }));
                        setStep(2);
                    }}>
                        <label>
                            <input
                                type="checkbox"
                                name="all"
                                checked={agreements.all}
                                onChange={handleAgreementChange}
                            />
                            전체 동의하기
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="over14"
                                checked={agreements.over14}
                                onChange={handleAgreementChange}
                                required
                            />
                            만 14세 이상입니다. (필수)
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="terms"
                                checked={agreements.terms}
                                onChange={handleAgreementChange}
                                required
                            />
                            이용약관 동의 (필수) <a href="/terms" target="_blank">자세히</a>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="marketing"
                                checked={agreements.marketing}
                                onChange={handleAgreementChange}
                            />
                            마케팅 수신 동의 (선택)
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="ads"
                                checked={agreements.ads}
                                onChange={handleAgreementChange}
                            />
                            광고성 정보 수신 동의 (선택)
                        </label>
                        <p className="privacy-notice">
                            정보주체의 개인정보 및 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여 안전하게 관리하고 있습니다.
                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">개인정보처리방침</a>에서 확인할 수
                            있습니다.
                        </p>
                        <button type="submit" className="login-btn">다음</button>
                    </form>
                ) : (
                    <form className="login-form" onSubmit={handleRegister}>
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
                            type="tel"
                            placeholder="Phone"
                            required
                            value={registerInfo.phone}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, phone: formatPhone(e.target.value)})}
                        />
                        <button type="submit" className="login-btn">회원가입</button>
                    </form>
                )}

                <p className="login-footer">
                    이미 계정이 있으신가요? <a href="/login">로그인</a>
                </p>
            </div>
        </div>
    );
}

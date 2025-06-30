import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TermsAgreementForm from '../../features/auth/components/TermsAgreementForm';
import RegisterForm from '../../features/auth/components/RegisterForm';
import { register, login } from '../../apis/auth';
import '../../styles/pages/auth/RegisterPage.module.css';

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

    const handleAgreementSubmit = () => {
        if (!agreements.over14 || !agreements.terms) {
            alert('필수 약관에 동의해주세요.');
            return;
        }
        setRegisterInfo((prev) => ({
            ...prev,
            agreedToPrivacyPolicy: agreements.terms,
        }));
        setStep(2);
    };

    const handleRegister = async () => {
        try {
            await register(registerInfo);
            const res = await login(registerInfo.email, registerInfo.password);
            localStorage.setItem('accessToken', res.data.data.accessToken);
            navigate('/me');
        } catch (err: unknown) {
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
                    <TermsAgreementForm agreements={agreements} setAgreements={setAgreements} onNext={handleAgreementSubmit} />
                ) : (
                    <RegisterForm registerInfo={registerInfo} setRegisterInfo={setRegisterInfo} onSubmit={handleRegister} />
                )}

                <p className="login-footer">
                    이미 계정이 있으신가요? <a href="/login">로그인</a>
                </p>
            </div>
        </div>
    );
}
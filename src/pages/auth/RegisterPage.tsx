import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TermsAgreementForm from '../../features/auth/components/TermsAgreementForm';
import RegisterForm from '../../features/auth/components/RegisterForm';
import { register, login } from '../../apis/auth';
import '../../styles/pages/auth/RegisterPage.module.css';
import {useAuthStore} from "../../stores/useAuthStore.ts";

export default function RegisterPage() {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state)=>state.setAuth);

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
        if (registerInfo.password.length < 6) {
            alert('비밀번호는 6자 이상 입력해야 합니다.');
            return;
        }

        try {
            // 1. 회원가입 요청
            await register(registerInfo);

            // 2. 회원가입 성공 시 → 자동 로그인 시도
            const loginRes = await login(registerInfo.email, registerInfo.password);

            // 3. AccessToken 저장
            const accessToken = loginRes.data?.data?.tokens?.accessToken;
            if (accessToken) {
                setAuth(accessToken);
                navigate('/home');
            } else {
                alert('로그인 응답에 accessToken이 없습니다.');
            }

        } catch (err: any) {
            const message = err?.response?.data?.message || '서버 오류';
            alert('회원가입 실패: ' + message);
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
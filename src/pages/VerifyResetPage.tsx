import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VerifyForm from '../features/auth/components/VerifyForm.tsx';
import styles from '../styles/pages/auth/VerifyResetPage.module.css';

export default function VerifyResetPage() {
    const [email, setEmail] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const stateEmail = (location.state as { email?: string })?.email;
        if (stateEmail) {
            setEmail(stateEmail);
        } else {
            navigate('/');
        }
    }, [location.state, navigate]);

    if (!email) return null;

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>인증 코드 입력</h1>
            <VerifyForm email={email} />
        </div>
    );
}

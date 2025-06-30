import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyResetCode } from '../../../apis/auth.ts';
import { handleApiError } from '../../../utils/handleApiError.ts';
import styles from '../../../styles/pages/auth/VerifyResetPage.module.css';

interface Props {
    email: string;
}

export default function VerifyForm({ email }: Props) {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await verifyResetCode(email, code);
            alert('인증에 성공했습니다.');
            navigate('/reset-password/confirm', { state: { email, code } });
        } catch (error) {
            handleApiError(error, '인증에 실패했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                placeholder="인증 코드"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={styles.input}
            />
            <button type="submit" className={styles.button}>
                인증하기
            </button>
        </form>
    );
}

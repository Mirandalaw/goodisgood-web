import { useState } from 'react';
import { sendResetCode } from '../apis/auth';
import { useNavigate } from 'react-router-dom';

export default function RequestResetPage() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await sendResetCode(email);
            alert('인증 코드 전송 완료');
            navigate('/reset-password/verify', { state: { email } });
        } catch (err) {
            alert('인증 코드 전송 실패');
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleRequest}>
                <h1>Send Reset Code</h1>
                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className="form_btn">Send Code</button>
            </form>
        </div>
    );
}

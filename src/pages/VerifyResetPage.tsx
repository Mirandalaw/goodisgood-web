import { useState } from 'react';
import { verifyResetCode } from '../apis/auth';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VerifyResetPage() {
    const [code, setCode] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const email = (location.state as any)?.email;

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await verifyResetCode(email, code);
            alert('인증 성공');
            navigate('/reset-password/confirm', { state: { email, code } });
        } catch (err) {
            alert('인증 실패');
        }
    };

    if (!email) return <p>잘못된 접근입니다.</p>;

    return (
        <div className="wrapper">
            <form onSubmit={handleVerify}>
                <h1>Verify Reset Code</h1>
                <input type="text" placeholder="Code" required value={code} onChange={(e) => setCode(e.target.value)} />
                <button className="form_btn">Verify Code</button>
            </form>
        </div>
    );
}

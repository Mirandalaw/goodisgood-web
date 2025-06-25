import { useState } from 'react';
import { resetPassword } from '../apis/auth';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ConfirmResetPage() {
    const [newPassword, setNewPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { email, code } = location.state as { email: string; code: string };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await resetPassword(email, code, newPassword);
            alert('비밀번호 재설정 성공');
            navigate('/');
        } catch (err) {
            alert('비밀번호 재설정 실패');
        }
    };

    if (!email || !code) return <p>잘못된 접근입니다.</p>;

    return (
        <div className="wrapper">
            <form onSubmit={handleReset}>
                <h1>Reset Password</h1>
                <input type="password" placeholder="New Password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button className="form_btn">Reset Password</button>
            </form>
        </div>
    );
}

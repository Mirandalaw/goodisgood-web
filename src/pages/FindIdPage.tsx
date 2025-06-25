import { useState } from 'react';
import axios from "axios";
import './FindIdPage.css';


const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11); // 숫자만 추출 (최대 11자리)
    if (digits.length < 4) return digits;
    if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

export default function FindIdPage() {
    const [form, setForm] = useState({ name: '', phone: '' });
    const [foundId, setFoundId] = useState('');

    const handleFindId = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/api/auth/find-email', form);
            setFoundId(res.data.data.email);
            // setFoundId('goodisyou@example.com'); // 🔧 mock
        } catch (err) {
            alert('아이디 찾기에 실패했습니다.');
        }
    };

    return (
        <div className="login-dribbble-wrapper">
            <div className="login-glass-box">
                <div className="login-logo-circle">
                    <div className="login-logo-icon">◆</div>
                </div>
                <h1 className="login-title">아이디 찾기</h1>

                <form className="login-form" onSubmit={handleFindId}>
                    <input
                        type="text"
                        placeholder="이름"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        type="tel"
                        placeholder="휴대폰 번호 (예: 010-1234-5678)"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                    />
                    <button type="submit" className="login-btn">아이디 찾기</button>
                </form>

                {foundId && (
                    <p className="found-id-message">
                        가입된 아이디: <strong>{foundId}</strong>
                    </p>
                )}

                <p className="login-footer">
                    <a href="/login">로그인 페이지로 돌아가기</a>
                </p>
            </div>
        </div>
    );
}

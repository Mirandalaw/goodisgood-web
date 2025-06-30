import React from 'react';
import formatPhone from '../../../utils/formatPhone';

interface Props {
    registerInfo: {
        email: string;
        password: string;
        name: string;
        phone: string;
        agreedToPrivacyPolicy: boolean;
    };
    setRegisterInfo: React.Dispatch<React.SetStateAction<Props['registerInfo']>>;
    onSubmit: () => void;
}

export default function RegisterForm({ registerInfo, setRegisterInfo, onSubmit }: Props) {
    return (
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <input type="text" placeholder="Name" required value={registerInfo.name} onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })} />
            <input type="email" placeholder="Email" required value={registerInfo.email} onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })} />
            <input type="password" placeholder="Password" required value={registerInfo.password} onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })} />
            <input type="tel" placeholder="Phone" required value={registerInfo.phone} onChange={(e) => setRegisterInfo({ ...registerInfo, phone: formatPhone(e.target.value) })} />
            <button type="submit" className="login-btn">회원가입</button>
        </form>
    );
}

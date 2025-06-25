import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile } from '../apis/user';
import './MyPage.css';

interface UserProfile {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    agreedToPrivacyPolicy: boolean;
    privacyAgreementDate: string;
    privacyAgreementExpireAt: string;
    createdAt: string;
    socialAccounts: string[];
}

export default function MyPage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getMyProfile();
                setUser(res.data.data);
            } catch (err) {
                alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
                localStorage.removeItem('accessToken');
                navigate('/');
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    if (!user) return <div className="mypage-loading">사용자 정보를 불러오는 중입니다...</div>;

    return (
        <div className="mypage-wrapper">
            <header className="mypage-header">
                <div className="logo" onClick={() => navigate('/')}>GoodISGood</div>
                <nav className="nav-menu">
                    <button onClick={() => navigate('/')} className="nav-link">Home</button>
                    <button onClick={() => navigate('/profile')} className="nav-link">Profile</button>
                    <button onClick={handleLogout} className="nav-link">Logout</button>
                </nav>
            </header>

            <section className="mypage-section">
                <div className="mypage-content">
                    <h1>마이페이지</h1>
                    <p>회원님의 정보를 확인하고 설정할 수 있는 공간입니다.</p>

                    <div className="mypage-info">
                        <div className="info-item"><strong>이름</strong><span>{user.name}</span></div>
                        <div className="info-item"><strong>이메일</strong><span>{user.email}</span></div>
                        <div className="info-item"><strong>연락처</strong><span>{user.phone}</span></div>
                        <div className="info-item"><strong>가입일</strong><span>{new Date(user.createdAt).toLocaleDateString()}</span></div>
                        <div className="info-item"><strong>개인정보 약관 동의</strong><span>{user.agreedToPrivacyPolicy ? '동의' : '미동의'}</span></div>
                        <div className="info-item"><strong>약관 동의일</strong><span>{user.privacyAgreementDate ? new Date(user.privacyAgreementDate).toLocaleDateString() : '-'}</span></div>
                        <div className="info-item"><strong>약관 만료일</strong><span>{user.privacyAgreementExpireAt ? new Date(user.privacyAgreementExpireAt).toLocaleDateString() : '-'}</span></div>
                        <div className="info-item"><strong>소셜 계정</strong><span>{user.socialAccounts.length > 0 ? user.socialAccounts.join(', ') : '연동 없음'}</span></div>
                    </div>

                    <div className="mypage-actions">
                        <button className="btn">정보 수정</button>
                        <button className="btn btn-outline">비밀번호 변경</button>
                    </div>
                </div>
            </section>

            <footer className="mypage-footer">
                <p>© 2025 GoodISGood. All rights reserved.</p>
            </footer>
        </div>
    );
}

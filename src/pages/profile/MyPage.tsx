import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile} from "../../apis/user.ts";
import { UserProfile} from "../../types/profile.ts";
import styles from '../../styles/pages/user/MyPage.module.css';

export default function MyPage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () =>{
            const accessToken = localStorage.getItem('accessToken');

            // 토큰이 없을 경우 처리
            if(!accessToken || accessToken === 'null' || accessToken ==='undefined') {
                alert('로그인이 필요합니다.');
                localStorage.removeItem('accessToken');
                navigate('/login');
                return;
            }

            try{
                const res = await getMyProfile();
                setUser(res.data.data);
            }catch (err){
                alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    if (!user) return <div className={styles.loading}>사용자 정보를 불러오는 중입니다...</div>;

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.logo} onClick={() => navigate('/')}>GoodISGood</div>
                <nav className={styles.menu}>
                    <button onClick={() => navigate('/')} className={styles.link}>Home</button>
                    <button onClick={() => navigate('/profile')} className={styles.link}>Profile</button>
                    <button onClick={handleLogout} className={styles.link}>Logout</button>
                </nav>
            </header>

            <section className={styles.section}>
                <div className={styles.content}>
                    <h1>마이페이지</h1>
                    <p>회원님의 정보를 확인하고 설정할 수 있는 공간입니다.</p>

                    <div className={styles.info}>
                        <div className={styles.item}><strong>이름</strong><span>{user.name}</span></div>
                        <div className={styles.item}><strong>이메일</strong><span>{user.email}</span></div>
                        <div className={styles.item}><strong>연락처</strong><span>{user.phone}</span></div>
                        <div className={styles.item}><strong>가입일</strong><span>{new Date(user.createdAt).toLocaleDateString()}</span></div>
                        <div className={styles.item}><strong>개인정보 약관 동의</strong><span>{user.agreedToPrivacyPolicy ? '동의' : '미동의'}</span></div>
                        <div className={styles.item}><strong>약관 동의일</strong><span>{user.privacyAgreementDate ? new Date(user.privacyAgreementDate).toLocaleDateString() : '-'}</span></div>
                        <div className={styles.item}><strong>약관 만료일</strong><span>{user.privacyAgreementExpireAt ? new Date(user.privacyAgreementExpireAt).toLocaleDateString() : '-'}</span></div>
                        <div className={styles.item}><strong>소셜 계정</strong><span>{user.socialAccounts.length > 0 ? user.socialAccounts.join(', ') : '연동 없음'}</span></div>
                    </div>

                    <div className={styles.actions}>
                        <button className="btn">정보 수정</button>
                        <button className="btn btn-outline">비밀번호 변경</button>
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <p>© 2025 GoodISGood. All rights reserved.</p>
            </footer>
        </div>
    );
}

import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>당신의 아이디어를 웹에 담아드립니다</h1>
                <p>세련된 디자인과 견고한 개발로 완성하는 나만의 서비스</p>
                <div className="hero-buttons">
                    <Link to="/login" className="btn">로그인</Link>
                    <Link to="/register" className="btn btn-outline">회원가입</Link>
                </div>
            </div>
        </section>
    );
}

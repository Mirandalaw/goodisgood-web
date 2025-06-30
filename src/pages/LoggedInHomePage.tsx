import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/home/HomePage.css';

interface User {
    name: string;
    email: string;
}

export default function LoggedInHomePage() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/user/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    withCredentials: true,
                });
                setUser(res.data.data);
            } catch (err) {
                alert('로그인이 필요합니다.');
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                withCredentials: true,
            });
            localStorage.removeItem('accessToken');
            navigate('/');
        } catch (err) {
            alert('로그아웃 실패');
        }
    };

    return (
        <div className="home-wrapper">
            <header className="home-header">
                <div className="logo">GoodISGood</div>
                <nav className="nav-menu">
                    <Link to="/home">홈</Link>
                    <Link to="/me">마이페이지</Link>
                    <button onClick={handleLogout} className="logout-btn">로그아웃</button>
                </nav>
            </header>

            <section className="hero-section">
                <div className="hero-content">
                    <h1>{user?.name}님, 환영합니다!</h1>
                    <p>{user?.email}으로 로그인되었습니다.</p>
                    <div className="hero-buttons">
                        <Link to="/me" className="btn">마이페이지</Link>
                        <Link to="/feature" className="btn btn-outline">내 서비스</Link>
                    </div>
                </div>
            </section>

            <footer className="home-footer">
                <p>© 2025 GoodISGood. Welcome back!</p>
            </footer>
        </div>
    );
}

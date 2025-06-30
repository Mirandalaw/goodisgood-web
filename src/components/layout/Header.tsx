import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="home-header">
            <div className="logo">GoodISGood</div>
            <nav className="nav-menu" aria-label="main navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Sign Up</Link></li>
                </ul>
            </nav>
        </header>
    );
}

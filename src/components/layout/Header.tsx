import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow">
            <div className="text-xl font-bold text-blue-600">GoodISGood</div>
            <nav className="flex gap-4 text-gray-700">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Sign Up</Link>
            </nav>
        </header>
    );
}

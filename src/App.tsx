import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import AuthPage from './pages/AuthPage';
import MyPage from "./pages/MyPage.tsx";
import RequestResetPage from './pages/RequestResetPage';
import VerifyResetPage from './pages/VerifyResetPage';
import ConfirmResetPage from './pages/ConfirmResetPage'
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import FindIdPage from "./pages/FindIdPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import LoggedInHomePage from "./pages/LoggedInHomePage.tsx";
export default function App() {
    const isLoggedIn = !!localStorage.getItem('accessToken');

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/home" element={isLoggedIn ? <LoggedInHomePage/> : <HomePage />} />
            <Route path="/me" element={<MyPage />} />
            <Route path="/find-id" element={<FindIdPage />} />

            {/*<Route path="/reset-password/request" element={<RequestResetPage />} />*/}
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            {/*<Route path="/reset-password/confirm" element={<ConfirmResetPage />} />*/}

        </Routes>
    );
}

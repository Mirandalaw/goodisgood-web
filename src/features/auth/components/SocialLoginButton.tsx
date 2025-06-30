interface Props {
    provider: 'google' | 'kakao' | 'naver';
}

export default function SocialLoginButton({ provider }: Props) {
    const handleSocialLogin = () => {
        window.location.href = `http://localhost:3000/api/oauth2/authorize/${provider}`;
    };

    const providerLabel = {
        google: 'Sign in with Google',
        kakao: '카카오로 로그인',
        naver: '네이버로 로그인',
    };

    const providerIcon = {
        google: '/google.svg',
        kakao: '/kakao.svg',
        naver: '/naver.svg',
    };

    return (
        <button
            type="button"
            onClick={handleSocialLogin}
            className={`social-btn ${provider} dark-style`}
        >
            <img src={providerIcon[provider]} alt={provider} />
            {providerLabel[provider]}
        </button>
    );
}

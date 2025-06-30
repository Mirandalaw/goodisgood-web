import React from 'react';

interface Props {
    agreements: {
        all: boolean;
        over14: boolean;
        terms: boolean;
        marketing: boolean;
        ads: boolean;
    };
    setAgreements: React.Dispatch<React.SetStateAction<Props['agreements']>>;
    onNext: () => void;
}

export default function TermsAgreementForm({ agreements, setAgreements, onNext }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (name === 'all') {
            setAgreements({
                all: checked,
                over14: checked,
                terms: checked,
                marketing: checked,
                ads: checked,
            });
        } else {
            const updated = { ...agreements, [name]: checked };
            updated.all = updated.over14 && updated.terms && updated.marketing && updated.ads;
            setAgreements(updated);
        }
    };

    return (
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            <label><input type="checkbox" name="all" checked={agreements.all} onChange={handleChange} /> 전체 동의하기</label>
            <label><input type="checkbox" name="over14" checked={agreements.over14} onChange={handleChange} required /> 만 14세 이상입니다. (필수)</label>
            <label><input type="checkbox" name="terms" checked={agreements.terms} onChange={handleChange} required /> 이용약관 동의 (필수) <a href="/terms" target="_blank">자세히</a></label>
            <label><input type="checkbox" name="marketing" checked={agreements.marketing} onChange={handleChange} /> 마케팅 수신 동의 (선택)</label>
            <label><input type="checkbox" name="ads" checked={agreements.ads} onChange={handleChange} /> 광고성 정보 수신 동의 (선택)</label>
            <p className="privacy-notice">
                개인정보는 관련 법령에 따라 안전하게 처리됩니다. <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">개인정보처리방침</a> 참조
            </p>
            <button type="submit" className="login-btn">다음</button>
        </form>
    );
}
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
    return (
        <div className="privacy-policy-container">
            <h1>개인정보 수집 및 이용 동의</h1>

            <section>
                <h2>1. 수집하는 개인정보 항목</h2>
                <p>
                    회원가입 시 다음과 같은 개인정보를 수집합니다:
                </p>
                <ul>
                    <li>필수항목: 이름, 이메일 주소, 비밀번호, 휴대폰 번호</li>
                    <li>선택항목: 생년월일, 성별</li>
                </ul>
            </section>

            <section>
                <h2>2. 개인정보의 수집 및 이용 목적</h2>
                <p>
                    수집한 개인정보는 다음의 목적을 위해 활용됩니다:
                </p>
                <ul>
                    <li>회원 관리 및 서비스 제공</li>
                    <li>고객 상담 및 불만 처리</li>
                    <li>서비스 개선 및 맞춤형 서비스 제공</li>
                </ul>
            </section>

            <section>
                <h2>3. 개인정보의 보유 및 이용 기간</h2>
                <p>
                    수집된 개인정보는 회원 탈퇴 시까지 보유하며, 관련 법령에 따라 일정 기간 보관 후 파기됩니다.
                </p>
            </section>

            <section>
                <h2>4. 동의 거부 권리 및 불이익</h2>
                <p>
                    개인정보 제공에 대한 동의를 거부할 수 있으며, 이 경우 서비스 이용에 제한이 있을 수 있습니다.
                </p>
            </section>

            <p className="policy-footer">
                자세한 사항은 <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">개인정보처리방침</a>을 확인하시기 바랍니다.
            </p>
        </div>
    );
}

export interface UserProfile {
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

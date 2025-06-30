export const handleApiError = (error: unknown, defaultMessage: string) => {
    if (typeof error === 'object' && error !== null && 'response' in error) {
        const message = (error as any).response?.data?.message;
        alert(message || defaultMessage);
    } else {
        alert(defaultMessage);
    }
    console.error(error);
};

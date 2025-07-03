import axios from 'axios';

const USER_API = axios.create({
    baseURL: 'http://localhost:3000/api/user',
});

export const getMyProfile = () =>
    USER_API.get('/me', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api', // URL dasar untuk semua request
    timeout: 10000,  // Timeout request dalam milidetik
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;

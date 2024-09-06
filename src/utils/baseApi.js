import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './constant';



const baseApi = axios.create({
    baseURL: BASE_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

baseApi.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("job-portal_token"));
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

baseApi.interceptors.response.use(
    
    (response) => response,
    (error) => {
        const navigate = useNavigate();
        if (error.response && error.response.status === 401) {
          
           navigate('/login')
        }
        return Promise.reject(error);
    }
);

export default baseApi;

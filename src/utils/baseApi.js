import axios from 'axios';
import { BASE_URL } from './constant';


const token = JSON.parse(localStorage.getItem("job-portal_token"));
// console.log("from basemapi : ",)

const baseApi = axios.create({
    baseURL: BASE_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});

export default baseApi;

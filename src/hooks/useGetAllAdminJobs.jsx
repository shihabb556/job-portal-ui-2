import { setAllAdminJobs } from '@/redux/jobSlice';
import baseApi from '@/utils/baseApi';
import { JOB_API_END_POINT } from '@/utils/constant'; // Check if this is used or remove if not needed
import axios from 'axios'; // Ensure it's used or remove if not needed
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await baseApi.get(`/job/getadminjobs`);
                console.log('adminjobs: ', res.data);
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    }, [dispatch]);
}

export default useGetAllAdminJobs;
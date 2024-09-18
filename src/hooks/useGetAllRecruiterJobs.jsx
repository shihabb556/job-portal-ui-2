import { setAllRecruiterJobs} from '@/redux/jobSlice';
import baseApi from '@/utils/baseApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllRecruiterJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllRecruiterJobs = async () => {
            try {
                const res = await baseApi.get(`/job/recruiter-jobs`);
                console.log('recruiter jobs: ', res.data);
                if (res?.data?.success) {
                    dispatch(setAllRecruiterJobs(res?.data?.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllRecruiterJobs();
    }, [dispatch]);
}

export default useGetAllRecruiterJobs;
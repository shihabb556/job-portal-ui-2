import { setAllJobs } from '@/redux/jobSlice'
import baseApi from '@/utils/baseApi'
import { BASE_URL, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    const token = JSON.parse(localStorage.getItem("job-portal_token"));

    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await baseApi.get(`/job/get?keyword=${searchedQuery}` );

                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs
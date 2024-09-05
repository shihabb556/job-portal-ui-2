import { setAllAppliedJobs } from "@/redux/jobSlice";
import baseApi from "@/utils/baseApi";
import { APPLICATION_API_END_POINT, BASE_URL } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("job-portal_token"));

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await baseApi.get(`/application/get` );
                console.log(res.data);
                if(res.data.success){
                    console.log('applied job:.',res?.data)
                    dispatch(setAllAppliedJobs(res.data?.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;
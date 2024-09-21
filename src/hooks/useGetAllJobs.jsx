import { setAllJobs, setLoading, setError } from "@/redux/jobSlice"; // Import setLoading and setError actions
import baseApi from "@/utils/baseApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("job-portal_token"));

    useEffect(() => {
        const fetchAllJobs = async () => {
            dispatch(setLoading(true));  // Set loading to true before fetching

            try {
                const res = await baseApi.get(`/job/get`, {  // Fetch all jobs
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res?.data?.success) {
                    dispatch(setAllJobs(res?.data?.jobs));  // Dispatch jobs to the store
                } else {
                    dispatch(setAllJobs([]));
                    console.error("Failed to fetch jobs:", res.data);
                }
            } catch (error) {
                dispatch(setError(error.message));  // Handle error
                console.error("Error fetching jobs:", error);
            } finally {
                dispatch(setLoading(false));  // Set loading to false after fetching
            }
        };

        fetchAllJobs();
    }, []); 
};

export default useGetAllJobs;

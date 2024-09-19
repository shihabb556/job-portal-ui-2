import { setAllJobs } from "@/redux/jobSlice"; // Remove setPagination as it's no longer needed
import baseApi from "@/utils/baseApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("job-portal_token"));

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await baseApi.get(`/job/get`, {  // Updated endpoint to fetch all jobs at once
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res?.data?.success) {
                    dispatch(setAllJobs(res?.data?.jobs));  // Dispatch all jobs to the store
                    console.log('Fetched all jobs:', res?.data?.jobs);
                } else {
                    console.error("Failed to fetch jobs:", res.data);
                    dispatch(setAllJobs([]));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, []); // Removed pagination and searchedQuery from dependency array as they no longer affect the API call
};

export default useGetAllJobs;

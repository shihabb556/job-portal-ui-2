import { setAllJobs, setPagination } from "@/redux/jobSlice";
import baseApi from "@/utils/baseApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery, pagination } = useSelector((store) => store.job);
    const token = JSON.parse(localStorage.getItem("job-portal_token"));

    useEffect(() => {
        const fetchAllJobs = async () => {
            console.log('Fetching jobs with pagination and filters');
            try {
                const { keyword, location, category, salary } = searchedQuery;
                const { currentPage, limit } = pagination;

                const queryParams = new URLSearchParams({
                    keyword: keyword || "",
                    location: location || "",
                    category: category || "",
                    salary: salary || "",
                    page: currentPage,
                    limit: limit
                });

                const res = await baseApi.get(`/job/get?${queryParams.toString()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res?.data?.success) {
                    dispatch(setAllJobs(res?.data?.jobs));
                    dispatch(setPagination({
                        totalJobs: res?.data?.totalJobs,
                        totalPages: res?.data?.totalPages,
                        currentPage: res?.data?.currentPage,
                        limit: limit
                    }));
                } else {
                    console.error("Failed to fetch jobs:", res.data);
                    dispatch(setAllJobs([]));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, [searchedQuery, pagination.currentPage, pagination.limit]);
};

export default useGetAllJobs;

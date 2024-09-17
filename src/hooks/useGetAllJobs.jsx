import { setAllJobs } from "@/redux/jobSlice";
import baseApi from "@/utils/baseApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job); 
  const token = JSON.parse(localStorage.getItem("job-portal_token"));

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const { keyword, location, category, salary } = searchedQuery;

        const queryParams = new URLSearchParams({
          keyword: keyword || "",
          location: location || "",
          category: category || "",
          salary: salary || "",
        });
        console.log(location,category,salary);

        const res = await baseApi.get(`/job/get?${queryParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (res.data.success) {
          console.log(res?.data?.jobs)
          dispatch(setAllJobs(res?.data?.jobs));
        } else {
          console.error("Failed to fetch jobs:", res.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error.response || error.message);
      }
    };

    fetchAllJobs();
  }, [searchedQuery]);
};

export default useGetAllJobs;

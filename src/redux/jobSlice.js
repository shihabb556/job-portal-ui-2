import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';

export const selectJobData = createSelector(
  [state => state.job],
  job => ({
    allJobs: job.allJobs,
    searchedQuery: job.searchedQuery,
    pagination: job.pagination,
    currentPage: job.pagination.currentPage,
    totalPages: job.pagination.totalPages,
    loading: job.loading 
  })
);

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        allRecruiterJobs: [],
        singleJob: null,
        allAppliedJobs: [],
        searchJobByText: '',
        searchedQuery: {
            location: "",
            category: "",
            salary: "",
            keyword: ''
        },
        pagination: {
            totalJobs: 0,
            totalPages: 1,
            currentPage: 1,
            limit: 10, // Control the number of jobs per page
        },
        loading: false, // Add loading state
        error: null,   // Add error state
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        setAllRecruiterJobs: (state, action) => {
            state.allRecruiterJobs = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.pagination.currentPage = action.payload;
        },
        setLoading: (state, action) => { // Add setLoading action
            state.loading = action.payload;
        },
        setError: (state, action) => { // Add setError action
            state.error = action.payload;
        }
    }
});

export const {
    setAllJobs,
    setPagination,
    setSingleJob,
    setAllRecruiterJobs,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setCurrentPage,
    setLoading, // Export setLoading
    setError    // Export setError
} = jobSlice.actions;

export default jobSlice.reducer;

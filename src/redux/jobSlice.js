import { createSlice } from "@reduxjs/toolkit";

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
            limit: 10, // You might want to add a limit to control the number of jobs per page
        },
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
        // Add an action to handle page changes
        setCurrentPage: (state, action) => {
            state.pagination.currentPage = action.payload;
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
    setCurrentPage
} = jobSlice.actions;

export default jobSlice.reducer;

import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState([]); // Displayed jobs
    const [page, setPage] = useState(1); // Current page
    const [loading, setLoading] = useState(false); // Loading state
    const [hasMore, setHasMore] = useState(true); // Check if there are more jobs to load
    const [isOpen, setIsOpen] = useState(false);

    const jobsPerPage = 2; // Number of jobs per batch

    useEffect(() => {
        loadJobs(page, searchedQuery);
    }, [page, searchedQuery]);

    // Function to load jobs based on the page and search query
    const loadJobs = async (pageNum, query) => {
        setLoading(true);

        // Simulate API call or use actual API call here
        const filtered = allJobs.filter((job) => {
            return job.title.toLowerCase().includes(query?.toLowerCase()) ||
                job.description.toLowerCase().includes(query?.toLowerCase()) ||
                job.location.toLowerCase().includes(query?.toLowerCase());
        });

        const newJobs = filtered.slice((pageNum - 1) * jobsPerPage, pageNum * jobsPerPage);

        if (newJobs.length === 0) {
            setHasMore(false); // No more jobs to load
        }

        setFilterJobs(prevJobs => [...prevJobs, ...newJobs]); // Append new jobs
        setLoading(false);
    };

    // Handle sidebar toggle for mobile
    const handleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Scroll detection to load more jobs when near bottom
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    // Add scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    return (
        <div>
            <Navbar />
            <div className='max-w-5xl p-4 mx-auto mt-5'>
                <div className='flex flex-col sm:flex-row gap-5'>
                    
                    {/* Filter section */}
                    <div className={`relative sm:mt-[-15px] w-full sm:w-[30%] md:w-[34%] lg:w-[20%]`}>
                        {/* Button for mobile view to toggle filter */}
                        <Button className='block sm:hidden w-[7em] mb-4' onClick={handleSidebar}>Filter</Button>
                        <FilterCard isOpen={isOpen} />
                    </div>

                    {/* Job list section */}
                    {filterJobs.length <= 0 && !loading ? (
                        <span>Job not found</span>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto no-scrollbar p-5'>
                            <div className='grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <JobCard job={job} />
                                    </motion.div>
                                ))}
                            </div>
                            {loading && (
                                <div className="flex justify-center mt-5">
                                    <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                                </div>
                            )}
                            {!hasMore && <p className="text-center text-gray-500">No more jobs to load</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;

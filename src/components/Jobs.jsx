import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
    // Fetch all jobs
    useGetAllJobs();
    
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState([]); // Displayed jobs
    const [page, setPage] = useState(1); // Current page
    const [loading, setLoading] = useState(false); // Loading state
    const [hasMore, setHasMore] = useState(true); // Check if there are more jobs to load
    const [isOpen, setIsOpen] = useState(false); // Filter sidebar state


    // Memoized filtered jobs based on search query with safety checks for undefined values
    const filteredJobs = React.useMemo(() => {
        return allJobs.filter(job => {
            const matchesLocation = searchedQuery.location
                ? job.location?.toLowerCase() === searchedQuery.location.toLowerCase()
                : true;
            const matchesCategory = searchedQuery.category
                ? job.category?.toLowerCase() === searchedQuery.category.toLowerCase()
                : true;
            const matchesSalary = searchedQuery.salary
                ? job.salaryRange === searchedQuery.salary
                : true;

            return matchesLocation && matchesCategory && matchesSalary;
        });
    }, [allJobs, searchedQuery]);



    // Handle sidebar toggle for mobile
    const handleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div>
            <Navbar />
            <div className='max-w-5xl p-4 mx-auto mt-5'>
                <div className='flex flex-col sm:flex-row gap-5'>
                    {/* Filter section */}
                    <div className='relative sm:mt-[-15px] w-full sm:w-[30%] md:w-[34%] lg:w-[30%]'>
                        <Button className='block sm:hidden w-[7em] mb-4' onClick={handleSidebar}>
                            Filter
                        </Button>
                        <FilterCard isOpen={isOpen} />
                    </div>

                    {/* Job list section */}
                    {filterJobs.length <= 0 && !loading ? (
                        <span>Job not found</span>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto no-scrollbar p-5'>
                            <div className='grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4'>
                                {filterJobs.map((job, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job.id || idx}
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

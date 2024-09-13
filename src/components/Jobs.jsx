import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    // Handle sidebar toggle for mobile
    const handleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl p-4 mx-auto mt-5'>
                <div className='flex flex-col sm:flex-row gap-5'>
                 
                    {/* Filter section */}
                    <div className={`relative sm:top-1 sm:relative w-full sm:w-[30%] md:w-[34%] lg:w-[20%]`}>
                           {/* Button for mobile view to toggle filter */}
                           <Button className='block sm:hidden w-[7em] mb-4' onClick={handleSidebar}>Filter</Button>
                    
                        <FilterCard isOpen={isOpen} />
                    </div>

                    {/* Job list section */}
                    {filterJobs.length <= 0 ? (
                        <span>Job not found</span>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto p-5'>
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;

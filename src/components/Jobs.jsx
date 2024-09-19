import React, { useState, useEffect, useRef } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { selectJobData } from '@/redux/jobSlice';
import { ArrowBigDown, ArrowBigUp, FilterIcon, FilterXIcon } from 'lucide-react';

const Jobs = () => {
    const jobListRef = useRef(null); // Ref for the job list container

    useGetAllJobs(); // Fetch initial jobs

    const { allJobs, searchedQuery } = useSelector(selectJobData);

    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrollToBottom, setScrollToBottom] = useState(true); // Track scroll state (top/bottom)

    // Load More Jobs State
    const [visibleJobs, setVisibleJobs] = useState(10); // Start by showing 10 jobs

    // Filtered Jobs Calculation
    const filteredJobs = React.useMemo(() => {
        if (!allJobs || !Array.isArray(allJobs)) return [];

        return allJobs.filter(job => {
            const matchesLocation = searchedQuery.location
                ? job.location?.toLowerCase() === searchedQuery.location.toLowerCase()
                : true;
            const matchesCategory = searchedQuery.category
                ? job.category?.toLowerCase() === searchedQuery.category.toLowerCase()
                : true;
            const matchesSalary = searchedQuery.salary
                ? job.salary >= searchedQuery.salary
                : true;

            const matchesSearchQuery = searchQuery
                ? job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  job.company?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  job.description?.toLowerCase().includes(searchQuery.toLowerCase())
                : true;

            return matchesLocation && matchesCategory && matchesSalary && matchesSearchQuery;
        });
    }, [allJobs, searchedQuery, searchQuery]);

    // Load More Jobs (increment the visible jobs)
    const loadMoreJobs = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleJobs(prevVisible => prevVisible + 10); // Load 10 more jobs each time
            setLoading(false);
        }, 1000); // Simulate loading delay
    };

    const handleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Handle toggle between scrolling to top or bottom
    const handleScrollToggle = () => {
        const jobListDiv = jobListRef.current;
        if (jobListDiv) {
            if (scrollToBottom) {
                // Scroll to bottom
                jobListDiv.scrollTo({ top: jobListDiv.scrollHeight, behavior: 'smooth' });
            } else {
                // Scroll to top
                jobListDiv.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        setScrollToBottom(!scrollToBottom); // Toggle state
    };

    return (
        <div>
            <Navbar />  
            <input 
                onClick={()=>setIsOpen(false)}
                type="text"
                placeholder='Search Jobs...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="absolute right-0 mt-2 z-30 w-[45%] sm:w-[60%] ml-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm placeholder-gray-500 mr-3"
            />

            <div className='max-w-7xl p-4 mx-auto mt-5 h-[80vh] '>
                <div className='flex flex-col sm:flex-row gap-5 relative'>
                    <div className='absolute left-0 z-40 lg:relative sm:mt-[-15px] w-full sm:w-[46%] md:w-[50%] lg:w-[30%]'>
                      
                        <FilterCard isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>

                    <div className="flex-1 w-full " onClick={()=>setIsOpen(false)}>
                        {filteredJobs && filteredJobs.length > 0 ? (
                         <div
                            ref={jobListRef}
                            className="flex-1 h-[86vh] overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100"
                        >
                            <div className="grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
                            {filteredJobs.slice(0, visibleJobs).map((job, idx) => (
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
                        
                            {visibleJobs < filteredJobs.length && (
                            <div className="flex justify-center mt-5">
                                <Button className=' rounded' onClick={loadMoreJobs} disabled={loading}>
                                {loading ? (
                                  
                                        <div className="flex justify-center mt-2">
                                            <span>Loading...</span>
                                           <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                                       </div>
                                   
                                ) : ('Load More Jobs')}
                                </Button>
                            </div>
                            )}
                        
                           
                        </div>
                       
                        ) : (
                            !loading && <div className='m-10'> Job not Found! </div>
                        )}
                    </div>
                </div>
            </div>
            {/*  (Fixed in bottom-right) */}
            <div className='fixed bottom-5 right-5 flex items-center gap-1'>
                {/* FilterCard Toggle Button */}
                <Button className={`focus:outline-none block lg:hidden w-[7em] mx-1  ${isOpen ? 'bg-red-500 hover:bg-red-400' : ''}`} m-4 onClick={handleSidebar}>
                    {isOpen ? (<FilterXIcon/>) : (<FilterIcon/>)}
                </Button>

                {/* Scroll Toggle Button (Fixed in bottom-right) */}
                <Button
                    onClick={handleScrollToggle}
                    className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
                >
                    {scrollToBottom ? (<ArrowBigDown/>) : (<ArrowBigUp/>)}
                </Button>

            </div>
          
        </div>
    );
};

export default Jobs;

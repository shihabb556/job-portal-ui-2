import React, { useState, useRef } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { selectJobData } from '@/redux/jobSlice';
import { ArrowBigDown, ArrowBigUp, FilterIcon, FilterXIcon, LucideSidebarClose, LucideSidebarOpen } from 'lucide-react';

const Jobs = () => {
    const jobListRef = useRef(null); // Ref for the job list container

    useGetAllJobs(); // Fetch initial jobs

    const { allJobs, searchedQuery, loading } = useSelector(selectJobData); // Get loading from Redux

    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [scrollToBottom, setScrollToBottom] = useState(true); // Track scroll state (top/bottom)
    const [isBottomBar, setIsBottomBar] = useState(true); 
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
        setVisibleJobs(prevVisible => prevVisible + 10); // Load 10 more jobs each time
    };

    const handleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleScrollToggle = () => {
        const jobListDiv = jobListRef.current;
        if (jobListDiv) {
            if (scrollToBottom) {
                jobListDiv.scrollTo({ top: jobListDiv.scrollHeight, behavior: 'smooth' });
            } else {
                jobListDiv.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        setScrollToBottom(!scrollToBottom);
    };

    return (
        <div>
            <Navbar />  
           <div className='w-full border relative'>
                <input 
                        onClick={()=>setIsOpen(false)}
                        type="text"
                        placeholder='Search Jobs...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="absolute right-0 mt-2 z-30 w-full sm:w-[45%] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm placeholder-gray-500 mr-3"
                    />
           </div>

            <div className='max-w-7xl p-4 mx-auto mt-5  '>
                <div className='flex flex-col sm:flex-row gap-5 relative'>
                    <div className='absolute left-0 z-40 lg:relative sm:mt-[-15px] w-full sm:w-[46%] md:w-[50%] lg:w-[30%]'>
                        <FilterCard isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>

                    <div className="flex-1 w-full " onClick={()=>setIsOpen(false)}>
                        {loading ? ( // Show loading state
                            <div className="flex justify-center items-center h-[70vh]">
                                <span>Loading...</span>
                                <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                            </div>
                        ) : filteredJobs && filteredJobs.length > 0 ? (
                         <div
                            ref={jobListRef}
                            className="flex-1 h-[70vh] lg:h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#A3AFFA] scrollbar-track-gray-100 pb-[7em] pt-[3em]"
                        >
                            <div className="grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 pb-[2em]">
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
                            <div className="flex justify-center">
                                <Button className='rounded' onClick={loadMoreJobs}>
                                    Load More Jobs
                                </Button>
                            </div>
                            )}
                        </div>
                        ) : (
                            <div className='m-10'> Job not Found! </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Fixed in bottom-right */}
            <div className={`fixed bottom-5 right-5 flex items-center gap-1`}>
                <button className='text-gray-800 hover:text-gray-700 bg-gray-100 rounded p-1 block md:hidden' onClick={() => setIsBottomBar(!isBottomBar)}>
                    {isBottomBar ? <LucideSidebarOpen /> : <LucideSidebarClose />}
                </button>
                <div className={`flex items-center gap-1 ${isBottomBar ? 'block' : 'hidden'}`}>
                    <Button className={`bg-blue-500 hover:bg-blue-400 focus:outline-none block lg:hidden w-[7em] mx-1  ${isOpen ? 'bg-red-500 hover:bg-red-400' : ''}`} onClick={handleSidebar}>
                        {isOpen ? (<div className='flex gap-1'><FilterXIcon/> Close </div>) : (<div className='flex gap-1'><FilterIcon/> Filter</div>)}
                    </Button>

                    <Button
                        onClick={handleScrollToggle}
                        className="text-white px-4 py-2 rounded focus:outline-none"
                    >
                        {scrollToBottom ? (
                            <div className='flex gap-1'><ArrowBigDown /> </div>
                        ) : (
                            <div className='flex gap-1'><ArrowBigUp /> </div>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Jobs;

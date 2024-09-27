import React, { useState, useRef } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { selectJobData } from '@/redux/jobSlice';
import {
    ArrowBigDown,
    ArrowBigUp,
    FilterIcon,
    FilterXIcon,
    LucideSidebarClose,
    LucideSidebarOpen
} from 'lucide-react';

const Jobs = () => {
    const jobListRef = useRef(null);

    useGetAllJobs(); // Fetch initial jobs

    const { allJobs, searchedQuery, loading } = useSelector(selectJobData);
    const { user } = useSelector(store => store.auth);

    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [scrollToBottom, setScrollToBottom] = useState(true); // Track scroll state (top/bottom)
    const [isBottomBar, setIsBottomBar] = useState(true);
    const [visibleJobs, setVisibleJobs] = useState(10); // Start by showing 10 jobs

    // Filtered Jobs Calculation
    const filteredJobs = React.useMemo(() => {
        if (!allJobs || !Array.isArray(allJobs)) return [];
        const jobs = allJobs.filter((job) => {
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

            return (
                matchesLocation &&
                matchesCategory &&
                matchesSalary &&
                matchesSearchQuery
            );
        });

        return jobs;
    }, [allJobs, searchedQuery, searchQuery]);

    const loadMoreJobs = () => {
        setVisibleJobs((prevVisible) => prevVisible + 10); // Load 10 more jobs each time
    };

    const handleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleScrollToggle = () => {
        const jobListDiv = jobListRef.current;
        if (jobListDiv) {
            if (scrollToBottom) {
                jobListDiv.scrollTo({
                    top: jobListDiv.scrollHeight,
                    behavior: 'smooth'
                });
            } else {
                jobListDiv.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        setScrollToBottom(!scrollToBottom);
    };

    return (
        <div className="bg-gradient-to-br from-[#141E30] to-[#243B55] text-gray-100 min-h-screen">
            <Navbar />
            <div className="w-full border relative bg-gray-800">
                <input
                    onClick={() => setIsOpen(false)}
                    type="text"
                    placeholder="Search Jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="fixed right-3 mt-2 z-30 w-[80vw] sm:w-[40vw] px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm text-gray-100 placeholder-gray-400"
                />
            </div>

            <div className="max-w-7xl p-4 mx-auto mt-5">
                <div className="flex flex-col sm:flex-row gap-5 relative">
                    <div className="fixed left-0 top-5 z-40 sm:mt-[em] w-full sm:w-[46%] md:w-[50%] lg:w-[30%] mt-[2.7em]">
                        <FilterCard isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>

                    <div className="flex-1 w-full min-h-screen" onClick={() => setIsOpen(false)}>
                        {loading ? (
                            <div className="flex justify-center items-center h-screen">
                                <div className="loader border-t-4 border-indigo-500 rounded-full w-8 h-8 animate-spin"></div>
                            </div>
                        ) : filteredJobs.length > 0 ? (
                            <div ref={jobListRef} className="flex-1 mt-5 pb-[5rem]">
                                <div className="grid xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10 pb-[2.5em]">
                                    {filteredJobs
                                        .slice(0, visibleJobs)
                                        .map((job, idx) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job.id || idx}
                                            >
                                                <JobCard job={job} userId={user._id} />
                                            </motion.div>
                                        ))}
                                </div>

                                {visibleJobs < filteredJobs.length && (
                                    <div className="flex justify-center">
                                        <div className="rounded text-indigo-400 border cursor-pointer border-indigo-500 hover:text-indigo-500 p-4 text-bold "      onClick={loadMoreJobs}  >
                                            Load More Jobs
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="m-10 text-gray-400">Job not Found!</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Fixed bottom-right bar */}
            <div className={`fixed bottom-3 mb-[1em] sm:mb-[2em] right-5 flex items-center gap-1`}>
                <button
                    className="text-gray-100 hover:text-gray-300 bg-gray-700 rounded p-1 block md:hidden"
                    onClick={() => setIsBottomBar(!isBottomBar)}
                >
                    {isBottomBar ? <LucideSidebarOpen /> : <LucideSidebarClose />}
                </button>
                <div className={`flex items-center gap-1 ${isBottomBar ? 'block' : 'hidden'}`}>
                    <Button
                        className={`bg-indigo-600 hover:bg-indigo-500 text-gray-200 w-[7em] mx-1 ${isOpen ? 'bg-red-600 hover:bg-red-500' : ''}`}
                        onClick={handleSidebar}
                    >
                        {isOpen ? (
                            <div className="flex gap-1">
                                <FilterXIcon /> Close
                            </div>
                        ) : (
                            <div className="flex gap-1">
                                <FilterIcon /> Filter
                            </div>
                        )}
                    </Button>

                    <Button
                        onClick={handleScrollToggle}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded focus:outline-none"
                    >
                        {scrollToBottom ? (
                            <div className="flex gap-1">
                                <ArrowBigDown />
                            </div>
                        ) : (
                            <div className="flex gap-1">
                                <ArrowBigUp />
                            </div>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Jobs;

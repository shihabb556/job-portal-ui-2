import React, { useState, useEffect, useRef } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import JobCard from './JobCard';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Pagination from './Pagination';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setCurrentPage } from '@/redux/jobSlice';

const Jobs = () => {
    const dispatch = useDispatch();
    const scrollableDivRef = useRef(null); // Create a reference to the scrollable div

    useGetAllJobs();

    const { allJobs, searchedQuery, pagination } = useSelector(store => ({
        allJobs: store.job.allJobs,
        searchedQuery: store.job.searchedQuery,
        pagination: store.job.pagination,
    }));

    const [filterJobs, setFilterJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isItemClick, setIsItemClick] = useState(false);

    const filteredJobs = React.useMemo(() => {
        setLoading(true);
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

    useEffect(() => {
        setFilterJobs(filteredJobs);
        setLoading(false);
    }, [filteredJobs]);

    const handleSidebar = () => {
        setIsOpen(!isOpen);
        setIsItemClick(false);
    };

  

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl p-4 mx-auto mt-5 h-[75vh]'>
                <div className='flex flex-col sm:flex-row gap-5'>
                    <div className='relative sm:mt-[-15px] w-full sm:w-[30%] md:w-[34%] lg:w-[30%]'>
                        <Button className='block sm:hidden w-[7em] mb-4' onClick={handleSidebar}>
                            Filter
                        </Button>
                        <FilterCard isOpen={isOpen} isItemClick={isItemClick} setIsItemClick={setIsItemClick} />
                    </div>

                    <div className="flex-1">
                        <div className='flex w-[86%] md:w-[70%] shadow-lg border border-gray-400 rounded-[7px] items-center gap-4 mx-auto mb-5'>
                            <Input
                                type="text"
                                placeholder="Search jobs by title or company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="outline-none focus:outline-none border-none w-full"
                            />
                        </div>

                        {loading && (
                            <div className="flex justify-center mt-5">
                                <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin m-10 mx-[10vw]"></div>
                            </div>
                        )}

                        {filterJobs && filterJobs.length > 0 ? (
                            <div
                                ref={scrollableDivRef} // Attach the reference here
                                className='flex-1 h-[68vh] overflow-y-auto no-scrollbar p-5'
                            >
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
                              
                            </div>
                        ) : (
                            !loading && <div className='m-10'> Job not Found! </div>
                        )}
                    </div>
                </div>

                <Pagination
                    scrollableDivRef={scrollableDivRef} // Pass the reference here
                />
            </div>
        </div>
    );
};

export default Jobs;

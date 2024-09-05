import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [isOpen,setIsOpen] = useState(false);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);


    // handle side filter in small device
    const handleSidebar = ()=>{
        setIsOpen(prev=>!prev)
    }
    // handleCloseSidebar
    // const handleCloseSidebar = ()=>{
    //     setIsOpen(false)
    // }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl p-4 mx-auto mt-5'>
                <div className='flex flex-col sm:flex-row gap-5'>
                    <Button className='block sm:hidden' onClick={handleSidebar}>Filter</Button>
                    <div className=''>
                        <FilterCard isOpen={isOpen}/>
                    </div>

                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1  h-[88vh] overflow-y-auto p-5'>
                                <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs
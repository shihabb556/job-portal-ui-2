import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20 '>
            <h1 className='text-xl md:text-3xl font-bold'><span className='text-[#6A38C2]'>Latest </span> Job Openings</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job,idx) => <LatestJobCard key={idx} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs
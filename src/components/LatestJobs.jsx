import React from 'react';
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs, loading, error } = useSelector(store => store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-xl md:text-3xl font-bold'>
                <span className='text-[#6A38C2]'>Latest </span> Job Openings
            </h1>
            
            {loading ? (
                
                    <div className="flex justify-center items-center gap-2">
                        <span>Loading...</span>
                        <div className="loader border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
                    </div>
         
            ) : error ? (
                <div className="flex justify-center items-center my-5">
                    <span className="text-lg text-red-500">Error: {error}</span>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                    {allJobs.length <= 0 ? (
                        <span>No Job Available</span>
                    ) : (
                        allJobs.slice(0, 6).map((job, idx) => (
                            <LatestJobCard key={idx} job={job} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default LatestJobs;

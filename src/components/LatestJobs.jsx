import React from 'react';
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux'; 
import JobCard from './JobCard';

const LatestJobs = () => {
    const { allJobs, loading, error } = useSelector(store => store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-xl md:text-3xl font-bold text-white'>
                <span className='text-indigo-400'>Latest </span> Job Openings
            </h1>
            
            {loading ? (
                <div className="flex justify-center items-center gap-2 text-white">
                    <span>Loading...</span>
                    <div className="loader border-t-4 border-indigo-400 rounded-full w-6 h-6 animate-spin"></div>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center my-5">
                    <span className="text-lg text-red-500">Error: {error}</span>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 my-5'>
                    {allJobs.length <= 0 ? (
                        <span className="text-white">No Job Available</span>
                    ) : (
                        allJobs.slice(0, 4).map((job, idx) => (
                            <JobCard key={idx} job={job} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default LatestJobs;

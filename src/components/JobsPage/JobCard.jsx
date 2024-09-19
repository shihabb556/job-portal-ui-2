import React from 'react';

const JobCard = ({ job }) => {
    return (
        <div className="p-4">
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="text-sm text-gray-600"></p>
            <p className="text-sm text-gray-600">{job.location} - {job.category}</p>
            <p className="text-sm mt-2">{job.description}</p>
            <p className="text-sm font-semibold mt-2">{job.salary}</p>
        </div>
    );
};

export default JobCard;

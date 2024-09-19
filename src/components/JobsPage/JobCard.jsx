import React from 'react';
import { Briefcase, MapPin, Tag } from 'lucide-react'; // Assuming you're using these icons from lucide-react

const JobCard = ({ job }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="p-6">
                {/* Job Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>

                {/* Job Info */}
                <div className="flex items-center text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <span>{job.location}</span>
                    <span className="mx-2">|</span>
                    <Tag className="w-4 h-4 text-gray-500 mr-2" />
                    <span>{job.category}</span>
                </div>

                {/* Job Description */}
                <p className="text-gray-700 mb-4">{job.description}</p>

                {/* Salary */}
                <p className="text-lg font-semibold text-blue-600">{`$${job.salary}`}</p>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 flex justify-between items-center">
                <a href={`/jobs/${job.id}`} className="text-blue-500 hover:text-blue-700 font-medium">
                    View Details
                </a>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300">
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default JobCard;

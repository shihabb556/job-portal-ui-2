import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Tag } from 'lucide-react'; // Ensure these imports are correct
import { Button } from '../ui/button'; // Ensure this import is correct
import JobCard from './JobCard'; // Ensure this import is correct
import Navbar from '../LandingPage/Navbar';
import { Industry, Location } from '@/utils/constant'; // Ensure these constants are properly defined
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { selectJobData } from '@/redux/jobSlice';

const JobsPage = () => {
    useGetAllJobs(); // Fetch initial jobs

    const { allJobs } = useSelector(selectJobData);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [visibleJobs, setVisibleJobs] = useState(10);

    const filteredJobs = useMemo(() => {
        return allJobs.filter(job => {
            const matchesSearch = 
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (typeof job.company === 'string' && job.company.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesLocation = selectedLocation ? job.location === selectedLocation : true;
            const matchesCategory = selectedCategory ? job.category === selectedCategory : true;

            return matchesSearch && matchesLocation && matchesCategory;
        });
    }, [searchQuery, selectedLocation, selectedCategory, allJobs]);

    const loadMoreJobs = () => {
        setVisibleJobs(prevVisible => prevVisible + 10);
    };

    return (
        <div>
            <Navbar />
            <div className="p-4 mx-auto max-w-screen-lg mt-[4em]">
                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Search Input */}
                    <div className="flex flex-1 items-center border rounded-lg overflow-hidden shadow-md">
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 px-4 py-2 border-none outline-none"
                        />
                        <Search className="w-6 h-6 text-gray-500 mx-2" />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Location Filter */}
                        <div className="flex items-center border rounded-lg overflow-hidden shadow-md">
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="flex-1 px-4 py-2 border-none outline-none"
                            >
                                <option value="">Select Location</option>
                                {Location.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                            <MapPin className="w-6 h-6 text-gray-500 mx-2" />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center border rounded-lg overflow-hidden shadow-md">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="flex-1 px-4 py-2 border-none outline-none"
                            >
                                <option value="">Select Category</option>
                                {Industry.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <Tag className="w-6 h-6 text-gray-500 mx-2" />
                        </div>
                    </div>
                </div>

                {/* Job Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredJobs.slice(0, visibleJobs).map(job => (
                        <motion.div
                            key={job._id} // Ensure 'id' or similar unique field exists
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white shadow-md rounded-lg p-4"
                        >
                            <JobCard job={job} />
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                {visibleJobs < filteredJobs.length && (
                    <div className="flex justify-center mt-8">
                        <Button onClick={loadMoreJobs} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                            Load More Jobs
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobsPage;

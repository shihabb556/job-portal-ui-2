import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import JobCard from './JobCard'; // Assuming JobCard component handles job display
import { useSelector } from 'react-redux';
import baseApi from '@/utils/baseApi';

const SavedJobs = () => {
  const { user } = useSelector((state) => state.auth); // Fetch user data from Redux
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await baseApi.get(`/job/get-saved-jobs/${user?._id}`);
        setSavedJobs(response.data.savedJobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved jobs:', error.message);
        setLoading(false);
      }
    };

    if (user) {
      fetchSavedJobs();
    }
  }, [user]);

  // Function to remove a job from saved jobs in the UI
  const handleRemoveSavedJob = (jobId) => {
    setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId)); // Remove job from UI
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-5 pb-10">
        <h1 className="text-2xl font-bold mb-5">Your Saved Jobs</h1>
        {savedJobs.length > 0 ? (
          <div className="grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8">
            {savedJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                userId={user._id}
                onRemoveSavedJob={handleRemoveSavedJob} // Pass the function to remove job
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-lg">No saved jobs found.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;

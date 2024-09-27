import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRightCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/utils/constant';
import { toast } from 'sonner';

const JobCard = ({ job, userId, onRemoveSavedJob }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkIfJobIsSaved = async () => {
      try {
        const jobId = job?._id;
        if (!userId || !jobId) return;

        const response = await axios.post(`${BASE_URL}/job/is-saved`, { userId, jobId }, {
          headers: { 'Content-Type': 'application/json' }
        });

        setIsSaved(response.data.isSaved);
      } catch (error) {
        console.error('Error checking saved job status:', error.message);
      }
    };

    checkIfJobIsSaved();
  }, [job, userId]);

  const handleJobNavigation = () => {
    navigate(`/job/${job?._id}`);
  };

  const toggleSaveJob = async () => {
    if (!userId) {
      toast.error('Please log in to save jobs!');
      return;
    }

    try {
      const jobId = job?._id;
      const url = isSaved ? `${BASE_URL}/job/unsave-job` : `${BASE_URL}/job/save-job`;
      const response = await axios.post(url, { userId, jobId }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        setIsSaved(!isSaved);
        if (!isSaved) {
          toast.success('Job saved successfully!');
        } else {
          toast.success('Job unsaved successfully!');
          onRemoveSavedJob(jobId);
        }
      }
    } catch (error) {
      console.error('Error toggling job save:', error.message);
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-lg bg-gray-800 border border-gray-800 hover:border-indigo-800 shadow-xl hover:shadow-2xl transition-all duration-100   hover:scale-[1.03] transform">
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-lg text-white">{job?.title}</h1>
      <div
        className="rounded-full p-2 hover:bg-gray-700 cursor-pointer transition-colors"
        onClick={toggleSaveJob}
      >
        {isSaved ? <BookmarkCheck className="text-indigo-400" /> : <Bookmark className="text-gray-400" />}
      </div>
    </div>
  
    <div className="flex items-center gap-3 my-4">
      <Avatar>
        <AvatarImage src={job?.company?.logo} />
      </Avatar>
      <div>
        <h1 className="font-medium text-md text-gray-300">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
    </div>
  
    <div>
      <p className="text-sm text-gray-400">
        {job?.description.length > 120 ? `${job?.description.slice(0, 120)}...` : job?.description}
      </p>
    </div>
  
    <div className="flex items-center gap-2 mt-4">
      <Badge className="text-blue-400  font-bold bg-gray-800 border hover:bg-gray-800 border-gray-700">
        {job?.position} Positions
      </Badge>
      <Badge className="text-gray-300 font-bold bg-gray-800 hover:bg-gray-800 border border-gray-700">
        {job?.jobType}
      </Badge>
    </div>
  
    <div className="flex items-center justify-between gap-4 mt-6">
      <p className="text-sm text-gray-500">
        {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
      </p>
  
      <div
        className="bg-indigo-600 flex gap-3 cursor-pointer hover:bg-indigo-500 text-white px-4 py-2 rounded-md"
        onClick={handleJobNavigation}
      >
        More Details <ArrowRightCircle />
      </div>
    </div>
  </div>
  
  );
};

export default JobCard;

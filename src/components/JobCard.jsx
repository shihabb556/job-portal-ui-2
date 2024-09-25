import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRightCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import handleLimitDescription from '@/utils/handleLimitDescription';
import axios from 'axios';
import baseApi from '@/utils/baseApi';
import { BASE_URL } from '@/utils/constant';
import { toast } from 'sonner';

const JobCard = ({ job, userId }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  console.log('userId:',userId,'job: ',job)

  useEffect(() => {
    const checkIfJobIsSaved = async () => {
      try {
        const jobId = job?._id;
  
        if (!userId || !jobId) return;
  
        const response = await axios.post(`${BASE_URL}/job/is-saved`, { userId, jobId }, {
          headers: { 'Content-Type': 'application/json' }
        });
  
        setIsSaved(response.data.isSaved); // Set state based on the backend response
      } catch (error) {
        console.error('Error checking saved job status:', error.message);
      }
    };
  
    checkIfJobIsSaved(); // Check saved status on mount
  }, [job, userId]);  // Runs whenever the job or userId changes
  

  const handleJobNavigation = () => {
  
    navigate(`/job/${job?._id}`);
  };

  const toggleSaveJob = async () => {
    try {
      const jobId = job?._id;
      console.log('Toggling job save:', { userId, jobId });
  
      if (!userId || !jobId) {
        console.error("Missing userId or jobId");
        return;
      }
  
      const url = isSaved ? `${BASE_URL}/job/unsave-job` : `${BASE_URL}/job/save-job`;
      const action = isSaved ? 'unsave' : 'save';
  
      const response = await axios.post(url, { userId, jobId }, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.status === 200) {
        setIsSaved(!isSaved); // Toggle the saved state only after successful response
        console.log(`Job ${action}d successfully`);
      } else {
        console.error(`Failed to ${action} the job:`, response.data);
      }
  
    } catch (error) {
      if (error.response) {
        console.error('Error response from server:', error.response.data);
      } else {
        console.error('Error toggling job save:', error.message);
      }
    }
  };
  
  

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-2 md:p-5 rounded-md shadow-xl border border-gray-[1px] border-t-gray-400">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg my-2 text-gray-700">{job?.title}</h1>
        <Button
          variant="secondary"
          className="rounded-full p-2 hover:bg-gray-300"
          onClick={toggleSaveJob}
        >
          {isSaved ? <BookmarkCheck className='text-yellow-600' /> : <Bookmark />}
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="secondary" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-md text-gray-700">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600">
          {handleLimitDescription(job?.description, 120)}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">
          {job?.jobType}
        </Badge>
      </div>

      <div className="flex items-center justify-between gap-4 mt-4 w-full relative">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
        </div>

        <Button
          className="flex gap-1 ml-auto bg-gray-200 border-gray-400 hover:bg-gray-300 text-blue-600"
          onClick={handleJobNavigation} // Correctly handle navigation outside async function
        >
          Details <ArrowRightCircle />
        </Button>
      </div>
    </div>
  );
};

export default JobCard;

import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button'; 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import RecruiterJobsTable from './RecruiterJobsTable';
import useGetAllRecruiterJobs from '@/hooks/useGetAllRecruiterJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const RecruiterJobs = () => {
  useGetAllRecruiterJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className='max-w-6xl mx-auto py-10 p-5'>
        <div className='flex items-center justify-between py-5'>
          <Input
            className="bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[50vw]"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}

          />
          <Button onClick={() => navigate("/recruiter/job/create")} className="bg-blue-500 hover:bg-blue-600 transition">New Jobs</Button>
        </div>
        <h2 className='text-white'>A list of your recent posted jobs</h2>
        <RecruiterJobsTable />
      </div>
    </div>
  );
}

export default RecruiterJobs;

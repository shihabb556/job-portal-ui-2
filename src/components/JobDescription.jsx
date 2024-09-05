import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import baseApi from '@/utils/baseApi';
import axios from 'axios';
import { BASE_URL } from '@/utils/constant';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const navigate = useNavigate();
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    
    const {user} = useSelector(store=>store.auth);
    let respUser,token;
    if (user) {
        respUser = user?.user || {};
        token = user?.token;
      
    };
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === respUser?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const applyJobHandler = async () => {
       if(respUser && token){
         try {
                const res = await baseApi.get(`/application/apply/${jobId}`,         
                );
                
                if(res.data.success){
                    setIsApplied(true); // Update the local state
                    const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:respUser?._id}]}
                    dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                    toast.success(res.data.message);

                }
         } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
         }
       }else{
         navigate('/login')
         return toast.info('You have to login for apply any job!');
       }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
              
                const res = await baseApi.get(`/job/get/${jobId}`,
               
                );

                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === respUser?._id)) // Ensure the state is in sync with fetched data
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, respUser?._id]);

    return (
     <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10 p-5'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <div className='my-4'>
               <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
               <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
               <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
               <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
               <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
               <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
            <div>
               <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
               <h1 className='font-bold my-1'> <span className='pl-4 font-normal text-gray-800'>{singleJob?.description} </span></h1>
            </div>

        </div>
    </div>
  )
}

export default JobDescription
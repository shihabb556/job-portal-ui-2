import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import baseApi from '@/utils/baseApi';
import DOMPurify from 'dompurify';

const JobDetails = () => {
    const { singleJob } = useSelector(store => store.job);
    const navigate = useNavigate();
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const { user, token } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const applyJobHandler = async () => {
        if (user && token) {
            try {
                const res = await baseApi.get(`/application/apply/${jobId}`);
                if (res.data.success) {
                    setIsApplied(true);
                    const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                    dispatch(setSingleJob(updatedSingleJob));
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        } else {
            navigate('/login');
            return toast.info('You have to login to apply for any job!');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await baseApi.get(`/job/get/${jobId}`);
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="min-h-screen">
            <Navbar />
            {
                singleJob ? (
                    <div className='max-w-7xl mx-auto py-10 p-5 md:px-10'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='font-bold text-xl text-white'>{singleJob?.title}</h1>
                                <div className='flex items-center gap-2 mt-4'>
                                    <Badge className={'text-blue-400 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                                    <Badge className={'text-gray-300 font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                                </div>
                            </div>
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`rounded-lg ${isApplied ? 'text-white bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-gray-200'}`}>
                                {isApplied ? 'Already Applied' : 'Apply Now'}
                            </Button>
                        </div>
                        <div className='my-4 text-gray-300'>
                            <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal'>{singleJob?.title}</span></h1>
                            <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal'>{singleJob?.location}</span></h1>
                            <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal'>{singleJob?.experienceLevel} yrs</span></h1>
                            <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal'>{singleJob?.salary}k BDT</span></h1>
                            <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal'>{singleJob?.applications?.length}</span></h1>
                            <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                        </div>
                        <div className='shadow shadow-xl p-4 min-h-[70vh]'>
                            <h1 className='border-b-2 border-b-gray-700 font-medium py-4 text-gray-300'>Job Description</h1>
                            <div className='font-bold my-1 px-5'>
                                <span className='font-normal text-gray-400'>
                                    <div
                                        className=''
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(singleJob?.description) }}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center gap-2 min-h-[70vh]">
                        <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin mt-[10vh]"></div>
                    </div>
                )
            }
        </div>
    );
};

export default JobDetails;

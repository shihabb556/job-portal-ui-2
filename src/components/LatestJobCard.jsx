import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import handleLimitDescription from '@/utils/handleLimitDescription';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

 
const LatestJobCard = ({job}) => {

    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/job/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div className='flex items-center gap-2 my-2'>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={job?.company?.logo} alt="Logo.."  className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.company?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>
                  
                    {
                      handleLimitDescription(job?.description,120)
                      
                    }
                  
                </p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
               
            </div>

        </div>
    )
}

export default LatestJobCard
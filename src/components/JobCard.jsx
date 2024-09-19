import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, ArrowRightCircle, Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import handleLimitDescription from '@/utils/handleLimitDescription'

const JobCard = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    };
    
    return (
        <div className='p-2 md:p-5 rounded-md shadow-xl  border border-gray-100 border border-t-gray-400'>
            <div className='flex items-center justify-between'>
              <h1 className='font-bold text-lg my-2 text-gray-700'>{job?.title}</h1>
              <Button variant="secondary" className="rounded-full p-2 hover:bg-gray-300  "> 
                 <Bookmark />
              </Button>
            </div>
         
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="secondary" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-md text-gray-700'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            <div>
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
            <div className='flex items-center justify-between gap-4 mt-4 w-full relative'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                  
                </div>

                <Button className="flex gap-1 ml-auto bg-gray-200 border-gray-400  hover:bg-gray-300 text-blue-600" onClick={() => navigate(`/job/${job?._id}`)}>
                    Details <ArrowRightCircle/>
                </Button>
            </div>

        </div>
    )
};

export default JobCard;
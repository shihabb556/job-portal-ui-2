import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const searchJobHandler = () => {
    //     dispatch(setSearchedQuery({  keyword:query}));
    //     navigate("/browse");
    // }

    return (
        <div className='text-center flex py-6 md:py-12 flex-col md:flex-row'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    Your Gateway to Career Success
                </span>
                <h1 className='text-xl md:text-3xl lg:text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className='text-center text-gray-600 mt-4'>
                    Discover endless opportunities and take the next step in your career. 
                    Your dream job is just a click away!
                </p>
                <div className='flex w-[86%] md:w-[40%] mx-auto'>
                    <Button onClick={()=>navigate('/jobs')} className="rounded bg-[#6A38C2]">
                       Browse Jobs
                    </Button>
                </div>
            </div>
            <div className=''>
                <img src='/front_img.webp' alt='Front_picture'/>
            </div>
        </div>
    )
}

export default HeroSection
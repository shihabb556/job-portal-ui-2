import React, { useState } from 'react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='w-full text-center flex py-6 md:py-12 flex-col md:flex-row items-center justify-between text-white'>
            
            {/* Left Content - Text Section */}
            <div className='flex flex-col gap-5 my-10 px-4 md:w-[65vw]'>
                <span className='mx-auto md:mx-0 px-4 py-2 rounded-full  text-indigo-400 font-medium'>
                    Your Gateway to Career Success
                </span>
                <h1 className='text-xl md:text-3xl lg:text-5xl font-bold leading-tight'>
                    Search, Apply & <br /> Get Your <span className='text-indigo-500'>Dream Jobs</span>
                </h1>
                <p className='text-center md:text-left text-gray-300 mt-4'>
                    Discover endless opportunities and take the next step in your career. 
                    Your dream job is just a click away!
                </p>
                <div className='flex w-full items-center justify-center'>
                    <Button onClick={() => navigate('/jobs')} className="rounded rounded-full bg-blue-600 w-[60%] text-gray-200 hover:bg-blue-700 transition duration-200 text-md shadow shadow-2xl">
                        Browse Jobs
                    </Button>
                </div>

          
            </div>

            {/* Right Content - Image Section */}
            <div className='w-full md:w-1/2 flex hidden md:block md:justify-end '>
                <img src='/front_img.webp' alt='Front_picture' className='w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover rounded-lg shadow-lg' />
            </div>
        </div>
    );
}

export default HeroSection;

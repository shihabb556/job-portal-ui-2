import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 py-16">
            <div className="container mx-auto text-center text-white">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Find Your Dream Job Today
                </motion.h1>
                <p className="mt-4 text-lg md:text-xl">
                    Thousands of job listings from top companies
                </p>
                <div className="mt-8 flex justify-center">
                    <div className="relative w-full max-w-lg">
                        {/* <input
                            type="text"
                            placeholder="Search Jobs..."
                            className="w-full px-4 py-3 rounded-md text-gray-800"
                        />
                        <button className="absolute right-2 top-2 text-blue-500">
                            <Search />
                        </button> */}
                        <Button className=''>Browse Jobs</Button>
                    </div>
                </div>
                {/* <div className="mt-6">
                    <button className="bg-white text-blue-500 px-6 py-2 rounded-full hover:bg-gray-200 transition">
                        Search Jobs
                    </button>
                    <button className="bg-white text-blue-500 px-6 py-2 ml-4 rounded-full hover:bg-gray-200 transition">
                        Post a Job
                    </button>
                </div> */}
            </div>
        </section>
    );
};

export default HeroSection;

import React from 'react';
import { Button } from './ui/button'; // Ensure this import is correct
import Navbar from './LandingPage/Navbar';

const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen py-8 mt-[5em]">
                <div className="max-w-6xl mx-auto p-4 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">About Us</h1>
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our mission is to revolutionize the job search experience by providing an intuitive platform 
                            that connects job seekers with opportunities and helps companies find the best talent.
                        </p>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We envision a world where job searching and hiring are streamlined and efficient, 
                            enabling career growth and organizational success for everyone involved.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Example team member */}
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <h3 className="text-xl font-bold text-blue-600 mb-2">John Doe</h3>
                                <p className="text-gray-600">CEO & Founder</p>
                                <p className="text-gray-500 mt-2">
                                    John is passionate about leveraging technology to create impactful solutions for job seekers and employers.
                                </p>
                            </div>
                            {/* Add more team members as needed */}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

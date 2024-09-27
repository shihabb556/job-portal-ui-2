import React, { Suspense, useEffect } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewsletterSignup from './LandingPage/NewsletterSignup';
import FeaturedCompanies from './LandingPage/FeaturedCompanies';
import HowItWorks from './LandingPage/HowItWorks';
import PopularCategories from './LandingPage/PopularCategories';
import Testimonials from './LandingPage/Testimonials';

const HeroSection = React.lazy(() => import('./HeroSection'));
const CategoryCarousel = React.lazy(() => import('./CategoryCarousel'));
const LatestJobs = React.lazy(() => import('./LatestJobs'));

const Home = () => {
  // Fetch jobs data
  useGetAllJobs();
  const { user } = useSelector(store => store?.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate('/recruiter/jobs');
    }
  }, [user, navigate]); // Add user and navigate as dependencies
  
  return (
    <div className='relative bg-gradient-to-br from-[#141E30] to-[#243B55]  text-gray-100'>
      {/* Load Navbar directly since it's essential */}
      <Navbar />
      <div className='p-5 max-w-6xl mx-auto'>
        {/* Lazy load the less critical components */}
        <Suspense fallback={
          <div className="flex justify-center items-center gap-2">
            <span>Loading...</span>
            <div className="loader border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
          </div>
        }>
          <HeroSection />
        </Suspense>

        {/* Additional Content */}
        <div className='mt-2 flex items-center justify-center'>
         <div >
              <h2 className='text-lg font-semibold text-center'>Why Choose Us?</h2>
              <ul className='list-disc list-inside text-gray-400'>
                  <li>Expert Guidance: Get insights from industry professionals.</li>
                  <li>Tailored Opportunities: Jobs that match your skills and aspirations.</li>
                  <li>Community Support: Join a network of like-minded individuals.</li>
              </ul>
         </div>
        </div>

    
        
        <Suspense fallback={
          <div className="flex justify-center items-center gap-2">
            <span>Loading...</span>
            <div className="loader border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
          </div>
        }>
          <PopularCategories />
        </Suspense>

        <HowItWorks />
        
        <Suspense fallback={
          <div className="flex justify-center items-center gap-2">
            <span>Loading...</span>
            <div className="loader border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
          </div>
        }>
          <LatestJobs />
        </Suspense>
      </div>

      <FeaturedCompanies />

      <Testimonials />

      <NewsletterSignup />
      {/* Load Footer directly */}
      <Footer />
    </div>
  );
};

export default Home;

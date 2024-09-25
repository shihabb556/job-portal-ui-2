import React, { Suspense, useEffect } from 'react';
import Navbar from './shared/Navbar'; // Load essential components directly
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewsletterSignup from './LandingPage/NewsletterSignup';
import FeaturedCompanies from './LandingPage/FeaturedCompanies';
import HowItWorks from './LandingPage/HowItWorks';
import PopularCategories from './LandingPage/PopularCategories';
const HeroSection = React.lazy(() => import('./HeroSection'));
const CategoryCarousel = React.lazy(() => import('./CategoryCarousel'));
const LatestJobs = React.lazy(() => import('./LatestJobs'));


const Home = () => {
  // Fetch jobs data
  useGetAllJobs();
  const {user} = useSelector(store => store?.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(user)
     if(user?.role === "recruiter"){
      console.log(user.role)
      navigate('/recruiter/jobs');
     }
  },[])
  
  return (
    <div className='relative'>
      {/* Load Navbar directly since it's essential */}
      <Navbar />
      <div className='p-5 max-w-5xl mx-auto '>
        {/* Lazy load the less critical components */}
        <Suspense fallback={   <div className="flex justify-center items-center gap-2">
                        <span>Loading...</span>
                        <div className="loader border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
                    </div>}>
          <HeroSection />
        </Suspense>
        <FeaturedCompanies />
        <Suspense fallback={   <div className="flex justify-center items-center gap-2">
                        <span>Loading...</span>
                        <div className="loader border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
                    </div>}>
          <PopularCategories />
        </Suspense>
        <HowItWorks />
        <Suspense fallback={   <div className="flex justify-center items-center gap-2">
                        <span>Loading...</span>
                        <div className="loader border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
                    </div> }>
          <LatestJobs />
        </Suspense>
      </div>
      <NewsletterSignup/>
      {/* Load Footer directly */}
      <Footer />
    </div>
  );
};

export default Home;

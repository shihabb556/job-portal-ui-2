import React, { Suspense, useEffect } from 'react';
import Navbar from './shared/Navbar'; // Load essential components directly
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewsletterSignup from './LandingPage/NewsletterSignup';
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
        <Suspense fallback={<div className='text-blue-500'>Loading Hero...</div>}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<div className='text-blue-500'>Loading Categories...</div>}>
          <CategoryCarousel />
        </Suspense>
        <Suspense fallback={<div className='text-blue-500'>Loading Latest Jobs...</div>}>
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

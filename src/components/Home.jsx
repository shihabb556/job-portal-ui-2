import React, { useEffect ,Suspense} from 'react';
const Navbar = React.lazy(() => import('./shared/Navbar'));
const HeroSection = React.lazy(() => import('./HeroSection'));
const CategoryCarousel = React.lazy(() => import('./CategoryCarousel'));
const LatestJobs = React.lazy(() => import('./LatestJobs'));
const Footer = React.lazy(() => import('./shared/Footer'));
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  let respUser;
  if(user){
    respUser = user?.user;
  };

  useEffect(() => {
    if (respUser?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [respUser]);

  return (
    <Suspense fallback={<div className='bg-gray-500'>Loading...</div>}>
      <Navbar />
      <div className='px-5 max-w-5xl mx-auto'>
        <HeroSection /> 
        <CategoryCarousel />
        <LatestJobs />
      </div>
      <Footer />
    </Suspense>
  )
}

export default Home
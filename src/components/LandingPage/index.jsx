import React from 'react';
import HeroSection from './HeroSection';
import FeaturedCompanies from './FeaturedCompanies';
import PopularCategories from './PopularCategories';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import NewsletterSignup from './NewsletterSignup';
import Navbar from './Navbar';
import Footer from '../shared/Footer';

const LandingPage = () => {
    return (
      <div>
        <Navbar/>
          <div className='mt-[4em]'>
                <HeroSection />
                <FeaturedCompanies />
                <PopularCategories />
                <HowItWorks />
                <Testimonials />
                <NewsletterSignup />
          </div>
          <Footer/>
      </div>
    );
};

export default LandingPage;

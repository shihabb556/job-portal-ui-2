import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* About Us */}
                <div>
                    <h2 className="font-bold text-lg mb-4">About Us</h2>
                    <p className="text-gray-400">
                        We connect job seekers with top companies worldwide. Start your journey towards your dream career today!
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="font-bold text-lg mb-4">Quick Links</h2>
                    <ul>
                       <li className="mb-2">
                            <a href="/jobs" className="text-gray-400 hover:text-white">Browse Jobs</a>
                        </li>
                        <li className="mb-2">
                            <a href="/about" className="text-gray-400 hover:text-white">About</a>
                        </li>

                        <li className="mb-2">
                            <a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a>
                        </li>
                        <li className="mb-2">
                            <a href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="font-bold text-lg mb-4">Contact Info</h2>
                    <ul className="text-gray-400">
                        <li className="flex items-center mb-2">
                            <Mail className="w-5 h-5 mr-2" /> info@jobportal.com
                        </li>
                        <li className="flex items-center mb-2">
                            <Phone className="w-5 h-5 mr-2" /> +123-456-7890
                        </li>
                        <li className="flex items-center mb-2">
                            <MapPin className="w-5 h-5 mr-2" /> Mirpur-6,Dhaka,Bangladesh
                        </li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h2 className="font-bold text-lg mb-4">Follow Us</h2>
                    <div className="flex gap-4">
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                            <Twitter className="w-6 h-6" />
                        </a>
                        <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                            <Facebook className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-10 border-t border-gray-700 pt-4 text-center">
                <p className="text-gray-500">© 2024 JobPortal. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;




//  import React from 'react';

// const Footer = () => {
//   return (

    
//     // <footer className="absolute w-full border-t border-t-gray-200 py-8 bg-[#6C19F3]">
//     //   <div className="container mx-auto px-4">
//     //     <div className="flex flex-col-reverse  justify-between items-center p-8">
        
          

//     //       <div className=" flex flex-col items-center mb-4 md:mb-0 text-white">
//     //       <h1 className='md:text-xl sm:text-md text-sm  font-bold pb-1 md:pb-0 '>Job<span className=''>Portal</span> <span className='text-sm '> -  Your Gateway to a Bright Future.</span></h1>
//     //         <p className="text-sm">© 2024. All rights reserved.</p>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </footer>
//   );
// }

// export default Footer;
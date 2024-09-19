import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // For mobile menu toggle icons
import { motion } from 'framer-motion'; // For smooth animations
import { Link } from 'react-router-dom'; // For routing if using react-router

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-bold text-blue-600">
                    <Link to="/">JobPortal</Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-gray-800 hover:text-blue-600 transition">
                        Home
                    </Link>
                    <Link to="/jobs" className="text-gray-800 hover:text-blue-600 transition">
                        Jobs
                    </Link>
                    <Link to="/about" className="text-gray-800 hover:text-blue-600 transition">
                        About Us
                    </Link>
                    <Link to="/contact" className="text-gray-800 hover:text-blue-600 transition">
                        Contact
                    </Link>
                    <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                        Login
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-800" onClick={toggleMenu}>
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <motion.nav
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-white shadow-lg"
                >
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        <Link to="/" className="text-gray-800 hover:text-blue-600 transition" onClick={toggleMenu}>
                            Home
                        </Link>
                        <Link to="/jobs" className="text-gray-800 hover:text-blue-600 transition" onClick={toggleMenu}>
                            Jobs
                        </Link>
                        <Link to="/about" className="text-gray-800 hover:text-blue-600 transition" onClick={toggleMenu}>
                            About Us
                        </Link>
                        <Link to="/contact" className="text-gray-800 hover:text-blue-600 transition" onClick={toggleMenu}>
                            Contact
                        </Link>
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                            onClick={toggleMenu}
                        >
                            Login
                        </Link>
                    </div>
                </motion.nav>
            )}
        </header>
    );
};

export default Navbar;

import React, { useState } from 'react';
import { Button } from '../../ui/button'; // Ensure this import is correct
import Navbar from '../../LandingPage/Navbar';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-500 transition px-4 py-2 rounded-lg">
                                Sign Up
                            </Button>
                        </div>
                        <p className="text-center text-gray-600 mt-4">
                            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log In</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

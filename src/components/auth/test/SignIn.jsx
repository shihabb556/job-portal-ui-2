import React, { useState } from 'react';
import { Button } from '../../ui/button'; // Ensure this import is correct
import Navbar from '../../LandingPage/Navbar';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
                    <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Log In</h2>
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
                        <div className="flex items-center justify-between">
                            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-500 transition px-4 py-2 rounded-lg">
                                Log In
                            </Button>
                        </div>
                        <p className="text-center text-gray-600 mt-4">
                            Don't have an account? <a href="/signup/test" className="text-blue-600 hover:underline">Sign Up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;

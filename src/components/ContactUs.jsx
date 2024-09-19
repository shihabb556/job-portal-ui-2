import React, { useState } from 'react';
import { Button } from './ui/button'; // Ensure this import is correct
import Navbar from './LandingPage/Navbar';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
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
            <div className="bg-gray-100 min-h-screen py-8 mt-[5em]">
                <div className="max-w-6xl mx-auto p-4 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">Contact Us</h1>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Have questions or need support? Fill out the form below, and we’ll get back to you as soon as possible.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                    required
                                />
                            </div>
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
                                <label className="block text-gray-700">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg border-gray-300"
                                    rows="4"
                                    required
                                />
                            </div>
                            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-500 transition px-4 py-2 rounded-lg">
                                Send Message
                            </Button>
                        </form>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Details</h2>
                        <p className="text-gray-600 mb-2">
                            <strong>Email:</strong> support@example.com
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Phone:</strong> (123) 456-7890
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Address:</strong> 123 Main Street, Anytown, USA
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

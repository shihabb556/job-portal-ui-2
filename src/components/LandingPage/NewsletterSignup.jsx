import React from 'react';

const NewsletterSignup = () => {
    return (
        <section className="bg-indigo-600 py-16 text-white text-center">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold">Stay Updated</h2>
                <p className="mt-4">Subscribe to get the latest job listings directly to your inbox!</p>
                <div className="mt-8">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-3 rounded-md text-gray-800 w-1/2"
                    />
                    <button className="bg-white text-indigo-600 px-6 py-3 ml-2 rounded-md">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSignup;

import React from 'react';

const NewsletterSignup = () => {
    return (
        <section className="bg-gray-900 py-16 text-white text-center">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold">Stay Updated</h2>
                <p className="mt-4">Subscribe to get the latest job listings directly to your inbox!</p>
                <div className="mt-8">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-3 rounded-md text-gray-900 bg-gray-200 w-1/2 dark:bg-gray-700 dark:text-white"
                    />
                    <button className="bg-indigo-600 text-white px-6 py-3 ml-2 rounded-md hover:bg-indigo-700">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSignup;

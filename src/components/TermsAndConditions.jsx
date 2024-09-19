import React from 'react';
import Navbar from './LandingPage/Navbar';

const TermsAndConditions = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen py-8 mt-[5em]">
                <div className="max-w-6xl mx-auto p-4 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">Terms and Conditions</h1>
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to our website. These Terms and Conditions govern your use of our services and website. By accessing or using our website, you agree to comply with these terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Responsibilities</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Users are responsible for providing accurate information, maintaining the confidentiality of their account, and adhering to our policies. Misuse of the website or violation of our terms may result in account suspension or termination.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
                        <p className="text-gray-600 leading-relaxed">
                            All content and materials on our website, including text, graphics, logos, and images, are the property of our company or our licensors and are protected by intellectual property laws.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our company is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or services. We do not guarantee that our website will be uninterrupted or error-free.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of the website constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about these Terms and Conditions, please contact us at support@example.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;

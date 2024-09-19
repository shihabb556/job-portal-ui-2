import React from 'react';

const FeaturedCompanies = () => {
    const companies = ['Google', 'Facebook', 'Amazon', 'Tesla', 'Microsoft'];

    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-5 py-10">Trusted by Top Companies</h2>
                <div className="flex justify-center space-x-8 mt-5">
                    {companies.map((company, idx) => (
                        <div key={idx} className="w-32 h-12 flex items-center justify-center">
                            <img
                                src={`https://logo.clearbit.com/${company.toLowerCase()}.com`}
                                alt={company}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCompanies;

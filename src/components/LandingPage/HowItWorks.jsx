import React from 'react';
import { Search, FileText, CheckCircle } from 'lucide-react';

const steps = [
    { icon: <Search />, title: 'Search Jobs', description: 'Find jobs easily with filters and search.' },
    { icon: <FileText />, title: 'Apply', description: 'Submit your application in just a few clicks.' },
    { icon: <CheckCircle />, title: 'Get Hired', description: 'Receive job offers from top companies.' }
];

const HowItWorks = () => {
    return (
        <section className="py-16 ">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-white">How It Works</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, idx) => (
                        <div key={idx} className="p-6 bg-gray-800 rounded-lg shadow-lg transition transform hover:scale-105">
                            <div className="text-blue-500 mx-auto mb-4">{step.icon}</div>
                            <h3 className="font-bold text-white">{step.title}</h3>
                            <p className="mt-2 text-gray-300">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

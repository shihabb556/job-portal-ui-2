import React from 'react';
import { Briefcase, Code, Brush, DollarSign, Globe } from 'lucide-react'; // Changed 'Design' to 'Brush'

const categories = [
    { name: 'Tech', icon: <Code /> },
    { name: 'Finance', icon: <DollarSign /> },
    { name: 'Design', icon: <Brush /> }, // Use 'Brush' for design category
    { name: 'Marketing', icon: <Globe /> },
    { name: 'Engineering', icon: <Briefcase /> }
];

const PopularCategories = () => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold">Popular Job Categories</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {categories.map((category, idx) => (
                        <div
                            key={idx}
                            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            <div className="text-blue-500 mx-auto mb-4">{category.icon}</div>
                            <h3 className="font-bold">{category.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;

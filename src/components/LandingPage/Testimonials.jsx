import React from 'react';

const testimonials = [
    {
        name: 'John Doe',
        title: 'Software Engineer at Google',
        quote: 'This platform helped me land my dream job!'
    },
    {
        name: 'Jane Smith',
        title: 'Product Manager at Facebook',
        quote: 'Highly recommend for job seekers looking for tech roles.'
    }
];

const Testimonials = () => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold">What Our Users Say</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg shadow">
                            <p className="text-xl italic">"{testimonial.quote}"</p>
                            <p className="mt-4 font-bold">{testimonial.name}</p>
                            <p className="text-gray-600">{testimonial.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

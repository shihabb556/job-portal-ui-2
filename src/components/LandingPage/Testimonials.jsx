import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules"; // Updated import path
import "swiper/css"; // Import Swiper core styles
import "swiper/css/navigation"; // Import Swiper navigation styles

const testimonials = [
  {
    name: "John Doe",
    title: "Software Engineer at Google",
    quote: "This platform helped me land my dream job!",
  },
  {
    name: "Jane Smith",
    title: "Product Manager at Facebook",
    quote: "Highly recommend for job seekers looking for tech roles.",
  },
  {
    name: "Ahmed Khan",
    title: "Full Stack Developer at Amazon",
    quote: "A fantastic platform for career growth in tech!",
  },
  {
    name: "Alice Johnson",
    title: "Data Scientist at Microsoft",
    quote: "A great place to find top tech roles and opportunities!",
  },
];

const Testimonials = () => {
  return (
    <section className="mb-[7em] ">
      <div className=" mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-10">What Our Users Say</h2>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          loop={true}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="p-8 ">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 w-[80%] mx-auto">
                <p className="text-xl text-gray-300 italic">"{testimonial.quote}"</p>
                <p className="mt-4 font-bold text-indigo-400">{testimonial.name}</p>
                <p className="text-gray-400">{testimonial.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle the job search click event
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    // Automatically slide to the next category
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % category.length);
        }, 3000); // Slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Manually set current category when clicking next or previous
    const goToNext = () => {
        setCurrentIndex((currentIndex + 1) % category.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((currentIndex - 1 + category.length) % category.length);
    };

    return (
        <div>
            <Carousel className="w-[60vw] mx-auto my-20">
                <CarouselContent
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="w-full flex-shrink-0 px-4 py-8 flex justify-center items-center"
                        >
                            <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious onClick={goToPrevious} />
                <CarouselNext onClick={goToNext} />
            </Carousel>
        </div>
    );
}

export default CategoryCarousel;

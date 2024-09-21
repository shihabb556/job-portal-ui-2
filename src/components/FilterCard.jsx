import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Location, Salary, Industry } from '@/utils/constant';
import { Button } from './ui/button';
import { CrossIcon, SidebarClose } from 'lucide-react';

const FilterCard = ({ isOpen,setIsOpen}) => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSalary, setSelectedSalary] = useState('');

    const [expandedCategory, setExpandedCategory] = useState(null); // For collapsible functionality
    const dispatch = useDispatch();
  console.log(selectedCategory,selectedLocation,selectedSalary)
    useEffect(() => {
        dispatch(setSearchedQuery({
            location: selectedLocation,
            category: selectedCategory,
            salary: selectedSalary
        }));
    }, [selectedLocation, selectedCategory, selectedSalary, dispatch]);

    // Toggle collapsible category
    const handleCategoryToggle = (category) => {
        setExpandedCategory(prevCategory => (prevCategory === category ? null : category));
    };

       // Reset filters
       const handleResetFilters = () => {
        setSelectedLocation('');
        setSelectedCategory('');
        setSelectedSalary('');
        dispatch(setSearchedQuery({
            location: '',
            category: '',
            salary: ''
        }));
    };
  

    return (
        <div className={` p-4 w-[100%] bg-white p-3 rounded-md shadow-md transition-all duration-300 ${isOpen ? 'block' : 'hidden lg:block'} `} >
           <div className='flex justify-between'>
                <h1 className='font-bold text-lg text-gray-800'>Filter Jobs</h1>
              {
                selectedCategory || selectedLocation || selectedSalary ? (
                    <button onClick={handleResetFilters} className='p-2 border bg-gray-200 rounded text-sm text-red-600'>
                         Clear Filter
                    </button>
                ) : ''
              }

                <Button onClick={() => setIsOpen(false)} className='text-lg bg-red-500  hover:bg-red-400 shadow shadow-xl lg:hidden'>
                    X
                </Button>
             
           </div>
           <hr className='mt-3' />
           <div className=' overflow-y-auto scrollbar-thin scrollbar-thumb-[#A3AFFA]  scrollbar-track-gray-100 pr-5'>
                
                {/* Location Filter */}
                <h2 className='font-bold text-md mt-3 py-1 text-gray-700'>Location</h2>
                <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation} className='max-h-[150px] md:max-h[200px]  lg:max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#A3AFFA]  scrollbar-track-gray-100 text-gray-600'>
                    {Location.map((location, idx) => (
                        <div key={idx} className='flex items-center space-x-2 my-2'>
                            <RadioGroupItem value={location} id={`location-${idx}`}   />
                            <Label htmlFor={`location-${idx}`}>{location}</Label>
                        </div>
                    ))}
                </RadioGroup>

                {/* Industry Filter */}
                <h2 className='font-bold text-md mt-3 py-1 text-gray-700'>Industry</h2>
                <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory} className='pl-4 overflow-y-auto max-h-[150px] sm:max-h[185px] md:max-h[195px]  lg:max-h-[240px] scrollbar-thin scrollbar-thumb-[#A3AFFA]  scrollbar-track-gray-100 text-gray-600'>
                { Industry.map((categoryItem, idx) => (
                    <div key={idx} className='flex items-center space-x-2 my-2'>
                        <RadioGroupItem value={categoryItem} id={`category-${idx}}`}  />
                        <Label htmlFor={`category-${idx}`}>{categoryItem}</Label>
                    </div>
                ))}
                </RadioGroup>

                {/* Salary Filter */}
                {/* <h2 className='font-bold text-md mt-3'>Salary</h2>
                <RadioGroup value={selectedSalary} onValueChange={setSelectedSalary}>
                    {Salary.map((salaryRange, idx) => (
                        <div key={idx} className='flex items-center space-x-2 my-2'>
                            <RadioGroupItem value={salaryRange} id={`salary-${idx}`} />
                            <Label htmlFor={`salary-${idx}`}>{salaryRange}k bdt</Label>
                        </div>
                    ))}
                </RadioGroup> */}

               
           </div>

        </div> 
    );
};

export default FilterCard;

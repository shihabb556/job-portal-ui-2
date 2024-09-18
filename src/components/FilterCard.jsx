import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Location, Salary, Industry } from '@/utils/constant';

const FilterCard = ({ isOpen,isItemClick,setIsItemClick }) => {
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
  

    return (
        <div className={`w-[100%] bg-white p-3 rounded-md shadow-md transition-all duration-300 ${isOpen ? 'block' : 'hidden sm:block'} ${isItemClick && 'hidden sm:block'}`} >
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />

            {/* Location Filter */}
            <h2 className='font-bold text-md mt-3'>Location</h2>
            <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation} className='overflow-y-auto max-h-[150px]'>
                {Location.map((location, idx) => (
                    <div key={idx} className='flex items-center space-x-2 my-2'>
                        <RadioGroupItem value={location} id={`location-${idx}`} onClick={()=>setIsItemClick(true)}  />
                        <Label htmlFor={`location-${idx}`}>{location}</Label>
                    </div>
                ))}
            </RadioGroup>

            {/* Industry Filter */}
            <h2 className='font-bold text-md mt-3'>Industry</h2>
            <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory} className='pl-4 overflow-y-auto max-h-[150px]'>
             { Industry.map((categoryItem, idx) => (
                 <div key={idx} className='flex items-center space-x-2 my-2'>
                     <RadioGroupItem value={categoryItem} id={`category-${idx}}`} onClick={()=>setIsItemClick(true)} />
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
    );
};

export default FilterCard;

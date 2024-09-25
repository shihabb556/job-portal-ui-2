import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';
import { filterData, Location } from '@/utils/constant'; // Import filterData and Location

const FilterCard = ({ isOpen, setIsOpen }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null); // For collapsible subcategories
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery({
      location: selectedLocation,
      category: selectedCategory,
      subCategory: selectedSubCategory,
    }));
  }, [selectedLocation, selectedCategory, selectedSubCategory, dispatch]);


  // Toggle collapsible subcategories for each industry category
  const handleCategoryToggle = (category) => {
    setExpandedCategory(prevCategory => (prevCategory === category ? null : category));
  };


  // Reset filters
  const handleResetFilters = () => {
    setSelectedLocation('');
    setSelectedCategory('');
    setSelectedSubCategory('');
    dispatch(setSearchedQuery({ location: '', category: '', subCategory: '' }));
  };

  return (
    <div className={`p-4 w-[100%] bg-white p-3 rounded-md shadow-md transition-all duration-300  ${isOpen ? 'block' : 'hidden '}`}>
      <div className='flex justify-between'>
        <h1 className='font-bold text-lg text-gray-800'>Filter Jobs</h1>
        {
          selectedCategory || selectedSubCategory || selectedLocation ? (
            <button onClick={handleResetFilters} className='p-2 border bg-gray-200 rounded text-sm text-red-600'>
              Clear Filter
            </button>
          ) : ''
        }
        <Button onClick={() => setIsOpen(false)} className='text-lg bg-red-500 hover:bg-red-400 shadow shadow-xl '>
          X
        </Button>
      </div>
      <hr className='mt-3' />

      <div className='max-h-[77vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#A3AFFA] scrollbar-track-gray-100 pr-5'>

        {/* Location Filter */}
        <h2 className='font-bold text-md mt-3 py-1 text-gray-700'>Location</h2>
        <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation} className='pl-2 max-h-[150px] md:max-h[200px] lg:max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#A3AFFA]  scrollbar-track-gray-100 text-gray-600'>
          {Location.map((location, idx) => (
            <div key={idx} className='flex items-center space-x-2 my-2'>
              <RadioGroupItem value={location} id={`location-${idx}`} />
              <Label htmlFor={`location-${idx}`}>{location}</Label>
            </div>
          ))}
        </RadioGroup>

        {/* Industry Filter */}
        {filterData.map((industry, industryIdx) => (
          <div key={industryIdx} className='my-3'>
            <h3 className='font-semibold text-gray-700'>{industry.filterType}</h3>
            <div className='pl-2 overflow-y-auto max-h-[150px] sm:max-h[185px] md:max-h[195px]  lg:max-h-[240px] scrollbar-thin scrollbar-thumb-[#A3AFFA]  scrollbar-track-gray-100 text-gray-600'>
                {/* Iterate over categories inside each industry */}
                {industry.array.map((categoryItem, categoryIdx) => (
                <div key={categoryIdx} className='mt-2 mx-1 '>
                    {/* Category Header with Toggle */}
                    <div className='flex justify-between items-center cursor-pointer' onClick={() => handleCategoryToggle(categoryItem.category)}>
                    <h4 className='text-gray-600 font-medium'>{categoryItem.category}</h4>
                    <span>{expandedCategory === categoryItem.category ? '-' : '+'}</span>
                    </div>
                    {/* Subcategories */}
                    {expandedCategory === categoryItem.category && (
                    <RadioGroup value={selectedSubCategory} onValueChange={setSelectedSubCategory} className='pl-6 mt-1'>
                        {categoryItem.subCategories.map((subCategory, subIdx) => (
                        <div key={subIdx} className='flex items-center space-x-2 my-1'>
                            <RadioGroupItem value={subCategory} id={`subcategory-${subIdx}`} />
                            <Label htmlFor={`subcategory-${subIdx}`}>{subCategory}</Label>
                        </div>
                        ))}
                    </RadioGroup>
                    )}
                </div>
                ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default FilterCard;

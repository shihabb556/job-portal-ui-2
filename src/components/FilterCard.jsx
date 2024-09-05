import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = ({isOpen}) => {
    const [selectedValue, setSelectedValue] = useState('');

    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);


    
        

    return (
        <div className={`hidden sm:block sm:ml-[0.01em] w-80% sm:w-20%  z-40 rounded-md ${!isOpen ? 'ml-[-100em]': 'ml-[-0.88em]'} absolute sm:relative  sm:bg-white p-3 rounded-md bg-gray-200 mt-3 sm:bg-white`}>
            <h1 className='font-bold sm:text-lg text-sm'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup className='' value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index} >
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={idx} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}


export default FilterCard
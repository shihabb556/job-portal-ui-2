import React, { useState, useRef } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import Select from 'react-select';  // react-select for searchable dropdown
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import baseApi from '@/utils/baseApi';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

// Sample data for categories, job types, locations, and experience levels
const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    // add more than 50 items here...
];
const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
];
const locations = [
    { value: 'new-york', label: 'New York' },
    { value: 'san-francisco', label: 'San Francisco' },
    // add more locations
];
const experienceLevels = [
    { value: 0, label: 'Fresher' },
    { value: 1, label: '1-2 Years' },
    { value: 3, label: '3-5 Years' },
    { value: 5, label: '5+ Years' },
];

const PostJob = () => {
    useGetAllCompanies();
    const [input, setInput] = useState({
        title: "",
        requirements: "",
        salary: 0,  // Updated to be a number
        location: "",
        jobType: "",
        experience: 0,  // Updated to be a number
        position: 0,  // Updated to be a number
        companyId: "",  // New companyId field
        category: "",  // New category field
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const quillRef = useRef(null);

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: name === 'salary' || name === 'position' || name === 'experience' ? Number(value) : value });
    };

    const handleSelectChange = (field, value) => {
        setInput({ ...input, [field]: value.value });
    };

    const handleDescriptionChange = (value) => {
        setInput({ ...input, description: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await baseApi.post(`/job/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/recruiter/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    // Convert companies into select options
    const companyOptions = companies.map(company => ({
        value: company._id,
        label: company.name,
    }));

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5 p-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl bg-gray-800 border border-gray-600 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label className="text-gray-300">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-1 bg-gray-700 text-white placeholder-gray-500"
                                placeholder="Job Title"
                            />
                        </div>

                        {/* Select for Company */}
                        <div>
                            <Label className="text-gray-300">Company</Label>
                            <Select
                                options={companyOptions}
                                value={companyOptions.find(comp => comp.value === input.companyId)}
                                onChange={(value) => handleSelectChange('companyId', value)}
                                isSearchable
                                placeholder="Select a Company"
                                classNamePrefix="select"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#374151', // dark gray
                                        color: 'white'
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#374151', // dark gray
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? '#1f2937' : '#374151', // dark gray on focus
                                        color: 'white',
                                    }),
                                }}
                            />
                        </div>

                        {/* Select for Category with Search and Scroll */}
                        <div>
                            <Label className="text-gray-300">Category</Label>
                            <Select
                                options={categories}
                                value={categories.find(cat => cat.value === input.category)}
                                onChange={(value) => handleSelectChange('category', value)}
                                isSearchable
                                classNamePrefix="select"
                                styles={{
                                    menu: base => ({
                                        ...base,
                                        maxHeight: '150px', // Set fixed height with scroll
                                        overflowY: 'auto',
                                        backgroundColor: '#374151', // dark gray
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#374151', // dark gray
                                        color: 'white',
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? '#1f2937' : '#374151', // dark gray on focus
                                        color: 'white',
                                    }),
                                }}
                                placeholder="Select Category"
                            />
                        </div>

                        {/* Job Type Select */}
                        <div>
                            <Label className="text-gray-300">Job Type</Label>
                            <Select
                                options={jobTypes}
                                value={jobTypes.find(type => type.value === input.jobType)}
                                onChange={(value) => handleSelectChange('jobType', value)}
                                placeholder="Select Job Type"
                                classNamePrefix="select"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#374151', // dark gray
                                        color: 'white',
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? '#1f2937' : '#374151', // dark gray on focus
                                        color: 'white',
                                    }),
                                }}
                            />
                        </div>

                        {/* Location Select */}
                        <div>
                            <Label className="text-gray-300">Location</Label>
                            <Select
                                options={locations}
                                value={locations.find(loc => loc.value === input.location)}
                                onChange={(value) => handleSelectChange('location', value)}
                                placeholder="Select Location"
                                classNamePrefix="select"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#374151', // dark gray
                                        color: 'white',
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? '#1f2937' : '#374151', // dark gray on focus
                                        color: 'white',
                                    }),
                                }}
                            />
                        </div>

                        {/* Experience Level Select */}
                        <div>
                            <Label className="text-gray-300">Experience Level</Label>
                            <Select
                                options={experienceLevels}
                                value={experienceLevels.find(exp => exp.value === input.experience)}
                                onChange={(value) => handleSelectChange('experience', value)}
                                placeholder="Select Experience Level"
                                classNamePrefix="select"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#374151', // dark gray
                                        color: 'white',
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? '#1f2937' : '#374151', // dark gray on focus
                                        color: 'white',
                                    }),
                                }}
                            />
                        </div>

                        {/* Salary Field */}
                        <div>
                            <Label className="text-gray-300">Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-1 bg-gray-700 text-white placeholder-gray-500"
                                placeholder="Salary"
                            />
                        </div>

                        {/* Position Field */}
                        <div>
                            <Label className="text-gray-300">Number of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-1 bg-gray-700 text-white placeholder-gray-500"
                                placeholder="Number of Positions"
                            />
                        </div>
                    </div>

                    {/* Description Field */}
                    <div className='mt-4'>
                        <Label className="text-gray-300">Description</Label>
                        <ReactQuill
                            theme="snow"
                            ref={quillRef}
                            value={input.description}
                            onChange={handleDescriptionChange}
                            className='my-1 bg-white text-black min-h-[12rem]'
                        />
                    </div>

                    <div className='mt-6'>
                        <Button type='submit' disabled={loading} className='bg-blue-600 hover:bg-blue-500 transition duration-200'>
                            {loading ? <Loader2 className='animate-spin' /> : 'Post Job'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;

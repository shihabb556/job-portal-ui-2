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
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5 p-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>

                        {/* Select for Company */}
                        <div>
                            <Label>Company</Label>
                            <Select
                                options={companyOptions}
                                value={companyOptions.find(comp => comp.value === input.companyId)}
                                onChange={(value) => handleSelectChange('companyId', value)}
                                isSearchable
                                placeholder="Select a Company"
                            />
                        </div>

                        {/* Select for Category with Search and Scroll */}
                        <div>
                            <Label>Category</Label>
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
                                        overflowY: 'auto'
                                    })
                                }}
                                placeholder="Select Category"
                            />
                        </div>

                        {/* Job Type Select */}
                        <div>
                            <Label>Job Type</Label>
                            <Select
                                options={jobTypes}
                                value={jobTypes.find(type => type.value === input.jobType)}
                                onChange={(value) => handleSelectChange('jobType', value)}
                                placeholder="Select Job Type"
                            />
                        </div>

                        {/* Location Select */}
                        <div>
                            <Label>Location</Label>
                            <Select
                                options={locations}
                                value={locations.find(loc => loc.value === input.location)}
                                onChange={(value) => handleSelectChange('location', value)}
                                placeholder="Select Location"
                            />
                        </div>

                        {/* Experience Level Select */}
                        <div>
                            <Label>Experience Level</Label>
                            <Select
                                options={experienceLevels}
                                value={experienceLevels.find(exp => exp.value === input.experience)}
                                onChange={(value) => handleSelectChange('experience', value)}
                                placeholder="Select Experience Level"
                            />
                        </div>

                        {/* Salary Field */}
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>

                        {/* Position Field */}
                        <div>
                            <Label>Number of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                    </div>

                    <div className='pb-12'>
                        <Label>Description</Label>
                        <ReactQuill
                            ref={quillRef}
                            className='h-[290px]'
                            value={input.description}
                            onChange={handleDescriptionChange}
                            modules={QuillModules}
                            formats={QuillFormats}
                            theme='snow'
                        />
                    </div>

                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Post New Job</Button>
                    )}

                    {companies.length === 0 && (
                        <p className='text-xs text-red-600 font-bold text-center my-3'>
                            *Please register a company first, before posting a job
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;

// Quill Configuration
const QuillModules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link'],
        [{ 'align': [] }],
        ['clean']
    ],
};

const QuillFormats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'link', 'align'
];

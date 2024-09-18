import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import Select from 'react-select';  // react-select for searchable dropdown
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import baseApi from '@/utils/baseApi';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

// Sample data for categories, job types, locations, and experience levels
const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    // add more categories...
];
const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
];
const locations = [
    { value: 'new-york', label: 'New York' },
    { value: 'san-francisco', label: 'San Francisco' },
    // add more locations...
];
const experienceLevels = [
    { value: 0, label: 'Fresher' },
    { value: 1, label: '1-2 Years' },
    { value: 3, label: '3-5 Years' },
    { value: 5, label: '5+ Years' },
];

const EditJob = () => {
    useGetAllCompanies();
    const [input, setInput] = useState({
        title: "",
        requirements: "",
        salary: 0,  // Updated to be a number
        location: "",
        jobType: "",
        experience: 0,  // Updated to be a number
        position: 0,  // Updated to be a number
        companyId: "",
        category: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { jobId } = useParams();
    const quillRef = useRef(null);

    const { companies } = useSelector(store => store?.company);

    // Fetch job details for editing
    useEffect(() => {
        if (jobId) {
            const fetchJobDetails = async () => {
                try {
                    const res = await baseApi.get(`/job/get/${jobId}`);
                    const { job } = res.data;
                    setInput({
                        title: job?.title,
                        requirements: job?.requirements,
                        salary: job?.salary,
                        location: job?.location,
                        jobType: job?.jobType,
                        experience: job?.experience,
                        position: job?.position,
                        companyId: job?.company._id,
                        category: job?.category,
                        description: job?.description,
                    });
                } catch (error) {
                    toast.error("Error fetching job details.");
                }
            };
            fetchJobDetails();
        }
    }, [jobId]);

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
            const res = await baseApi.put(`/job/${jobId}`, input);
            if (res?.data?.success) {
                toast.success("Job updated successfully!");
                navigate("/recruiter/jobs");
            }
        } catch (error) {
            toast.error("An error occurred while updating the job.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5 p-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    {companies.length === 0 ? (
                        <p className="text-center text-red-600 font-bold my-5">
                            *Please register a company first, before editing a job.
                        </p>
                    ) : (
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

                            <div>
                                <Label>Job Type</Label>
                                <Select
                                    options={jobTypes}
                                    value={jobTypes.find(type => type.value === input.jobType)}
                                    onChange={(value) => handleSelectChange('jobType', value)}
                                    placeholder="Select Job Type"
                                />
                            </div>

                            <div>
                                <Label>Location</Label>
                                <Select
                                    options={locations}
                                    value={locations.find(loc => loc.value === input.location)}
                                    onChange={(value) => handleSelectChange('location', value)}
                                    placeholder="Select Location"
                                />
                            </div>

                            <div>
                                <Label>Experience Level</Label>
                                <Select
                                    options={experienceLevels}
                                    value={experienceLevels.find(exp => exp.value === input.experience)}
                                    onChange={(value) => handleSelectChange('experience', value)}
                                    placeholder="Select Experience Level"
                                />
                            </div>

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

                            <div>
                                <Label>Company</Label>
                                <Select
                                    options={companies.map(company => ({ value: company._id, label: company.name }))}
                                    value={companies.find(company => company._id === input.companyId)}
                                    onChange={(value) => handleSelectChange('companyId', value)}
                                    isSearchable
                                    placeholder="Select Company"
                                />
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
                        </div>
                    )}

                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Update Job
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditJob;

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

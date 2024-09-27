import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import baseApi from '@/utils/baseApi';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: ''
    });
    const { singleCompany } = useSelector(store => store?.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const updatedFile = e.target.files?.[0];
        setInput({ ...input, file: updatedFile });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input?.name);
        formData.append("description", input?.description);
        formData.append("website", input?.website);
        formData.append("location", input?.location);

        if (input?.file) { 
            formData.append("file", input?.file);
        }
        try {
            setLoading(true);
            const res = await baseApi.put(`/company/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.file || null
        });
    }, [singleCompany]);

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar />
            <div className='max-w-xl mx-auto my-10 p-5 bg-gray-800 rounded-lg shadow-lg'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8 bg-gray-700 rounded-lg mb-5'>
                        <Button 
                            onClick={() => navigate("/recruiter/companies")} 
                            variant="outline" 
                            className="flex items-center gap-2 text-gray-300 border-gray-600 hover:bg-gray-600"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-2xl text-gray-200'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label className="text-gray-300">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="bg-gray-700 text-white border-gray-600"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-300">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="bg-gray-700 text-white border-gray-600"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-300">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="bg-gray-700 text-white border-gray-600"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-300">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="bg-gray-700 text-white border-gray-600"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-300">Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="bg-gray-700 text-white border-gray-600"
                            />
                        </div>
                    </div>
                    {
                        loading ? (
                            <Button className="w-full my-4 bg-blue-600 hover:bg-blue-700">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-blue-600 hover:bg-blue-700">
                                Update
                            </Button>
                        )
                    }
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;

import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import baseApi from '@/utils/baseApi';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await baseApi.post(`/company/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/recruiter/company/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar />
            <div className='max-w-4xl mx-auto p-5 bg-gray-800 rounded-lg shadow-lg'>
                <div className='my-10'>
                    <h1 className='font-bold text-3xl text-gray-200'>Your Company Name</h1>
                    <p className='text-gray-400'>What would you like to name your company? You can change this later.</p>
                </div>

                <Label className="text-gray-300">Company Name</Label>
                <Input
                    type="text"
                    className="my-2 bg-gray-700 text-white border-gray-600"
                    placeholder="JobHunt, Microsoft, etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-4 my-10'>
                    <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-600" onClick={() => navigate("/recruiter/companies")}>
                        Cancel
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={registerNewCompany}>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;

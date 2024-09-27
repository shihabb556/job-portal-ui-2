import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 p-5'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-blue-500"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-500"
                        onClick={() => navigate("/recruiter/company/create")}
                    >
                        New Company
                    </Button>
                </div>
                <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 shadow-lg">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    );
};

export default Companies;

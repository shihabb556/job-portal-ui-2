import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <Table className="text-white bg-gray-900 border border-gray-700">
                <TableCaption className="bg-gray-800 text-gray-400">
                    A list of your recent registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-800">
                        <TableHead className="text-gray-300">Logo</TableHead>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className=' overflow-y-auto max-h-[50vw]'>
                    {filterCompany?.map((company) => (
                        <TableRow key={company?._id} className="hover:bg-gray-700 border border-gray-700">
                            <TableCell>
                                <Avatar className="border border-gray-600">
                                    <AvatarImage src={company.logo} />
                                </Avatar>
                            </TableCell>
                            <TableCell className="text-gray-200">{company.name}</TableCell>
                            <TableCell className="text-gray-400">{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer text-gray-400">
                                <Popover>
                                    <PopoverTrigger className="focus:outline-none">
                                        <MoreHorizontal className="hover:text-gray-300" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-gray-700 text-gray-200 border border-gray-600">
                                        <div
                                            onClick={() => navigate(`/recruiter/company/${company._id}`)}
                                            className='flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-gray-600 rounded-md'
                                        >
                                            <Edit2 className='w-4 text-blue-400' />
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;

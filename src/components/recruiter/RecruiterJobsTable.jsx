import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RecruiterJobsTable = () => {
    const { allRecruiterJobs, searchJobByText } = useSelector(store => store?.job);
    const [filterJobs, setFilterJobs] = useState(allRecruiterJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allRecruiterJobs.filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allRecruiterJobs, searchJobByText]);

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg ">
            <Table className="bg-gray-800 text-white rounded-md ">
                <TableCaption className="text-gray-300">A list of your recently posted jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-800 border border-gray-700">
                        <TableHead className="text-left text-indigo-400 p-4">Company Name</TableHead>
                        <TableHead className="text-left text-indigo-400 p-4">Role</TableHead>
                        <TableHead className="text-left text-indigo-400 p-4">Date</TableHead>
                        <TableHead className="text-right text-indigo-400 p-4">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className=' '>
                    {filterJobs?.map((job, idx) => (
                        <TableRow key={`${idx}-${job?._id}`} className="hover:bg-gray-700 transition duration-150 ease-in-out border border-gray-700">
                            <TableCell className="text-gray-300 p-4">{job?.company?.name}</TableCell>
                            <TableCell className="text-gray-300 p-4">{job?.title}</TableCell>
                            <TableCell className="text-gray-300 p-4">{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right p-4">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-gray-300 cursor-pointer hover:text-blue-500 transition duration-200" />
                                    </PopoverTrigger>
                                    <PopoverContent className="bg-gray-800 border border-gray-700 w-40 p-2 rounded-md">
                                        <div
                                            onClick={() => navigate(`/recruiter/job/edit/${job._id}`)}
                                            className='flex items-center gap-2 p-2 cursor-pointer text-gray-200 hover:text-blue-500 transition duration-200'
                                        >
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
                                        <div
                                            onClick={() => navigate(`/recruiter/job/${job._id}/applicants`)}
                                            className='flex items-center gap-2 p-2 mt-2 cursor-pointer text-gray-200 hover:text-blue-500 transition duration-200'
                                        >
                                            <Eye className='w-4' />
                                            <span>Applicants</span>
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

export default RecruiterJobsTable;

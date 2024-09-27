import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import baseApi from '@/utils/baseApi';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store?.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await baseApi.post(`/application/status/${id}/update`, { status });
            if (res?.data?.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <Table className="text-white bg-gray-900 border border-gray-700">
                <TableCaption className="bg-gray-800 text-gray-400">A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-700">
                        <TableHead className="text-gray-300">FullName</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Contact</TableHead>
                        <TableHead className="text-gray-300">Resume</TableHead>
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants && applicants?.applications?.map((item) => (
                        <TableRow key={item._id} className="hover:bg-gray-800">
                            <TableCell className="text-gray-200">{item?.applicant?.fullname}</TableCell>
                            <TableCell className="text-gray-400">{item?.applicant?.email}</TableCell>
                            <TableCell className="text-gray-400">{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell className="text-gray-200">
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-500 hover:text-blue-400 cursor-pointer"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span className="text-gray-400">NA</span>
                                )}
                            </TableCell>
                            <TableCell className="text-gray-400">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer text-gray-400">
                                <Popover>
                                    <PopoverTrigger className="focus:outline-none">
                                        <MoreHorizontal className="hover:text-gray-300" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-gray-700 text-gray-200 border border-gray-600">
                                        {shortlistingStatus.map((status, index) => (
                                            <div
                                                onClick={() => statusHandler(status, item?._id)}
                                                key={index}
                                                className='flex items-center w-full px-2 py-1 cursor-pointer hover:bg-gray-600 rounded-md'
                                            >
                                                <span>{status}</span>
                                            </div>
                                        ))}
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

export default ApplicantsTable;

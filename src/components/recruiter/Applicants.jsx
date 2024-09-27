import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import baseApi from '@/utils/baseApi';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store?.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await baseApi.get(`/application/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, [dispatch, params.id]);

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar />
            <div className='max-w-7xl mx-auto p-5 bg-gray-800 rounded-lg shadow-lg'>
                <h1 className='font-bold text-2xl my-5 text-gray-200'>
                    Applicants ({applicants?.applications?.length})
                </h1>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;

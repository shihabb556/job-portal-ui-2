import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, LogOut, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useDispatch, useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { useNavigate } from 'react-router-dom'
import { persistor } from '@/redux/store'
import { logout } from '@/redux/authSlice'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {

    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let respUser;
    if(user){
        respUser =user?.user || {};
    };
 
    // Hanlelogin
    const handleLogout = async () => {
        try {
            await persistor.purge(); // Clear the persisted state
            dispatch(logout());
            console.log("logout success")
            navigate('/login');
        } catch (error) {
            console.log('logout function error',error)
        }
    };



    return (
        <div>
            <Navbar />
            <div className='max-w-4xl p-5 mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={respUser?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{respUser?.fullname}</h1>
                            <p>{respUser?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{respUser?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{respUser?.phoneNumber}</span>
                    </div>
                </div>
                {
                    respUser?.role === 'student' && (
                        <>
                             <div className='my-5 mt-7'>
                                <h1>Skills</h1>
                                <div className='flex items-center gap-2 p-2 flex-wrap'>
                                    {
                                        respUser?.profile?.skills?.length ? respUser.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                                    }
                                </div>
                            </div>
                            <div className='grid w-full max-w-sm items-center gap-1.5'>
                                <Label className="text-md font-bold">Resume</Label>
                                {
                                    isResume ? <a target='_blank' href={respUser?.profile?.resume} className='text-blue-500 px-2 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                }
                            </div>
                        </>
                    )
                }
            </div>
           {
             respUser?.role === 'student' && (
                <>
                      <div className='max-w-4xl p-5 mx-auto bg-white rounded-2xl border-b-2 border-gray-2'>
                        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                        <AppliedJobTable />
                    </div>
                </>
             )
           }

                
            <div className='max-w-4xl w-full mx-auto flex p-5 w-fit items-center gap-2 cursor-pointer'>
                <LogOut/>
                <Button onClick={handleLogout} variant="link">Logout</Button>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;

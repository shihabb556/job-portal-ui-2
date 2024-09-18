import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Mail, LogOut, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import AppliedJobTable from './AppliedJobTable';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/redux/authSlice';
import UpdateProfileDialog from './UpdateProfileDialog';
import EditSkillsDialog from './EditSkillsDialog'; // Dialog for editing skills
import EditResumeDialog from './EditResumeDialog'; // Dialog for editing resume
import { Label } from '@radix-ui/react-label';

const Profile = () => {
    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [openSkillsDialog, setOpenSkillsDialog] = useState(false);
    const [openResumeDialog, setOpenResumeDialog] = useState(false);
    const [editType, setEditType] = useState('name'); // Controls the field being edited
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl p-5 mx-auto bg-white border border-gray-200 rounded-2xl my-5'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => { setEditType('name'); setOpenProfileDialog(true); }} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                        <Button variant="outline" size="sm" onClick={() => { setEditType('email'); setOpenProfileDialog(true); }}>Edit</Button>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <span>Bio: {user?.profile?.bio}</span>
                        <Button variant="outline" size="sm" onClick={() => { setEditType('bio'); setOpenProfileDialog(true); }}>       {user?.profile?.bio ? 'Edit Bio' : 'Add Bio'} </Button>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                       <div className='flex items-center gap-2 p-2 flex-wrap'>
                          {
                                user?.profile?.skills?.length ? user?.profile?.skills.map((item, index) => (
                                    <Badge key={index}>{item}</Badge>
                                )) :
                                <span>No skills added yet.</span>
                            }
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setOpenSkillsDialog(true)}>       {user?.profile?.skills ? 'Edit Skills' : 'Add Skills'} </Button>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <span>Resume: {user?.profile?.resume ? <a href={user?.profile?.skilss} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Resume</a> : 'NA'}</span>
                        <Button variant="outline" size="sm" onClick={() => setOpenResumeDialog(true)}>       {user?.profile?.resume ? 'Edit Resume' : 'Add Resume'} </Button>
                    </div>
                </div>
             
            </div>
            {
                user?.role === 'student' && (
                    <div className='max-w-4xl p-5 mx-auto bg-white rounded-2xl border-b-2 border-gray-2'>
                        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                        <AppliedJobTable />
                    </div>
                )
            }
            <div className='max-w-4xl w-full mx-auto flex p-5 w-fit items-center gap-2 cursor-pointer'>
                <LogOut />
                <Button onClick={handleLogout} variant="link">Logout</Button>
            </div>

    
        </div>
    );
};

export default Profile;

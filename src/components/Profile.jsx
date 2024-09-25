import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar } from './ui/avatar';  // Assuming Avatar is a custom component
import { Button } from './ui/button';  // Assuming Button is a custom component
import { Mail, LogOut, Pen, CameraIcon } from 'lucide-react'; // Icons
import AppliedJobTable from './AppliedJobTable';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/redux/authSlice';
import UpdateProfileDialog from './UpdateProfileDialog';
import EditSkillsDialog from './EditSkillsDialog';  // Custom dialog component
import EditResumeDialog from './EditResumeDialog';  // Custom dialog component

const Profile = () => {
    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [openSkillsDialog, setOpenSkillsDialog] = useState(false);
    const [openResumeDialog, setOpenResumeDialog] = useState(false);
    const [editType, setEditType] = useState('name'); // To determine which field is being edited
    const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
    const { user } = useSelector(store => store.auth);  // Fetch user from Redux store
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div>
            <Navbar />

            {/* Edit Profile Button */}
            <div className="max-w-4xl p-5 mx-auto bg-white border border-gray-200 rounded-2xl my-5">
                <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
                >
                    {isEditing ? 'Finish Editing' : 'Edit Profile'}
                </Button>
            </div>

            <div className="max-w-4xl p-5 mx-auto bg-white border border-gray-200 rounded-2xl my-5">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 flex-col">
                        <div className='flex items-center gap-5'>
                            <Avatar className="h-24 w-24">
                                <img src={user?.profile?.profilePhoto} alt="profile" className="rounded-full" />
                            </Avatar>
                            {isEditing && (
                                <Button onClick={() => { setEditType('profilePic'); setOpenProfileDialog(true); }} variant="outline">
                                    <CameraIcon />
                                </Button>
                            )}
                        </div>
                        <div className='flex items-center gap-5'>
                            <h1 className="font-medium text-xl">{user?.fullname}</h1>
                            {isEditing && (
                                <Button onClick={() => { setEditType('name'); setOpenProfileDialog(true); }} variant="outline">
                                    <Pen />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="my-5 space-y-4">
                    <div className="flex items-center gap-5 justify-between">
                        <div>Bio: {user?.profile?.bio}</div>
                        {isEditing && (
                            <Button variant="outline" size="sm" className='flex gap-2' onClick={() => { setEditType('bio'); setOpenProfileDialog(true); }}>
                               <Pen/> {user?.profile?.bio ? 'Edit Bio' : 'Add Bio'}
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center gap-3 justify-between">
                        <div className='flex'>
                            <Mail />
                            <span className='px-1'>{user?.email}</span> 
                        </div>
                        {isEditing && (
                            <Button variant="outline" size="sm" onClick={() => { setEditType('email'); setOpenProfileDialog(true); }}>
                               <Pen className='mr-2'/> Change Email
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center gap-3 justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span>Skills: </span> 
                            {user?.profile?.skills?.length ? (
                                user?.profile?.skills.map((item, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-200 rounded-lg">{item}</span>
                                ))
                            ) : (
                                <span>No skills added yet.</span>
                            )}
                        </div>
                        {isEditing && (
                            <Button variant="outline" size="sm" onClick={() => setOpenSkillsDialog(true)}>
                                <Pen className='mr-2'/> Add Skills
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center gap-3 justify-between">
                        <span> Resume: {user?.profile?.resume ? (
                            <a href={user?.profile?.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Resume</a>
                        ) : 'NA'}</span>
                        {isEditing && (
                            <Button variant="outline" size="sm" onClick={() => setOpenResumeDialog(true)}>
                               <Pen className='mr-2'/> {user?.profile?.resume ? 'Change Resume' : 'Add Resume'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {user?.role === 'student' && (
                <div className="max-w-4xl p-5 mx-auto bg-white rounded-2xl border-b-2 border-gray-200">
                    <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
            )}

            <div className="max-w-4xl w-full mx-auto flex p-5 items-center gap-2 cursor-pointer">
                <LogOut />
                <Button onClick={handleLogout} variant="link">Logout</Button>
            </div>

            {/* Update Profile Dialog */}
            {openProfileDialog && (
                <UpdateProfileDialog
                    open={openProfileDialog}
                    setOpen={setOpenProfileDialog}
                    editType={editType}
                />
            )}

            {/* Edit Skills Dialog */}
            {openSkillsDialog && (
                <EditSkillsDialog
                    open={openSkillsDialog}
                    setOpen={setOpenSkillsDialog}
                    user={user}
                />
            )}

            {/* Edit Resume Dialog */}
            {openResumeDialog && (
                <EditResumeDialog
                    open={openResumeDialog}
                    setOpen={setOpenResumeDialog}
                />
            )}
        </div>
    );
};

export default Profile;

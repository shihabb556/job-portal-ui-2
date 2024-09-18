import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen, editType }) => {
    const [loading, setLoading] = useState(false);
    const { user, token } = useSelector(store => store?.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        resume: user?.profile?.resume || "",
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Convert skills to an array if editing skills
        const formattedSkills = editType === 'skills' ? input.skills.split(',').map(skill => skill.trim()) : input.skills;

        const formData = new FormData();
        if (editType === 'name') {
            formData.append("fullname", input.fullname);
        } else if (editType === 'email') {
            formData.append("email", input.email);
        } else if (editType === 'bio') {
            formData.append("bio", input.bio);
        } else if (editType === 'skills') {
            formData.append("skills", formattedSkills);
        } else if (editType === 'resume') {
            formData.append("resume", input.resume);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${BASE_URL}/user/profile/update`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res?.data?.success) {
                dispatch(setUser({ user: res?.data?.user, token }));
                toast.success(res?.data?.message);
                setOpen(false); // Close the dialog after successful update
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error?.response?.data?.message || "An error occurred while updating the profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>
                        {editType === 'name' && 'Update Name'}
                        {editType === 'email' && 'Update Email'}
                        {editType === 'bio' && 'Update Bio'}
                        {editType === 'skills' && 'Update Skills'}
                        {editType === 'resume' && 'Update Resume'}
                    </DialogTitle>
                    <DialogDescription>
                        Update your {editType} below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        {editType === 'name' && (
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="fullname" className="text-right">Name</Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        )}
                        {editType === 'email' && (
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        )}
                        {editType === 'bio' && (
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        )}
                        {editType === 'skills' && (
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                    placeholder="Comma-separated skills"
                                />
                            </div>
                        )}
                        {editType === 'resume' && (
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="resume" className="text-right">Resume</Label>
                                <Input
                                    id="resume"
                                    name="resume"
                                    type="text"
                                    value={input.resume}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                    placeholder="Enter resume link"
                                />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">Update</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;

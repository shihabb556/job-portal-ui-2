import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

const EditResumeDialog = ({ open, setOpen, user }) => {
    const [resumeLink, setResumeLink] = useState(user?.profile?.resume || '');

    const handleSave = () => {
        // Handle save logic (e.g., send updated resume link to backend)
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Resume</DialogTitle>
                    <p className='text-[14px] text-red-500 pl-8'>
                                        Please enter a valied link of your resume. 
                                        You can upload your resume to Google Drive, make it publicly accessible, 
                                        then copy the link and paste it into the input field below.
                                    </p>
                </DialogHeader>
                <Input 
                    type="url" 
                    placeholder="Enter resume link" 
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                />
                <DialogFooter>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditResumeDialog;

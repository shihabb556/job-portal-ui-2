import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

const EditSkillsDialog = ({ open, setOpen, user }) => {
    const [skills, setSkills] = useState(user?.profile?.skills || []);

    const handleSave = () => {
        // Handle save logic (e.g., send updated skills to backend)
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Skills</DialogTitle>
                </DialogHeader>
                <div>
                    {skills.map((skill, idx) => (
                        <Input key={idx} value={skill} onChange={(e) => {
                            const updatedSkills = [...skills];
                            updatedSkills[idx] = e.target.value;
                            setSkills(updatedSkills);
                        }} />
                    ))}
                    <Button onClick={() => setSkills([...skills, ""])}>Add Skill</Button>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditSkillsDialog;

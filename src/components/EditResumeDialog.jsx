import React, { useState } from 'react';

const EditResumeDialog = ({ open, setOpen, user }) => {
    const [resumeLink, setResumeLink] = useState(user?.profile?.resume || '');

    const handleSave = () => {
        // Handle save logic (e.g., send updated resume link to backend)
        setOpen(false);
    };

    if (!open) return null; // Only render if the dialog is open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-5 w-96 shadow-lg">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Edit Resume</h2>
                    <p className="text-sm text-red-500 mt-2">
                        Please enter a valid link to your resume. 
                        You can upload your resume to Google Drive, make it publicly accessible, 
                        then copy the link and paste it into the input field below.
                    </p>
                </div>
                <input
                    type="url"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter resume link"
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                    <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 bg-gray-200 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditResumeDialog;

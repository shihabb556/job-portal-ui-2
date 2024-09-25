import React, { useState } from 'react';

const UpdateProfileDialog = ({ open, setOpen, editType }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSave = () => {
        // Save logic here
        setOpen(false);
    };

    if (!open) return null; // Return null if the dialog is not open

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
            aria-labelledby="dialog-title"
            aria-describedby="update-profile-description"
            role="dialog"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 id="dialog-title" className="text-xl font-semibold">
                    Update {editType}
                </h2>
                <p id="update-profile-description" className="mb-4 text-gray-500">
                    Please provide your updated {editType}.
                </p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`Enter new ${editType}`}
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                <div className="flex justify-end gap-3">
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
                        Save
                    </button>
                    <button onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfileDialog;

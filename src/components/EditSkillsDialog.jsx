import { Plus } from 'lucide-react';
import React, { useState } from 'react';

// All available skills categorized
const allSkills = [
  "HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular", "Next.js",
  "Node.js", "Express.js", "Java", "Python", "Django", "Ruby", "PHP", "SQL", 
  "NoSQL", "MongoDB", "GraphQL", "AWS", "Azure", "Docker", "Kubernetes",
  "Data Analysis", "Machine Learning", "TensorFlow", "Pandas", "NumPy",
  "Cybersecurity", "Penetration Testing", "Blockchain", "Web3", "Smart Contracts",
  // Add more skills here...
];

const EditSkillsDialog = ({ open, setOpen, user }) => {
  const [skills, setSkills] = useState(user?.profile?.skills || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);

  const handleSave = () => {
    // Handle save logic (e.g., send updated skills to backend)
    setOpen(false);
  };

  // Handle skill search
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue.trim() !== "") {
      const suggestions = allSkills.filter((skill) =>
        skill.toLowerCase().includes(searchValue.toLowerCase()) &&
        !skills.includes(skill)
      );
      setFilteredSkills(suggestions);
    } else {
      setFilteredSkills([]);
    }
  };

  // Add selected skill
  const handleAddSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
      setFilteredSkills([]); // Clear the suggestions once a skill is added
      setSearchTerm(""); // Clear the search input
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  if (!open) return null; // Only render if the dialog is open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-5 w-96 shadow-lg max-h-[90vh] overflow-y-auto ">
        <h2 className="text-xl font-semibold mb-4">Edit Skills</h2>

        {/* Selected Skills */}
        <div className="mb-4">
          <h4 className="mb-2 font-semibold">Your Skills:</h4>
         <div className='max-h-[25vh] overflow-y-auto'>
            {skills.length > 0 ? (
                skills.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between mb-2">
                    <span>{skill}</span>
                    <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-red-500 hover:text-red-700"
                    >
                    Remove
                    </button>
                </div>
                ))
            ) : (
                <p>No skills selected</p>
            )}
         </div>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for a skill"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {/* Suggested Skills */}
        {filteredSkills.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 font-semibold">Suggested Skills:</h4>
            <div className="space-y-1  max-h-[24vh] overflow-y-auto">
              {filteredSkills.map((skill, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddSkill(skill)}
                  className="block text-left w-full px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 flex gap-5"
                >
                  {skill} <Plus/>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
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

export default EditSkillsDialog;

import React, { useState } from 'react';
import axios from 'axios';
import baseApi from '@/utils/baseApi';

const AddQNA = () => {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'HTML',
    difficulty: 'easy',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await baseApi('/interview-prep-question', formData);
      setMessage('Question added successfully');
      setFormData({ question: '', answer: '', category: 'HTML', difficulty: 'easy' });
    } catch (error) {
      setMessage('Failed to add question');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Add New Interview Question</h2>
      {message && <p>{message}</p>}

      <input
        type="text"
        name="question"
        placeholder="Question"
        value={formData.question}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <textarea
        name="answer"
        placeholder="Answer"
        value={formData.answer}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4">
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JavaScript">JavaScript</option>
        <option value="ReactJS">ReactJS</option>
        <option value="NextJS">NextJS</option>
        <option value="Express">Express</option>
        <option value="NodeJS">NodeJS</option>
        <option value="MongoDB">MongoDB</option>
        <option value="SQL">SQL</option>
      </select>

      <select name="difficulty" value={formData.difficulty} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Question
      </button>
    </form>
  );
};

export default AddQNA;

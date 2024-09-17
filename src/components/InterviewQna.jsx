
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MarkdownViewer from './shared/MarkdownViewer';
import { BASE_URL } from '@/utils/constant';
import Navbar from './shared/Navbar';

// Added 'All' as the first category option
const categories = ['All', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'SQL'];

const InterviewQna = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');  // Default is 'All'
  const [qnaData, setQnaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Q&A data when the selected category changes
  useEffect(() => {
    const fetchQnAData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Request data for the selected category, or all if 'All' is selected
        const response = await axios.get(`${BASE_URL}/interview-prep-qna/?category=${selectedCategory}`);
        setQnaData(response.data);
      } catch (err) {
        setError('Failed to load Q&A data');
      } finally {
        setLoading(false);
      }
    };

    fetchQnAData();
  }, [selectedCategory]);

  return (
    <div>
      <Navbar />
      <div className='p-6'>
        <h2>Interview Preparation Q&A</h2>

        {/* Category Selector */}
        <div>
          <label htmlFor="category-select">Select Category: </label>
          <select
            id="category-select"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Content Display */}
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && qnaData.length === 0 && (
            <p>No Q&A content available for {selectedCategory === 'All' ? 'any category' : selectedCategory}.</p>
          )}
          {!loading && !error && qnaData.length > 0 && (
            <div>
              {qnaData.map((item, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <h3>{item.question}</h3>
                  <MarkdownViewer markdown={item.answer} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewQna;

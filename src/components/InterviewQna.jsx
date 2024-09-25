import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MarkdownViewer from './shared/MarkdownViewer';
import { BASE_URL } from '@/utils/constant';
import Navbar from './shared/Navbar';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Footer from './shared/Footer';
import NewsletterSignup from './LandingPage/NewsletterSignup';

const categories = ['All', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'SQL'];
const ITEMS_PER_PAGE = 5; // Number of items to show per page

const InterviewQna = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [qnaData, setQnaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndexes, setOpenIndexes] = useState([]); // Track open Q&A indexes
  const [currentPage, setCurrentPage] = useState(1);
  const [readQuestions, setReadQuestions] = useState(new Set()); // Track read questions

  useEffect(() => {
    const fetchQnAData = async () => {
      setLoading(true);
      setError(null);

      try {
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

  const toggleOpen = (index) => {
    setOpenIndexes((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index); // Close the item
      } else {
        return [...prev, index]; // Open the item
      }
    });
  };

  const toggleRead = (index) => {
    setReadQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index); // Mark as unread
      } else {
        newSet.add(index); // Mark as read
      }
      return newSet;
    });
  };

  const totalPages = Math.ceil(qnaData.length / ITEMS_PER_PAGE);
  const paginatedData = qnaData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div>
      <Navbar />
      <div className='p-6 max-w-5xl mx-auto'>
        <h2 className='text-2xl font-bold mb-4'>Interview Preparation Questions and Answers</h2>

        <div className='mb-4'>
          <label htmlFor="category-select" className='mr-2'>Select Category:</label>
          <select
            id="category-select"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); // Reset to the first page on category change
            }}
            value={selectedCategory}
            className='border rounded px-2 py-1'
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          {loading && <p className='text-center'>Loading...</p>}
          {error && <p className='text-red-500 text-center'>{error}</p>}
          {!loading && !error && paginatedData.length === 0 && (
            <p className='text-center'>No Q&A content available for {selectedCategory === 'All' ? 'any category' : selectedCategory}.</p>
          )}
          {!loading && !error && paginatedData.length > 0 && (
            <div>
              {paginatedData.map((item, index) => (
                <div key={index} className='mb-4 border rounded-lg shadow'>
                  <div className='flex justify-between items-center p-4 cursor-pointer' onClick={() => toggleOpen(index)}>
                    <h3 className={`font-semibold ${readQuestions.has(index) ? 'line-through text-gray-500' : ''}`}>
                      {item.question}
                    </h3>
                    {openIndexes.includes(index) ? <ChevronUp /> : <ChevronDown />}
                  </div>
                  {openIndexes.includes(index) && (
                    <div className='p-4 bg-gray-100'>
                      <MarkdownViewer markdown={item.answer} />
                      <button
                        onClick={() => toggleRead(index)}
                        className={`mt-2 border rounded px-4 py-1 ${readQuestions.has(index) ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                      >
                        {readQuestions.has(index) ? 'Mark as Unread' : 'Mark as Read'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className='flex justify-between items-center mt-4'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='border rounded px-4 py-2 disabled:opacity-50'
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='border rounded px-4 py-2 disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
      <NewsletterSignup/>
      <Footer/>
    </div>
  );
};

export default InterviewQna;

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '@/redux/jobSlice';
import { debounce } from 'lodash';



const Pagination = ({ scrollableDivRef }) => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((store) => store.job.pagination);

  // Debounced version of handlePageChange
    const debouncedPageChange = useCallback(
        debounce((pageNumber, scrollableDivRef, dispatch) => {
        dispatch(setCurrentPage(pageNumber));
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        }, 1000), // 300ms debounce
        []
    );
  

  // Usage in handlePageChange
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
  
    debouncedPageChange(pageNumber, scrollableDivRef, dispatch);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than or equal to maxVisiblePages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Otherwise, calculate the range of pages to display
      let startPage, endPage;

      if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxVisiblePages / 2);
        endPage = currentPage + Math.floor(maxVisiblePages / 2);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center my-6">
      <nav className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg border text-white bg-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'} transition-all`}
        >
          &laquo; Previous
        </button>

        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg border ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'} transition-all`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg border text-white bg-gray-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'} transition-all`}
        >
          Next &raquo;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;

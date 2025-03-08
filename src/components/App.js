import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import './App.css'; // Ensure the CSS file is imported

const App = () => {
  const { data, error, loading } = useFetch('https://api.github.com/repositories?per_page=100'); // Fetch more items for pagination

  const itemsPerPage = 9; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1); // State for the current page

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the indices for slicing the data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data for the current page
  const currentItems = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Latest Free Software Digest</h1>
      <ul>
        {currentItems.map(software => (
          <li key={software.id}>
            <h2>{software.name.charAt(0).toUpperCase() + software.name.slice(1)}</h2>
            <p>{software.description || "No description provided"}</p>
            <a href={software.html_url} target="_blank" rel="noopener noreferrer">Visit</a>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
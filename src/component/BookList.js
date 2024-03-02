import React, { useState } from 'react';
import { useFavoriteBooks } from '../context/FavBookContext';

const BookList = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { favoriteBooks, addFavoriteBook, removeFavoriteBook } = useFavoriteBooks();

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setShowFullDescription(false);
  };

  const handleReadMore = () => {
    setShowFullDescription(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const getShortenedDescription = (description) => {
    const words = description.split(' ');
    if (words.length <= 25) {
      return description;
    }
    return words.slice(0, 25).join(' ') + '...';
  };

  const handleToggleFavorite = (book) => {
    if (isBookFavorite(book)) {
      removeFavoriteBook(book.id);
    } else {
      addFavoriteBook(book);
    }
  };

  const isBookFavorite = (book) => favoriteBooks.some((favBook) => favBook.id === book.id);

  return (
    <div className="container  mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {books.map((book) => (
        <div key={book.id} className="bg-white p-4 rounded-md shadow-md">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-40 object-cover mb-4 border-radius-14"
          />
          <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
          <p className="text-gray-600">{book.author}</p>

          <div className="flex items-center space-x-4 mt-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleViewDetails(book)}>Know More
            </button>

            <span className="text-red-500 cursor-pointer" onClick={() => handleToggleFavorite(book)}>
            {isBookFavorite(book) ? '❤️' : '💜'}
          </span>
           </div>
           
        </div>
      ))}

      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md max-w-md overflow-y-auto max-h-md">
            <p className="mb-4">
              {showFullDescription
                ? selectedBook.description
                : getShortenedDescription(selectedBook.description)}
              {!showFullDescription && (
                <span className="text-blue-500 cursor-pointer " onClick={handleReadMore}>
                  {' '}
                  Read More
                </span>
              )}
            </p>

            <p className="text-blue-500">Rating: {selectedBook.rating || 'Not rated'}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;


import React from 'react';
import { useFavoriteBooks } from '../context/FavBookContext';
import { Link } from 'react-router-dom';

const Favbook = () => {
  const { favoriteBooks } = useFavoriteBooks();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Favorite Books</h1>
      <ul>
        {favoriteBooks.map((book) => (
          <li key={book.id} className="mb-4 bg-white p-4 rounded-md shadow-md">
            <div className="flex items-center space-x-4">
              <img src={book.coverImage} alt={book.title} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-blue-500">Rating: {book.rating || 'Not rated'}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/">
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
          Go to Home Page
        </button>
      </Link>
    </div>
  );
};

export default Favbook;

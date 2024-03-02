import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoriteBooksContext = createContext();

const FavoriteBooksProvider = ({ children }) => {
 
  const storedFavoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
  const [favoriteBooks, setFavoriteBooks] = useState(storedFavoriteBooks);

  const addFavoriteBook = (book) => {
    setFavoriteBooks((prevFavorites) => [...prevFavorites, book]);
  };

  const removeFavoriteBook = (bookId) => {
    setFavoriteBooks((prevFavorites) => prevFavorites.filter((book) => book.id !== bookId));
  };

  useEffect(() => {
    
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  return (
    <FavoriteBooksContext.Provider value={{ favoriteBooks, addFavoriteBook, removeFavoriteBook }}>
      {children}
    </FavoriteBooksContext.Provider>
  );
};

const useFavoriteBooks = () => {
  const context = useContext(FavoriteBooksContext);
  if (!context) {
    throw new Error('FavoriteBooks must be used within a FavoriteBooksProvider');
  }
  return context;
};

export { FavoriteBooksProvider, useFavoriteBooks };

import "./App.css";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./component/Header";
import BookList from "./component/BookList";
import Favbook from "./component/Favbook";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState([]);
  const debounceTimeout = useRef(null);

  const fetchBooks = async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );

      const bookData = response.data?.items?.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(", ") || "Unknown Author",
        coverImage: item.volumeInfo.imageLinks?.thumbnail || "No Image",
        description: item.volumeInfo.description || "No Description",
        rating: item.volumeInfo.averageRating || "No Rating",
      }));

      setBooks(bookData);
      setError(null);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(error);
    }
  };

  
  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setBooks([]);
      return;
    }


    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchBooks(searchQuery);
    }, 500);
  }, [searchQuery, filterType]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  return (
    
    <Router>
      <Header onSearch={handleSearch} onFilter={handleFilter} />
     {error && <p className="text-color-600-red ">something goes wrong while fetching data from the API</p> }
      <Routes>
        <Route path="/fav" element={<Favbook />} />
        <Route path="/" element={<BookList books={books} />} />
      </Routes>
    </Router>
  );
};

export default App;

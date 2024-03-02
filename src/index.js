import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FavoriteBooksProvider} from './context/FavBookContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavoriteBooksProvider>
    <App/>
    </FavoriteBooksProvider>
   
  </React.StrictMode>
);


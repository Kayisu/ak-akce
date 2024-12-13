import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Homepage from './Homepage';
import CategoryPage from './CategoryPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AccountPage from './AccountPage';
import FavoritesPage from './FavoritesPage';
import Header from './Header';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]); // Kategoriler state'i

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data.map((item) => item.category_name));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <Homepage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                categories={categories}
              />
            </>
          }
        />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<SignupPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/account"
          element={
            <>
              <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <AccountPage
                categories={categories}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <>
              <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <FavoritesPage
                categories={categories}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </>
          }
        />
        <Route
          path="/:category"
          element={
            <>
              <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <CategoryPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
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
import AttributePage from './AttributePage';
import ProductPage from './ProductPage';
import AdminHome from './AdminHome';
import AdminPage from './AdminPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]); // Kategoriler state'i
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data.map((item) => item.user));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
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
          path="/admin"
          element={<AdminPage />}
        />

        <Route path="/admin/home"
          element={<AdminHome />}
        />
        <Route
          path="category/:category_name"
          element={
            <>
              <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <CategoryPage />
            </>
          }
        />
        <Route
          path="/attribute/:attribute_id"
          element={
            <>

              <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <AttributePage />
            </>
          }
        />

        <Route
          path="/products/:productId"
          element={
            <>
              <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <ProductPage />
            </>
          }

        />

      </Routes>
    </Router>
  );
};

export default App;
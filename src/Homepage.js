import React from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const Homepage = ({ categories, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/${category}`);
    };

    const sidebarContent = (
        <>
            <h3>Kategoriler</h3>
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                        style={{ cursor: 'pointer' }}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </>
    );

    return (
        <Layout
            sidebarContent={sidebarContent}
            isBackButtonVisible={false} // Geri Dön tuşu ana sayfada görünmez
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
        >
            <h1>Ana Sayfa</h1>
        </Layout>
    );
};

export default Homepage;
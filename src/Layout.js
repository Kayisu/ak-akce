import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import './styles/Layout.css';
import { useLocation } from 'react-router-dom';


const Layout = ({ children, sidebarContent, isLoggedIn, setIsLoggedIn,backButtonPath }) => {
    const location = useLocation();
    const hideSidebar = location.pathname.startsWith('/products/');
    return (
        <div className="layout">
            <Sidebar content={sidebarContent} backButtonPath={backButtonPath}/>
            {!hideSidebar && <Sidebar content={sidebarContent} />}
            <div className="page-content">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
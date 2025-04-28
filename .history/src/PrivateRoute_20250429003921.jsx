import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const phone = localStorage.getItem('phone');

    if (!phone) {
        // If not logged in, redirect to registration
        return <Navigate to="/register" replace />;
    }

    // If logged in, show the page
    return children;
};

export default PrivateRoute;

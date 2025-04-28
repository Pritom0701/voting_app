import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const isLoggedIn = localStorage.getItem('phone');

    return isLoggedIn ? element : <Navigate to="/voter-registration" replace />;
};

export default PrivateRoute;

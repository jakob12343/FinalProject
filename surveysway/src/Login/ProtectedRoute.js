// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { MainContext } from '../MainContext';

const ProtectedRoute = ({ children }) => {
    const { UserMode } = useContext(MainContext); // Accessing usertoken from context
    if (UserMode !== "UserHomePage") { // Assuming "1234" is the default or non-authenticated state
        if (UserMode==="guest") {
        return <Navigate to="/guest"/>
        }

        return <Navigate to="/" />;

    }
    
    
    return children;
};

export default ProtectedRoute;

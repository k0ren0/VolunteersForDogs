import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
    const { token } = useSelector((state) => state.auth); 

    return token ? (
        <Route {...rest} element={children} />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;

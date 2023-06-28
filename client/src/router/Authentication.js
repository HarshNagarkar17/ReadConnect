import React from 'react'
import { useAuth } from '../services/AuthProvider'
import { Navigate } from 'react-router-dom';

export const Authentication = ({ children }) => {
    const {tokens} = useAuth();
    if(!tokens.access) {
        return <Navigate to="/login" replace={true} />
    }else
        return children;
}

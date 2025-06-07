import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type AuthContextIn } from '../../Interface/InAuth';
import { ProgressSpinner } from 'primereact/progressspinner';

const ProtectedRoute: React.FC = () => {
    const {isAutenticate, loading} = useAuth() as AuthContextIn

    if(loading) return (
        <div className="flex justify-center items-center h-screen">
            <ProgressSpinner />
        </div>
    )

    if(!isAutenticate && !loading) return <Navigate to={"/login"} replace/>


    return <Outlet/> 
};

export default ProtectedRoute;
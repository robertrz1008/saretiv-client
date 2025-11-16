import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type AuthContextIn } from '../../Interface/InAuth';
import UserAdminForm from '../../components/form/UserAdminForm';
import EnterpriseForm from '../../components/form/EnterpriseForm';
// import EnterpriseForm from '../../components/form/EnterpriseForm';

const ProtectedRoute: React.FC = () => {
    const {isAutenticate, loading, isAdmin, isEnteprice} = useAuth() as AuthContextIn

    if(loading) {
        return (
        <div className="flex f-jc-center f-ai-center" style={{width:"100%", height:"100vh"}}>
            <h1 style={{color: "rgb(18, 157, 238)", fontSize:"40px"}}>Saretiv</h1>
            {/* <ProgressSpinner /> */}
        </div>
        )
    }else{
        if(!isAdmin && !isAutenticate ) return <UserAdminForm/>

        if( isAdmin && !isAutenticate ) return <Navigate to={"/login"} replace/>
        if(isAutenticate && !isEnteprice) return <EnterpriseForm/>

        return <Outlet/> 
    }
    

    
    

    
};

export default ProtectedRoute;
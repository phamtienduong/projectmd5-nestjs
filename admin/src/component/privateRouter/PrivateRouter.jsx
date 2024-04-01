import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const withAuthProtection = (Component) => {
    const isAuthenticated = localStorage.getItem("admin_token");
  
    return (props) => {
        if (!isAuthenticated) {
            return <Navigate to="/auth/admin" />;
        } else {
            return <Component {...props} />;
        }
    };
};

const ProtectedOutlet = withAuthProtection(Outlet);

export default ProtectedOutlet;

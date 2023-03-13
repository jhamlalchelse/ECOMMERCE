import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
 if(!loading){
  return (
    <>
      {
        isAuthenticated ? <Outlet /> : navigate("/login")
      }
    </>
  );
 }
 else{
  return <Loader/>
 }
};

export default ProtectedRoute;

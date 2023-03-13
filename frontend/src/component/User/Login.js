import axios from "axios";
import React, { useEffect, useState } from "react";
import { clearErrors, login } from "../../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'
import Loader from "../Layout/Loader/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";


const Login = () => {
  const [user, setUser] = useState({
    email: "test1@g.com",
    password: "test@123",
  });
  const { loading, error, isAuthenticated} = useSelector((state) => state.user);
  // const userdata = useSelector((state) => state.user).user
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams();
  const redirect = searchParams.toString() ? `/${searchParams.get("redirect")}` : "/account"
  // const redirect = searchParams.toString() ? `/${searchParams.toString().split("=")[1]}` : "/account"
  useEffect(() => {
    if (error && error !== 'Please Login to access this resource') {
      toast.error(error || "Error");
      dispatch(clearErrors());
    }
    if(isAuthenticated){
      // console.log('isAuthenticated',isAuthenticated);
      navigate(redirect)
    }
  }, [dispatch, error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    dispatch(login(email, password));
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/login",
      { email, password }
      );
    console.log("Login data is", data);
    if(data){
      navigate(redirect)
    }
  };
  return (
    <>
      {
        loading ? <Loader />
        :
        <>
        <div className="mx-auto w-25 shadow p-3 my-5" style={{fontFamily:"georgia", fontSize:"18px"}}>
        <form action="" onSubmit={submitHandler}>
          <label htmlFor="email" style={{margin:"2px 0 1px 5px"}}>Email</label>
          <input
            type="email"
            name=""
            id="email"
            value={user.email}
            onChange={({ target }) => setUser({ ...user, email: target.value })}
            placeholder="Enter Email"
            className=" form-control"
            required
            style={{padding:"10px 15px", fontSize:"18px", letterSpacing:"1px"}}
          />
          <label htmlFor="password" style={{margin:"15px 0 1px 5px"}}>Password</label>
          <input
            type="password"
            name=""
            id="password"
            value={user.password}
            onChange={({ target }) =>
              setUser({ ...user, password: target.value })
            }
            placeholder="Enter Password"
            className=" form-control"
            required
            style={{padding:"10px 15px", fontSize:"18px", letterSpacing:"1px"}}
          />
          <button
            type="submit"
            className=" form-control mt-3 bg-secondary text-white text-uppercase"
            style={{padding:"10px 15px", fontSize:"19px", letterSpacing:"2px"}}
          >
            Login
          </button>
        </form>
      </div>
        </>
      }
    </>
  );
};

export default Login;

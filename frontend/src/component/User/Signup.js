import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, register } from "../../Redux/Actions/userActions";
import Loader from "../Layout/Loader/Loader";

const Signup = () => {
  const dispatch = useDispatch()
  const { loading, error, isAuthenticated} = useSelector((state) => state.user);
  // const userdata = useSelector((state) => state.user).user
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  useEffect(() => {
    if (error && error !== 'Please Login to access this resource') {
      toast.error(error || "Error");
      dispatch(clearErrors());
    }
    if(isAuthenticated){
      navigate('/account')
    }
  }, [dispatch, error]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, password } = user;
    dispatch(register(name, email, password));
    navigate('/account')
  };
  return (
    <>
      {
        loading ? <Loader/>:
        <div className="mx-auto w-25 shadow p-3 my-5" style={{fontFamily:"georgia", fontSize:"18px"}}>
        <form action="" onSubmit={submitHandler}>
          <label htmlFor="name"
            style={{margin:"5px 0 1px 5px"}}
          >Name</label>
          <input
            type="text"
            name=""
            className=" form-control"
            value={user.name}
            onChange={({ target }) => setUser({ ...user, name: target.value })}
            id="name"
            placeholder="Enter Name"
            required
            style={{padding:"10px 15px", fontSize:"18px", letterSpacing:"1px"}}
          />
          <label htmlFor="email"  style={{margin:"15px 0 1px 5px"}}>Email</label>
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
            style={{padding:"10px 15px", fontSize:"20px", letterSpacing:"2px"}}
          >
            Signup
          </button>
        </form>
      </div>
      }
    </>
  );
};

export default Signup;

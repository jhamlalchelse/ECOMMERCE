import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors } from "../../../Redux/Actions/productActions";
import Loader from "../Loader/Loader";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "../../../Redux/Actions/userActions";
import "./Options.css"
import {RxAvatar} from 'react-icons/rx'

const Options = ({ user }) => {
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error || "Error");
      dispatch(clearErrors());
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch, error, isAuthenticated]);

  const logoutHandler = ()=>{
    dispatch(logout())
    toast.error("Logout Successfully by user");
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Dropdown>
            <Dropdown.Toggle
              className="d-flex align-items-center justify-content-center border-0 popover-arrow dropdown-toggle"
              id="dropdown-basic"
              style={{
                borderRadius: "50%",
                backgroundColor: "transparent"
              }}
            ><RxAvatar  style={{
                height: "30px",
                width: "30px",
              }}/>
              </Dropdown.Toggle>
            <Dropdown.Menu className="m-0 p-0">
              { user.role === "admin" &&  
              <Dropdown.Item className="dropitem" > 
              <Link className="dropdownitem"  to={"/dashboard"}>Dashboard</Link>
              </Dropdown.Item> 
              }
                <Dropdown.Item className="dropitem" >
                <Link  className="dropdownitem" to={"/account"} >Account</Link>
                </Dropdown.Item>

                <Dropdown.Item className="dropitem" >
                <Link  className="dropdownitem" to={"/cart"} >Cart</Link>
                </Dropdown.Item>
                <Dropdown.Item className="dropitem" >
                <Link  className="dropdownitem" to={"/orders"} >Orders</Link>
                </Dropdown.Item>
                <Dropdown.Item className="dropitem" >
                <button  className="dropdownitem border-0 bg-transparent m-0 p-0" 
                  onClick={logoutHandler}>Logout</button>
                </Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
        </>
      )}
    </>
  );
};

export default Options;

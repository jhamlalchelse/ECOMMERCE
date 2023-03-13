import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors } from "../../../Redux/Actions/productActions";
import Loader from "../Loader/Loader";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "../../../Redux/Actions/userActions";

const UserOptions = ({ user }) => {
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
              variant="secondary"
              className="d-flex align-items-center justify-content-center border-0 me-5 mt-5 float-end"
              id="dropdown-basic"
              style={{
                height: "30px",
                width: "30px",
                // backgroundColor: "lightcoral",
                borderRadius: "50%",
              }}
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              { user.role === "admin" &&  <Dropdown.Item > <Link className="text-decoration-none text-secondary"  to={"/dashboard"}>Dashboard</Link>
              </Dropdown.Item> }
                <Dropdown.Item >
                <Link  className="text-decoration-none text-secondary" to={"/account"} >Account</Link>
                </Dropdown.Item>
                <Dropdown.Item >
                <Link  className="text-decoration-none text-secondary" to={"/cart"} >Cart</Link>
                </Dropdown.Item>
                <Dropdown.Item >
                <Link  className="text-decoration-none text-secondary" to={"/orders"} >Orders</Link>
                </Dropdown.Item>
                <Dropdown.Item >
                <button  className="text-decoration-none text-secondary border-0 bg-transparent m-0 p-0" 
                  onClick={logoutHandler}>Logout</button>
                </Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
        </>
      )}
    </>
  );
};

export default UserOptions;

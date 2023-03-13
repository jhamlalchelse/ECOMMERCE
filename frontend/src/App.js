import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cart from "./component/Cart/Cart.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Shipping from "./component/Cart/Shipping.js";
import Home from "./component/Home/Home.js";
import Footer from "./component/Layout/Footer/Footer.js";
import Header from "./component/Layout/Header/Header.js";
import UserOptions from "./component/Layout/Header/UserOptions.js";
import Orders from "./component/Order/Orders.js";
import Confirmation from "./component/Payment/Confirmation.js";
import Payment from "./component/Payment/Payment.js";
import ProdDetails from "./component/Product/ProdDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import Account from "./component/User/Account.js";
import Login from "./component/User/Login.js";
import Signup from "./component/User/Signup.js";
import { loadUser } from "./Redux/Actions/userActions.js";
import { store } from "./Redux/store";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const token = localStorage.getItem('x-access-token')

  useEffect(() => {
    if(token){
      store.dispatch(loadUser());
      console.log('load user: ',token);
    }
  }, [token]);

  window.addEventListener("contextmenu",(e)=>e.preventDefault())

  return (
    <>
      <BrowserRouter>
        <Header />
        {/* {isAuthenticated && <UserOptions user={user} />} */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProdDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/account" element={<ProtectedRoute />}>
            <Route exact path="/account" element={<Account />} />
          </Route>
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/shipping" element={<ProtectedRoute />}>
            <Route exact path="/shipping" element={<Shipping />} />
          </Route>
          <Route exact path="/order/confirm" element={<ProtectedRoute />}>
            <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          </Route>
          <Route exact path="/payment" element={<ProtectedRoute />}>
            <Route exact path="/payment" element={<Payment />} />
          </Route>
          <Route exact path="/payment/confirmation" element={<ProtectedRoute />}>
            <Route exact path="/payment/confirmation" element={<Confirmation />} />
          </Route>
          <Route exact path="/orders" element={<ProtectedRoute />}>
            <Route exact path="/orders" element={<Orders />} />
          </Route>
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
};

export default App;

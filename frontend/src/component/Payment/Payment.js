import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../Cart/CheckoutSteps";

const Payment = () => {
  const { user, error } = useSelector((state) => state.user);
  const [apiKey, setApiKey] = useState("");
  const [order, setOrder] = useState({});
  const payBtn = useRef(null);

  useEffect(() => {
    const getApiKey = async () => {
      const token = localStorage.getItem("x-access-token");
      const data = await (
        await fetch("http://localhost:8000/api/v1/apikey", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-access-token": token,
          },
        })
      ).json();
      setApiKey(data.api_key);
      console.log("api key is data: ", data);
    };
    getApiKey();
  }, []);

  useEffect(() => {
    const orderFunc = async () => {
      const amount = JSON.parse(
        sessionStorage.getItem("orderItems")
      ).totalPrice;
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/confirm/order",
        { amount: 1}
      );
      // const { data } = await axios.post(
      //   "http://localhost:8000/api/v1/confirm/order",
      //   { amount}
      // );
      setOrder(data.order);
    };
    orderFunc();
  }, []);

  const paymentHandler = async(e) => {
    const options = {
      key: apiKey, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Jhamlal",
      description: "Test Transaction",
      image: "https://picsum.photos/200/300",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:8000/api/v1/paymentverifications",
      prefill: {
        name: "Jhamlal Chelse",
        email: "jhamlalchelse@example.com",
        contact: "7049696137",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    e.preventDefault();
    // payBtn.current.disabled = true;

    const razor = new window.Razorpay(options);
    razor.open();
  };
  

  return (
    <>
      <CheckoutSteps activeStep={2} />
      <div
        className=" mx-auto my-4 p-3"
        style={{ boxShadow: "0px 0px 5px #add8e6", backgroundColor:"lightblue", borderRadius:"8px", width:"450px", fontSize:"18px", fontFamily:"georgia" }}
      >
    <div>
    <div className=" d-flex align-items-center col-12">
          <div className="col-2"></div>
          <div className="col-4">User:</div>
          <div className="col-6">{user.name}</div>
        </div>
        <div className=" d-flex align-items-center col-12 py-2">
          <div className="col-2"></div>
          <div className="col-4">Email ID:</div>
          <div className="col-6">{user.email}</div>
        </div>
        <div className=" d-flex align-items-center col-12 py-2">
          <div className="col-2"></div>
          <div className="col-4">Order ID:</div>
          <div className="col-6">{order.id}</div>
        </div>
        <div className=" d-flex align-items-center col-12 my-2">
          <div className="col-2"></div>
          <div className="col-4">Amount :</div>
          <div className="col-6" style={{fontFamily:"serif"}}>₹{order.amount}</div>
        </div>
    </div>
        <button
          className="border-0 text-white text-uppercase"
          onClick={paymentHandler}
          ref={payBtn}
          style={{background:"#db7093", padding:"10px 15px", fontSize:"20px", width:"300px", margin:"15px 60px 5px"}}
        >
          Pay
        </button>
      </div>
    </>
  );
};

export default Payment;

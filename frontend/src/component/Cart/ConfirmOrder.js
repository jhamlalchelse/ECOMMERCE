import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import axios from 'axios'

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = subTotal > 1000 ? 0 : 100;
  const tax = Number((subTotal * 0.18).toFixed(2));
  const totalPrice = Number((subTotal + shippingCharges + tax).toFixed(2));
  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

  const processToPayment = async () => {
    // const paymentInfo = {
    //   id:"sample payment id",
    //   status: "unpaid"
    // }
    // const createOrder = await axios.post("http://localhost:8000/api/v1/order/new",{
    //   shippingInfo,
    //   orderItems:cartItems,
    //   user: user._id,
    //   paymentInfo,
    //   itemsPrice:subTotal,
    //   taxPrice:tax,
    //   shippingPrice:shippingCharges,
    //   totalPrice:totalPrice,
    // })
    // console.log('createOrder in corder page',createOrder.data);

    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderItems", JSON.stringify(data));
    navigate("/payment");
  };
  return (
    <>
      <CheckoutSteps activeStep={1} />

      <div className=" d-flex col-12 p-4 px-5 justify-content-between">
        <div
          className="col-7 px-lg-5"
          style={{
            boxShadow: "0 0 5px #555",
            fontSize: "18px",
            fontFamily: "georgia",
          }}
        >
          <div className="mt-4">
            <h4
              className=" text-center text-capitalize"
              style={{ letterSpacing: "1px" }}
            >
              Shipping Info
            </h4>
            <hr className="m-0 pb-3" />
            <div
              className=" col-10 mx-auto py-3 px-4 bg-secondary text-white text-opacity-75 "
              style={{ boxShadow: "0 0 5px #92a8d1", borderRadius:"10px", width:"fit-content" }}
            >
              <div className="d-flex col-3">
                <label htmlFor="name" className=" col-12">
                  Name:
                </label>
                <p className="">{user.name}</p>
              </div>
              <div className="d-flex col-3">
                <label htmlFor="name" className=" col-12">
                  Email:
                </label>
                <p>{user.email}</p>
              </div>
              <div className="d-flex col-12 ">
                <label htmlFor="name" className="col-3">
                  Address:
                </label>
                <p style={{ fontFamily: "serif" }} className="col-12">
                  {address}
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <h4
              className="text-center text-capitalize mt-4"
              style={{ fontFamily: "serif", letterSpacing: "1px", fontSize:"25px"  }}
            >
              Cart Item
            </h4>
            <hr className="m-0 p-0" />
            <div className="d-flex align-content-center text-center col-12 mx-3 mt-3" style={{fontWeight: 600}}>
              <div className="col-4 pe-5">Name</div>
              <div className="col-2">Quantity</div>
              <div className="col-2">Price</div>
              <div className="col-4">Total Price</div>
            </div>
            {cartItems?.map((item, index) => {
              return (
                <div
                  className="d-flex align-items-center text-center col-12  text-white p-3 my-3 mx-3"
                  style={{borderRadius:"8px", backgroundColor:"#fa8072"}}
                  key={index}
                >
                  <div className="col-4 d-flex align-items-center">
                    <img
                      src="https://picsum.photos/40"
                      alt="img"
                    />
                    <p className="m-0 p-0 ms-3">{item.name || "Name"}</p>
                  </div>
                
                  <div className="col-2">
                    <p className="my-0 py-0" style={{ fontFamily: "serif" }}>
                      {item.quantity}
                    </p>
                  </div>
                  <div className="col-2">
                    <p className="my-0 py-0" style={{ fontFamily: "serif" }}>
                      {item.price}
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="my-0 py-0" style={{ fontFamily: "serif" }}>
                      {item.quantity} X ₹ {item.price} ={" "}
                      ₹ {item.quantity * item.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className=" col-4 px-5 text-center"
          style={{
            boxShadow: "0 0 5px #555",
            fontSize: "18px",
            fontFamily: "georgia",
            height: "fit-content"
          }}
        >
          <h4 className="mt-4">Order Summary</h4>
          <hr className="m-0 p-0 pb-4" />
          <div className=" d-flex align-item-center justify-content-between px-4">
            <p>Total Item Price :</p>
            <p style={{ fontFamily: "serif" }}>${subTotal}</p>
          </div>
          <div className=" d-flex align-item-center justify-content-between px-4">
            <p>Shipping Charge :</p>
            <p style={{ fontFamily: "serif" }}>${shippingCharges}</p>
          </div>
          <div className=" d-flex align-item-center justify-content-between px-4">
            <p>GST :</p>
            <p style={{ fontFamily: "serif" }}>${tax}</p>
          </div>
          <hr className="m-0 p-0 pb-3" />
          <div className=" d-flex align-item-center justify-content-between px-4">
            <h5 className=" text-danger">Total Price:</h5>
            <h5 className=" text-primary" style={{ fontFamily: "serif" }}>
              ${totalPrice}
            </h5>
          </div>
          <button
            onClick={processToPayment}
            className=" border-0 col-11 my-5 text-white"
            style={{
              backgroundColor: "#5f9ea0",
              fontSize: "19px",
              borderRadius: "5px",
              padding: "12px 15px",
            }}
          >
            Proccess To Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;

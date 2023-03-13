import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Confirmation = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [orderId, setOrderId] = useState("")
  const [searchParams, setSearchParams] = useSearchParams();
  const payment_Id = searchParams.get("ref");

// useEffect(() => {
//         const orderItems = JSON.parse(sessionStorage.getItem("orderItems"));
//         console.log('orderItems',orderItems);
//         const createOrderFunc = async () => {
//           const paymentInfo = {
//             id: payment_Id,
//             status: "Success",
//           };
//           const createOrder = await axios.post(
//             "http://localhost:8000/api/v1/order/new",
//             {
//               shippingInfo,
//               orderItems: cartItems,
//               user: user._id,
//               paymentInfo,
//               itemsPrice: orderItems.subTotal,
//               taxPrice: orderItems.tax,
//               shippingPrice: orderItems.shippingCharges,
//               totalPrice: orderItems.totalPrice,
//             }
//           );
//           setOrderId(createOrder.data.order._id)
//           console.log("order", createOrder.data);
//         };
//         createOrderFunc();
// }, [])

  return (
    <>
      <div
        className=" mx-auto my-4 p-3"
        style={{ boxShadow: "0px 0px 5px #555", width: "fit-content" }}
      >
        <h4 className=" text-center" style={{ fontFamily: "georgia" }}>
          Payment Confirmation
        </h4>
        <hr className="m-0 p-0 pb-4" />
        <div className=" d-lg-flex">
          <p>Payment Status:</p>
          <h5 className=" ms-3 text-success">
            {payment_Id ? "Success" : "Failure"}
          </h5>
        </div>
        {payment_Id && (
          <div className=" d-lg-flex">
            <p>Payment ID:</p>
            <p className="text-primary ms-5">{payment_Id}</p>
          </div>
        )}
        <div className=" d-lg-flex">
            <p>Order ID:</p>
            {/* <p className="text-primary" style={{marginLeft:"4.4rem"}}>{orderId}</p> */}
          </div>
      </div>
    </>
  );
};

export default Confirmation;

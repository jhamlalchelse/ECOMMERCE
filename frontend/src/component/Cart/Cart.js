import React from "react";
import CartItemCart from "./CartItemCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      <div
        className="mx-auto"
        style={{
          width: "80%",
          fontFamily: "georgia",
          position: "relative",
        }}
      >
        <div
          className="my-4"
          style={{
            boxShadow: "0 0 5px #b0c4de",
          }}
        >
          <div
            className=" d-flex align-items-center col-12 text-capitalize py-3"
            style={{
              fontWeight: "600",
              fontSize: "18px",
              color: "#7b68ee",
              backgroundColor: "#ffc0cb",
            }}
          >
            <div className="col-4 ps-5">Product</div>
            <div className="col-2  text-center">Quantity</div>
            <div className="col-2  text-center">Price</div>
            <div className="col-2  text-center">Total Price</div>
            <div className="col-2"></div>
          </div>
          <div>
            {cartItems?.map((item, index) => {
              return <CartItemCart item={item} key={index} />;
            })}
          </div>
          <hr className="col-8 float-end m-0 p-0" />
          <div className="d-flex col-12 py-3 align-items-center text-center">
            <div className="col-4"></div>
            <div
              className="col-2"
              style={{ color: "#008b8b", fontSize: "20px" }}
            >
              Gross Total
            </div>
            <div className="col-2"></div>
            <div
              className="text-center col-2"
              style={{
                fontFamily: "serif",
                fontSize: "20px",
                color: "hotpink",
              }}
            >
              ₹
              {cartItems?.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </div>
            <div className="col-2"></div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: "8px",
            bottom:"3px"
          }}
        >
          <button
            onClick={checkoutHandler}
            className="border-0"
            style={{
              backgroundColor: "#db7093",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "20px",
              padding: "12px 15px",
              width: "200px",
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;

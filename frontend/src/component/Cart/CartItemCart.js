import { useDispatch } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import {
  addItemToCart,
  removeItemToCart,
} from "../../Redux/Actions/cartActions";
import { Image } from "react-bootstrap";

const CartItemCart = ({ item }) => {
  const dispatch = useDispatch();

  const incQuantity = (id, quantity) => {
    const newQuantity = quantity < 10 ? quantity + 1 : quantity;
    // console.log('object',id,newQuantity);
    dispatch(addItemToCart(id, newQuantity));
  };
  const decQuantity = (id, quantity) => {
    const newQuantity = quantity > 1 ? quantity - 1 : quantity;
    dispatch(addItemToCart(id, newQuantity));
  };
  const removeCartHandler = (id) => {
    dispatch(removeItemToCart(id));
  };

  return (
    <>
      <div
        className="d-flex col-12 py-3 align-items-center"
        style={{ backgroundColor: "#b0e0e6", margin: "10px 0" }}
      >
        <div className="col-4 ps-3">
          <Image src="https://picsum.photos/40/40" alt="Image" />
          <Link
            to={`/product/${item.product}`}
            className=" ms-2 text-black text-capitalize text-decoration-none"
            style={{ fontFamily: "serif", fontSize: "18px" }}
          >
            {item.name}
          </Link>
        </div>
        <div className="col-2 text-center">
          <button
            className="px-3  text-white"
            style={{ border: "1px solid #ff69b4", backgroundColor: "#ff1493" }}
            onClick={() => decQuantity(item.product, item.quantity)}
          >
            -
          </button>
          <span
            className="mx-2"
            style={{ fontFamily: "serif", fontSize: "18px" }}
          >
            {item.quantity}
          </span>
          <button
            className=" px-3  text-white"
            style={{ border: "1px solid #ff69b4", backgroundColor: "#ff1493" }}
            onClick={() => incQuantity(item.product, item.quantity)}
          >
            +
          </button>
        </div>
        <div className="col-2 text-center" style={{ fontFamily: "serif", fontSize: "18px" }}>
        ₹{item.price}
        </div>

        <div
          className="col-2 text-center"
          style={{ fontFamily: "serif", fontSize: "18px" }}
        >
          ₹{item.price * item.quantity}
        </div>

        <div className=" text-center text-capitalize">
          <button
            className="outline-none bg-transparent border-0 text-danger"
            style={{ fontFamily: "serif", fontSize: "18px" }}
            onClick={() => removeCartHandler(item.product)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItemCart;

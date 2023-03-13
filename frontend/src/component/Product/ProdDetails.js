import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addItemToCart } from "../../Redux/Actions/cartActions";
import { clearErrors, productDetails } from "../../Redux/Actions/productActions";
import Loader from "../Layout/Loader/Loader";

const ProdDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error || "Error");
      dispatch(clearErrors())
    }
    dispatch(productDetails(param.id));
  }, [dispatch, error, param.id]);


  const [quantity, setQuantity] = useState(1)
  const addToCartHandler = ()=>{
    dispatch(addItemToCart(param.id, quantity))
    toast.info("Item Added To Cart")
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" d-flex justify-content-around w-75 mx-auto mt-3" style={{ fontFamily: "serif" }}>
            <div>
              <img
                src="/Images/mac.jpg"
                alt={product.name}
                style={{ width: "350px", height: "400px" }}
              />
            </div>
            <div className="ms-3">
              <h4>{product.name}</h4>
              <h6>Product id #{product._id}</h6>
              <h6>
                Rating: <span className=" text-danger"> {product.ratings}</span>
              </h6>
              <h6>
                {" "}
                <span className=" font-monospace">
                  {product.numOfReviews}
                </span>{" "}
                Reviews
              </h6>
              <h5 style={{ fontFamily: "serif" }}>${product.price}</h5>
              <div className=" d-flex bg-secondary justify-content-between w-50 mb-3">
                <button className=" border-0 bg-danger text-white w-25" onClick={()=>setQuantity(quantity>1 ? quantity-1 : quantity)}>
                  -
                </button>
                <p className="my-2 p-0">{quantity}</p>
                <button className=" border-0 bg-danger text-white w-25 " onClick={()=>setQuantity(quantity <10 ? quantity+1: quantity)}>
                  +
                </button>
              </div>
              <button onClick={addToCartHandler}> Add to cart</button>
              <p className="m-0 p-0 mt-2">
                status : {product.Stock > 0 ? "InStock" : "outStock"}
              </p>
              <p className="m-0 p-0">Description :</p>
              <p className="m-0 p-0">{product.description}</p>
              <button className="m-0 mt-3 px-3 py-1">Submit preview</button>
            </div>
          </div>
          <h5 className="text-center my-4 mx-auto">Reviews</h5>
          <hr className="w-50 mx-auto" />
          <div
            className="reviews d-flex flex-wrap w-75 mx-auto "
            style={{ width: "fit-content" }}
          >
            {product.reviews && product.reviews[0] ? (
              product.reviews.map((item, index) => {
                return (
                  <div
                    className="me-4 mt-4 px-3 py-3"
                    style={{ boxShadow: "0px 0px 5px #001001" }}
                    key={index}
                  >
                    <div className="text-center">
                      <p>Rating: {item.rating}</p>
                      <p>Name: {item.name}</p>
                      <p>User: #{item.user}</p>
                    </div>
                    <p>Comment: {item.comment}</p>
                  </div>
                );
              })
            ) : (
              <h5 className="mx-auto text-secondary"> No Reviews yet</h5>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProdDetails;

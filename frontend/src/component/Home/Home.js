import React, { useEffect } from "react";
import "./Home.css";
import { clearErrors, getProduct } from "../../Redux/Actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader.js";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";


const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, totalProducts, error } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if(error){
      toast.error(error || "Error");
    }
  dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mx-auto my-4" style={{width:"90%"}}>
            <h4 className="text-center text-uppercase" style={{fontFamily:"georgia", fontSize:"22px", color:"#088008"}}>Featured Products</h4>
            <hr className="m-0 pb-4 w-25 mx-auto" />
            <div className="d-flex col-11 mx-auto flex-wrap">
              {products?.map((product, index) => {
                return <ProductCard product={product} key={index} />;
              })}
            </div>
          </div>
          
        </>
      )}
    </>
  );
};

export default Home;

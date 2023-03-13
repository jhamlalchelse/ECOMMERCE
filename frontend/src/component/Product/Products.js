import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getProduct } from "../../Redux/Actions/productActions";
import ProductCard from "../Home/ProductCard";
import Loader from "../Layout/Loader/Loader";
import {Slider} from '@mui/material'

const Products = () => {
  const dispatch = useDispatch();
  const { loading, products, totalProducts, error, resultPerPage } =
  useSelector((state) => state.products);
  const [price, setPrice] = useState([0,200000])
  const categories =["Laptop","Mobile","Shoes","Shirt","Jeans","Camera"]
  const [category, setCategory] = useState()
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    if (error) {
      toast.error(error || "Error");
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword,price,category));
  }, [dispatch, error,  keyword, price, category]);

  const priceHandler = (e,newPrice)=>{
        setPrice(newPrice)
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="" style={{fontFamily:"georgia", fontSize:"18px"}}>
            <h4 className="text-center mt-3 text-uppercase" style={{letterSpacing:"2px", color:"lightcoral"}}>Products</h4>
            <hr className=" w-50 mx-auto m-0 pb-3" />
            <div className="d-flex w-100 col-12">

              <div className="col-2 mx-3 p-3" style={{boxShadow:"0px 0px 7px #add8e6", backgroundColor:"#b0e0e6", height:"fit-content"}}>
                <h4 className="m-0 p-0" style={{fontSize:"22px", color:"#c71585"}}>Price</h4>
                <Slider
                  size="small"
                  value={price}
                  onChange={priceHandler}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  min={0}
                  max={200000}
                />
                <h4 className="m-0 p-0" style={{fontSize:"22px", color:"#800080"}}>Category</h4>
                <ul 
                style={{
                  listStyle:"none",
                  // backgroundColor:"lightcoral",
                  padding:"1px 0"
                }}>
                    {
                        categories && categories?.map((cat,ind)=>{
                            return(
                                <li  
                                className={`${cat ===category ? "bg-info" : "bg-secondary" } p-2`}
                                style={{
                                  // backgroundColor:"deepskyblue",
                                  margin:"5px 0",
                                  cursor:"pointer",
                                  color:"white",
                                }}
                                key={ind} onClick={()=>setCategory(cat)}>{cat}</li>
                            )
                        })
                    }
                </ul>
              </div>


              <div className="d-flex col-10  flex-wrap">
                {products &&
                  products?.map((product, index) => {
                    return <ProductCard product={product} key={index} />;
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;

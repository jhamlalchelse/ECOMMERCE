import React from "react";
import {  Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ProductCard = ({product}) => {
  return <>
        <Link to={`/product/${product._id}`} className="col-lg-2 col-md-3 mt-2 mb-3 mx-3" style={{textDecoration:"none", color:"#333", boxShadow:"0 0 5px #708090", borderRadius:"5px"}}>
        <img src='Images/mac.jpg' alt={product.name} className="col-12" style={{height:"200px", borderTopLeftRadius:"5px",borderTopRightRadius:"5px"}}/>
         <div className="mx-2">
         <div className="my-1 text-capitalize text-center" style={{color:"#20b2aa",fontFamily:"serif", fontSize:"23px"}} >{product.name}</div>
        <div style={{fontFamily:"serif"}}> <span style={{color:"#4682b4", fontSize:"20px"}}>Price :</span> <span className="ms-1" style={{fontSize:"19px"}}>₹{product.price}</span></div>
        <StarRatings
          rating={product.ratings}
          starRatedColor="#f08080"
          starDimension="23px"
          starSpacing="0px"
          numberOfStars={5}
          name='rating'
        />
        <div className="mb-2 mt-1" style={{fontFamily:"serif"}} > <span style={{color:"#db7093", fontSize:"20px"}}>Reviews :</span> <span className="ms-1">({product.numOfReviews} Review)</span></div>
         </div>
    </Link>
  </>
};

export default ProductCard;

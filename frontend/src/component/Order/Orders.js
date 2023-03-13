import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const orderFunc = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/orders/me"
      );
      setOrders(data.orders);
      console.log(data.orders);
    };
    orderFunc();
  }, []);

  return (
    <>
      <div
        className="mx-auto my-4"
        style={{ fontFamily: "georgia", fontSize: "18px", width: "40%" }}
      >
        <h3 className=" text-center text-uppercase">Orders</h3>
        <hr className="m-0 pb-4" />
        <div>
          {orders?.map((ord, ind) => {
            return (
              <div key={ind}>
                {ord.orderItems.map((item, index) => {
                  return (
                    <Link to={`/order/${ord._id}`} key={index} className=" text-decoration-none  " style={{color:"#333"}}>
                    <div
                      className="d-flex col-12 py-3 align-items-center"
                      style={{ backgroundColor: "#b0e0e6", margin: "10px 0" }}
                      
                    >
                    
                        <div className="col-4 ps-3">
                          <Image
                            src="https://picsum.photos/40/40"
                            alt="Image"
                          />

                          <span
                            className="ms-2 text-black text-capitalize "
                            style={{ fontFamily: "serif", fontSize: "18px" }}
                          >
                            {item.name}
                          </span>
                        </div>
                        <div
                          className="col-4"
                          style={{ fontFamily: "serif", fontSize: "18px" }}
                        >
                          ₹ {item.price}
                        </div>
                        <div
                          className={`${
                            ord.orderStatus === "Processing"
                              ? "text-primary"
                              : "text-success"
                          } col-4`}
                        >
                          {ord.orderStatus}
                        </div>
                    </div>
                      </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Orders;

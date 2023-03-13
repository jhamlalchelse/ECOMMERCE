import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import CheckoutSteps from "./CheckoutSteps";
import {toast} from 'react-toastify'
import { saveShippingInfo } from "../../Redux/Actions/cartActions";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

const submitHandler = e=>{
    e.preventDefault()
    if(phoneNo.length<10 || phoneNo.length>10){
       toast.ingo("Phone number should be 10 digit")
       return
    }
    // console.log('object',address,city,state,country,pinCode,phoneNo);
    dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}))
    navigate('/order/confirm')
}
  return (
    <>
    <CheckoutSteps activeStep={0}/>
      <div className="mx-auto w-25 my-3 mb-5 p-3 px-4" style={{boxShadow:"0 0 5px #778899", backgroundColor:"lightpink"}}>
        <form onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Address"
              value={address}
              onChange={({ target }) => setAddress(target.value)}
              required
              className=" form-control py-2 my-3 text-capitalize"
              style={{fontSize:"18px", color:"#555"}}
            />
          </div>
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter City"
              value={city}
              onChange={({ target }) => setCity(target.value)}
              required
              className=" form-control py-2 my-3 text-capitalize"
              style={{fontSize:"18px", color:"#555"}}
            />
          </div>
          <div>
            <select
              name=""
              id=""
              value={country}
              onChange={({ target }) => setCountry(target.value)}
              required
              className=" form-control py-2 my-3 text-capitalize"
              style={{fontSize:"18px", color:"#555"}}
            >
              <option value="">Country</option>
              {Country.getAllCountries()?.map((item, index) => {
                return (
                  <option value={item.isoCode} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          {country && (
            <div>
              <select
                name=""
                id=""
                value={state}
                onChange={({ target }) => setState(target.value)}
                required
                className=" form-control py-2 my-3 text-capitalize"
              style={{fontSize:"18px", color:"#555"}}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country)?.map((item, index) => {
                    return (
                      <option value={item.isoCode} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}

          <div>
            <input
              type="number"
              name=""
              id=""
              placeholder="Enter Pincode"
              value={pinCode}
              onChange={({ target }) => setPinCode(target.value)}
              required
              className=" form-control py-2 my-3 text-capitalize"
              style={{fontSize:"18px", color:"#555"}}
            />
          </div>
          <div>
            <input
              type="number"
              name=""
              id=""
              placeholder="Enter Phone Number"
              value={phoneNo}
              onChange={({ target }) => setPhoneNo(target.value)}
              required
              className=" form-control py-2 my-3 text-capitalize"
              style={{fontSize:"18px", color:"#555"}}
            />
          </div>

          <button type="submit" disabled = {state ? false : true} className="form-control mt-4 text-capitalize"
              style={{fontSize:"20px", color:"#fff", backgroundColor:"#008080", padding:"10px 15px"}}>Continue</button>
        </form>
      </div>
    </>
  );
};

export default Shipping;

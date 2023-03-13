import React from "react";
import "./Footer.css";
import {RiFacebookFill, RiGithubFill, RiGoogleFill, RiInstagramFill, RiLinkedinFill, RiTwitterFill  } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className=" text-center text-white" style={{backgroundColor:"#b0c4de", boxShadow:"0 2px 5px #add8e6"}}>
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <Link  href={'#'}>
              <RiFacebookFill
                style={{
                  border: "2px solid #4682b4",
                  color: "#4682b4",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  backgroundColor: "transparent",
                  margin:"0 5px",
                  padding:"5px"
                }}
              />
            </Link>

            <Link  href={'#'}>
              <RiTwitterFill
                style={{
                  border: "2px solid teal",
                  color: "teal",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  backgroundColor: "transparent",
                  margin:"0 5px",
                  padding:"5px"
                }}
              />
            </Link>
            <Link  href={'#'}>
              <RiGoogleFill
                style={{
                  border: "2px solid slateblue",
                  color: "slateblue",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  backgroundColor: "transparent",
                  margin:"0 5px",
                  padding:"5px"
                }}
              />
            </Link>
            <Link  href={'#'}>
              <RiInstagramFill
                style={{
                  border: "2px solid salmon",
                  color: "salmon",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  backgroundColor: "transparent",
                  margin:"0 5px",
                  padding:"5px"
                }}
              />
            </Link>

            <Link  href={'#'}>
              <RiLinkedinFill
                style={{
                  border: "2px solid palevioletred",
                  color: "palevioletred",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  backgroundColor: "transparent",
                  margin:"0 5px",
                  padding:"5px"
                }}
              />
            </Link>
            <Link  href={'#'}>
              <RiGithubFill
                style={{
                  border: "2px solid mediumvioletred",
                  color: "mediumvioletred",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  backgroundColor: "transparent",
                  margin:"0 5px",
                  padding:"5px"
                }}
              />
            </Link>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{backgroundColor:"#008b8b"}}
        >
          © 2020 Copyright:
          <a className="text-white" href="https://ecommerceapp.com/">
            ecommerceapp.com
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;

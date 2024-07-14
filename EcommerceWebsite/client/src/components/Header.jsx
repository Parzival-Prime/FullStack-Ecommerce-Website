import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import FlexCenter from "./FlexCenter";

function Header() {
  const navRef = useRef();

  const toggleNav = () => {
    navRef.current.classList.toggle("column-nav-list-show");
  };

  return (
    <>
      <nav className="navbar">
        <div className="toolbar">
          <FlexCenter sx={{fontSize: '1.5rem', fontFamily: "Playwrite BE VLG", }}>Ecommerce</FlexCenter>

          {/* row list */}
          {/* <ul className="row-nav-list">
            <li className="item item1">
              <Link to='/'>Home</Link>
            </li>
            <li className="item item2">
              <Link to='/'>Search</Link>
            </li>
            <li className="item item3">
              <Link to='/'>Toggler</Link>
            </li>
            <li className="item item4">
              <Link to='/'>User</Link>
            </li>
            <li className="item item5">
              <Link to='/'>Cart</Link>
            </li>
          </ul> */}

          {/* column-list */}
          <IconButton>
            <MenuIcon sx={{
              color: "white",
              fontSize: '2rem'
            }}
            onClick={toggleNav}
            />
          </IconButton>
          <div className="column-nav-list" ref={navRef}>
            <ul>
              <Link to="/" onClick={toggleNav}>
                <li className="item item1">Home</li>
              </Link>
              <Link to="/all-products" onClick={toggleNav}>
                <li className="item item3">All Products</li>
              </Link>
              <Link to="/cart" onClick={toggleNav}>
                <li className="item item4">Cart</li>
              </Link>
              <Link to="/your-account" onClick={toggleNav}>
                <li className="item item5">Your Account</li>
              </Link>
              
              <Link to="/logout" onClick={toggleNav}>
                <li className="item item2">Logout</li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

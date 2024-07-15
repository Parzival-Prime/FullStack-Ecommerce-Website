import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/header.css";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Box } from "@mui/material";
import FlexCenter from "./FlexCenter";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
  const navRef = useRef();
  const navigate = useNavigate();

  const toggleNav = () => {
    navRef.current.classList.toggle("column-nav-list-show");
  };

  return (
    <>
      <nav className="navbar">
        <div className="toolbar">
          <FlexCenter
            sx={{ fontSize: ".9rem", fontFamily: "Playwrite BE VLG" }}
          >
            <Box variant="span" sx={{display: 'flex', alignSelf: 'start'}}>Wispering</Box>
            <Box variant="span" sx={{display: 'flex', alignSelf: 'end'}}>Willow</Box>
          </FlexCenter>

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
          <FlexCenter sx={{ gap: "1.5rem" }}>
            <IconButton onClick={() => navigate("/search")}>
              <SearchIcon sx={{ color: "white", fontSize: "2rem" }} />
            </IconButton>
            <IconButton onClick={toggleNav}>
              <MenuIcon
                sx={{
                  color: "white",
                  fontSize: "2rem",
                }}
              />
            </IconButton>
          </FlexCenter>
          <div className="column-nav-list" ref={navRef}>
            <ul>
              <NavLink to="/" onClick={toggleNav}>
                <li className="item item1">Home</li>
              </NavLink>
              <NavLink to="/all-products" onClick={toggleNav}>
                <li className="item item3">All Products</li>
              </NavLink>
              <NavLink to="/cart" onClick={toggleNav}>
                <li className="item item4">Cart</li>
              </NavLink>
              <NavLink to="/your-account" onClick={toggleNav}>
                <li className="item item5">Your Account</li>
              </NavLink>
              {false ? (
                <NavLink to="/logout" onClick={toggleNav}>
                  <li className="item item2">Logout</li>
                </NavLink>
              ) : (
                <NavLink to="/login" onClick={toggleNav}>
                  <li className="item item2">LogIn</li>
                </NavLink>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

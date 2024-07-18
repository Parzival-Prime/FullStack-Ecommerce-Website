import React, { useRef, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/header.css";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Box } from "@mui/material";
import FlexCenter from "./FlexCenter";
import SearchIcon from "@mui/icons-material/Search";
import Logout from "../pages/auth/Logout";
import Backdrop from '@mui/material/Backdrop';
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedInTrue } from "../features/counter/counterSlice";

function Header() {
  const [open, setOpen] = useState(false)
  let isLoggedIn = useSelector((state) => state.counter.isLoggedIn)
  const dispatch = useDispatch()
  const navRef = useRef();
  const navigate = useNavigate();

  const handleBackdropToggle = () => {
    setOpen(prev => !prev)
  }

  const toggleNav = () => {
    navRef.current.classList.toggle("column-nav-list-show");
  };

  const toggleNavMenu = ()=>{
    handleBackdropToggle()
    toggleNav()
  }


  {
    // const handleBackdropToggle = (prop) => {
    //   setOpen(prev => !prev)
    //   console.log(`BackDrop is ${!open ? 'Open' : 'Closed'}`)
    // }


    // const handleClose = () => {
    //   setOpen(false)
    // }

    // const handleOpen = () => {
    //   setOpen(true)
    // }

    // const handleBackdropToggle = (prop) => {
    //   setOpen(prev => !prev)
    //   console.log(`BackDrop is ${!open ? 'Open' : 'Closed'}`)
    // }

    // const addtoggleNav = () => {
    //   navRef.current.classList.add("column-nav-list-show");
    //   console.log(`toggleNav is ${!open ? 'Open' : 'Closed'}`)
    //   // handleBackdropToggle()
    // };

    // const removetoggleNav = () => {
    //   navRef.current.classList.add("column-nav-list-show");
    //   console.log(`toggleNav is ${!open ? 'Open' : 'Closed'}`)
    //   // handleBackdropToggle()
    // };
  }

  function checkIsLoggedInState() {
    const user = localStorage.getItem('user')
    if (user) {
      dispatch(setIsLoggedInTrue())
    }
  }

  useEffect(() => {
    checkIsLoggedInState()
  }, [])

  return (
    <>

      <nav className="navbar">
        <div className="toolbar">
          <FlexCenter
            sx={{ fontSize: ".9rem", fontFamily: "Playwrite BE VLG" }}
          >
            <Box variant="span" sx={{ display: 'flex', alignSelf: 'start' }}>Wispering</Box>
            <Box variant="span" sx={{ display: 'flex', alignSelf: 'end' }}>Willow</Box>
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
            <IconButton onClick={toggleNavMenu}>
              <MenuIcon
                sx={{
                  color: "white",
                  fontSize: "2rem",
                }}
              />
            </IconButton>
          </FlexCenter>
        </div>
      </nav>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={toggleNavMenu}
      >
        <div className="column-nav-list" ref={navRef}>
          <ul>
            <NavLink to="/" onClick={toggleNavMenu}>
              <li className="item item1">Home</li>
            </NavLink>
            <NavLink to="/products" onClick={toggleNavMenu}>
              <li className="item item3">All Products</li>
            </NavLink>
            <NavLink to="/cart" onClick={toggleNavMenu}>
              <li className="item item4">Cart</li>
            </NavLink>
            <NavLink to="/your-account" onClick={toggleNavMenu}>
              <li className="item item5">Your Account</li>
            </NavLink>
            {isLoggedIn ? (
              <span onClick={toggleNavMenu}>
                <li className="item item2">
                  <Logout />
                </li>
              </span>
            ) : (
              <NavLink to="/login" onClick={toggleNavMenu}>
                <li className="item item2">LogIn</li>
              </NavLink>
            )}
          </ul>
        </div>

      </Backdrop >
    </>
  );
}

export default Header;

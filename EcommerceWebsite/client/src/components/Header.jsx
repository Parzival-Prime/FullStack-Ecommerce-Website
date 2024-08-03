import React, { useRef, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/header.css";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Box } from "@mui/material";
import FlexCenter from "./FlexCenter";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from '@mui/material/Avatar';
import Logout from "../pages/auth/Logout";
import Backdrop from '@mui/material/Backdrop';
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedInTrue } from "../features/counter/counterSlice";
import { RiArrowLeftSFill, RiHome2Line, RiShoppingBagLine, RiUserLine, RiLogoutBoxLine, RiTeamLine, RiShoppingCart2Line, RiCustomerServiceLine, RiPriceTag3Line, RiArchiveLine, RiLoginBoxLine } from '@remixicon/react'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';


function Header() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)
  const isLoggedIn = useSelector((state) => state.counter.isLoggedIn)
  const dispatch = useDispatch()
  const navRef = useRef();
  const navigate = useNavigate();



  const [anchorEl, setAnchorEl] = useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation()
    setAnchorEl(null);
  };



  const handleBackdropToggle = () => {
    setOpen(prev => !prev)
  }

  const toggleNav = () => {
    navRef.current.classList.toggle("column-nav-list-show");
  };

  const toggleNavMenu = () => {
    handleBackdropToggle()
    toggleNav()
  }

  const handleNavLinkClick = (e) => {
    e.stopPropagation()
    toggleNavMenu()
  }

  function checkIsLoggedInState() {
    const luser = localStorage.getItem('user')
    setUser(JSON.parse(luser).value)
    if (luser) {
      dispatch(setIsLoggedInTrue())
    }
  }

  const clearExpiredItems = () => {
    const keys = Object.keys(localStorage)

    keys.forEach(key => {
      const itemStr = localStorage.getItem(key)
      if (!itemStr) return

      const item = JSON.parse(itemStr)
      const now = new Date()

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
      }
    });
  }


  useEffect(() => {
    clearExpiredItems()
    checkIsLoggedInState()
  }, [dispatch])

  return (
    <>

      <nav className="navbar">
        <div className="toolbar">
          <FlexCenter
            sx={{ fontSize: ".9rem", fontFamily: "Playwrite BE VLG" }}
          >
            <Box variant="span" sx={{ display: 'flex', alignSelf: 'start' }}>Whispering</Box>
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
          <ul className="navigation-list">
            <NavLink to="/" className="nav-item" onClick={handleNavLinkClick}>
              <li className="nav-li" >
                <RiHome2Line/>Home
              </li>
            </NavLink>
            <NavLink onClick={handleNavLinkClick} to="/products" className="nav-item" >
              <li className="nav-li">
                <RiShoppingBagLine/>Products
              </li>
            </NavLink>
            <NavLink to="/protected/cart" className="nav-item" onClick={handleNavLinkClick}>
              <li className="nav-li">
                <RiShoppingCart2Line/>Cart
              </li>
            </NavLink>
            <NavLink to="/about" className="nav-item" onClick={handleNavLinkClick}>
              <li className="nav-li">
                <RiTeamLine/>About Us
              </li>
            </NavLink>
            <NavLink to="/contact" className="nav-item" onClick={handleNavLinkClick}>
              <li className="nav-li">
                <RiCustomerServiceLine/>ContactUs
              </li>
            </NavLink>


            
            {isLoggedIn ? (
              <div>
              <Button
                id="fade-button"
                aria-controls={open2 ? 'fade-menu' : undefined}
                // aria-haspopup="true"
                aria-expanded={open2 ? 'true' : undefined}
                onClick={handleClick}
              >

                <li className="nav-li nav-item">
                  <div className="nav-your-account">
                    <RiArrowLeftSFill /><Avatar alt='Avatar' src={user?.profileImage} />
                    <p>{user?.name}</p>
                  </div>
                </li>

              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                transformOrigin={{vertical: 40, horizontal: 170}}
                anchorEl={anchorEl}
                open={open2}
                onClose={handleClose}
                TransitionComponent={Fade}
                sx={{
                  '& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper':{
                    color: 'white',
                    backgroundColor: 'var(--oceanDark)',
                    borderRadius: '6px',
                    width: '9rem',
                    height: '11rem'
                    // maxHeight: '12rem',
                  }
                }}
              >
                <MenuItem onClick={handleClose} sx={{ fontSize: '1.25rem', gap: '.8rem' }}><RiUserLine/>Profile</MenuItem>
                <MenuItem onClick={handleClose} sx={{ fontSize: '1.25rem', gap: '.8rem' }}><RiArchiveLine/>Orders</MenuItem>
                <MenuItem 
                onClick={handleClose} 
                sx={{ 
                  fontSize: '1.25rem',
                  gap: '.8rem',
                  backgroundColor: 'rgb(216, 0, 40, 0.75)'
                  }}>
                    <RiLogoutBoxLine/>Logout</MenuItem>
              </Menu>
            </div>
            ) : (
              <NavLink to="/login" className="nav-item" onClick={handleNavLinkClick}>
                <li className="nav-li">
                  <RiLoginBoxLine/>LogIn
                </li>
              </NavLink>
            )}


          </ul>
        </div>

      </Backdrop >
    </>
  );
}

export default Header;

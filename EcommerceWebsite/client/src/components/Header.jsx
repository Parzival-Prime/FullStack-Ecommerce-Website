import React, { useRef, useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/header.css";
import {
  Menu as MenuIcon,
  Avatar,
  IconButton,
  Box,
  Backdrop,
  Button,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import FlexCenter from "./FlexCenter";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsAdminFalse,
  setIsLoggedInFalse,
} from "../features/counter/counterSlice";
import {
  RiArrowLeftSFill,
  RiHome2Line,
  RiShoppingBagLine,
  RiUserLine,
  RiLogoutBoxLine,
  RiTeamLine,
  RiShoppingCart2Line,
  RiCustomerServiceLine,
  RiArchiveLine,
  RiLoginBoxLine,
  RiDashboardLine,
  RiFunctionAddLine,
  RiSettings5Line,
} from "@remixicon/react";
import toast from "react-hot-toast";
import { axiosInstance } from "../baseurl.js";
import { useTheme } from "../theme/theme";

function Header() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");

  const navRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const isAdmin = useSelector((state) => state.counter.isAdmin);
  const isLoggedIn = useSelector((state) => state.counter.isLoggedIn);

  const toggleNav = useCallback(() => {
    navRef.current.classList.toggle("column-nav-list-show");
  }, []);

  const toggleNavMenu = useCallback(() => {
    setOpen((prev) => !prev);
    toggleNav();
  }, [toggleNav]);

  const handleNavLinkClick = useCallback(
    (e) => {
      e.stopPropagation();
      toggleNavMenu();
    },
    [toggleNavMenu]
  );

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(
    (e) => {
      e.stopPropagation();
      setAnchorEl(null);
    },
    []
  );

  const handleLogOut = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axiosInstance.get("/api/v1/auth/logout");
      if (data?.success) {
        localStorage.removeItem("user");
        dispatch(setIsLoggedInFalse());
        dispatch(setIsAdminFalse());
        handleClose(e);
        handleNavLinkClick(e);
        navigate("/login");
        toast.success("LoggedOut Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in handleLogOut");
    }
  };

  useEffect(() => {
    const luser = JSON.parse(localStorage.getItem("user"));
    if (luser && luser.value) {
      setName(luser?.value?.name);
      setProfileImage(luser?.value?.profileImage);
    }
  }, [isLoggedIn]);

  return (
    <>
      <nav className="navbar" style={{ color: theme.white }}>
        <div className="toolbar">
          <FlexCenter
            sx={{ fontSize: "1.2rem", fontFamily: "var(--sansitaSwashed)" }}
          >
            <Box variant="span" sx={{ display: "flex", alignSelf: "start" }}>
              Whispering
            </Box>
            <Box variant="span" sx={{ display: "flex", alignSelf: "end" }}>
              Willow
            </Box>
          </FlexCenter>
          <FlexCenter sx={{ gap: "1.5rem" }}>
            <IconButton onClick={toggleNavMenu}>
              <MenuIcon sx={{ color: "white", fontSize: "2rem" }} />
            </IconButton>
          </FlexCenter>
        </div>
      </nav>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={toggleNavMenu}
      >
        <div className="column-nav-list" ref={navRef}>
          <ul className="navigation-list">
            <NavLink to="/" className="nav-item" onClick={handleNavLinkClick}>
              <li className="nav-li">
                <RiHome2Line />
                Home
              </li>
            </NavLink>
            {isAdmin && (
              <>
                <NavLink
                  to="/dashboard"
                  className="nav-item"
                  onClick={handleNavLinkClick}
                >
                  <li className="nav-li">
                    <RiDashboardLine />
                    Dashboard
                  </li>
                </NavLink>
                <NavLink
                  to="/create-product"
                  className="nav-item"
                  onClick={handleNavLinkClick}
                >
                  <li className="nav-li">
                    <RiFunctionAddLine />
                    CreateProduct
                  </li>
                </NavLink>
              </>
            )}
            <NavLink
              to="/products"
              className="nav-item"
              onClick={handleNavLinkClick}
            >
              <li className="nav-li">
                <RiShoppingBagLine />
                Products
              </li>
            </NavLink>
            <NavLink to="/cart" className="nav-item" onClick={handleNavLinkClick}>
              <li className="nav-li">
                <RiShoppingCart2Line />
                Cart
              </li>
            </NavLink>
            <NavLink to="/about" className="nav-item" onClick={handleNavLinkClick}>
              <li className="nav-li">
                <RiTeamLine />
                About Us
              </li>
            </NavLink>
            <NavLink to="/contact" className="nav-item" onClick={handleNavLinkClick}>
              <li className="nav-li">
                <RiCustomerServiceLine />
                ContactUs
              </li>
            </NavLink>
            {isLoggedIn ? (
              <div>
                <Button
                  id="fade-button"
                  aria-controls={anchorEl ? "fade-menu" : undefined}
                  aria-expanded={anchorEl ? "true" : undefined}
                  onClick={handleClick}
                >
                  <li className="nav-li nav-item">
                    <div className="nav-your-account">
                      <RiArrowLeftSFill />
                      <div className="avatar-container">
                        <Avatar alt="Avatar" src={profileImage} />
                      </div>
                      <p>{name}</p>
                    </div>
                  </li>
                </Button>
                <Menu
                  id="fade-menu"
                  MenuListProps={{ "aria-labelledby": "fade-button" }}
                  transformOrigin={{ vertical: 110, horizontal: 170 }}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  sx={{
                    "& .MuiPaper-root": {
                      color: "white",
                      backgroundColor: "var(--oceanDark)",
                      borderRadius: "6px",
                      width: "9rem",
                      height: "11rem",
                      "::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "::-webkit-scrollbar-track": {
                        backgroundColor: "#f1f1f1",
                        borderRadius: "10px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        backgroundColor: theme.background,
                        borderRadius: "10px",
                      },
                    },
                  }}
                >
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      handleNavLinkClick(e);
                      navigate("/profile");
                    }}
                    sx={{ fontSize: "1.25rem", gap: ".8rem" }}
                  >
                    <RiUserLine />
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      handleNavLinkClick(e);
                      navigate("/orders");
                    }}
                    sx={{ fontSize: "1.25rem", gap: ".8rem" }}
                  >
                    <RiArchiveLine />
                    Orders
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      handleNavLinkClick(e);
                      navigate("/settings");
                    }}
                    sx={{ fontSize: "1.25rem", gap: ".8rem" }}
                  >
                    <RiSettings5Line />
                    Settings
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogOut}
                    sx={{
                      fontSize: "1.25rem",
                      gap: ".8rem",
                      backgroundColor: "rgb(216, 0, 40, 0.75)",
                    }}
                  >
                    <RiLogoutBoxLine />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="nav-item"
                onClick={handleNavLinkClick}
              >
                <li className="nav-li">
                  <RiLoginBoxLine />
                  LogIn
                </li>
              </NavLink>
            )}
          </ul>
        </div>
      </Backdrop>
    </>
  );
}

export default Header;

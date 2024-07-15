import React from "react";
import { Outlet } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
}

export default Layout;

import React from "react";
import "./App.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Cart from "./pages/Cart";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreateProduct from './pages/admin/CreateProduct'
import Products from "./pages/Products";
import Product from "./pages/Product";
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import Dashboard from './pages/admin/Dashboad'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import AdminRoute from "./components/AdminRoute";


// Creating axios Instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3090",
  withCredentials: true,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "application/json";

export { axiosInstance };



function App() {

  return (
    <>
      <Toaster style={{ zIndex: 1000 }} />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product" element={<Product />} />
            <Route path="/products" element={<Products />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-product" element={
              <ProtectedRoute>
                <AdminRoute>
                  <CreateProduct />
                </AdminRoute>
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>}
            />
            <Route path="/myOrders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

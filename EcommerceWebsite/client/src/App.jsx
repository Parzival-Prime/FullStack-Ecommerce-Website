import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAdminTrue, setIsAdminFalse, setIsLoggedInFalse, setIsLoggedInTrue } from "./features/counter/counterSlice";
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
import Dashboard from './pages/admin/Dashboard'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import AdminRoute from "./components/AdminRoute";
import PaymentSuccess from "./pages/PaymentSuccess";


// Creating axios Instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3090",
  withCredentials: true,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "application/json";

export { axiosInstance };



function App() {
  const dispatch = useDispatch()

  const getCookie = (name) => {
    const cookies = document.cookie.split(';')
    const cookieValue = cookies.map((cookie) => {
      if (((cookie.split('='))[0]).trim() === name) {
        return (cookie.split('='))[1]
      }
    })
    return cookieValue
  }

  const checkCookieAndSetState = () => {
    if (document.cookie) {
      if ((getCookie('isLoggedIn'))[0] !== undefined) {
        dispatch(setIsLoggedInTrue())
      } else {
        dispatch(setIsLoggedInFalse())
        if ((localStorage.getItem('user'))) {
          localStorage.removeItem('user')
        }
      }

      if ((getCookie('isAdmin'))[1] !== undefined) {
        dispatch(setIsAdminTrue())
      } else {
        dispatch(setIsAdminFalse())
      }

    } else {
      dispatch(setIsLoggedInFalse())
      if ((localStorage.getItem('user'))) {
        localStorage.removeItem('user')
      }
    }
  }

  useEffect(() => {
    checkCookieAndSetState()
  }, [])
  return (
    <>
      <Toaster style={{ zIndex: 10000 }} />
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
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/payment-success" element={
              <ProtectedRoute>
                <PaymentSuccess />
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

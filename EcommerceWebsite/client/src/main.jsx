import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3090',
  withCredentials: true
})

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json'
axiosInstance.defaults.headers.common['Accept'] = 'application/json'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

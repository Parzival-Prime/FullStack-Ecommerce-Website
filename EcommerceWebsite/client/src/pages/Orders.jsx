import React, { useState, useEffect } from 'react'
import '../styles/orders.css'
import toast from 'react-hot-toast'
import { DataGrid } from '@mui/x-data-grid'
import { axiosInstance } from '../App'
import { useTheme } from '../theme/theme'

const ordersTableStruct = [
  {field: 'id', headerName: 'BillId', width: 160, cellClassName: 'text-color'},
  {field: 'orderDate', headerName: 'Date', width: 130, cellClassName: 'text-color'},
  {field: 'totalAmount', headerName: 'TotalAmount', width: 130, cellClassName: 'text-color'}
]

function Orders() {
  const [orders, setOrders] = useState([])
  const theme = useTheme()
  const getAllOrders = async () => {
    try {
      const { data } = await axiosInstance.get('/api/v1/auth/get-all-orders')

      if (data?.success) {
        const obj = data.allOrders.orders.map(item =>({id: item.billID, orderDate: ((item.createdAt).split('T'))[0], totalAmount: item.totalAmount}))
        setOrders(obj)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  useEffect(() => {
    getAllOrders()
  }, [])
  return (
    <div className='orders' style={{backgroundColor: theme.background, color: theme.heading}}>
      <h1 className="orders-title">My Orders</h1>
      <div className="orders-body">
        {orders && (<DataGrid 
        columns={ordersTableStruct}
        rows={orders}
        disableColumnMenu 
        sx={{
          '& .text-color': {
            color: theme.heading,
          }
        }}
        />)} 
      </div>
    </div>
  )
}

export default Orders

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import '../../styles/dashboard.css'
import { axiosInstance } from '../../App'

function Dashboard() {
  const [totalSales, setTotalSales] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalProductsCount, setTotalProductsCount] = useState(0)
  const [totalUsersCount, setTotalUsersCount] = useState(0)
  const [allUsers, setAllUsers] = useState([])
  const [topFiveProducts, setTopFiveProducts] = useState([])
  const [topFiveCustomers, setTopFiveCustomers] = useState([])

  // Chart will be based on sales per month

  const getDashboardData = async () => {
    try {
      const { data } = await axiosInstance.get('/api/v1/auth/get-dashboard-data')

      if (data?.success) {
        setAllUsers(data.allUsers)
        setTotalRevenue(data.totalSalesAndRevenue[0].totalRevenue)
        setTotalSales(data.totalSalesAndRevenue[0].totalSaleCount)
        setTotalProductsCount(data.totalUser_totalProducts_topFiveCustomers[0].totalProducts[0].count)
        setTotalUsersCount(data.totalUser_totalProducts_topFiveCustomers[0].totalUsers[0].count)
        setTopFiveCustomers(data.totalUser_totalProducts_topFiveCustomers[0].topCustomers)
        setTopFiveProducts(data.topFiveMostSoldProducts)
        console.log(data)
        toast.success('Dashboard data fetched Successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error("Couldn't fetch Dashboard Data")
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div style={{ paddingTop: '6rem', minHeight: '90svh', height: "80svh", backgroundColor: 'var(--oceanDark)', color: 'var(--greenCream'}}>
      <h1 className="dashboard-page-title">Dashboard</h1>
      <div className="dashboard-tsales-revenue-box">
        <div className="tRevenue">Total Revenue: {' '}${parseFloat(totalRevenue/100).toFixed(2)}</div>
        <div className="tSales">Total Sales: {totalSales}</div>
      </div>
    </div>
  )
}

export default Dashboard

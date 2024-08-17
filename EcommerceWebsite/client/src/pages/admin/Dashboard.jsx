import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import '../../styles/dashboard.css'
import { axiosInstance } from '../../App'
import ApexCharts from 'react-apexcharts'
import { ResponsiveChoropleth } from '@nivo/geo'
import { geoCopiedData } from './geoApi.js'
import { scaleQuantize } from 'd3-scale'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from '../../theme/theme.js'


const productTableStruct = [
  { field: '_id', headerName: 'Product', width: 230, cellClassName: 'text-color' },
  { field: 'totalSold', headerName: 'TotalSold', width: 130, cellClassName: 'text-color' }
]

const allUsersTableStruct = [
  { field: 'name', headerName: 'Name', width: 130, cellClassName: 'text-color' },
  { field: 'email', headerName: 'Email', width: 220, cellClassName: 'text-color' },
  { field: 'joinedAt', headerName: 'JoinedAt', width: 120, cellClassName: 'text-color' }
]

const topUserTableStruct = [
  { field: 'name', headerName: 'Name', width: 170, cellClassName: 'text-color' },
  { field: 'totalSpent', headerName: 'TotalSpent', width: 150, cellClassName: 'text-color' }
]

function Dashboard() {
  const theme = useTheme()
  const [totalSales, setTotalSales] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalProductsCount, setTotalProductsCount] = useState(0)
  const [totalUsersCount, setTotalUsersCount] = useState(0)
  const [allUsers, setAllUsers] = useState([])
  const [topFiveProducts, setTopFiveProducts] = useState([])
  const [topFiveCustomers, setTopFiveCustomers] = useState([])
  const [productsSoldEachMonth, setProductsSoldEachMonth] = useState([])
  const [ordersPlacedInCountries, setOrdersPlacedInCountries] = useState([])
  const [geoData, setGeoData] = useState([])
  const year = 2024

  const colorScale = scaleQuantize()
  .domain([0, 100])
  .range([theme.color1, theme.color2, theme.color3, theme.color4]);

  const monthdata = new Array()
  for (let i = 0; i < 12; i++) {
    let found = 0
    productsSoldEachMonth.forEach(item => {
      if (item.year === year) {
        if (item.month === i) {
          monthdata.push(item.totalProductsSold)
          found = 1
          return
        }
      }
    })
    if (found === 0) monthdata.push(1)
  }

  const chartState = {
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3,
        colors: [theme.heading]
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
          text: 'Months'
        }
      },
      yaxis: {
        title: {
          text: 'Sales'
        }
      },
      tooltip: {
        x: {
          format: 'MMM'
        }
      },
      fill: {
        colors: [theme.heading]
      }
    },
    series: [
      {
        name: "Sales",
        data: monthdata
      }
    ]
  }

  const GeoDatafunc = () => {
    const lok = []
    ordersPlacedInCountries.forEach(item => {
      lok.push({ "id": item.country, "value": item.numberOfOrders })
    })
    setGeoData(lok)
  }
  // console.log("allUsers", allUsers)
  const getDashboardData = async () => {
    try {
      const { data } = await axiosInstance.get('/api/v1/auth/get-dashboard-data')

      if (data?.success) {
        const userstobeset = data.allUsers.map((item) => ({ name: item.name, email: item.email, joinedAt: ((item.createdAt).split('T'))[0] }))
        setAllUsers(userstobeset)
        setTotalRevenue(data.totalSalesAndRevenue[0].totalRevenue)
        setTotalSales(data.totalSalesAndRevenue[0].totalSaleCount)
        setTotalProductsCount(data.totalUser_totalProducts_topFiveCustomers[0].totalProducts[0].count)
        setTotalUsersCount(data.totalUser_totalProducts_topFiveCustomers[0].totalUsers[0].count)
        const topCustomers = data.totalUser_totalProducts_topFiveCustomers[0].topCustomers.map(item => ({ _id: item._id, name: item.name, totalSpent: (item.totalSpent) / 100 }))
        setTopFiveCustomers(topCustomers)
        setTopFiveProducts(data.topFiveMostSoldProducts)
        setProductsSoldEachMonth(data.productsSoldEachMonth)
        setOrdersPlacedInCountries(data.OrdersPlacedInCountries)
        // console.log(data)
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

  useEffect(() => {
    GeoDatafunc()
  }, [ordersPlacedInCountries])

  return (
    <div style={{ paddingTop: '6rem', minHeight: '140svh', maxHeight: '305svh', color: theme.heading, backgroundColor: theme.background, fontFamily: 'var(--sofiaSans)' }}>
      <h1 className="dashboard-page-title" style={{color: theme.heading}}>Dashboard</h1>
      <div className="dashboard-tsales-revenue-box">
        <div className="tRevenue">Total Revenue: {' '}${parseFloat(totalRevenue / 100).toFixed(2)}</div>
        <div className="tSales">Total Sales: {totalSales}</div>
        <div className="total-users-count">Total Users:{' '} {totalUsersCount}</div>
        <div className="total-products-count">Total Products:{' '} {totalProductsCount}</div>
        <div className="month-sales-chart">
          <h2 className="month-sales-chart-heading">Sales this Year:</h2>
          <ApexCharts
            options={chartState.options}
            series={chartState.series}
            type='area'
            height={350}
          />
        </div>
        <div className="country-sales-chart">
          <h2 className="country-sales-chart-heading">Sales around the World:</h2>
          {geoData ? (
            <ResponsiveChoropleth
              data={geoData}
              features={geoCopiedData.features}
              margin={{ top: -40, right: 0, bottom: 0, left: 0 }}
              projectionType="mercator"
              enableGraticule={false}
              domain={[0, 100]}
              colors={colorScale}
              unknownColor={theme.unknown}
              label="properties.name"
              valueFormat=".2s"
              projectionScale={50}
              projectionTranslation={[0.5, 0.65]}
              projectionRotation={[0, 0, 0]}
              borderWidth={.1}
              borderColor="#68f5a8"
              fillColor={'none'}
              legends={[
                {
                  anchor: "bottom-left",
                  direction: "column",
                  justify: true,
                  translateX: 0,
                  translateY: -40,
                  itemsSpacing: 0,
                  itemWidth: 70,
                  itemHeight: 18,
                  itemDirection: "left-to-right",
                  itemTextColor: '#6ef5ab',
                  itemOpacity: 0.85,
                  symbolSize: 10,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: '#6ef5ab',
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          ) : (
            <>Loading...</>
          )}
        </div>
        <div className="top-products">
          <h2 className="top-products-heading">Top Five most Sold Products:</h2>
          <DataGrid
            columns={productTableStruct}
            rows={topFiveProducts}
            // pageSize={4}
            getRowId={(row) => row._id}
            sx={{
              '& .text-color': {
                color: theme.heading,
              }
            }}
            disableColumnMenu
          />
        </div>
        <div className="top-customers">
          <h2 className="top-customers-heading">Top Five Customers:</h2>
          <DataGrid
            columns={topUserTableStruct}
            rows={topFiveCustomers}
            pageSize={5}
            getRowId={(row) => row._id}
            sx={{
              '& .text-color': {
                color: theme.heading,
              }
            }}
            disableColumnMenu
          />
        </div>
        <div className="all-customers">
          <h2 className="all-customers-heading">All Customers:</h2>
          <DataGrid
            columns={allUsersTableStruct}
            rows={allUsers}
            pageSize={5}
            getRowId={(row) => row.email}
            sx={{
              '& .text-color': {
                color: theme.heading,
              }
            }}
            disableColumnMenu
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

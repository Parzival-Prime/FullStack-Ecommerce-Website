import React, { useEffect, useState, Suspense, lazy } from 'react'
import toast from 'react-hot-toast'
import '../../styles/dashboard.css'
import { axiosInstance } from '../../baseurl.js'
// const ApexCharts = lazy(() => import('react-apexcharts'));
// const ResponsiveChoropleth = lazy(() => import('@nivo/geo').then(module => ({ default: module.ResponsiveChoropleth })));
// const DataGrid = lazy(() => import('@mui/x-data-grid'));
import ApexCharts from 'react-apexcharts'
import { ResponsiveChoropleth } from '@nivo/geo'
import { DataGrid } from '@mui/x-data-grid'
import { geoCopiedData } from './geoApi.js'
import { scaleQuantize } from 'd3-scale'
import { useTheme } from '../../theme/theme.js'


function Dashboard() {
  const theme = useTheme()
  const [topUserTableStruct, setTopUserTableStruct] = useState([
    { field: 'name', headerName: 'Name', width: 170, cellClassName: 'text-color' },
    { field: 'totalSpent', headerName: 'TotalSpent', width: 150, cellClassName: 'text-color' }
  ])
  const [allUsersTableStruct, setAllUsersTableStruct] = useState([
    { field: 'name', headerName: 'Name', width: 130, cellClassName: 'text-color' },
    { field: 'email', headerName: 'Email', width: 220, cellClassName: 'text-color' },
    { field: 'joinedAt', headerName: 'JoinedAt', width: 120, cellClassName: 'text-color' }
  ])
  const [productTableStruct, setProductTableStruct] = useState([
    { field: '_id', headerName: 'Product', width: 230, cellClassName: 'text-color' },
    { field: 'totalSold', headerName: 'TotalSold', width: 130, cellClassName: 'text-color' }
  ])
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


  const [dimensions, setDimensions] = useState({ width: 300, height: 200, scale: 0 });

  const calculateScale = (width) => {
    return width / 7;  // Adjust as necessary
  };

  const updateDimensions = () => {
    const screenWidth = window.innerWidth;
    let width, height;
    if (screenWidth < 200) {
      width = 300;
      height = 200;
    }
    else if (400 > screenWidth && screenWidth > 300) {
      width = 350;
      height = 290;
    }
    else if (screenWidth >= 400 && screenWidth < 470) {
      width = 400;
      height = 350;
    }
    else if (screenWidth >= 470 && screenWidth < 530) {
      width = 450;
      height = 400;
    }
    else if (screenWidth >= 530 && screenWidth < 580) {
      width = 500;
      height = 380;
    }
    else if (screenWidth >= 580 && screenWidth < 630) {
      width = 550;
      height = 430;
    }
    else if (screenWidth >= 630 && screenWidth < 780) {
      width = 620;
      height = 470;
    }
    else if (screenWidth >= 780 && screenWidth < 940) {
      width = 780;
      height = 560;
    }
    else if (screenWidth >= 940 && screenWidth < 1020) {
      width = 940;
      height = 620;
    }
    else {
      width = 1020;
      height = 780;
    }

    const scale = calculateScale(width);  // Dynamically calculate scale
    setDimensions({ width, height, scale });
  };

  useEffect(() => {
    updateDimensions(); // Set initial dimensions
    window.addEventListener('resize', updateDimensions); // Update on resize
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div style={{ paddingTop: '6rem', minHeight: '140svh', color: theme.heading, backgroundColor: theme.background, fontFamily: 'var(--sofiaSans)', marginBottom: '-3rem', paddingInline: '1.5rem' }}>
      <h1 className="dashboard-page-title" style={{ color: theme.heading }}>Dashboard</h1>

      <div className="dashboard-tsales-revenue-box">
        <div>
          <div className="tRevenue">Total Revenue: {' '}<span style={{ color: theme.heading2 }}>${parseFloat(totalRevenue / 100).toFixed(2)}</span></div>
          <div className="tSales">Total Sales: <span style={{ color: theme.heading2 }}>{totalSales}</span></div>
        </div>
        <div>
          <div className="total-users-count">Total Users:{' '} <span style={{ color: theme.heading2 }}>{totalUsersCount}</span></div>
          <div className="total-products-count">Total Products:{' '} <span style={{ color: theme.heading2 }}>{totalProductsCount}</span></div>
        </div>
      </div>


      <div className="month-sales-chart">
        <h2 className="month-sales-chart-heading">Sales this Year:</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <ApexCharts
            options={chartState.options}
            series={chartState.series}
            type='area'
            height={350}
          />
        </Suspense>
      </div>
      <div className="country-sales-chart">
        <h2 className="country-sales-chart-heading">Sales around the World:</h2>
        {geoData ? (
          <div className="geo-chart small-chart">
            <Suspense fallback={<div>Loading...</div>}>
              <ResponsiveChoropleth
                data={geoData}
                features={geoCopiedData.features}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                projectionType="mercator"
                enableGraticule={false}
                domain={[0, 100]}
                width={dimensions.width}
                height={dimensions.height}
                colors={colorScale}
                unknownColor={theme.unknown}
                label="properties.name"
                valueFormat=".2s"
                projectionScale={dimensions.scale}
                projectionTranslation={[0.5, 0.60]}
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
                    itemWidth: 60,
                    itemHeight: 17,
                    itemDirection: "left-to-right",
                    itemTextColor: '#6ef5ab',
                    itemOpacity: 0.85,
                    symbolSize: 9,
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
            </Suspense>
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>
      <div className="top-products">
        <h2 className="top-products-heading">Top Five most Sold Products:</h2>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </div>
      <div className="top-customers">
        <h2 className="top-customers-heading">Top Five Customers:</h2>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </div>
      <div className="all-customers">
        <h2 className="all-customers-heading">All Customers:</h2>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </div>
    </div>
  )
}

export default Dashboard
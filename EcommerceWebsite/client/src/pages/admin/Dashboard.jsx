import React, { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import toast from 'react-hot-toast';
import '../../styles/dashboard.css';
import { axiosInstance } from '../../baseurl.js';
import { scaleQuantize } from 'd3-scale';
import { useTheme } from '../../theme/theme.js';
import { debounce } from 'lodash';

const ApexCharts = lazy(() => import('react-apexcharts'));
const ResponsiveChoropleth = lazy(() => import('@nivo/geo').then(module => ({ default: module.ResponsiveChoropleth })));
const DataGrid = lazy(() => import('@mui/x-data-grid'));

function Dashboard() {
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalProductsCount: 0,
    totalUsersCount: 0,
    topFiveProducts: [],
    topFiveCustomers: [],
    productsSoldEachMonth: [],
    ordersPlacedInCountries: [],
  });
  const [geoData, setGeoData] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 300, height: 200, scale: 0 });

  const year = 2024;

  const colorScale = scaleQuantize()
    .domain([0, 100])
    .range([theme.color1, theme.color2, theme.color3, theme.color4]);

  const monthdata = useMemo(() => {
    const data = new Array(12).fill(1); // Default to 1
    dashboardData.productsSoldEachMonth.forEach(item => {
      if (item.year === year) {
        if (item.month >= 0 && item.month < 12) {
          data[item.month] = item.totalProductsSold;
        }
      }
    });
    return data;
  }, [dashboardData.productsSoldEachMonth, year]);

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
  };

  const GeoDatafunc = () => {
    const lok = dashboardData.ordersPlacedInCountries.map(item => ({
      "id": item.country,
      "value": item.numberOfOrders
    }));
    setGeoData(lok);
  };

  const getDashboardData = async () => {
    try {
      const { data } = await axiosInstance.get('/api/v1/auth/get-dashboard-data');
      if (data?.success) {
        setDashboardData({
          totalSales: data.totalSalesAndRevenue[0].totalSaleCount,
          totalRevenue: data.totalSalesAndRevenue[0].totalRevenue,
          totalProductsCount: data.totalUser_totalProducts_topFiveCustomers[0].totalProducts[0].count,
          totalUsersCount: data.totalUser_totalProducts_topFiveCustomers[0].totalUsers[0].count,
          topFiveCustomers: data.totalUser_totalProducts_topFiveCustomers[0].topCustomers.map(item => ({
            _id: item._id,
            name: item.name,
            totalSpent: item.totalSpent / 100
          })),
          topFiveProducts: data.topFiveMostSoldProducts,
          productsSoldEachMonth: data.productsSoldEachMonth,
          ordersPlacedInCountries: data.OrdersPlacedInCountries
        });
        toast.success('Dashboard data fetched Successfully');
      } else {
        throw new Error('Data fetch failed');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error("Couldn't fetch Dashboard Data. Please try again later.");
    }
  };

  const updateDimensions = debounce(() => {
    const screenWidth = window.innerWidth;
    let width, height;
    if (screenWidth < 200) {
      width = 300;
      height = 200;
    } else if (screenWidth < 400) {
      width = 350;
      height = 300;
    } else if (screenWidth < 470) {
      width = 400;
      height = 350;
    } else if (screenWidth < 530) {
      width = 450;
      height = 400;
    } else if (screenWidth < 580) {
      width = 500;
      height = 380;
    } else if (screenWidth < 630) {
      width = 550;
      height = 430;
    } else if (screenWidth < 780) {
      width = 620;
      height = 470;
    } else if (screenWidth < 940) {
      width = 780;
      height = 560;
    } else if (screenWidth < 1020) {
      width = 940;
      height = 620;
    } else {
      width = 1020;
      height = 780;
    }
    setDimensions({ width, height, scale: width / 7 });
  }, 300);

  useEffect(() => {
    getDashboardData();
  }, []);

  useEffect(() => {
    GeoDatafunc();
  }, [dashboardData.ordersPlacedInCountries]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  return (
    <div className='dashboard-container' style={{ color: theme.heading, backgroundColor: theme.background }}>
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
        {geoData.length ? (
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
  )
}

export default Dashboard

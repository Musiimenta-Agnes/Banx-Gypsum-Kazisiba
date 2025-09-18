
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import axios from 'axios';

const MostBoughtItemsChart = () => {
  const [chartData, setChartData] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const colors = ['#007bff', '#28a745', '#ffc107', '#6610f2', '#fd7e14'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/orders/most-bought-items`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const grouped = processChartData(res.data);
      setChartData(grouped);
    } catch (err) {
      console.error("Failed to fetch chart data", err);
    }
  };

  const processChartData = (rawData) => {
    const year = new Date().getFullYear();

    // Step 1: Get top 5 products overall
    const yearlyTotals = {};
    rawData.forEach(item => {
      if (item.year === year) {
        yearlyTotals[item.product_name] =
          (yearlyTotals[item.product_name] || 0) + item.total_quantity;
      }
    });
    const topProducts = Object.entries(yearlyTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name);

    // Step 2: Aggregate monthly data for top products
    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1; // 1 = Jan, 12 = Dec
      const monthObj = { month: new Date(0, i).toLocaleString('default', { month: 'short' }) };
      topProducts.forEach(product => {
        const monthTotal = rawData
          .filter(item => item.product_name === product && item.year === year && item.month === month)
          .reduce((sum, item) => sum + item.total_quantity, 0);
        monthObj[product] = monthTotal;
      });
      return monthObj;
    });

    return monthlyData;
  };

  return (
    <div style={{ width: '100%', height: 400, fontSize:'0.9rem' }}>
      <h2 style={{ textAlign: 'center', color: 'rgb(10,10,87)', marginBottom: '20px' }}>
        Top Most Sales
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          {chartData[0] &&
            Object.keys(chartData[0])
              .filter(key => key !== "month")
              .map((product, index) => (
                <Line
                  key={product}
                  type="monotone"
                  dataKey={product}
                  stroke={colors[index % colors.length]}
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
              ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MostBoughtItemsChart;



// import React, { useEffect, useState } from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';
// import axios from 'axios';

// const MostBoughtItemsChart = () => {
//   const [chartData, setChartData] = useState([]);
//   const API_URL = process.env.REACT_APP_API_URL;

//   const colors = ['#007bff', '#28a745', '#ffc107', '#6610f2', '#fd7e14'];

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(`${API_URL}/api/orders/most-bought-items`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const grouped = processChartData(res.data);
//       setChartData(grouped);
//     } catch (err) {
//       console.error("Failed to fetch chart data", err);
//     }
//   };

//   const processChartData = (rawData) => {
//     const year = new Date().getFullYear();

//     // Calculate total quantities per product across the year
//     const yearlyTotals = {};
//     rawData.forEach(item => {
//       if (item.year === year) {
//         yearlyTotals[item.product_name] =
//           (yearlyTotals[item.product_name] || 0) + item.total_quantity;
//       }
//     });

//     // Get top 5 products overall
//     return Object.entries(yearlyTotals)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 5)
//       .map(([name, total]) => ({ name, value: total }));
//   };

//   return (
//     <div style={{ width: '100%', height: 400 }}>
//       <h2 style={{ textAlign: 'center', color: 'rgb(10,10,87)', marginBottom: '20px' }}>
//         Top Most Sales
//       </h2>
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={chartData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={130}
//             label
//           >
//             {chartData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend verticalAlign="bottom" height={36} />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default MostBoughtItemsChart;

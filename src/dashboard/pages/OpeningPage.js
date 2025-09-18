
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaEnvelope } from 'react-icons/fa';
import AOS from 'aos';
import '../dashStyles/OpeningPage.css';
import MostBoughtItemsChart from './MostBoughtItems';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';

const DashboardOpeningPage = () => {
  const [pageViews, setPageViews] = useState(0);
  const [undeliveredOrders, setUndeliveredOrders] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });

    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

    axios.get(`${API_URL}/api/views/get_all_viewers_total`)
      .then(res => setPageViews(res.data.total_views))
      .catch(err => console.error('❌ Failed to fetch page views:', err));

    axios.get(`${API_URL}/api/orders/undelivered_count`, authHeaders)
      .then(res => setUndeliveredOrders(res.data.count))
      .catch(err => console.error('❌ Failed to fetch undelivered orders:', err));

    axios.get(`${API_URL}/api/direct_order/unread_messages_count`)
      .then(res => setUnreadMessages(res.data.count))
      .catch(err => console.error('❌ Failed to fetch unread messages:', err));

    axios.get(`${API_URL}/api/user/customers_count`, authHeaders)
      .then(res => setTotalCustomers(res.data.count))
      .catch(err => console.error('❌ Failed to fetch total customers:', err));

    axios.get(`${API_URL}/api/orders/monthly_sales_summary`, authHeaders)
      .then(res => {
        const formatted = res.data.map(item => ({
          month_name: item.month_name,
          total_delivered_orders: item.total_delivered_orders || 0,
          rejected_orders: item.rejected_orders || 0
        }));
        setMonthlySales(formatted);
      })
      .catch(err => console.error('❌ Failed to fetch sales summary:', err));
  }, []);

  return (
    <div className='body'>
      <div className="container-fluid">
        <div
          className=" flex items-center justify-center mx-auto"
          style={{
            backgroundColor: 'rgba(25, 25, 87, 1)',
            minHeight:'50px',
            padding:'7px 7px',
            borderRadius:'10px', color:'white'
          }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-center" style={{fontSize:'1.6rem'}}>
            Welcome to Okuosi Gypsum Dashboard
          </h1>
        </div>

        <br/><br/>

        {/* Cards Row */}
        <div className="row g-5 d-flex justify-content-center align-items-stretch" style={{justifyContent:'center'}}>
          {/* Cart Orders */}
          <div className="col-md-3 cards" data-aos='fade-up'>
            <Card className="text-black card1 w-100" style={{backgroundColor:'#f8f9fa'}}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title className='text-center'><FaShoppingCart size={30} /> Cart Orders</Card.Title>
                    <Button variant="text-primary" href="/view-all-orders" className='text-black'>
                      Pending Orders
                      {undeliveredOrders > 0 && (
                        <span className="badge ms-2 text-white">{undeliveredOrders}</span>
                      )}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Direct Orders */}
          <div className="col-md-3 cards" data-aos='fade-up'>
            <Card className="text-black card1 w-100" style={{backgroundColor:'#f8f9fa'}}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title className='text-center'><FaEnvelope size={30} /> Direct Orders</Card.Title>
                    <Button variant="text-primary" href="/view-direct-orders" className='text-black'>
                      Pending Orders
                      {unreadMessages > 0 && (
                        <span className="badge ms-2 text-white">{unreadMessages}</span>
                      )}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Page Views */}
          <div className="col-md-3 cards" data-aos='fade-up'>
            <Card className="text-black card1 w-100" style={{backgroundColor:'#f8f9fa'}}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title className='text-center'><FaBoxOpen size={30} /> Page Views</Card.Title>
                    <Button variant="text-primary" className='text-black'>
                      Page Views
                      {pageViews > 0 && (
                        <span className="badge ms-2 text-white">{pageViews}</span>
                      )}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Total Customers */}
          <div className="col-md-3 cards" data-aos='slide-right'>
            <Card className="text-black card1 w-100" style={{backgroundColor:'#f8f9fa'}}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title ><FaUsers size={30} />Customers</Card.Title>
                    <Button variant="text-primary" href="/view-customers" className='text-black'>
                      All Customers
                      {totalCustomers > 0 && (
                        <span className="badge ms-2 text-white">{totalCustomers}</span>
                      )}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Charts */}
        <div
          className="d-flex justify-content-center gap-4 mt-5 align-items-stretch flex-wrap"
          data-aos="fade-up"
        >
          <div
            style={{
              flex: '1 1 500px',
              minWidth: 350,
              maxWidth: 900,
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h3 className="text-center mb-4" style={{color: 'rgb(10,10,87)'}}>
              Monthly Sales Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlySales}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="month_name" />
                <YAxis allowDecimals={false} domain={[0, 'dataMax + 10']} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_delivered_orders" fill="rgba(46, 46, 129, 1)" name="Delivered Orders"/>
                <Bar dataKey="rejected_orders" fill="red" name="Rejected Orders"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <br/><br/>
      </div>
    </div>
  );
};

export default DashboardOpeningPage;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, Button } from 'react-bootstrap';
// import { FaUsers, FaBoxOpen, FaShoppingCart, FaEnvelope } from 'react-icons/fa';
// import AOS from 'aos';
// import '../dashStyles/OpeningPage.css';



// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip,
//   ResponsiveContainer, Legend
// } from 'recharts';

// const DashboardOpeningPage = () => {
//   const [pageViews, setPageViews] = useState(0);
//   const [undeliveredOrders, setUndeliveredOrders] = useState(0);
//   const [unreadMessages, setUnreadMessages] = useState(0);
//   const [totalCustomers, setTotalCustomers] = useState(0);
//   const [monthlySales, setMonthlySales] = useState([]);

//   const API_URL = process.env.REACT_APP_API_URL;
//   const token = localStorage.getItem('token');
// axios.get(`${API_URL}/api/direct_order/view_delivered_direct_orders`, {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// })
// .then(res => console.log(res.data))
// .catch(err => console.error("Failed to fetch delivered direct orders:", err));


//   useEffect(() => {
//     AOS.init({ duration: 800, easing: 'ease-in-out', once: true });

//     const token = localStorage.getItem('token');
//     const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

//     axios.get(`${API_URL}/api/views/get_all_viewers_total`)
//       .then(res => setPageViews(res.data.total_views))
//       .catch(err => console.error('❌ Failed to fetch page views:', err));

//     axios.get(`${API_URL}/api/orders/undelivered_count`, authHeaders)
//       .then(res => setUndeliveredOrders(res.data.count))
//       .catch(err => console.error('❌ Failed to fetch undelivered orders:', err));

//     axios.get(`${API_URL}/api/direct_order/unread_messages_count`)
//       .then(res => setUnreadMessages(res.data.count))
//       .catch(err => console.error('❌ Failed to fetch unread messages:', err));

//     axios.get(`${API_URL}/api/user/customers_count`, authHeaders)
//       .then(res => setTotalCustomers(res.data.count))
//       .catch(err => console.error('❌ Failed to fetch total customers:', err));

//     axios.get(`${API_URL}/api/orders/monthly_sales_summary`, authHeaders)
//       .then(res => {
//         const formatted = res.data.map(item => ({
//           month_name: item.month_name,
//           total_delivered_orders: item.total_delivered_orders || 0,
//           rejected_orders: item.rejected_orders || 0
//         }));
//         setMonthlySales(formatted);
//       })
//       .catch(err => console.error(' Failed to fetch sales summary:', err));
//   }, []);

//   return (
//     <div className='body'>
//       <div className="container-fluid ">
        
//       <div className="w-[90%] h-[90%] flex items-center justify-center mx-auto" style={{minHeight:'50px', backgroundColor:'orangered', borderRadius:'10px', color:'white'}}>
//       <h1 className="text-2xl md:text-4xl font-bold text-center">
//         Welcome to Okuosi Gypsum Dashboard
//       </h1>
//     </div>

//     <br/> <br/>


//         <div className="row g-5" style={{justifyContent:'center'}}>
//           {/*  Cart Orders */}
//           <div className="col-md-3 cards" data-aos='fade-up'>
//             <Card className="text-black card1 h-100 w-100" style={{backgroundColor:'skyblue'}}>
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <Card.Title className='text-center'><FaShoppingCart style={{color:'black'}} size={30} /> Cart Orders</Card.Title>
//                     <Button variant="text-primary" href="/view-all-orders" className='text-black'>
//                       Pending Cart Orders
//                       {undeliveredOrders > 0 && (
//                         <span className="badge ms-2 text-white">{undeliveredOrders}</span>
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>

//           {/*  Direct Orders */}
//           <div className="col-md-3 cards" data-aos='fade-up'>
//             <Card className="text-white card1 h-100 w-100" style={{backgroundColor:'darkblue'}}>
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <Card.Title className='text-center'><FaEnvelope style={{color:'white'}} size={30} /> Direct Orders</Card.Title>
//                     <Button variant="text-primary" href="/view-direct-orders" className='text-white'>
//                       Pending Direct Orders
//                       {unreadMessages > 0 && (
//                         <span className="badge ms-2 text-white">{unreadMessages}</span>
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>

//           {/* 👁 Page Views */}
//           <div className="col-md-3 cards" data-aos='fade-up'>
//             <Card className="text-white card1 h-100 w-100" style={{backgroundColor:'orangered'}}>
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <Card.Title className='text-center'><FaBoxOpen style={{color:'white'}} size={30} /> Page Views</Card.Title>
//                     <Button variant="text-primary" className='text-white'>
//                       Total Page Views
//                       {pageViews > 0 && (
//                         <span className="badge ms-2 text-black">{pageViews}</span>
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </div> 

//           {/* Total Customers */}
//           <div className="col-md-3 cards" data-aos='slide-right'>
//             <Card className="text-black card1 h-100 w-100" style={{backgroundColor:'skyblue'}}>
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <Card.Title className='text-center'><FaUsers style={{color:'black'}} size={30} /> Total Customers</Card.Title>
//                     <Button variant="text-primary" href="/view-customers" className='text-black'>
//                       All Customers
//                       {totalCustomers > 0 && (
//                         <span className="badge ms-2 text-white">{totalCustomers}</span>
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>

//         </div>


//         {/* Charts Container */}


// <div
//   className="d-flex justify-content-center gap-4 mt-5"
//   data-aos="fade-up"
//   style={{
//     alignItems: 'stretch', // ensures cards are same height
//     flexWrap: 'wrap',
//   }}
// >
 
//   <div
//     style={{
//       flex: '1 1 500px',
//       minWidth: 350,
//       maxWidth: 900,
//       backgroundColor: '#f8f9fa', // same card style
//       padding: '20px',
//       borderRadius: '12px',
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//     }}
//   >
//     <h3
//       className="text-center mb-4"
//       style={{
//         color: 'rgb(10,10,87)',
//       }}
//     >
//       Monthly Sales Performance
//     </h3>
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart
//         data={monthlySales}
//         margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//       >
//         <XAxis dataKey="month_name" />
//         <YAxis allowDecimals={false} domain={[0, 'dataMax + 10']} />
//         <Tooltip />
//         <Legend />
//         <Bar
//           dataKey="total_delivered_orders"
//           fill="rgba(46, 46, 129, 1)"
//           name="Delivered Orders"
//         />
//         <Bar dataKey="rejected_orders" fill="red" name="Rejected Orders" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
// </div>
// </div>


// <br/><br/>
// </div>
//   );
// };
// export default DashboardOpeningPage;


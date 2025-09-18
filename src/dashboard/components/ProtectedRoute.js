// // src/components/ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   const isAdmin = localStorage.getItem('role') === 'admin'; // or use your actual logic

//   if (!token || !isAdmin) {
//     return <Navigate to="/admin-login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

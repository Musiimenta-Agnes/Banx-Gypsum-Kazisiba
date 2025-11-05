// // src/dashboard/components/TopFormBar.js
// import React from "react";

// const TopFormBar = () => {
//   return (
//     <div
//       className="top-form-bar"
//       style={{
//         width: "100%",
//         height: "50px",
//         backgroundColor: "white",
//         boxSizing: "border-box",
//         top: 0,
//         position: "fixed",
//         left: 0,
//         zIndex: 1000,
//         color: "black",
//         boxShadow: "0 1px 1px blue",
//         marginTop: 0,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "5px",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
//         <div>
//           <img
//             style={{ marginTop: "16px", maxWidth: "120px", height: "auto" }}
//             src="/images/WhatsApp_Image_2025-06-11_at_4.19.09_PM-removebg-preview.png"
//             alt="Okuosi Logo"
//             className="logo mr-20"
//           />
//         </div>
//         <div>
//           <h3
//             style={{
//               margin: 0,
//               textAlign: "center",
//               marginTop: "10px",
//               color: "rgb(10,10,87)",
//               textShadow: "0 0 1px #000,0 0 1px rgb(22,10,158)",
//               fontWeight: "bold",
//             }}
//           >
//             OKUOSI GYPSUM (U) LIMITED DASHBOARD
//           </h3>
//         </div>
//       </div>

//       {/* Responsive CSS */}
//       <style>
//         {`
//           @media (max-width: 768px) {
//             .top-form-bar {
//               height: auto;       /* let it grow with content */
//               padding: 20px 5px;  /* more vertical padding */
//             }
//             .top-form-bar h3 {
//               font-size: 14px;    /* slightly smaller text on small screens */
//               margin-top: 8px;
//             }
//             .top-form-bar img {
//               max-width: 100px;   /* smaller logo */
          
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default TopFormBar;
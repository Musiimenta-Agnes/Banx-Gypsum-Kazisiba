import React from 'react';
import SideBar from './SideBar';
// import TopFormBar from './TopForm';

const DashboardLayout = ({ children }) => {


  // Only admins accs this form
  // const isAdmin = localStorage.getItem('is_admin') === 'true';

// if (!isAdmin) {
//   return <h1 className="text-danger text-center">Access denied!</h1>;
// }

  return (
    <div>
    {/* <TopFormBar/> */}
    
    <div style={{ display: 'flex' }}>
   
      <div style={{ width: '200px' }}>
        <SideBar />
      </div>
      <div style={{ flexGrow: 1, padding: '20px' }}>
        {children}
      </div>

      <br/>
    </div>
    </div>
  );
};

export default DashboardLayout;

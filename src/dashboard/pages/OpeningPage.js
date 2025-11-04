

import React from 'react';
import '../dashStyles/OpeningPage.css';


const DashboardOpeningPage = () => {

  return (
    <div className='body'>
      <div className="container-fluid">
        <div
          className=" flex items-center justify-center mx-auto"
          style={{
            backgroundColor: '#1F3C88',
            minHeight:'50px',
            padding:'7px 7px',
            borderRadius:'10px', color:'white'
          }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-center" style={{fontSize:'1.6rem'}}>
            Welcome to Banx Gypsum Kazisiba Admin Dashboard
          </h1>
        </div>

        <br/><br/>
      </div>
    </div>
  );
}

export default DashboardOpeningPage;

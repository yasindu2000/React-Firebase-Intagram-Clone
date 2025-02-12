import React, { useEffect } from 'react'
import Header from '../Components/Header';
import Timeline from '../Components/Timeline';
import Slidebar from '../Components/Slidebar/Index';




const Dashboard = () => {

  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return (
    <div className='bg-gray-background'>
      <Header />
      <div className='grid justify-between max-w-screen-lg grid-cols-3 gap-4 mx-auto'>
        <Timeline />
        <Slidebar/>
      </div>
    </div>
  );
}

export default Dashboard

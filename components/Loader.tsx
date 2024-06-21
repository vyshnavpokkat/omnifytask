import React from 'react';

export default function Loader() {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-white z-50'>
      {/* <div className="bg-primary rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div> */}
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
    </div>
    </div>
  );
}

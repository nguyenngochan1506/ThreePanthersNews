import React from 'react';
import bannerImage from './banner.jpg'; 

const TopBanner = () => {
  return (
    <div className="w-full bg-gray-100">
      <div className="container mx-auto">
        <img 
          src={bannerImage} 
          alt="Banner" 
          className="w-full h-auto object-cover max-h-[300px]" 
        />
      </div>
    </div>
  );
};

export default TopBanner;
// src/components/TopBanner.tsx
import React from 'react';
// 👇 Nhớ sửa đường dẫn này cho đúng chỗ bạn lưu ảnh
import bannerImage from './banner.jpg'; 

const TopBanner = () => {
  return (
    <div className="w-full bg-gray-100">
      <div className="container mx-auto">
        {/* Ảnh banner */}
        <img 
          src={bannerImage} 
          alt="Banner" 
        //   className="w-full h-auto"
          className="w-full h-auto object-cover max-h-[300px]" // Giới hạn chiều cao cho đẹp
        />
      </div>
    </div>
  );
};

export default TopBanner;
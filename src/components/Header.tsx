import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long", year: "numeric", month: "numeric", day: "numeric",
  });

  const menuItems = [
    { name: "THỜI SỰ", path: "/thoi-su" },
    { name: "QUỐC TẾ", path: "/quoc-te" },
    { name: "LAO ĐỘNG", path: "/lao-dong" },
    { name: "BẠN ĐỌC", path: "/ban-doc" },
    { name: "KINH TẾ", path: "/kinh-te" },
    { name: "SỨC KHỎE", path: "/suc-khoe" },
    { name: "GIÁO DỤC", path: "/giao-duc" },
    { name: "PHÁP LUẬT", path: "/phap-luat" },
    { name: "VĂN HÓA - VĂN NGHỆ", path: "/van-hoa-van-nghe" },  
    { name: "GIẢI TRÍ", path: "/giai-tri" },
    { name: "THỂ THAO", path: "/the-thao" },
    { name: "AI 365", path: "/ai-365" },
    { name: "DU LỊCH XANH", path: "/du-lich-xanh" },
    { name: "PHỤ NỮ", path: "/phu-nu" },
    { name: "GIA ĐÌNH", path: "/gia-dinh" },
    { name: "ĐỊA ỐC", path: "/dia-oc" },
  ];

  return (
    <header className="w-full">
      
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="container mx-auto w-full flex flex-wrap items-center justify-between px-4">
          
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <h1 className="text-[#d80f1e] font-black text-4xl sm:text-5xl tracking-tighter uppercase font-sans">
                NGƯỜI LAO ĐỘNG
              </h1>
            </Link>
            <div className="hidden lg:flex flex-col border-l border-gray-300 pl-4 gap-1">
               <span className="text-xs font-bold text-blue-800">NGƯỜI LAO ĐỘNG News</span>
               <span className="text-sm text-gray-500 font-medium capitalize">{today}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 lg:mt-0">

            <div className="relative hidden md:block">
              <input type="text" placeholder="Tìm kiếm" className="pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 w-48 lg:w-64" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              </button>
            </div>

            <button className="text-gray-400 hover:text-blue-600 p-2 border border-gray-300 rounded-full">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>
            </button>

            <button className="hidden sm:flex items-center gap-2 bg-[#2d87f0] hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold text-sm transition-colors">Đăng ký gói bạn đọc VIP</button>
            <button className="hidden sm:flex items-center gap-2 bg-[#d80f1e] hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold text-sm transition-colors">E-paper</button>
          </div>
        </div>
      </div>
   
      <div className="bg-[#004b9a] text-white w-full border-t border-blue-800">
        <div className="container mx-auto px-4">
          <ul className="flex items-center whitespace-nowrap overflow-hidden">
            <li className="flex-shrink-0">
              <Link to="/"
               className="flex items-center px-2 py-2 hover:bg-blue-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-7 h-7">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.632 8.632a.75.75 0 01-1.06 1.06l-.352-.352V20.25a.75.75 0 01-.75.75h-3.375a.75.75 0 01-.75-.75V14.25H9.125v6a.75.75 0 01-.75.75H5a.75.75 0 01-.75-.75v-7.07l-.352.352a.75.75 0 01-1.06-1.06L11.47 3.84z" />
                </svg>
              </Link>
            </li>

            {/* Menu */}
            {menuItems.map((item) => (
              <li key={item.name} className="flex-shrink-0">
                <Link to={item.path} 
                className="flex items-center px-2 py-2 text-[12px] font-semibold uppercase hover:bg-blue-700 transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
           
            <li className="ml-auto flex items-center justify-center px-2 py-2 cursor-pointer hover:bg-blue-700 flex-shrink-0">
               <span className="text-xl font-bold pb-2">...</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
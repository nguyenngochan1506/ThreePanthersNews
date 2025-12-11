import { Route, Routes } from "react-router-dom";
import TopBanner from './components/TopBanner';
import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";


function App() {
  return (
    // 👇 2. Thêm thẻ div bao quanh tất cả
    <div>
      
      {/* 👇 3. Đặt Banner ở đây (trên cùng) */}
      <TopBanner />
    <Routes>
      <Route element={<IndexPage />} path="/" />
        <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>

    </div>
  );
}

export default App;

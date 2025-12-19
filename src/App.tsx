import { Routes, Route } from "react-router-dom";

import TopBanner from "./components/index/TopBanner";
import Header from "./components/index/Header";
import Footer from "./components/index/Footer";

import IndexPage from "@/pages/index";
import CategoryPage from "@/pages/CategoryPage";
import PostDetailPage from "@/pages/PostDetailPage";

import { AuthProvider } from "./contexts/AuthContext";
import { CategoryProvider } from "./contexts/CategoryContext";

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <TopBanner />
        <Header />

        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/post/:slug" element={<PostDetailPage />} />
          <Route path="/:categorySlug" element={<CategoryPage />} />
        </Routes>

        <Footer />
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";

import TopBanner from "@/components/index/TopBanner";
import Header from "@/components/index/Header";
import Footer from "@/components/index/Footer";

import IndexPage from "@/pages/index";
import CategoryPage from "@/pages/CategoryPage";
import PostDetailPage from "@/pages/PostDetailPage";
import TagPage from "@/pages/TagPage";
import SearchPage from "@/pages/SearchPage";
import AuthPage from "@/pages/Auth";
import SavedPostsPage from "@/pages/SavedPostsPage";

import { AuthProvider } from "@/contexts/AuthContext";
import { CategoryProvider } from "@/contexts/CategoryContext";

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <TopBanner />
        <Header />

        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tag/:slug" element={<TagPage />} />
          <Route path="/post/:slug" element={<PostDetailPage />} />
          <Route path="/saved-posts" element={<SavedPostsPage />} />
          <Route path="/:categorySlug" element={<CategoryPage />} />
        </Routes>

        <Footer />
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;

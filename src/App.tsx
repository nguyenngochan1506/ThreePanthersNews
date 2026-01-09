import { Routes, Route, useLocation } from 'react-router-dom';

import { HeaderTop, MainNav } from './components/index/Header';
import TopBanner from './components/index/TopBanner';
import Footer from './components/index/Footer';
import TopUtilityBar from './components/index/TopUtilityBar';

import AuthPage from './pages/Auth';
import IndexPage from './pages/index';
import PostDetailPage from './pages/PostDetailPage';
import SavedPostsPage from './pages/SavedPostsPage';
import HistoryPage from './pages/HistoryPage';
import UserCommentsPage from './pages/UserCommentsPage';
import TagPage from './pages/TagPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';

import { AuthProvider } from './contexts/AuthContext';
import { CategoryProvider } from './contexts/CategoryContext';

function AppLayout() {
  const location = useLocation();

  const showTopBanner = location.pathname === '/';

  return (
    <>
      {showTopBanner && (
        <TopBanner imageSrc="ads/top-banner.jpg" href="https://avacenter.vn/?utm_source=admicro&utm_medium=topbpc&utm_campaign=avancenter-branding&utm_term=cpma&utm_content=phase1" />
      )}
      {showTopBanner && <TopUtilityBar />}


      <HeaderTop />
      <MainNav />

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/post/:slug" element={<PostDetailPage />} />
        <Route path="/tag/:slug" element={<TagPage />} />
        <Route path="/saved-posts" element={<SavedPostsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/my-comments" element={<UserCommentsPage />} />
        <Route path="/:categorySlug" element={<CategoryPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <AppLayout />
      </CategoryProvider>
    </AuthProvider>
  );
}

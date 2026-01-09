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
import ProfilePage from './pages/ProfilePage';

function AppLayout() {
  const location = useLocation();

  const showTopBanner = location.pathname === '/';

  return (
    <>
      {showTopBanner && (
        <TopBanner
          href="https://avacenter.vn/?utm_source=admicro&utm_medium=topbpc&utm_campaign=avancenter-branding&utm_term=cpma&utm_content=phase1"
          imageSrc="ads/top-banner.jpg"
        />
      )}
      {showTopBanner && <TopUtilityBar />}

      <HeaderTop />
      <MainNav />

      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<AuthPage />} path="/auth" />
        <Route element={<SearchPage />} path="/search" />
        <Route element={<PostDetailPage />} path="/post/:slug" />
        <Route element={<TagPage />} path="/tag/:slug" />
        <Route element={<SavedPostsPage />} path="/saved-posts" />
        <Route element={<HistoryPage />} path="/history" />
        <Route element={<UserCommentsPage />} path="/my-comments" />
        <Route element={<CategoryPage />} path="/:categorySlug" />
        <Route element={<ProfilePage />} path="/profile" />
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

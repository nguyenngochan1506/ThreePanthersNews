import { Route, Routes } from 'react-router-dom';

// <<<<<<< Updated upstream
// import TopBanner from "./components/TopBanner";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import AuthPage from "./pages/Auth";
// =======
import TopBanner from './components/index/TopBanner';
import Header from './components/index/Header';
import Footer from './components/index/Footer';
import AuthPage from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';

import IndexPage from '@/pages/index';
import PostDetailPage from '@/pages/PostDetailPage';

function App() {
  return (
    // <<<<<<< Updated upstream
    <AuthProvider>
      <div>
        <TopBanner />
        <Header />
        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<AuthPage />} path="/auth" />
          <Route element={<PostDetailPage />} path="/post/:slug" />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
    //     <div>
    //       <TopBanner />
    //       <Header />
    //       <Routes>
    //         <Route element={<IndexPage />} path="/" />
    //         <Route element={<PostDetailPage />} path="/post/:slug" />
    //       </Routes>
    //       <Footer />
    //     </div>
    // >>>>>>> Stashed changes
  );
}

export default App;

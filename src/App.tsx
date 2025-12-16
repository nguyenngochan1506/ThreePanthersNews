// import { Route, Routes } from 'react-router-dom';

// import TopBanner from './components/index/TopBanner';
// import Header from './components/index/Header';
// import Footer from './components/index/Footer';
// import AuthPage from './pages/Auth';
// import { AuthProvider } from './contexts/AuthContext';
// import CategoryPage from "@/pages/CategoryPage";
// import IndexPage from '@/pages/index';
// import PostDetailPage from '@/pages/PostDetailPage';

// function App() {
//   return (
//     <AuthProvider>
//       <div>
//         <TopBanner />
//         <Header />
//         <Routes>
//           <Route element={<IndexPage />} path="/" />
//           <Route element={<AuthPage />} path="/auth" />
//           <Route path="/:categorySlug" element={<CategoryPage />} />
//           <Route element={<PostDetailPage />} path="/post/:slug" />
//         </Routes>
//         <Footer />
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;
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
          <Route path="/:categorySlug" element={<CategoryPage />} />
          <Route path="/post/:slug" element={<PostDetailPage />} />
        </Routes>

        <Footer />
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;

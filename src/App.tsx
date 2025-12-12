import { Route, Routes } from "react-router-dom";
import TopBanner from './components/TopBanner';
import Header from "./components/Header";
import IndexPage from "@/pages/index";
import Footer from "./components/Footer";
function App() {
  return (
    <div>
      <TopBanner />
      <Header />
    <Routes>
      <Route element={<IndexPage />} path="/" />
      
    </Routes>
    <Footer />
    </div>
  );
}

export default App;

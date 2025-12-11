import { Route, Routes } from "react-router-dom";
import TopBanner from './components/TopBanner';
import Header from "./components/Header";
import IndexPage from "@/pages/index";

function App() {
  return (
    <div>
      <TopBanner />
      <Header />
    <Routes>
      <Route element={<IndexPage />} path="/" />
      
    </Routes>

    </div>
  );
}

export default App;

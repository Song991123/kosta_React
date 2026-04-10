import "./App.css";
import Header from "./Layouts/Header";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import AboutPage from "./pages/AboutPage";
import Member from "./pages/about/Member";
import Location from "./pages/about/Location";
import Footer from "./Layouts/Footer";



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:productName/:id" element={<DetailPage />} />
        <Route path="/cart" element={<div>장바구니입니다.</div>} />
        <Route path="/about" element={<AboutPage />}>
          <Route path="member" element={<Member />} />
          <Route path="location" element={<Location />} />
        </Route> 
        <Route path="*" element={<div>없는 페이지입니다.</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

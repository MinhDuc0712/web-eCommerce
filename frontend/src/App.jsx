import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./components/pages/About";
import Cart from "./components/pages/Cart";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Product from "./components/pages/Product";
import ProductDetail from "./components/pages/ProductDetail";
import Signup from "./components/pages/SignUp";
import "./index.css";
import { Toaster } from "sonner";
import AdminDashboard from "./components/pages/AdminDashboard";

function App() {
  return (
    <>
      <Toaster richColors position="top-right"/>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        <Route path="/admin/" element={<AdminDashboard/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './Cart/Cart';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Products from './Products/Products';
import { ToastProvider } from './components/Toaster/ToastContext';
import SearchResults from './Search/Search';
import Orders from './Orders/Orders';
import OrderItem from './Orders/OrderItem';

export default function App() {
  return (
    <div className="App">

        {/* Define Routes here */}
        <ToastProvider >
        <BrowserRouter>
          <Navbar />
          <Routes>
              <Route index path='/' element={<LandingPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
              <Route path="/search/:query" element={<SearchResults />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderUID" element={<OrderItem />} />
              <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        </ToastProvider>

    </div>
  );
}

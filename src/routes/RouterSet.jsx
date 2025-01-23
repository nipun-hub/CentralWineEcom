import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Spinner from '../components/Spinner/Spinner';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../components/scrollTop/ScrollTop';
import Favorite from '../pages/Favorite/Favorite';

// Lazy load each component
const Home = lazy(() => import('../pages/Home/Home'));
const Shop = lazy(() => import('../pages/Shop/Shop'));
const SingleProductPage = lazy(() => import('../pages/SinglePage/SignleProductPage'));
const Cart = lazy(() => import('../pages/Cart/Cart'));
const Checkout = lazy(() => import('../pages/Checkout/Checkout'));
const PaymentSuccess = lazy(() => import('../pages/PaymentSuccess/PaymentSuccess'));
const Login = lazy(() => import('../components/Login/Login'));
const Signup = lazy(() => import('../components/Signup/Signup'));
const PaymentFail = lazy(() => import('../pages/PaymentFail/PaymentFail'));
const Account = lazy(() => import('../pages/Account/Account'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const NotFound = lazy(() => import('../pages/NotFound/notFound'));

function RouterSet() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
      <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/single-product" element={<SingleProductPage />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-fail" element={<PaymentFail />} />
              <Route path="/my-account" element={<Account />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/NotFound" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
}

export default RouterSet;

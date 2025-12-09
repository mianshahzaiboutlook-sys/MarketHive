import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Navbar from './components/Navbar.jsx';
import Signup from './screen/Signup.jsx';
import ActivateAccount from './screen/ActivateAccount.jsx';
import Login from './screen/Login.jsx';
import ResetPassword from './screen/ResetPassword.jsx';
import Dashboard from './screen/Dashboard.jsx';
import ProductsDashboard from './screen/ProductsDashboard.jsx';
import UsersDashboard from './screen/UsersDashboard.jsx';
import Orders from './screen/Orders.jsx';
import Profile from './screen/Profile.jsx';
import EditProfile from './screen/EditProfile.jsx';
import PageNotFound from './components/PageNotFound.jsx';
//E-Commerce imports
import ProductDetails from './components/ProductDetails.jsx';
import AddProduct from './screen/AddProduct.jsx';
import EditProduct from './screen/EditProduct.jsx';
// Toast notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Main App Component
import AuthProvider from './context/auth.jsx';
import CartProvider  from './context/CartContext.jsx';
import CartPage from './components/CartPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import PlaceOrder from './components/PlaceOrder.jsx';
import Users from './screen/Users.jsx';
//protacted route
import AdminRoute from './context/AdminRoute.jsx';
import SendOtp from './screen/SendOtp.jsx';
import VerifyOtp from './screen/VerifyOtp.jsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="top-0 sticky z-50">
            <Navbar />
          </div>

          <ToastContainer />

          <Routes>
            //Public Routes
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            //E-Commerce Product Details Route
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            //Private Routes
            <Route path="/forget-password" element={<SendOtp />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth/:token" element={<ActivateAccount />} />
            <Route path="/login" element={<Login />} />
            //Dashboard and other protected routes
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/products"
              element={
                <AdminRoute>
                  <ProductsDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/users"
              element={
                <AdminRoute>
                  <UsersDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/users"
              element={
                <AdminRoute>
                  <Users />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/addproduct"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/edit-product/:id"
              element={
                <AdminRoute>
                  <EditProduct />
                </AdminRoute>
              }
            />
            //User Profile and Orders Routes
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/orders" element={<Orders />} />
            // Catch-all route for undefined paths
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
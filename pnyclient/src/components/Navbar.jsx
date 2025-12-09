// import { NavLink, useNavigate } from "react-router-dom";
// import {useAuth} from "../context/auth";
// export default function Navbar() {
//   const [auth,setAuth] = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setAuth({
//       ...auth,
//       user:null,
//       token:""
//     })
//     localStorage.removeItem("auth");
//     navigate("/login");
//   }
//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
//       <h1 className="text-2xl font-bold text-rose-600">MarketHive</h1>

//       <div className="space-x-6 text-gray-700 font-medium">
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/about">About</NavLink>
//         {!auth?.user && (
//           <>
//             <NavLink to="/login">Login</NavLink>
//             <NavLink to="/signup">Signup</NavLink>
//           </>
//         )}
//         {auth?.user && (
//           <>
//             <NavLink to="/dashboard">Dashboard</NavLink>
//             <NavLink to="/tasks">Tasks</NavLink>
//             <NavLink to="/profile">Profile</NavLink>

//             <button
//               onClick={handleLogout}
//               className="text-red-500 font-semibold ml-4"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }



import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/CartContext.jsx";
import { FaShoppingCart, FaUser, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [auth, setAuth] = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = auth?.user; // logged-in user
  const isAdmin = user?.isAdmin; // boolean

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    setShowUserMenu(false);
    navigate("/login");
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const linkStyle = ({ isActive }) =>
    isActive ? "text-rose-600 font-semibold" : "hover:text-rose-600";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <NavLink to="/" className="text-2xl font-bold text-rose-600">
        MarketHive
      </NavLink>

      <div className="space-x-6 text-gray-700 font-medium flex items-center">
        <NavLink to="/" className={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkStyle}>
          About
        </NavLink>

        {!user && (
          <>
            <NavLink to="/login" className={linkStyle}>
              Login
            </NavLink>
            <NavLink to="/signup" className={linkStyle}>
              Signup
            </NavLink>
          </>
        )}

        {/* Cart */}
        <NavLink
          to="/cartpage"
          className="relative text-gray-700 hover:text-gray-900"
        >
          <FaShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </NavLink>

        {user && (
          <>
            {/* User Dropdown Menu - Extreme Right */}
            <div className="relative ml-auto">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-medium"
              >
                <FaUser size={18} />
                <span className="text-sm">{user.username}</span>
                <FaChevronDown size={12} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  {/* Admin Menu Items */}
                  {isAdmin && (
                    <>
                      <NavLink
                        to="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-t-lg"
                      >
                        Dashboard
                      </NavLink>
                    </>
                  )}

                  {/* Orders - for all users */}
                  <NavLink
                    to="/orders"
                    onClick={() => setShowUserMenu(false)}
                    className={`block px-4 py-2 hover:bg-gray-100 text-gray-700 ${isAdmin ? '' : 'rounded-t-lg'}`}
                  >
                    Orders
                  </NavLink>

                  {/* Profile - for all users */}
                  <NavLink
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Profile
                  </NavLink>

                  {/* Logout - for all users */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 font-semibold rounded-b-lg border-t border-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}






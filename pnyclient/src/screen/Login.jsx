import { useState, useEffect } from 'react';
import {useAuth} from '../context/auth'
import apis from '../config/apis'
import {errorToast, successToast} from '../hepler/toastify.js'
import  { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () =>{
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [user , setUser] = useState({
    email:'',
    password:''
  })

  // Redirect to home if already logged in
  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth?.user, navigate]);

  const [authState, setAuthState] = useAuth();
  
  const loginHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${apis.auth}/login`, user);

    const { error, message } = data;
    console.log("Login response data:", data);

    if (error) {
      errorToast(error);
    } else {
      console.log("Login response data:", data);
      navigate("/");
      successToast("Logged in Successfully");
      localStorage.setItem("auth", JSON.stringify(data));
      setAuthState(data);
      // setTimeout(() => {
      //   navigate("/home");
      // });
    }
  };

  const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser({...user, [name]: value})
  }

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-16 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={loginHandler}>
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={changeHandler}
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-6 focus:ring-2"
          />

          <input
            name="password"
            type="password"
            value={user.password}
            onChange={changeHandler}
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-6 focus:ring-2"
          />

          <button className="w-full bg-rose-500 text-white py-3 rounded-lg">
            Login
          </button>
          <div className="mt-12">
            <NavLink to="/signup">
              <p className="mt-6 text-center text-lg text-gray-600">
                Don't have an account?{" "}
                <span className="text-rose-500 font-bold">Sign Up</span>
              </p>
            </NavLink>
            <NavLink to="/forget-password">
              <p className="mt-2 text-center text-lg text-gray-600">
                Forgot your password?{" "}
                <span className="text-rose-500 font-bold">Reset Password</span>
              </p>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

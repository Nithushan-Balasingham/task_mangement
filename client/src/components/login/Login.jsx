import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "react-feather";
import { useForm } from "react-hook-form"; 

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const { loading } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };

      const config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/auth`,
        headers: {
          "Content-Type": "application/json",
        },
        data: loginData,
      };

      dispatch(signInStart());

      const response = await axios(config);

      toast.success("Logged in Successfully", { position: "top-center" });
      dispatch(signInSuccess(response.data));

      if (response.data.success === false) {
        dispatch(signInFailure());
        return;
      }

      navigate("/tasks");
    } catch (error) {
      dispatch(signInFailure(error));
      toast.error("Please check the email or password", { position: "top-center" });
    }
  };

  const handleSignUp = async (data) => {
    try {
      const registerData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: registerData,
      };

      dispatch(signInStart());

      const response = await axios(config);

      toast.success("Registered Successfully", { position: "top-center" });
      setIsLogin(true);
      dispatch(signInSuccess(response.data));

      if (response.data.success === false) {
        return;
      }
    } catch (error) {
      dispatch(signInFailure(error));
      toast.error("Registration failed", { position: "top-center" });
    }
  };

  const onSubmit = (data) => {
    if (isLogin) {
      handleLogin(data);
    } else {
      handleSignUp(data);
    }
  };

  return (
    <div className="flex justify-between items-center px-10 max-sm:pl-0 max-sm:px-1 max-sm:mx-3  h-screen ">
      <div className="flex flex-1 justify-center max-xl:hidden">
        <p className="text-6xl font-bold gradient poppins">Welcome to  App</p>
      </div>
      <div className="flex flex-1 justify-center items-center py-10 bg-white shadow-lg rounded-lg max-sm:mx-0 mx-28">
        <div className="w-full max-sm:px-6 px-16">
          <h1 className="text-3xl font-semibold text-[#30387D] gilroy">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pt-5">
            {!isLogin && (
              <>
                <div className="flex justify-between mt-4">
                  <label htmlFor="name" className="block text-md text-[#30387D] poppins">
                    Name
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Your name here"
                  id="name"
                  className="bg-slate-100 p-3 rounded-lg ring-1 ring-gray-500 hover:placeholder:text-[#30387D] placeholder:italic"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
              </>
            )}
            <div className="flex justify-between mt-4">
              <label htmlFor="email" className="block text-md text-[#30387D] poppins">
                Email
              </label>
            </div>

            <input
              type="email"
              placeholder="Email address here"
              id="email"
              className="bg-slate-100 p-3 rounded-lg ring-1 ring-gray-500 hover:placeholder:text-[#30387D] placeholder:italic"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

            <div className="flex justify-between mt-4">
              <label htmlFor="password" className="block text-md text-[#30387D] poppins ">
                Password
              </label>
              <div onClick={() => setVisible(!visible)} className="cursor-pointer">
                {visible ? <EyeOff /> : <Eye />}
              </div>
            </div>
            <input
              type={visible ? "password" : "text"}
              placeholder="************"
              id="password"
              className="bg-slate-100 p-3 rounded-lg ring-1 ring-gray-500 hover:placeholder:text-[#30387D]"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

            {isLogin ? (
              <button
                disabled={loading}
                className="bg-[#6A82FF] text-lg font-bold gilroy text-white p-3 rounded-lg hover:bg-[#536CF0] focus:bg-[#3E51B4]"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            ) : (
              <button
                disabled={loading}
                className="bg-[#6A82FF] text-lg font-bold gilroy text-white p-3 rounded-lg hover:bg-[#536CF0] focus:bg-[#3E51B4]"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            )}
          </form>
          <div className="flex gap-2 mt-5">
            <div
              onClick={toggleForm}
              className="underline cursor-pointer text-[#4D74F9] gilroy font-bold"
            >
              {isLogin ? "Sign Up" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

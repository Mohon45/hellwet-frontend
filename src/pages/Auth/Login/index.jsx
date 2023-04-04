import React, { useState } from "react";
import authLogo from "../../../assets/img/authentication_re_svpt.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../shared/LoadingOverlay/LoadingOverlay";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmitHandler = (data) => {
    setLoading(true);
    axios
      .post("https://hellwet-task.onrender.com/api/user/signin", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const user = {
          name: res.data.data.others.name,
          email: res.data.data.others.email,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setLoading(false);
        navigate("/");
        toast.success("User Login Success!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("User not login!");
      });
  };
  return (
    <LoadingOverlay active={loading}>
      <div>
        <div className="w-[100%] flex">
          <div className="w-[50%]">
            <div className="card w-[80%] mx-auto mt-32 bg-base-100 py-10 px-20 login-box rounded-lg">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-4xl font-semibold my-4">
                  Login
                </h2>
                <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="flex flex-col justify-start">
                      <label
                        className="text-left text-xl font-bold my-2"
                        htmlFor="email"
                      >
                        Email:
                      </label>
                      <input
                        to="email"
                        type="email"
                        {...register("email")}
                        placeholder="enter your email"
                        className="border-2 border-green-500 rounded-md focus:border-green-500 focus:outline-none px-4 py-2 focus:bg-[#22c55e13]"
                      />
                    </div>
                    <div className="w-[500px] flex flex-col justify-start">
                      <label
                        className="text-left text-xl font-bold my-2"
                        htmlFor="password"
                      >
                        Password:
                      </label>
                      <input
                        to="password"
                        type="password"
                        {...register("password")}
                        placeholder="enter your password"
                        className="border-2 border-green-500 rounded-md focus:border-green-500 focus:outline-none px-4 py-2 focus:bg-[#22c55e13]"
                      />
                    </div>
                    <p
                      className="text-green-500 cursor-pointer"
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      New User? Please Register
                    </p>
                    <button
                      type="submit"
                      className="bg-green-500 mt-8 text-xl text-white px-6 py-2 rounded-lg"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%]">
            <img src={authLogo} className="w-[700px] mx-auto mt-32" alt="" />
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Login;

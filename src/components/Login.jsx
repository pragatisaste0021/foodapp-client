import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const { signUpWithGmail, login, token } = useAuth();
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  

  //react hook form
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const email = data.email;
    const password = data.password;

    // const token = await localStorage.getItem('access-token');

    await login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        // console.log(user);

        const userInfo = {
          name: data.name,
          email: data.email
        }
        // setToken(token);
        console.log("Token " + token);
      axiosPublic.post("/users", userInfo,  {headers: {
        Authorization: `Bearer ${token}`} // Add your token if needed
    }).then((response)=>{
        // console.log(response);
        alert("Signin successful!");
        // navigate(from, { replace: true });
        console.log("Navigating to home");
        navigate("/");
      })

        // alert("Login successful!");
        // navigate(from);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage("Please provide valid email & password!");
      });
      reset()

  };

  // login with google
  const handleRegister = async() => {
    const token = await localStorage.getItem('access-token');
    signUpWithGmail()
        .then((result) => {
          const user = result.user;

          const userInfo = {
            name: result?.user?.displayName,
            email: result?.user?.email
          }
          
          axiosPublic.post("/users", userInfo,  {headers: {
            Authorization: `Bearer ${token}`} // Add your token if needed
        }).then((response)=>{
            // console.log(response);
          alert("Signin successful!");
          navigate("/");
          })
        })
        .catch((error) => console.log(error));
  };
  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
    <div className="mb-5">
    <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Login"
              />
            </div>

            {/* close btn */}
            <Link to="/">
            <div
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </div></Link>

            <p className="text-center my-2">
              Donot have an account?
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>
          </form>
    <div className="text-center space-x-3">
        <button onClick={handleRegister} className="btn btn-circle hover:bg-green hover:text-white">
          <FaGoogle />
        </button>
        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaFacebookF />
        </button>
        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaGithub />
        </button>
      </div>
    </div>
  </div>
  )
}

export default Login
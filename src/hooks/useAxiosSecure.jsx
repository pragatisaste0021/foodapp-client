import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from './useAuth'
import { AuthContext } from '../contexts/AuthProvider'

const axiosSecure = axios.create({
    baseURL : "http://localhost:6001",
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const {logOut} = useAuth();
    // const {logOut} = useContext(AuthContext);

    // Add a request interceptor
    axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access-token");
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  // Add a response interceptor
    axiosSecure.interceptors.response.use(function (response) {
    
    return response;
  }, 
  
  async (error) => {
    const status = error.response.status;

    if(status === 401 || status === 403){
        await logOut();
        console.log("Navigating to Login");
        navigate("/login");
    }
    return Promise.reject(error);
  });

  return axiosSecure;
}

export default useAxiosSecure

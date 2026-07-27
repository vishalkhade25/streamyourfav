import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance';
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formFields, setFormFields] = useState({
    email:"",
    password:""
  });

  const handleChange = (e) =>{
    setFormFields({
      ...formFields,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login",formFields);
      login(response.data.token);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  }
  
  return (
    <div className="bg-neutral-950 flex items-center justify-center py-4 px-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">Stream<span className="text-red-600">YourFav</span></h1>
          <p className="text-neutral-400 text-sm mt-2">Sign in to continue watching</p>
        </div>

        <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
              <input type="email" name="email" placeholder="you@example.com" value={formFields.email} onChange={handleChange}
                className="w-full bg-neutral-800/60 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Password</label>
              <input type="password" name="password" placeholder="Enter password" value={formFields.password} onChange={handleChange}
                className="w-full bg-neutral-800/60 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" />
            </div>
            <button type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium mt-2">
              Log In
            </button>
          </form>
          <p className="text-center text-neutral-400 text-sm mt-6">
            Don't have an account? <Link to="/signup" className="text-red-500 hover:text-red-400 font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;

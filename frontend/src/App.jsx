import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MovieDetail from './pages/MovieDetail'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import WatchPage from './pages/WatchPage'
import Footer from './components/Footer'
import AdminDashboard from './admin/AdminDashboard';
import MovieUpload from './admin/MovieUpload';
import MovieUpdate from './admin/MovieUpdate';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <ToastContainer position="top-right" theme="dark" autoClose={3000} />
        <Navbar />
        <main className="flex-1 bg-neutral-950">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/upload" element={<ProtectedRoute adminOnly={true}><MovieUpload /></ProtectedRoute>} />
            <Route path="/admin/update/:id" element={<ProtectedRoute adminOnly={true}><MovieUpdate /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;

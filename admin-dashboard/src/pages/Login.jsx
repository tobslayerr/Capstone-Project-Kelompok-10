import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white font-poppins relative">
      <div className="bg-white p-8 rounded-2xl w-[370px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] z-20 border border-blue-200">
        <div className="text-center mb-4">
          <h2 className="text-xs font-bold text-gray-600 tracking-wide">ADMIN</h2>
          <h2 className="text-xs font-bold text-gray-600 tracking-wide">SI-EVENT</h2>
        </div>
        <h1 className="text-3xl font-extrabold text-center text-[#0084ff] mb-6">Log In</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Masukkan Email"
              className="w-full px-4 py-2.5 rounded-lg bg-blue-50 placeholder-gray-400 text-sm text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Password</label>
            <div className="flex items-center bg-blue-50 rounded-lg px-3 border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400 transition">
              <input
                type="password"
                placeholder="Masukkan Password"
                className="w-full py-2.5 bg-transparent text-sm text-black placeholder-gray-400 focus:outline-none"
              />
              <FaLock className="text-gray-500 ml-2" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#0084ff] text-white py-2.5 rounded-lg font-semibold hover:bg-[#006fd3] transition transform active:scale-95"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
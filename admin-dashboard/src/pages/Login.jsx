import { FaLock } from 'react-icons/fa';

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-poppins relative overflow-hidden">
      {/* Login Card */}
      <div className="bg-[#0084ff] text-white p-8 rounded-[2rem] w-[350px] shadow-lg z-20">
        <div className="text-center mb-4">
          <h2 className="text-sm font-semibold">ADMIN</h2>
          <h2 className="text-sm font-semibold">SI-EVENT</h2>
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>

        <form className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              type="email"
              placeholder="Masukkan Email"
              className="w-full px-4 py-2 rounded-md bg-blue-200 placeholder-gray-700 text-sm text-black focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm block mb-1">Password</label>
            <div className="flex items-center bg-blue-200 rounded-md px-3">
              <input
                type="password"
                placeholder="Masukkan Password"
                className="w-full py-2 bg-transparent text-sm text-black placeholder-gray-700 focus:outline-none"
              />
              <FaLock className="text-gray-600" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

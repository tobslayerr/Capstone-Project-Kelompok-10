import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-poppins">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition"
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;

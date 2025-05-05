import { FaUsers, FaUserShield, FaCalendarCheck, FaCogs } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-100 p-5 shadow-md">
      <h2 className="text-xl font-bold mb-8">SI-EVENT Admin</h2>
      <ul className="space-y-4 text-gray-700">
        <li className="flex items-center gap-2"><FaUsers /> Active Buyers</li>
        <li className="flex items-center gap-2"><FaUserShield /> Event Creators</li>
        <li className="flex items-center gap-2"><FaCalendarCheck /> Banner</li>
        <li className="flex items-center gap-2"><FaCogs /> User Management</li>
      </ul>
    </div>
  );
};

export default Sidebar;

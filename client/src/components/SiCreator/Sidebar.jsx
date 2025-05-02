import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Event', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Event', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Customer Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  return (
    isEducator && (
      <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col justify-between">
        <div>
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === '/educator'}
              className={({ isActive }) =>
                `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${
                  isActive
                    ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90'
                    : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'
                }`
              }
            >
              <img src={item.icon} alt="" className="w-6 h-6" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Back to Home Button */}
        <div className="mt-4 px-4 flex justify-center">
          {/* Mobile (icon only) */}
          <button
            onClick={() => navigate('/')}
            className="md:hidden p-2 rounded-full bg-blue-600 text-white hover:bg-blue-400 transition active:scale-95"
            title="Back to Home"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Desktop (full button) */}
          <button
            onClick={() => navigate('/')}
            className="hidden md:block w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-300 transition active:scale-95"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  );
};

export default Sidebar;

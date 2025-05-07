import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [educatorStatus, setEducatorStatus] = useState(null);
  const dropdownRef = useRef(null);

  const isCourseListPage = location.pathname.includes('/course-list');

  const fetchEducatorStatus = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/educator/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setEducatorStatus(data.status); // e.g., 'pending', 'approved', 'rejected', or null
        setIsEducator(data.status === 'approved');
      } else {
        setEducatorStatus(null);
        setIsEducator(false);
      }
    } catch (err) {
      console.error(err);
      setEducatorStatus(null);
      setIsEducator(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchEducatorStatus();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const becomeEducator = async () => {
    try {
      if (educatorStatus === 'approved') {
        navigate('/educator');
      } else {
        navigate('/educator/apply');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`relative z-50 flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-white py-4 shadow-lg ${isCourseListPage ? 'bg-blue-800' : 'bg-blue-900'}`}>
      <Link to="/">
        <h1 className="font-medium text-white text-xl hover:text-gray-300 transition">SiEvent</h1>
      </Link>

      <div className="hidden md:flex items-center gap-6 text-white">
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center gap-1 font-medium focus:outline-none">
            Menu <ChevronDown size={18} />
          </button>
          <div
            className={`absolute bg-white text-black mt-2 rounded shadow-lg z-50 min-w-[120px] overflow-hidden transition-all duration-300 ease-out transform ${
              dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <Link to="/harga" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
              Harga
            </Link>
            <Link to="/event" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
              Event
            </Link>
          </div>
        </div>

        {user && (
          <>
            {educatorStatus === 'pending' && (
              <button disabled className="opacity-50 cursor-not-allowed" title="Menunggu persetujuan SuperAdmin">
                Waiting Approval
              </button>
            )}
            {educatorStatus === 'approved' && <button onClick={() => navigate('/educator')}>SiCreator Dashboard</button>}
            {!educatorStatus && <button onClick={() => navigate('/educator/apply')}>Become SiCreator</button>}
            <Link to="/my-enrollments">My Enrollments</Link>
          </>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button onClick={openSignIn} className="bg-blue-600 text-white px-5 py-2 rounded-full">
            Create Account
          </button>
        )}
      </div>

      <div className="md:hidden flex items-center gap-3 text-white">
        <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={28} /> : <Menu size={28} />}</button>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={openSignIn} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            Create
          </button>
        )}
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-blue-800 text-white flex flex-col items-start px-6 py-4 gap-3 md:hidden shadow-lg z-40 transform transition-all duration-300 ease-in-out origin-top ${
          menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative">
          <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center gap-1 font-medium">
            Menu <ChevronDown size={18} />
          </button>
          <div
            className={`absolute bg-white text-black mt-2 rounded shadow-lg z-50 min-w-[120px] overflow-hidden transition-all duration-300 ease-out transform ${
              dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <Link to="/harga" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
              Harga
            </Link>
            <Link to="/event" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
              Event
            </Link>
          </div>
        </div>

        {user && (
          <>
            {educatorStatus === 'pending' && (
              <button disabled className="opacity-50 cursor-not-allowed" title="Menunggu persetujuan SuperAdmin">
                Waiting Approval
              </button>
            )}
            {educatorStatus === 'approved' && <button onClick={() => navigate('/educator')}>SiCreator Dashboard</button>}
            {!educatorStatus && <button onClick={() => navigate('/educator/apply')}>Become SiCreator</button>}
            <Link to="/my-enrollments">My Enrollments</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

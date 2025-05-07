import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/Customer/Loading';

const StudentsEnrolled = () => {
  const { backendUrl, getToken, isEducator } = useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + '/api/educator/enrolled-students',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();
    }
  }, [isEducator]);

  return enrolledStudents ? (
    <div className="min-h-screen md:p-8 p-4 pt-8 pb-0">
      <h2 className="text-2xl font-bold mb-6">Manage Event Tickets</h2>

      <div className="space-y-6">
        {enrolledStudents.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md p-4 shadow-sm bg-white"
          >
            <div className="flex items-center space-x-4 mb-3">
              <img
                src={item.student.imageUrl}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{item.student.name}</p>
                <p className="text-sm text-gray-500">{item.courseTitle}</p>
                <p className="text-sm text-gray-400">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium">Ticket Type</label>
              <select
                disabled
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="">Select Type (Coming Soon)</option>
                <option value="pdf">PDF Ticket</option>
                <option value="zoom">Zoom Link</option>
                <option value="gmeet">Google Meet Link</option>
              </select>

              <input
                disabled
                type="text"
                placeholder="Enter event link if online"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />

              <input
                disabled
                type="text"
                placeholder="Enter password (if any)"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />

              <button
                disabled
                className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded cursor-not-allowed"
              >
                Save Ticket (Coming Soon)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;

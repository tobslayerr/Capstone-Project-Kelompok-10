import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/Customer/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);
  const [courses, setCourses] = useState(null);
  const navigate = useNavigate();

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/educator/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error(data.message || 'Failed to fetch courses');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const token = await getToken();
      const { data } = await axios.delete(`${backendUrl}/api/educator/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success('Event deleted successfully');
        // Refresh list
        fetchEducatorCourses();
      } else {
        toast.error(data.message || 'Failed to delete course');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  const handleUpdate = (courseId) => {
    navigate(`/educator/update-course/${courseId}`); // Navigasi ke halaman update course
  };

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  if (courses === null) {
    return <Loading />;
  }

  if (courses.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-gray-600 text-xl">You don't have any events yet.</h2>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-start md:p-8 p-4 pt-8">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">My Events</h2>

        <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-300 shadow">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Event</th>
                <th className="px-4 py-3 text-left">Earnings</th>
                <th className="px-4 py-3 text-left">Participants</th>
                <th className="px-4 py-3 text-left">Published On</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {courses.map((course) => {
                const earnings = course.enrolledStudents.length * (course.coursePrice - (course.discount * course.coursePrice) / 100);

                return (
                  <tr key={course._id} className="border-b hover:bg-gray-50">
                    <td className="flex items-center space-x-3 px-4 py-3">
                      <img src={course.courseThumbnail} alt={course.courseTitle} className="w-16 h-16 object-cover rounded" />
                      <span className="truncate">{course.courseTitle}</span>
                    </td>
                    <td className="px-4 py-3">
                      {currency} {Math.floor(earnings).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{course.enrolledStudents.length}</td>
                    <td className="px-4 py-3">{new Date(course.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button onClick={() => handleDelete(course._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded">
                        Delete
                      </button>
                      <button onClick={() => handleUpdate(course._id)} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded">
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;

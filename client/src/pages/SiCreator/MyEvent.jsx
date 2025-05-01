import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/Customer/Loading';
import axios from 'axios';
import { toast } from 'react-toastify'; // ✅ Jangan lupa import toast!

const MyCourses = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);

  const [courses, setCourses] = useState(null); // ✅ Awalnya null, supaya tahu data belum dimuat

  // ✅ Fungsi untuk fetch courses milik educator
  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken(); // Ambil token user login
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

  useEffect(() => {
    // ✅ Fetch data hanya jika user adalah educator
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  // ✅ Kondisi loading jika courses belum dimuat
  if (courses === null) {
    return <Loading />;
  }

  // ✅ Kondisi jika belum ada course
  if (courses.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-gray-600 text-xl">You don't have any events yet.</h2>
      </div>
    );
  }

  // ✅ Kondisi jika courses sudah ada
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

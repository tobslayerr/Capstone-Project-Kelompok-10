import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Loading from '../../components/Customer/Loading';

const UpdateEvent = () => {
  const { currency, backendUrl, getToken } = useContext(AppContext);
  const { id } = useParams(); // Ambil ID course dari URL
  const [course, setCourse] = useState(null);
  const [courseData, setCourseData] = useState({
    courseTitle: '',
    coursePrice: '',
    discount: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  // Fetch data course berdasarkan ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(`${backendUrl}/api/educator/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setCourse(data.course);
          setCourseData({
            courseTitle: data.course.courseTitle,
            coursePrice: data.course.coursePrice,
            discount: data.course.discount,
            description: data.course.description,
          });
        } else {
          toast.error(data.message || 'Failed to fetch course data');
        }
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
      }
    };

    fetchCourse();
  }, [id, backendUrl, getToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append('courseData', JSON.stringify(courseData));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const { data } = await axios.put(`${backendUrl}/api/educator/courses/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success('Course updated successfully');
        navigate('/educator/my-courses'); // Arahkan ke halaman daftar course setelah berhasil update
      } else {
        toast.error(data.message || 'Failed to update course');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  if (!course) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex flex-col items-start md:p-8 p-4 pt-8">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">Update Course</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="courseTitle" className="block text-sm text-gray-700">
              Course Title
            </label>
            <input type="text" id="courseTitle" name="courseTitle" value={courseData.courseTitle} onChange={handleChange} className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md" required />
          </div>

          <div>
            <label htmlFor="coursePrice" className="block text-sm text-gray-700">
              Course Price
            </label>
            <input type="number" id="coursePrice" name="coursePrice" value={courseData.coursePrice} onChange={handleChange} className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md" required />
          </div>

          <div>
            <label htmlFor="discount" className="block text-sm text-gray-700">
              Discount (%)
            </label>
            <input type="number" id="discount" name="discount" value={courseData.discount} onChange={handleChange} className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md" required />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm text-gray-700">
              Description
            </label>
            <textarea id="description" name="description" value={courseData.description} onChange={handleChange} className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md" required />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm text-gray-700">
              Course Thumbnail
            </label>
            <input type="file" id="image" name="image" onChange={handleImageChange} className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md" />
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
              Update Course
            </button>
            <button type="button" onClick={() => navigate('/educator/my-courses')} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Customer/Footer';
import Rating from '../../components/Customer/Rating';
import { toast } from 'react-toastify';
import Loading from '../../components/Customer/Loading';
import axios from 'axios';

const Player = () => {
  const { enrolledCourses, backendUrl, getToken, userData, fetchUserEnrolledCourses } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  useEffect(() => {
    if (enrolledCourses.length === 0) return;

    const foundCourse = enrolledCourses.find((course) => course._id === courseId);

    if (foundCourse) {
      setCourseData(foundCourse);

      const userRating = foundCourse.courseRatings?.find((rating) => rating.userId === userData._id);
      if (userRating) {
        setInitialRating(userRating.rating);
      }
    }
  }, [enrolledCourses, courseId, userData._id]);

  const handleRate = async (rating) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(`${backendUrl}/api/user/add-rating`, { courseId, rating }, { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        toast.success(data.message);
        setInitialRating(rating); // Update tampilan rating langsung
        fetchUserEnrolledCourses(); // Opsional, refresh enrolled course dari server
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!courseData) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4 sm:p-10 flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* Left Column */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Event Information</h2>

          <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this event:</h1>
            <Rating initialRating={initialRating} onRate={handleRate} disabled={initialRating !== 0} />
          </div>
        </div>

        {/* Right Column */}
        <div>{courseData.courseThumbnail ? <img src={courseData.courseThumbnail} alt="Course Thumbnail" className="rounded-lg shadow-md" /> : <div className="text-center text-gray-500">No thumbnail available</div>}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Player;

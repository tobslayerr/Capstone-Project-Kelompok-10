import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/Customer/Loading';
import { assets } from '../../assets/assets';
import Footer from '../../components/Customer/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);

  const { allCourses, calculateRating, currency, backendUrl, userData, getToken } = useContext(AppContext);

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/course/' + id);
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const enrollCourse = async () => {
    try {
      if (!userData) {
        return toast.warn('Login to Enroll');
      }
      if (isAlreadyEnrolled) {
        return toast.warn('Already Enrolled');
      }

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + '/api/user/purchase',
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>
        
        <button
          onClick={() => navigate('/')}
          className="z-10 mb-1 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-300 transition md:absolute md:top-8 md:left-25 active:scale-90"
        >
          Back to Home
        </button>
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-course-deatails-heading-large text-course-deatails-heading-small font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}
          ></p>

          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                  alt=""
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>

            <p className="text-blue-600">
              ({courseData.courseRatings.length}{' '}
              {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})
            </p>

            <p>
              {courseData.enrolledStudents.length}{' '}
              {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}
            </p>
          </div>

          <p className="text-sm">
            Course by <span className="text-blue-600 underline">{courseData.educator.name}</span>
          </p>

          <div className="py-20 text-sm md:text-default">
            <h3 className="text-zl font-semibold text-gray-800">Event Description</h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            ></p>
          </div>
        </div>

        <div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
          <img src={courseData.courseThumbnail} alt="" />
          <div className="p-5">
            <div className="flex items-center gap-2">
              <img className="w-3.5" src={assets.time_left_clock_icon} alt="time left clock icon" />
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>

            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}
                {(courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="md:text-lg text-gray-500">{courseData.discount}% off</p>
            </div>

            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="clock icon" />
                <p>Online</p>
              </div>
            </div>

            <button
              onClick={enrollCourse}
              className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium"
            >
              {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>
            
            <button
              onClick={() => toast.info("Fitur ini Sedang dalam tahap pengembangan")}
              className="mt-2 w-full py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Report Event
            </button> 
            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">What's in the event?</p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resource</li>
                <li>Certificate of completion</li>
              </ul>
              
            </div>
            
          </div>
          
        </div>
        
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;

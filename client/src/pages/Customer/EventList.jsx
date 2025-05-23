import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/Customer/SearchBar';
import { useNavigate, useParams } from 'react-router-dom';
import CourseCard from '../../components/Customer/EventCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/Customer/Footer';

const CoursesList = () => {
  const { allCourses } = useContext(AppContext);
  const { input } = useParams();
  const navigate = useNavigate();

  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <button
          onClick={() => navigate('/')}
          className="mb-4 py-2 px-6 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-300 transition active:scale-90"
        >
          Back to Home
        </button>

        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
            <p className="text-gray-500">
              <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
                Home
              </span>
              / <span>Course List</span>
            </p>
          </div>

          <SearchBar data={input} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-4 text-gray-600">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="Clear search"
              className="cursor-pointer"
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourse.length > 0 ? (
            filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No courses found for "{input}"
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoursesList;

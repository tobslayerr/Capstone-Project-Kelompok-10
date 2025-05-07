import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const EventCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  return (
    <Link to={'/course/' + course._id} onClick={() => scrollTo(0, 0)} className="border border-gray-400 pb-6 overflow-hidden rounded-lg transition duration-300 active:scale-90 hover:shadow-lg hover:bg-gray-200">
      <img className="w-full" src={course.courseThumbnail} alt="" />

      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        {course.educator && course.educator.name ? (
  <p className="text-gray-500">{course.educator.name}</p>
) : (
  <p className="text-gray-500">Unknown Educator</p>
)}
        <div className="flex items-center space-x-2">
          <p>{calculateRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt="" className="w-3.5 h-3.5" />
            ))}
          </div>

          <p className="text-gray-500">{course.courseRatings.length}</p>
        </div>

        <p className="text-base font-semibold text-gray-800">
          {course.coursePrice - (course.discount * course.coursePrice) / 100 === 0 ? (
            <span className="inline-block bg-green-100 text-green-600 text-sm font-semibold px-2 py-1 rounded">Free</span>
          ) : (
            <>
              {currency}
              {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
            </>
          )}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;

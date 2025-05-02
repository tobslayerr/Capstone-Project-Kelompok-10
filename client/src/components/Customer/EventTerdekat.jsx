import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import EventCard from "./EventCard"; 

const EventTerdekat = () => {
  const { allCourses } = useContext(AppContext);
  const events = allCourses.slice(0, 5); 

  return (
    <div className="relative max-w-6xl mx-auto px-4 pt-20">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Event Terdekat</h2>
        <Link
          to="/course-list"
          onClick={() => scrollTo(0, 0)}
          className="ml-16 border border-blue-600 rounded-md px-3 sm:px-5 py-1.5 sm:py-2 font-medium text-black text-xs sm:text-sm w-[90px] sm:w-[95px] transition hover:bg-blue-600 hover:text-white active:scale-90 duration-300"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {events.map((course, index) => (
          <EventCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default EventTerdekat;

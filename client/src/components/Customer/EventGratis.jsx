import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import EventCard from "./EventCard"; // pastikan path-nya sesuai

const EventGratis = () => {
  const { allCourses } = useContext(AppContext);
  const events = allCourses.slice(0, 4); // ambil 4 event teratas

  return (
    <div className="max-w-[90%] sm:max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-8">Event Gratis</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {events.map((event, index) => (
          <EventCard key={index} course={event} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          className="border border-blue-600 px-6 py-3 rounded-md text-sm font-medium transition duration-300 hover:bg-blue-600 hover:text-white active:scale-90"
          aria-label="Lihat selengkapnya"
        >
          Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default EventGratis;

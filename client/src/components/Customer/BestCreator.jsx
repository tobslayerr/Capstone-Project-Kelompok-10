import React from "react";
import { FaStar } from "react-icons/fa";
import { assets } from '../../assets/assets';

const creators = [
  { id: 1, name: "Lorem Ipsum Lorem", image: assets.profile , followers: "1.290", rating: "4.9" },
  { id: 2, name: "Lorem Ipsum Lorem", image: assets.profile , followers: "1.290", rating: "4.9" },
  { id: 3, name: "Lorem Ipsum Lorem", image: assets.profile , followers: "1.290", rating: "4.9" },
  { id: 4, name: "Lorem Ipsum Lorem", image: assets.profile , followers: "1.290", rating: "4.9" },
];

const BestCreator = () => {
  return (
    <div className="max-w-[90%] sm:max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cyan-300/70 shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Best Creator</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="bg-gradient-to-b from-cyan-400/50 p-5 rounded-lg shadow flex flex-col items-center text-center cursor-pointer transition duration-300 hover:shadow-lg hover:bg-gray-200"
          >
            <img
              src={creator.image}
              alt={creator.name}
              className="w-20 h-20 object-cover rounded-full mb-3 transition active:scale-90"
            />
            <h3 className="text-sm font-semibold">{creator.name}</h3>
            <div className="flex items-center justify-center gap-2 mt-1 text-xs sm:text-sm text-gray-600">
              <span>{creator.followers} followers</span>
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-500 text-xs sm:text-sm" />
                {creator.rating}
              </span>
            </div>
            <button
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md text-xs font-medium transition duration-300 hover:bg-blue-300 active:scale-90"
            >
              Follow
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          className="border border-blue-600 px-6 py-3 rounded-md text-sm font-medium transition duration-300 hover:bg-blue-600 hover:text-white active:scale-90"
        >
          Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default BestCreator;
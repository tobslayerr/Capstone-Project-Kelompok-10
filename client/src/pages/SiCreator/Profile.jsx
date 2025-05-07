import React from 'react';
import { assets } from '../../assets/assets';

const Profile = () => {
  // Dummy data
  const creator = {
    name: 'Lorem Ipsum',
    imageUrl: assets.profile ,
    isVerified: false, 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50 text-gray-700">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm text-center">
        <img
          src={creator.imageUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
        />
        <h2 className="text-2xl font-semibold mb-2">{creator.name}</h2>
        <p
          className={`px-3 py-1 inline-block rounded-full text-sm font-medium ${
            creator.isVerified ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
          }`}
        >
          {creator.isVerified ? 'Verified Creator' : 'Not Verified'}
        </p>
      </div>
    </div>
  );
};

export default Profile;

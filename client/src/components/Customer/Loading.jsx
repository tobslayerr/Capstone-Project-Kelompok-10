import React from 'react';
import { ClipLoader } from 'react-spinners';
import Skeleton from 'react-loading-skeleton';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
      <ClipLoader size={50} color="#36D7B7" />

      <div className="w-full max-w-xl space-y-4 mt-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border p-4 rounded-lg shadow-sm">
            <Skeleton height={20} width="50%" />
            <Skeleton count={2} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;

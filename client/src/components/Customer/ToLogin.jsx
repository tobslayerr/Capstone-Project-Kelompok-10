import { useClerk } from '@clerk/clerk-react';

const ToLogin = () => {
  const { openSignIn } = useClerk();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <h2 className="text-xl sm:text-2xl font-bold text-center">
        Masuk/Buat akun untuk memudahkan booking
      </h2>
      <p className="text-sm sm:text-base text-gray-600 text-center mt-2">
        Silahkan Login/Buat akun
      </p>

      <button
        onClick={() => openSignIn()}
        className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium transition duration-300 hover:bg-blue-400 active:scale-90"
      >
        Sign in
      </button>
    </div>
  );
};

export default ToLogin;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md md:max-w-xl">
        <h2 className="text-2xl mb-4 text-center text-red-500">Unauthorized Access</h2>
        <p className="text-center mb-6">You are not logged in</p>
        <button 
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
          onClick={redirectToHome}
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
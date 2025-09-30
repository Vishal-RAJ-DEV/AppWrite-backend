import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-xl font-semibold mb-2">Something went wrong</p>
        
        {error.status === 404 ? (
          <div className="mb-4">
            <p className="text-gray-700">The page you're looking for doesn't exist.</p>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-gray-700">An unexpected error occurred.</p>
            <p className="text-sm text-gray-500 mt-1">{error.message || 'Unknown error'}</p>
          </div>
        )}
        
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;

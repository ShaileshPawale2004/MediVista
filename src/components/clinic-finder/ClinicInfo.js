import React from 'react';

const ClinicInfo = ({ clinic, onGetDirections }) => {
  const { name, vicinity, rating, opening_hours, place_id } = clinic;

  const handleGetDirections = () => {
    onGetDirections(place_id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold text-primary mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">{vicinity}</p>
      
      {rating && (
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-gray-700">{rating}</span>
        </div>
      )}
      
      {opening_hours && (
        <div className="mb-3">
          <span className={`text-sm ${
            opening_hours.open_now ? 'text-green-600' : 'text-red-600'
          }`}>
            {opening_hours.open_now ? 'Open Now' : 'Closed'}
          </span>
        </div>
      )}
      
      <button
        onClick={handleGetDirections}
        className="w-full bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Get Directions
      </button>
    </div>
  );
};

export default ClinicInfo;

import React from 'react';
import HotelCard from './HotelCard';

const HotelsList = ({ hotels }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
        <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {hotels.length} hotels found
        </span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelsList; 
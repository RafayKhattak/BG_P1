import React from 'react';

const MarketInsights = ({ hotels, currency }) => {
  const avgPrice = hotels.reduce((acc, hotel) => {
    const price = parseInt(hotel.price?.replace(/[^0-9]/g, '')) || 0;
    return acc + price;
  }, 0) / hotels.length;

  const avgRating = hotels.reduce((acc, hotel) => {
    return acc + (hotel.rating?.score || 0);
  }, 0) / hotels.length;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-black mb-4">Market Insights</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Average Price</p>
          <p className="text-2xl font-bold text-blue-600">{currency} {avgPrice.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Average Rating</p>
          <p className="text-2xl font-bold text-green-600">{avgRating.toFixed(1)}/10</p>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights; 
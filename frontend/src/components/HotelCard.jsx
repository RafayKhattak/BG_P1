import React, { useState } from 'react';
import ReviewsModal from './ReviewsModal';

const HotelCard = ({ hotel }) => {
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  // Function to render stars
  const renderStars = (stars) => {
    if (!stars) return null;
    return (
      <div className="flex items-center mt-1">
        <div className="flex text-yellow-400">
          {[...Array(stars)].map((_, i) => (
            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-gray-600 text-sm ml-1">{stars} Star{stars !== 1 ? 's' : ''}</span>
      </div>
    );
  };

  const handleReviewsClick = () => {
    setIsReviewsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3"></div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">{hotel.name}</h2>
          {renderStars(hotel.stars)}
          <div className="space-y-2 mt-2">
            <p className="text-gray-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              {hotel.location}
            </p>
            {hotel.distance_from_center !== null && (
              <p className="text-gray-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{hotel.distance_from_center} km from center</span>
              </p>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              {hotel.rating && hotel.rating.score && (
                <div className="flex items-center">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-lg font-bold">
                    {hotel.rating.score}
                  </span>
                  <button
                    onClick={handleReviewsClick}
                    className="text-gray-600 ml-2 hover:text-blue-600 transition-colors"
                  >
                    ({hotel.rating.reviews} reviews)
                  </button>
                </div>
              )}
            </div>
            <div className="text-lg font-bold text-green-600">{hotel.price}</div>
          </div>

          <div className="mt-6 space-y-2">
            <a
              href={hotel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Deal
            </a>
            <button
              onClick={handleReviewsClick}
              className="block w-full text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Read Reviews
            </button>
          </div>
        </div>
      </div>

      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        reviews={hotel.reviews || []}
      />
    </>
  );
};

export default HotelCard; 
import React from 'react';

const ReviewsModal = ({ isOpen, onClose, reviews = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600">
          <h2 className="text-2xl font-bold text-white">Guest Reviews</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)] bg-gray-50">
          {!reviews || reviews.length === 0 ? (
            <div className="text-gray-500 text-center p-8 bg-white rounded-xl shadow-sm">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-lg font-medium">No reviews available yet</p>
              <p className="text-gray-400 mt-1">Be the first one to review this property</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-xl text-gray-800">{review.review_title || 'Review'}</h3>
                      <div className="flex items-center mt-2 text-gray-600">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                        <span className="font-medium">{review.reviewer_name}</span>
                        <span className="mx-2">•</span>
                        <span>{review.reviewer_country}</span>
                        {review.review_count && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="text-blue-600">{review.review_count}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-lg">
                        {review.review_score}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    {review.review_positive && (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <div className="flex items-center text-green-700 font-medium mb-2">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          Positive
                        </div>
                        <p className="text-gray-700">{review.review_positive}</p>
                      </div>
                    )}
                    
                    {review.review_negative && (
                      <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                        <div className="flex items-center text-red-700 font-medium mb-2">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14H4.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 017.736 3h4.018c.163 0 .326.02.485.06L16 4m-6 10v2a2 2 0 002 2h2.5" />
                          </svg>
                          Negative
                        </div>
                        <p className="text-gray-700">{review.review_negative}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center mt-4 text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {review.review_date}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal; 
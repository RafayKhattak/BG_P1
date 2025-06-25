import React, { useMemo } from 'react';

const ReviewAnalytics = ({ reviews }) => {
  const analysis = useMemo(() => {
    if (!reviews || reviews.length === 0) return null;

    const sentimentData = {
      totalReviews: reviews.length,
      averageScore: 0,
      commonPositive: {},
      commonNegative: {},
      keywordFrequency: {},
      amenities: {
        positive: {},
        negative: {}
      }
    };

    // Keywords to track for amenities and features
    const amenityKeywords = {
      location: ['location', 'distance', 'nearby', 'central', 'area'],
      cleanliness: ['clean', 'hygiene', 'tidy', 'spotless'],
      service: ['staff', 'service', 'helpful', 'friendly', 'reception'],
      food: ['breakfast', 'restaurant', 'food', 'meal', 'dining'],
      room: ['room', 'bed', 'bathroom', 'shower', 'spacious'],
      facilities: ['pool', 'gym', 'wifi', 'parking', 'internet'],
      value: ['price', 'value', 'worth', 'expensive', 'cheap']
    };

    // Analyze each review
    reviews.forEach(review => {
      // Calculate average score
      sentimentData.averageScore += parseFloat(review.review_score) || 0;

      // Process positive reviews
      if (review.review_positive) {
        const words = review.review_positive.toLowerCase().split(/\s+/);
        words.forEach(word => {
          if (word.length > 3) { // Ignore short words
            sentimentData.commonPositive[word] = (sentimentData.commonPositive[word] || 0) + 1;
          }
        });

        // Check for amenity keywords in positive reviews
        Object.entries(amenityKeywords).forEach(([category, keywords]) => {
          keywords.forEach(keyword => {
            if (review.review_positive.toLowerCase().includes(keyword)) {
              sentimentData.amenities.positive[category] = (sentimentData.amenities.positive[category] || 0) + 1;
            }
          });
        });
      }

      // Process negative reviews
      if (review.review_negative) {
        const words = review.review_negative.toLowerCase().split(/\s+/);
        words.forEach(word => {
          if (word.length > 3) {
            sentimentData.commonNegative[word] = (sentimentData.commonNegative[word] || 0) + 1;
          }
        });

        // Check for amenity keywords in negative reviews
        Object.entries(amenityKeywords).forEach(([category, keywords]) => {
          keywords.forEach(keyword => {
            if (review.review_negative.toLowerCase().includes(keyword)) {
              sentimentData.amenities.negative[category] = (sentimentData.amenities.negative[category] || 0) + 1;
            }
          });
        });
      }
    });

    // Calculate final average score
    sentimentData.averageScore = (sentimentData.averageScore / reviews.length).toFixed(1);

    return sentimentData;
  }, [reviews]);

  if (!analysis) return null;

  // Sort amenities by frequency
  const sortedAmenities = Object.entries(analysis.amenities.positive)
    .map(([category, positiveCount]) => ({
      category,
      positive: positiveCount || 0,
      negative: analysis.amenities.negative[category] || 0,
      total: (positiveCount || 0) + (analysis.amenities.negative[category] || 0)
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Market Analysis Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overview Section */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Overview</h3>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Total Reviews:</span> {analysis.totalReviews}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Average Score:</span> {analysis.averageScore}/10
            </p>
          </div>
        </div>

        {/* Key Amenities Analysis */}
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Key Amenities Analysis</h3>
          <div className="space-y-3">
            {sortedAmenities.map(({ category, positive, negative, total }) => (
              <div key={category} className="flex items-center justify-between">
                <span className="capitalize font-medium text-gray-700">{category}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-green-600">+{positive}</span>
                  <span className="text-red-600">-{negative}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Recommendations */}
        <div className="md:col-span-2 bg-purple-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">Business Recommendations</h3>
          <div className="space-y-2">
            {sortedAmenities.map(({ category, positive, negative }) => {
              const sentiment = positive > negative ? 'positive' : 'negative';
              const recommendation = positive > negative
                ? `Strong demand for ${category} services - consider making this a key feature`
                : `Improvement opportunity in ${category} - address common complaints`;
              
              return (
                <div key={category} className="flex items-start space-x-2">
                  <svg 
                    className={`w-5 h-5 mt-0.5 ${sentiment === 'positive' ? 'text-green-600' : 'text-red-600'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {sentiment === 'positive' 
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    }
                  </svg>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnalytics; 
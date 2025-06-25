import React from 'react';

const OpportunityScore = ({ hotels, currency }) => {
  // Calculate various factors that contribute to opportunity score
  const avgPrice = hotels.reduce((acc, hotel) => {
    const price = parseInt(hotel.price?.replace(/[^0-9]/g, '')) || 0;
    return acc + price;
  }, 0) / hotels.length;

  const avgRating = hotels.reduce((acc, hotel) => {
    return acc + (hotel.rating?.score || 0);
  }, 0) / hotels.length;

  // Get price threshold based on currency
  const getPriceThreshold = (currency) => {
    switch (currency) {
      case 'MYR':
        return 1000;
      case 'PKR':
        return 20000;
      case 'USD':
        return 200;
      case 'EUR':
        return 180;
      case 'GBP':
        return 160;
      case 'SAR':
        return 750;
      case 'AED':
        return 734;
      case 'QAR':
        return 728;
      case 'KWD':
        return 60;
      case 'BHD':
        return 74;
      case 'OMR':
        return 76;
      default:
        return 200; // Default to USD threshold
    }
  };

  // Calculate opportunity score (0-100) based on multiple factors
  const priceThreshold = getPriceThreshold(currency);
  const priceScore = Math.min(100, (avgPrice / priceThreshold) * 100); // Higher prices indicate opportunity
  const ratingScore = Math.max(0, 100 - (avgRating * 10)); // Lower average ratings indicate opportunity
  const competitionScore = Math.max(0, 100 - (hotels.length * 2)); // Fewer hotels indicate opportunity

  const opportunityScore = (priceScore + ratingScore + competitionScore) / 3;

  const factors = [
    { 
      name: 'Price Potential', 
      score: priceScore, 
      color: 'bg-emerald-600',
      description: `Average price: ${currency} ${avgPrice.toFixed(2)}`
    },
    { 
      name: 'Service Gap', 
      score: ratingScore, 
      color: 'bg-blue-600',
      description: `Average rating: ${avgRating.toFixed(1)}/10`
    },
    { 
      name: 'Market Space', 
      score: competitionScore, 
      color: 'bg-indigo-600',
      description: `${hotels.length} hotels in area`
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Market Opportunity Analysis</h3>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Overall Opportunity Score</span>
          <span className="text-2xl font-bold text-green-600">{opportunityScore.toFixed(1)}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-green-600 h-4 rounded-full"
            style={{ width: `${opportunityScore}%` }}
          ></div>
        </div>
      </div>
      <div className="space-y-4">
        {factors.map(factor => (
          <div key={factor.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{factor.name}</span>
              <span className="font-medium">{factor.score.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`${factor.color} h-2 rounded-full`}
                style={{ width: `${factor.score}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{factor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunityScore; 
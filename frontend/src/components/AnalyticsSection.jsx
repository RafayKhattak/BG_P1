import React from 'react';
import PriceAnalysis from './analytics/PriceAnalysis';
import RatingAnalysis from './analytics/RatingAnalysis';
import LocationAnalysis from './analytics/LocationAnalysis';
import MarketInsights from './analytics/MarketInsights';
import CompetitiveAnalysis from './analytics/CompetitiveAnalysis';
import OpportunityScore from './analytics/OpportunityScore';
import SeasonalAnalysis from './analytics/SeasonalAnalysis';

const AnalyticsSection = ({ hotels, currency }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl text-black font-bold text-gray-800 mb-6">Market Analysis for Hotel Development</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <MarketInsights hotels={hotels} currency={currency} />
        <CompetitiveAnalysis hotels={hotels} currency={currency} />
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <OpportunityScore hotels={hotels} currency={currency} />
        <RatingAnalysis hotels={hotels} />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <PriceAnalysis hotels={hotels} currency={currency} />
        <SeasonalAnalysis />
      </div>
      <div className="mt-6">
        <LocationAnalysis hotels={hotels} />
      </div>
    </div>
  );
};

export default AnalyticsSection; 
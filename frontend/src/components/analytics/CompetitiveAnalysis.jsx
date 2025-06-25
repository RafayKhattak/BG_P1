import React from 'react';

const CompetitiveAnalysis = ({ hotels }) => {
  // Calculate average occupancy rate (mock data since we don't have real occupancy data)
  const mockOccupancyRate = 75; // This would ideally come from real data

  // Calculate market saturation score (0-100)
  // Based on number of hotels per km² in the area
  const areaRadius = Math.max(...hotels.map(h => h.distance || 0));
  const area = Math.PI * Math.pow(areaRadius, 2);
  const hotelDensity = hotels.length / area;
  const marketSaturation = Math.min(100, (hotelDensity * 10)); // Normalize to 0-100

  // Calculate price spread
  const prices = hotels.map(h => parseInt(h.price?.replace(/[^0-9]/g, '')) || 0).filter(p => p > 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceSpread = maxPrice - minPrice;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-black mb-4">Competitive Analysis</h3>
      <div className="grid grid-cols-2 gap-4">
{/*         <div className="p-4 bg-purple-50 rounded-lg"> */}
{/*           <p className="text-sm text-gray-600">Market Saturation</p> */}
{/*           <div className="flex items-center"> */}
{/*             <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2"> */}
{/*               <div  */}
{/*                 className="bg-purple-600 h-2.5 rounded-full"  */}
{/*                 style={{ width: `${marketSaturation}%` }} */}
{/*               ></div> */}
{/*             </div> */}
{/*             <span className="text-sm font-bold">{marketSaturation.toFixed(1)}%</span> */}
{/*           </div> */}
{/*         </div> */}
{/*         <div className="p-4 bg-orange-50 rounded-lg"> */}
{/*           <p className="text-sm text-gray-600">Avg. Occupancy Rate</p> */}
{/*           <p className="text-2xl font-bold text-orange-600">{mockOccupancyRate}%</p> */}
{/*         </div> */}
        <div className="p-4 bg-teal-50 rounded-lg">
          <p className="text-sm text-gray-600">Price Spread</p>
          <p className="text-2xl font-bold text-teal-600">{priceSpread.toFixed(0)}</p>
        </div>
{/*         <div className="p-4 bg-pink-50 rounded-lg"> */}
{/*           <p className="text-sm text-gray-600">Hotels per km²</p> */}
{/*           <p className="text-2xl font-bold text-pink-600">{hotelDensity.toFixed(2)}</p> */}
{/*         </div> */}
      </div>
    </div>
  );
};

export default CompetitiveAnalysis; 
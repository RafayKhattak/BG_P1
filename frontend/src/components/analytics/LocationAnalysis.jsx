import { Line } from 'react-chartjs-2';
import React from 'react';

const LocationAnalysis = ({ hotels }) => {
  const distanceRanges = ['0-1 km', '1-3 km', '3-5 km', '5+ km'];
  const data = {
    labels: distanceRanges,
    datasets: [{
      label: 'Hotels by Distance from Center',
      data: [
        hotels.filter(h => h.distance_from_center < 1).length,
        hotels.filter(h => h.distance_from_center >= 1 && h.distance_from_center < 3).length,
        hotels.filter(h => h.distance_from_center >= 3 && h.distance_from_center < 5).length,
        hotels.filter(h => h.distance_from_center >= 5).length,
      ],
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
      fill: false,
    }]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Distance Distribution</h3>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export default LocationAnalysis; 
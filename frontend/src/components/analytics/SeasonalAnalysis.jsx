import { Line } from 'react-chartjs-2';
import React from 'react';

const SeasonalAnalysis = () => {
  // Mock seasonal data - in a real app, this would come from historical data
  const seasonalData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Average Occupancy Rate',
        data: [65, 70, 75, 80, 85, 90, 95, 90, 85, 80, 75, 70],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Average Price (% of max)',
        data: [60, 65, 70, 75, 80, 90, 100, 95, 85, 75, 70, 65],
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
        fill: false,
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Seasonal Trends</h3>
      <Line data={seasonalData} options={{ 
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Percentage (%)'
            }
          }
        }
      }} />
    </div>
  );
};

export default SeasonalAnalysis; 
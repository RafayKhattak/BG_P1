import { Pie } from 'react-chartjs-2';
import React from 'react';

const RatingAnalysis = ({ hotels }) => {
  // Count hotels by star rating
  const starCounts = {
    5: hotels.filter(h => h.stars === 5).length,
    4: hotels.filter(h => h.stars === 4).length,
    3: hotels.filter(h => h.stars === 3).length,
    2: hotels.filter(h => h.stars === 2).length,
    1: hotels.filter(h => h.stars === 1).length,
    0: hotels.filter(h => !h.stars).length
  };

  const data = {
    labels: ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star', 'Unrated'],
    datasets: [{
      label: 'Hotels by Star Rating',
      data: [
        starCounts[5],
        starCounts[4],
        starCounts[3],
        starCounts[2],
        starCounts[1],
        starCounts[0]
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',  // 5 Star - Pink
        'rgba(54, 162, 235, 0.6)',  // 4 Star - Blue
        'rgba(255, 206, 86, 0.6)',  // 3 Star - Yellow
        'rgba(75, 192, 192, 0.6)',  // 2 Star - Teal
        'rgba(153, 102, 255, 0.6)', // 1 Star - Purple
        'rgba(201, 203, 207, 0.6)'  // Unrated - Gray
      ],
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} hotels (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Star Rating Distribution</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Total Hotels: {hotels.length}
        </p>
      </div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default RatingAnalysis; 
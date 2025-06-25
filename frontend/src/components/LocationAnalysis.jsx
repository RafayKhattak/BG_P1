import { Line } from 'react-chartjs-2';
import React, { useEffect } from 'react';

const LocationAnalysis = ({ hotels }) => {
  useEffect(() => {
    // Debug log to check incoming data
    console.log('Hotels with distances:', hotels.map(h => ({
      name: h.name,
      distance: h.distance_from_center,
      coordinates: h.coordinates
    })));
  }, [hotels]);

  // Count hotels in each distance range
  const hotelsByDistance = {
    '0-1 km': hotels.filter(h => h.distance_from_center !== null && h.distance_from_center < 1).length,
    '1-3 km': hotels.filter(h => h.distance_from_center !== null && h.distance_from_center >= 1 && h.distance_from_center < 3).length,
    '3-5 km': hotels.filter(h => h.distance_from_center !== null && h.distance_from_center >= 3 && h.distance_from_center < 5).length,
    '5+ km': hotels.filter(h => h.distance_from_center !== null && h.distance_from_center >= 5).length
  };

  // Log the distribution for debugging
  console.log('Hotels by distance:', hotelsByDistance);

  const data = {
    labels: Object.keys(hotelsByDistance),
    datasets: [{
      label: 'Hotels by Distance from Center',
      data: Object.values(hotelsByDistance),
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        },
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} hotels in this range`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Distance Distribution</h3>
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
      {/* Add a legend explaining the distances */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Distance ranges show how far hotels are from the city center:</p>
        <ul className="list-disc ml-5 mt-2">
          <li>0-1 km: Very central location</li>
          <li>1-3 km: Near city center</li>
          <li>3-5 km: Suburban area</li>
          <li>5+ km: Outside city center</li>
        </ul>
      </div>
      {/* Debug information */}
      <div className="mt-4 text-xs text-gray-400">
        Total hotels with distance data: {hotels.filter(h => h.distance_from_center !== null).length}
      </div>
    </div>
  );
};

export default LocationAnalysis; 
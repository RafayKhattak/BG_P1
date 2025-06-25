import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DistanceChart = ({ hotels }) => {
  const distanceRanges = [
    { min: 0, max: 1, label: '0-1 km' },
    { min: 1, max: 3, label: '1-3 km' },
    { min: 3, max: 5, label: '3-5 km' },
    { min: 5, max: Infinity, label: '5+ km' }
  ];

  const chartData = useMemo(() => {
    const distribution = distanceRanges.map(range => {
      return hotels.filter(hotel => {
        const distance = hotel.distance_from_center;
        return distance !== null && 
               distance >= range.min && 
               distance < range.max;
      }).length;
    });

    return {
      labels: distanceRanges.map(range => range.label),
      datasets: [
        {
          label: 'Hotels by Distance from Center',
          data: distribution,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [hotels]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Hotels by Distance from Center</h3>
      <div className="h-[300px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DistanceChart; 
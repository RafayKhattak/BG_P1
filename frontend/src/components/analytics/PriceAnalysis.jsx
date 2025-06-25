import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../../config/chart';  // Import Chart.js configuration

const PriceAnalysis = ({ hotels, currency }) => {
  // Define price ranges based on currency
  const getPriceRanges = (currency) => {
    switch (currency) {
      case 'MYR':
        return { budget: 500, midRange: 1000, luxury: 2000 };
      case 'PKR':
        return { budget: 10000, midRange: 20000, luxury: 40000 };
      case 'USD':
        return { budget: 100, midRange: 200, luxury: 400 };
      case 'EUR':
        return { budget: 90, midRange: 180, luxury: 360 };
      case 'GBP':
        return { budget: 80, midRange: 160, luxury: 320 };
      case 'SAR':
        return { budget: 375, midRange: 750, luxury: 1500 };
      case 'AED':
        return { budget: 367, midRange: 734, luxury: 1468 };
      case 'QAR':
        return { budget: 364, midRange: 728, luxury: 1456 };
      case 'KWD':
        return { budget: 30, midRange: 60, luxury: 120 };
      case 'BHD':
        return { budget: 37, midRange: 74, luxury: 148 };
      case 'OMR':
        return { budget: 38, midRange: 76, luxury: 152 };
      default:
        return { budget: 100, midRange: 200, luxury: 400 }; // Default to USD ranges
    }
  };

  const priceRanges = getPriceRanges(currency);

  const data = {
    labels: ['Budget', 'Mid-Range', 'Luxury'],
    datasets: [{
      label: 'Number of Hotels by Price Range',
      data: [
        hotels.filter(h => parseInt(h.price?.replace(/[^0-9]/g, '')) < priceRanges.budget).length,
        hotels.filter(h => parseInt(h.price?.replace(/[^0-9]/g, '')) >= priceRanges.budget && parseInt(h.price?.replace(/[^0-9]/g, '')) < priceRanges.midRange).length,
        hotels.filter(h => parseInt(h.price?.replace(/[^0-9]/g, '')) >= priceRanges.midRange).length,
      ],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(153, 102, 255, 0.6)'],
    }]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Price Distribution</h3>
      <div className="text-sm text-gray-600 mb-4">
        <p>Budget: Less than {currency} {priceRanges.budget}</p>
        <p>Mid-Range: {currency} {priceRanges.budget} - {currency} {priceRanges.midRange}</p>
        <p>Luxury: {currency} {priceRanges.midRange}+</p>
      </div>
      <Bar data={data} options={{ responsive: true }} />
    </div>
  );
};

export default PriceAnalysis; 
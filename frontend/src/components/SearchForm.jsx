import React, { useRef, useState, useEffect } from 'react';
import MapSelector from './MapSelector';

const SearchForm = ({ searchParams, distanceKm, handleInputChange, handleFilterChange, handleDistanceChange, searchHotels, loading, hotels }) => {
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  // Sync selectedCoordinates with searchParams.coordinates
  useEffect(() => {
    setSelectedCoordinates(searchParams.coordinates);
  }, [searchParams.coordinates]);

  const handleCalendarClick = (inputRef) => {
    inputRef.current?.showPicker();
  };

  const handleLocationSelect = async (latlng) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/geocode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat: latlng.lat, lng: latlng.lng }),
      });

      if (!response.ok) {
        throw new Error('Failed to geocode location');
      }

      const data = await response.json();
      const newCoordinates = { lat: latlng.lat, lng: latlng.lng };
      setSelectedCoordinates(newCoordinates);
      
      // Update the location input with the geocoded address
      handleInputChange({
        target: {
          name: 'location',
          value: data.address
        }
      });

      // Update coordinates in searchParams
      handleInputChange({
        target: {
          name: 'coordinates',
          value: newCoordinates
        }
      });
    } catch (error) {
      console.error('Error geocoding location:', error);
      alert('Failed to get address from selected location. Please try again or enter address manually.');
    }
  };

  const filterLabels = {
    'class=5': '5-Star Hotels',
    'class=4': '4-Star Hotels',
    'class=3': '3-Star Hotels',
    'mealplan=1': 'Breakfast Included'
  };

  const currencies = [
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal' },
    { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
    { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar' },
    { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchData = {
      ...searchParams,
      coordinates: selectedCoordinates
    };
    searchHotels(e, searchData);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-5 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                className="w-full pl-10 p-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City name"
                required
              />
              <button
                type="button"
                onClick={() => setShowMap(!showMap)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Check-in</label>
            <div className="relative">
              <div 
                className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
                onClick={() => handleCalendarClick(checkInRef)}
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                ref={checkInRef}
                type="date"
                name="check_in"
                value={searchParams.check_in}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Check-out</label>
            <div className="relative">
              <div 
                className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
                onClick={() => handleCalendarClick(checkOutRef)}
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                ref={checkOutRef}
                type="date"
                name="check_out"
                value={searchParams.check_out}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Adults</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="number"
                name="adults"
                min="1"
                max="10"
                value={searchParams.adults}
                onChange={handleInputChange}
                className="w-full pl-10 p-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Currency</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <select
                name="currency"
                value={searchParams.currency}
                onChange={handleInputChange}
                className="w-full pl-10 p-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700 font-medium mb-3">Hotel Filters:</p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(filterLabels).map(([filter, label]) => (
                <label key={filter} className="inline-flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={searchParams.filters.includes(filter)}
                    onChange={() => handleFilterChange(filter)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <label className="block text-gray-700 font-medium mb-3">Distance from Center (km)</label>
            <input
              type="range"
              min="0"
              max="50"
              step="0.5"
              value={distanceKm}
              onChange={handleDistanceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">0 km</span>
              <span className="text-sm font-medium text-blue-600">
                {distanceKm > 0 ? `${distanceKm} km` : "No limit"}
              </span>
              <span className="text-sm text-gray-500">50 km</span>
            </div>
          </div>
        </div>

        {showMap && (
          <div className="mb-6">
            <MapSelector 
              onLocationSelect={handleLocationSelect} 
              searchedLocation={selectedCoordinates}
              hotels={hotels}
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Hotels
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchForm; 
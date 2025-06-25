import { useState } from 'react';
import './App.css';
import './config/chart';  // Import Chart.js configuration

// UI Components
import SearchForm from './components/SearchForm';
import AnalyticsSection from './components/AnalyticsSection';
import HotelsList from './components/HotelsList';
import Spinner from './components/Spinner';
import ErrorDisplay from './components/ErrorDisplay';
import NoResultsDisplay from './components/NoResultsDisplay';

function App() {
  const [searchParams, setSearchParams] = useState({
    location: '',
    check_in: '',
    check_out: '',
    adults: 2,
    filters: [],
    currency: 'USD',
    coordinates: null
  });

  const [distanceKm, setDistanceKm] = useState(3);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle filter changes
  const handleFilterChange = (filter) => {
    if (filter.startsWith('distance=')) {
      return;
    }

    setSearchParams(prev => {
      const newFilters = prev.filters.includes(filter)
        ? prev.filters.filter(f => f !== filter)
        : [...prev.filters, filter];

      return { ...prev, filters: newFilters };
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => {
      // If location is being changed, reset coordinates
      if (name === 'location') {
        return { ...prev, [name]: value, coordinates: null };
      }
      return { ...prev, [name]: value };
    });
  };

  // Handle distance changes
  const handleDistanceChange = (e) => {
    setDistanceKm(Number(e.target.value) || 0);
  };

  // Search hotels function
  const searchHotels = async (e, searchData = searchParams) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // If we have a location name but no coordinates, get coordinates first
      if (searchData.location && !searchData.coordinates) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/location-to-coordinates/${encodeURIComponent(searchData.location)}`);
          if (response.ok) {
            const data = await response.json();
            searchData.coordinates = {
              lat: data.latitude,
              lng: data.longitude
            };
            // Update searchParams with the new coordinates
            setSearchParams(prev => ({
              ...prev,
              coordinates: searchData.coordinates
            }));
          }
        } catch (err) {
          console.error('Error getting coordinates:', err);
        }
      }

      const filtersWithoutDistance = searchData.filters.filter(
        filter => !filter.startsWith('distance=')
      );

      const finalFilters = [...filtersWithoutDistance];
      if (distanceKm > 0) {
        finalFilters.push(`distance=${distanceKm * 1000}`);
      }

      const requestBody = {
        ...searchData,
        filters: finalFilters
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/search-hotels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }

      const data = await response.json();
      setHotels(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-8 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-white mb-2">Hotel Finder</h1>
          <p className="text-center text-blue-100">Find your perfect stay in just a few clicks</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <SearchForm
          searchParams={searchParams}
          distanceKm={distanceKm}
          handleInputChange={handleInputChange}
          handleFilterChange={handleFilterChange}
          handleDistanceChange={handleDistanceChange}
          searchHotels={searchHotels}
          loading={loading}
          hotels={hotels}
        />

        {error && <ErrorDisplay error={error} />}

        <div className="mt-8">
          {loading ? (
            <Spinner />
          ) : hotels.length > 0 ? (
            <div>
              <AnalyticsSection hotels={hotels} currency={searchParams.currency} />
              <HotelsList hotels={hotels} />
            </div>
          ) : searchParams.location && (
            <NoResultsDisplay />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
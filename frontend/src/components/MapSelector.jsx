import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for searched location
const searchIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function LocationMarker({ onLocationSelect, searchedLocation, hotels }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  // Update map view when searched location or hotels change
  useEffect(() => {
    if (searchedLocation) {
      map.setView([searchedLocation.lat, searchedLocation.lng], 13);
    } else if (hotels && hotels.length > 0) {
      // Find first hotel with valid coordinates
      const firstHotelWithCoords = hotels.find(hotel => hotel.coordinates);
      if (firstHotelWithCoords) {
        map.setView([
          firstHotelWithCoords.coordinates.latitude,
          firstHotelWithCoords.coordinates.longitude
        ], 13);
      }
    }
  }, [searchedLocation, hotels, map]);

  return (
    <>
      {searchedLocation && (
        <Marker 
          position={[searchedLocation.lat, searchedLocation.lng]} 
          icon={searchIcon}
        >
          <Popup>
            Searched Location
          </Popup>
        </Marker>
      )}
      {hotels && hotels.map((hotel, index) => (
        hotel.coordinates && (
          <Marker 
            key={index}
            position={[hotel.coordinates.latitude, hotel.coordinates.longitude]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{hotel.name}</h3>
                <p>{hotel.stars} Stars</p>
                <p>{hotel.distance_from_center} km from center</p>
              </div>
            </Popup>
          </Marker>
        )
      ))}
      {position && <Marker position={position} />}
    </>
  );
}

const MapSelector = ({ onLocationSelect, searchedLocation, hotels }) => {
  const defaultCenter = [3.159000086621411, 101.69872579884081]; // Default center (Makkah)

  // Create a unique key for the MapContainer that changes when hotels or searchedLocation changes
  const mapKey = `${searchedLocation?.lat}-${searchedLocation?.lng}-${hotels?.length}`;

  // Determine the center coordinates
  const getCenterCoordinates = () => {
    if (searchedLocation) {
      return [searchedLocation.lat, searchedLocation.lng];
    }
    // If no searched location, use first hotel with coordinates
    if (hotels && hotels.length > 0) {
      const firstHotelWithCoords = hotels.find(hotel => hotel.coordinates);
      if (firstHotelWithCoords) {
        return [
          firstHotelWithCoords.coordinates.latitude,
          firstHotelWithCoords.coordinates.longitude
        ];
      }
    }
    return defaultCenter;
  };

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-300">
      <MapContainer
        key={mapKey}
        center={getCenterCoordinates()}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker 
          onLocationSelect={onLocationSelect} 
          searchedLocation={searchedLocation}
          hotels={hotels}
        />
      </MapContainer>
    </div>
  );
};

export default MapSelector; 

import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface Volunteer {
  id: number;
  name: string;
  status: string;
  description: string;
  rating: number;
  verified: boolean;
  distance: string;
  availability: string;
  location: { lat: number; lng: number };
}

interface GoogleMapProps {
  volunteers: Volunteer[];
  onVolunteerClick: (volunteer: Volunteer) => void;
  apiKey: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ volunteers, onVolunteerClick, apiKey }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Google Maps API
  useEffect(() => {
    if ((window as any).google && (window as any).google.maps) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => console.error('Error loading Google Maps API');
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey]);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
        },
        (error) => {
          console.warn('Error getting location:', error);
          // Fallback to Seattle coordinates
          setUserLocation({ lat: 47.6062, lng: -122.3321 });
        }
      );
    } else {
      // Fallback to Seattle coordinates
      setUserLocation({ lat: 47.6062, lng: -122.3321 });
    }
  }, []);

  // Initialize map when API is loaded and user location is available
  useEffect(() => {
    if (!isLoaded || !userLocation || !mapRef.current || !(window as any).google) return;

    const google = (window as any).google;
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 13,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    setMap(mapInstance);

    // Add user location marker
    new google.maps.Marker({
      position: userLocation,
      map: mapInstance,
      title: 'Your Location',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2
      }
    });

    // Add volunteer markers
    volunteers.forEach((volunteer) => {
      const marker = new google.maps.Marker({
        position: volunteer.location,
        map: mapInstance,
        title: volunteer.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#EC4899',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      // Add click listener to marker
      marker.addListener('click', () => {
        onVolunteerClick(volunteer);
      });

      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${volunteer.name}</h3>
            <p style="margin: 0 0 4px 0; color: #059669; font-size: 14px;">${volunteer.status}</p>
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">${volunteer.distance} away</p>
            <p style="margin: 0; color: #374151; font-size: 13px;">${volunteer.description}</p>
          </div>
        `
      });

      // Show info window on marker hover
      marker.addListener('mouseover', () => {
        infoWindow.open(mapInstance, marker);
      });

      marker.addListener('mouseout', () => {
        infoWindow.close();
      });
    });

  }, [isLoaded, userLocation, volunteers, onVolunteerClick]);

  if (!isLoaded || !userLocation) {
    return (
      <div className="h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-2 animate-pulse" />
          <p className="text-gray-600 text-sm">Loading Google Maps...</p>
          <p className="text-xs text-gray-500 mt-1">Getting your location</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapRef} className="h-80 w-full rounded-2xl" />
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 text-sm">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-gray-700">Your Location</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
          <span className="text-gray-700">Available Volunteers</span>
        </div>
      </div>

      {/* Location info */}
      {userLocation && (
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2 text-xs text-gray-600">
          <p>Lat: {userLocation.lat.toFixed(4)}</p>
          <p>Lng: {userLocation.lng.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;

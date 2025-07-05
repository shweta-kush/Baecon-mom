
import React from 'react';

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

interface VolunteerStatsProps {
  volunteers: Volunteer[];
}

const VolunteerStats: React.FC<VolunteerStatsProps> = ({ volunteers }) => {
  const averageRating = volunteers.reduce((acc, vol) => acc + vol.rating, 0) / volunteers.length;

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="bg-blue-50 rounded-2xl p-4">
        <div className="text-2xl font-bold text-blue-600">{volunteers.length}</div>
        <div className="text-sm text-blue-600">Available Now</div>
      </div>
      <div className="bg-green-50 rounded-2xl p-4">
        <div className="text-2xl font-bold text-green-600">{averageRating.toFixed(1)}</div>
        <div className="text-sm text-green-600">Avg Rating</div>
      </div>
      <div className="bg-pink-50 rounded-2xl p-4">
        <div className="text-2xl font-bold text-pink-600">&lt; 1mi</div>
        <div className="text-sm text-pink-600">Avg Distance</div>
      </div>
    </div>
  );
};

export default VolunteerStats;

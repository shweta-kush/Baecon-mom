
import React from 'react';
import { Star, Shield, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface VolunteerCardProps {
  volunteer: Volunteer;
  onRequestCare: (volunteer: Volunteer) => void;
}

const VolunteerCard: React.FC<VolunteerCardProps> = ({ volunteer, onRequestCare }) => {
  return (
    <div className="space-y-6">
      {/* Rating */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(volunteer.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{volunteer.rating}</span>
        <span className="text-sm text-gray-500">(127 reviews)</span>
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2 text-sm">
        <Clock className="h-4 w-4 text-green-500" />
        <span className="text-green-600 font-medium">Available: {volunteer.availability}</span>
      </div>

      {/* Description */}
      <div>
        <h4 className="font-medium text-gray-800 mb-2">About</h4>
        <p className="text-sm text-gray-600">{volunteer.description}</p>
      </div>

      {/* Safety Features */}
      <div className="bg-green-50 rounded-2xl p-4">
        <h4 className="font-medium text-green-800 mb-2 flex items-center">
          <Shield className="h-4 w-4 mr-2" />
          Safety Verified
        </h4>
        <div className="space-y-1 text-sm text-green-700">
          <p>✓ Background check completed</p>
          <p>✓ CPR/First Aid certified</p>
          <p>✓ Community verified</p>
          <p>✓ Insurance covered</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => onRequestCare(volunteer)}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Request Chill Care
        </Button>
        
        <Button
          variant="outline"
          className="w-full rounded-full border-pink-200 text-pink-600 hover:bg-pink-50"
        >
          View Full Profile
        </Button>
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50 rounded-2xl p-4">
        <h4 className="font-medium text-blue-800 mb-2">Safe Handover Guidelines</h4>
        <div className="space-y-1 text-sm text-blue-700">
          <p>• Meet in a public place first</p>
          <p>• Share contact info with trusted friend</p>
          <p>• Discuss care expectations clearly</p>
          <p>• Check in every hour</p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCard;

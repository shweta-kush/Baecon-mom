
import React, { useState } from 'react';
import { MapPin, Star, Shield, Clock, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';

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

const VolunteerMap = () => {
  const { toast } = useToast();
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  
  const volunteers: Volunteer[] = [
    {
      id: 1,
      name: 'Sarah M.',
      status: 'Available for 3 hours',
      description: 'Experienced mom of 2, love helping other moms! CPR certified.',
      rating: 4.9,
      verified: true,
      distance: '0.8 miles',
      availability: 'Next 3 hours',
      location: { lat: 47.6062, lng: -122.3321 }
    },
    {
      id: 2,
      name: 'Maria L.',
      status: 'Available now',
      description: 'Grandmother of 5, childcare experience 20+ years.',
      rating: 5.0,
      verified: true,
      distance: '1.2 miles',
      availability: 'Next 2 hours',
      location: { lat: 47.6100, lng: -122.3340 }
    },
    {
      id: 3,
      name: 'Jessica K.',
      status: 'Available until 6 PM',
      description: 'Former preschool teacher, loves arts and crafts with kids.',
      rating: 4.8,
      verified: true,
      distance: '0.5 miles',
      availability: 'Until 6 PM today',
      location: { lat: 47.6040, lng: -122.3300 }
    }
  ];

  const handleRequestCare = (volunteer: Volunteer) => {
    toast({
      title: "Care Request Sent!",
      description: `Your request has been sent to ${volunteer.name}. They'll respond within 5 minutes.`,
      duration: 5000,
    });
    setSelectedVolunteer(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
      <div className="flex items-center space-x-3 mb-6">
        <MapPin className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">Volunteer Chill Care Map</h2>
      </div>

      {/* Map Container - Mock implementation */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl h-80 mb-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Interactive Map Loading...</p>
            <p className="text-xs text-gray-500 mt-1">Seattle, WA area</p>
          </div>
        </div>

        {/* Mock Map Pins */}
        {volunteers.map((volunteer, index) => (
          <Sheet key={volunteer.id}>
            <SheetTrigger asChild>
              <button
                className={`absolute bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 transform hover:scale-110`}
                style={{
                  top: `${30 + index * 25}%`,
                  left: `${25 + index * 20}%`,
                }}
                onClick={() => setSelectedVolunteer(volunteer)}
              >
                <User className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <span>{volunteer.name}</span>
                  {volunteer.verified && (
                    <Shield className="h-5 w-5 text-green-500" />
                  )}
                </SheetTitle>
                <SheetDescription>
                  {volunteer.distance} away • {volunteer.status}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
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
                    onClick={() => handleRequestCare(volunteer)}
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
            </SheetContent>
          </Sheet>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 rounded-2xl p-4">
          <div className="text-2xl font-bold text-blue-600">{volunteers.length}</div>
          <div className="text-sm text-blue-600">Available Now</div>
        </div>
        <div className="bg-green-50 rounded-2xl p-4">
          <div className="text-2xl font-bold text-green-600">4.9</div>
          <div className="text-sm text-green-600">Avg Rating</div>
        </div>
        <div className="bg-pink-50 rounded-2xl p-4">
          <div className="text-2xl font-bold text-pink-600">&lt; 1mi</div>
          <div className="text-sm text-pink-600">Avg Distance</div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-6 bg-gray-50 rounded-2xl p-4">
        <h3 className="font-semibold text-gray-800 mb-3">How Chill Care Works</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>1. Browse available volunteers on the map</p>
          <p>2. Check their profiles, ratings, and availability</p>
          <p>3. Send a care request with your needs</p>
          <p>4. Meet in a safe public location for handover</p>
          <p>5. Enjoy your well-deserved break!</p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerMap;

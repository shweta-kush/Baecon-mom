
import React, { useState } from 'react';
import { MapPin, Shield } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import GoogleMap from './GoogleMap';
import VolunteerCard from './VolunteerCard';
import VolunteerStats from './VolunteerStats';
import HowItWorks from './HowItWorks';

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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
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
    setIsSheetOpen(false);
  };

  const handleVolunteerClick = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsSheetOpen(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
      <div className="flex items-center space-x-3 mb-6">
        <MapPin className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">Volunteer Chill Care Map</h2>
      </div>

      {/* Google Map Container */}
      <div className="mb-6">
        <GoogleMap 
          volunteers={volunteers}
          onVolunteerClick={handleVolunteerClick}
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        />
      </div>

      {/* Volunteer Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          {selectedVolunteer && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <span>{selectedVolunteer.name}</span>
                  {selectedVolunteer.verified && (
                    <Shield className="h-5 w-5 text-green-500" />
                  )}
                </SheetTitle>
                <SheetDescription>
                  {selectedVolunteer.distance} away • {selectedVolunteer.status}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6">
                <VolunteerCard 
                  volunteer={selectedVolunteer} 
                  onRequestCare={handleRequestCare}
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Quick Stats */}
      <VolunteerStats volunteers={volunteers} />

      {/* How It Works */}
      <div className="mt-6">
        <HowItWorks />
      </div>
    </div>
  );
};

export default VolunteerMap;


import React, { useState } from 'react';
import { Shield, Phone, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Emergency = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Mom', relationship: 'Mother', phone: '+1 (555) 123-4567' },
    { id: 2, name: 'Sarah', relationship: 'Best Friend', phone: '+1 (555) 987-6543' },
    { id: 3, name: 'Dr. Johnson', relationship: 'Doctor', phone: '+1 (555) 456-7890' }
  ]);

  const handleSOS = () => {
    toast({
      title: "SOS Alert Sent!",
      description: "Your trusted contacts have been notified and will receive your location.",
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Emergency SOS</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          In case of emergency, press the button below to immediately alert your trusted contacts with your location and a request for help.
        </p>
      </div>

      {/* SOS Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSOS}
          size="lg"
          className="bg-red-500 hover:bg-red-600 text-white text-xl px-12 py-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Shield className="h-8 w-8 mr-3" />
          SEND SOS ALERT
        </Button>
      </div>

      {/* How it works */}
      <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
        <h3 className="text-lg font-semibold text-red-800 mb-3">How Emergency SOS Works</h3>
        <div className="space-y-2 text-red-700">
          <p>• Instantly sends your current location to all trusted contacts</p>
          <p>• Includes a pre-written emergency message</p>
          <p>• Your contacts receive both SMS and email alerts</p>
          <p>• All information is encrypted and secure</p>
        </div>
      </div>

      {/* Trusted Contacts */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Trusted Contacts</h2>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>

        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
                  <span className="text-pink-700 font-semibold text-lg">
                    {contact.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emergency;

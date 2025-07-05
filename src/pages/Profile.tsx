
import React, { useState } from 'react';
import { User, Settings, Bell, Shield, Calendar, Edit2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    babyName: 'Emma',
    babyAge: '3 months',
    location: 'Seattle, WA'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    communityUpdates: true,
    selfCareReminders: true
  });

  const [privacy, setPrivacy] = useState({
    anonymousDefault: false,
    shareLocation: true,
    dataSharing: false
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your information has been saved successfully.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Notification settings updated",
      description: `${key} notifications ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const trustedContacts = [
    { id: 1, name: 'Mom', relationship: 'Mother', phone: '+1 (555) 123-4567' },
    { id: 2, name: 'Sarah', relationship: 'Best Friend', phone: '+1 (555) 987-6543' },
    { id: 3, name: 'Dr. Johnson', relationship: 'Doctor', phone: '+1 (555) 456-7890' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <User className="h-16 w-16 text-pink-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile & Settings</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage your account, preferences, and privacy settings.
        </p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          <Button
            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            className={`rounded-full ${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-pink-500 hover:bg-pink-600'} text-white`}
          >
            {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit2 className="h-4 w-4 mr-2" />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <Input
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="rounded-2xl border-gray-200 focus:border-pink-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                className="rounded-2xl border-gray-200 focus:border-pink-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <Input
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                disabled={!isEditing}
                className="rounded-2xl border-gray-200 focus:border-pink-300"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Baby's Name</label>
              <Input
                value={profileData.babyName}
                onChange={(e) => setProfileData(prev => ({ ...prev, babyName: e.target.value }))}
                disabled={!isEditing}
                className="rounded-2xl border-gray-200 focus:border-pink-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Baby's Age</label>
              <Input
                value={profileData.babyAge}
                onChange={(e) => setProfileData(prev => ({ ...prev, babyAge: e.target.value }))}
                disabled={!isEditing}
                className="rounded-2xl border-gray-200 focus:border-pink-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-medium text-gray-800 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-600">
                  {key === 'email' && 'Receive updates via email'}
                  {key === 'sms' && 'Get text message alerts'}
                  {key === 'push' && 'Browser push notifications'}
                  {key === 'communityUpdates' && 'New community posts and replies'}
                  {key === 'selfCareReminders' && 'Gentle reminders for self-care'}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => handleNotificationChange(key, checked)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-6 w-6 text-green-500" />
          <h2 className="text-xl font-semibold text-gray-800">Privacy Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
            <div>
              <p className="font-medium text-gray-800">Anonymous Posts by Default</p>
              <p className="text-sm text-gray-600">Make all community posts anonymous unless specified</p>
            </div>
            <Switch
              checked={privacy.anonymousDefault}
              onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, anonymousDefault: checked }))}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
            <div>
              <p className="font-medium text-gray-800">Share Location for SOS</p>
              <p className="text-sm text-gray-600">Allow emergency contacts to receive your location</p>
            </div>
            <Switch
              checked={privacy.shareLocation}
              onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, shareLocation: checked }))}
            />
          </div>
        </div>
      </div>

      {/* Trusted Contacts */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Emergency Contacts</h2>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
            Edit Contacts
          </Button>
        </div>

        <div className="space-y-3">
          {trustedContacts.map((contact) => (
            <div key={contact.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="text-orange-700 font-semibold">
                  {contact.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.relationship} • {contact.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Settings */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="h-6 w-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-gray-800">App Integrations</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <p className="font-medium text-gray-800">Google Calendar</p>
              <p className="text-sm text-gray-600">Sync your self-care schedule</p>
            </div>
            <Button variant="outline" className="rounded-full">
              Connect
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <p className="font-medium text-gray-800">Health App</p>
              <p className="text-sm text-gray-600">Track sleep and wellness data</p>
            </div>
            <Button variant="outline" className="rounded-full">
              Connect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

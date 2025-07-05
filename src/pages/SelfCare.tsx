
import React, { useState } from 'react';
import { Calendar, Clock, Plus, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SelfCare = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const activities = [
    { id: 1, title: '10-minute meditation', duration: '10 min', type: 'mindfulness', color: 'purple' },
    { id: 2, title: 'Power nap', duration: '20 min', type: 'rest', color: 'blue' },
    { id: 3, title: 'Gentle stretching', duration: '15 min', type: 'movement', color: 'green' },
    { id: 4, title: 'Read a chapter', duration: '15 min', type: 'mental', color: 'pink' },
    { id: 5, title: 'Take a bath', duration: '30 min', type: 'relaxation', color: 'teal' },
    { id: 6, title: 'Call a friend', duration: '20 min', type: 'social', color: 'orange' }
  ];

  const schedule = [
    { time: '7:00 AM', activity: 'Baby sleep window', type: 'baby', duration: '2 hours' },
    { time: '9:30 AM', activity: 'Morning meditation', type: 'self-care', duration: '10 min' },
    { time: '1:00 PM', activity: 'Baby nap time', type: 'baby', duration: '1.5 hours' },
    { time: '1:15 PM', activity: 'Lunch & rest', type: 'self-care', duration: '45 min' },
    { time: '7:00 PM', activity: 'Baby bedtime routine', type: 'baby', duration: '1 hour' },
    { time: '8:00 PM', activity: 'Personal time', type: 'self-care', duration: '1 hour' }
  ];

  const handleLogSleep = () => {
    toast({
      title: "Sleep logged!",
      description: "7.5 hours recorded. Great job prioritizing rest!",
    });
  };

  const handleLogNap = () => {
    toast({
      title: "Nap time logged!",
      description: "Baby's nap added to schedule. Perfect time for self-care!",
    });
  };

  const getActivityColor = (color: string) => {
    const colors = {
      purple: 'bg-purple-100 border-purple-200 text-purple-800',
      blue: 'bg-blue-100 border-blue-200 text-blue-800',
      green: 'bg-green-100 border-green-200 text-green-800',
      pink: 'bg-pink-100 border-pink-200 text-pink-800',
      teal: 'bg-teal-100 border-teal-200 text-teal-800',
      orange: 'bg-orange-100 border-orange-200 text-orange-800'
    };
    return colors[color as keyof typeof colors] || colors.pink;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Calendar className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Self-Care Scheduler</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Plan your wellness around your baby's schedule. Every small moment of self-care matters.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          onClick={handleLogSleep}
          className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-2xl h-auto flex flex-col items-center space-y-2"
        >
          <Moon className="h-8 w-8" />
          <span className="font-medium">Log Sleep</span>
          <span className="text-sm opacity-90">Track your rest</span>
        </Button>
        
        <Button
          onClick={handleLogNap}
          className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-2xl h-auto flex flex-col items-center space-y-2"
        >
          <Sun className="h-8 w-8" />
          <span className="font-medium">Log Baby Nap</span>
          <span className="text-sm opacity-90">Mark free time</span>
        </Button>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Schedule</h2>
        
        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600 w-20">{item.time}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.activity}</p>
                <p className="text-sm text-gray-500">{item.duration}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.type === 'baby' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {item.type === 'baby' ? 'Baby Time' : 'Self-Care'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Activities */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Self-Care Activities</h2>
          <Button variant="outline" className="rounded-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Custom
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800 group-hover:text-gray-900">{activity.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getActivityColor(activity.color)}`}>
                  {activity.duration}
                </span>
              </div>
              <p className="text-sm text-gray-500 capitalize">{activity.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelfCare;

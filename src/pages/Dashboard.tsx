
import React from 'react';
import { Heart, Calendar, Users, BookOpen, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Emergency SOS',
      description: 'Get immediate support',
      icon: Shield,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
      onClick: () => navigate('/emergency')
    },
    {
      title: 'Journal Entry',
      description: 'Record your feelings',
      icon: BookOpen,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      onClick: () => navigate('/journal')
    },
    {
      title: 'Self-Care Time',
      description: 'Plan your wellness',
      icon: Calendar,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      onClick: () => navigate('/schedule')
    },
    {
      title: 'Community',
      description: 'Connect with others',
      icon: Users,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      onClick: () => navigate('/community')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
        <div className="flex items-center space-x-3 mb-4">
          <Heart className="h-8 w-8 text-pink-400" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Welcome back, Sarah</h1>
            <p className="text-gray-600">How are you feeling today?</p>
          </div>
        </div>
      </div>

      {/* Quick Glance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Mood */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Today's Mood</h3>
          <div className="flex items-center space-x-3">
            <span className="text-4xl">😊</span>
            <div>
              <p className="text-sm text-gray-600">Feeling</p>
              <p className="font-medium text-blue-600">Optimistic</p>
            </div>
          </div>
        </div>

        {/* Next Self-Care */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Next Self-Care</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Recommended</p>
            <p className="font-medium text-green-600">10-minute meditation</p>
            <p className="text-xs text-gray-500">Baby's next nap in 2 hours</p>
          </div>
        </div>

        {/* Community Spotlight */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Community Story</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">"Finding joy in small moments..."</p>
            <p className="text-xs text-purple-600 font-medium">❤️ 24 moms found this helpful</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`${action.bgColor} ${action.borderColor} border-2 rounded-2xl p-6 text-left hover:shadow-md transition-all duration-200 group`}
            >
              <div className="flex items-center justify-between mb-3">
                <action.icon className={`h-8 w-8 ${action.iconColor}`} />
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

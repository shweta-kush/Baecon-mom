
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Heart, Shield, BookOpen, Calendar, Users, User } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Dashboard', icon: Heart },
    { to: '/emergency', label: 'Emergency SOS', icon: Shield },
    { to: '/journal', label: 'Emotion Journal', icon: BookOpen },
    { to: '/schedule', label: 'Self-Care', icon: Calendar },
    { to: '/community', label: 'Community', icon: Users },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-gradient-to-r from-pink-50 to-blue-50 shadow-sm border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-pink-400 mr-2" />
            <span className="text-xl font-semibold text-gray-800">MomWell</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                      isActive
                        ? 'bg-pink-200 text-pink-800'
                        : 'text-gray-600 hover:bg-pink-100 hover:text-pink-700'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-pink-700 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-pink-200 text-pink-800'
                      : 'text-gray-600 hover:bg-pink-100 hover:text-pink-700'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, Shield } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  // Format the date
  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-[var(--primary)] rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <Shield className="h-4 w-4 mr-1" />
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="mb-6 flex items-start">
            <Mail className="h-6 w-6 text-gray-500 mr-3 mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
              <p className="text-lg">{user.email}</p>
            </div>
          </div>
          
          <div className="mb-6 flex items-start">
            <Calendar className="h-6 w-6 text-gray-500 mr-3 mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
              <p className="text-lg">{formattedDate}</p>
            </div>
          </div>
          
          {isAdmin && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <h3 className="flex items-center text-green-800 font-medium">
                <Shield className="h-5 w-5 mr-2" />
                Admin Privileges
              </h3>
              <p className="mt-2 text-green-700">
                You have administrator privileges. You can manage books through the admin dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <button className="btn btn-secondary">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
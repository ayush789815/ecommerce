import React, { useState, useEffect } from 'react';
import { Edit2, User, Mail, Phone, MapPin, Camera, ArrowLeft } from 'lucide-react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const ProfilePageAlt = () => {
  // Sample user data - in a real app, this would come from an API or context
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: null,
    memberSince: '',
    rewardPoints: 275
  });

  // State for managing form editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...userData});
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_URL}/auth/getprofile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log("API Response:", res.data.user);
      if (res.data && res.data.user) {
        setUserData(res.data.user);
      }
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
    });
  }, []);
  
  // Sync formData with userData
  useEffect(() => {
    setFormData(userData);
  }, [userData]);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    try {
      const response = await axios.put(`${import.meta.env.VITE_URL}/auth/updateprofile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('Profile updated successfully:', response.data);
      setUserData({...formData});
      setIsEditing(false);
    } catch(err) {
      console.log('Error updating profile:', err);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  // Handle profile image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setFormData({
          ...formData,
          profileImage: event.target.result
        });
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-medium">My Account</h1>
          </div>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              <Edit2 size={16} />
              Edit
            </button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* Profile image */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-indigo-50 border-2 border-indigo-100 overflow-hidden flex items-center justify-center">
                    {userData.profileImage ? (
                      <img 
                        src={userData.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <User size={40} className="text-indigo-300" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer">
                      <Camera size={16} />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-medium capitalize">{userData.name}</h2>
                <p className="text-gray-500 text-sm">Member since {new Date(userData.memberSince).toLocaleDateString("en-GB")}</p>
              </div>
              
              {/* Navigation menu */}
              <nav>
                <ul className="space-y-1">
                  <li>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 ${
                        activeTab === 'profile' 
                          ? 'bg-indigo-50 text-indigo-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <User size={18} />
                      Profile
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 ${
                        activeTab === 'orders' 
                          ? 'bg-indigo-50 text-indigo-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 2H15M4 6H20M19 6L18.2 16.2C18.1 17.2 17.9 18 16.8 18H7.2C6.1 18 5.9 17.2 5.8 16.2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 11V15M15 11V15M12 11V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Orders
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('addresses')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 ${
                        activeTab === 'addresses' 
                          ? 'bg-indigo-50 text-indigo-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <MapPin size={18} />
                      Addresses
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('wishlist')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 ${
                        activeTab === 'wishlist' 
                          ? 'bg-indigo-50 text-indigo-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.3 5.71C18.841 5.24833 18.2943 4.87917 17.6917 4.62313C17.0891 4.36709 16.4426 4.22825 15.79 4.21C15.1373 4.19104 14.4877 4.29772 13.8807 4.52412C13.2737 4.75052 12.7194 5.09176 12.25 5.53L12 5.77L11.74 5.53C11.2678 5.0839 10.7079 4.73377 10.0946 4.50013C9.48128 4.26648 8.82488 4.15471 8.16499 4.17233C7.50509 4.18995 6.85569 4.33648 6.2568 4.60306C5.65791 4.86964 5.12123 5.24958 4.68 5.71C3.78138 6.61765 3.27444 7.83537 3.27444 9.105C3.27444 10.3746 3.78138 11.5923 4.68 12.5L11.22 19.04C11.3971 19.2201 11.645 19.3229 11.905 19.3229C12.165 19.3229 12.4129 19.2201 12.59 19.04L19.13 12.5C20.0304 11.5868 20.5365 10.3618 20.5322 9.08438C20.5279 7.80698 20.0134 6.58574 19.107 5.678L19.3 5.71Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Wishlist
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('settings')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 ${
                        activeTab === 'settings' 
                          ? 'bg-indigo-50 text-indigo-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Settings
                    </button>
                  </li>
                </ul>
              </nav>
              
              {/* Reward points */}
              <div className="mt-6 pt-6 border-t">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-indigo-800">Reward Points</span>
                    <span className="text-indigo-800 font-bold">{userData.rewardPoints}</span>
                  </div>
                  <div className="w-full bg-indigo-100 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${(userData.rewardPoints / 500) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-indigo-700 mt-2">
                    {500 - userData.rewardPoints} more points to reach Gold status
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:w-3/4">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-6">Profile Information</h2>
                
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Shipping Address
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-3 pt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({...userData});
                          setIsEditing(false);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg bg-gray-50">
                        <div className="flex items-start">
                          <div className="bg-indigo-100 rounded-full p-2 mr-3">
                            <User size={20} className="text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-500">Full Name</h3>
                            <p className="text-gray-800 capitalize">{userData.name}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gray-50">
                        <div className="flex items-start">
                          <div className="bg-indigo-100 rounded-full p-2 mr-3">
                            <Mail size={20} className="text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-500">Email Address</h3>
                            <p className="text-gray-800">{userData.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gray-50">
                        <div className="flex items-start">
                          <div className="bg-indigo-100 rounded-full p-2 mr-3">
                            <Phone size={20} className="text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-500">Phone Number</h3>
                            <p className="text-gray-800">{userData.phone}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gray-50">
                        <div className="flex items-start">
                          <div className="bg-indigo-100 rounded-full p-2 mr-3">
                            <MapPin size={20} className="text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-500">Shipping Address</h3>
                            <p className="text-gray-800 capitalize">{userData.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-medium mb-3">Account Security</h3>
                      <div className="flex flex-col md:flex-row gap-4">
                        <button className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Change Password
                        </button>
                        <button className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Enable 2FA
                        </button>
                        <button className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Manage Devices
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-6">My Orders</h2>
                <div className="text-center py-8 text-gray-500">
                  <p>Orders will be displayed here</p>
                </div>
              </div>
            )}
            
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-6">My Addresses</h2>
                <div className="text-center py-8 text-gray-500">
                  <p>Addresses will be displayed here</p>
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-6">My Wishlist</h2>
                <div className="text-center py-8 text-gray-500">
                  <p>Wishlist items will be displayed here</p>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-6">Account Settings</h2>
                <div className="text-center py-8 text-gray-500">
                  <p>Settings will be displayed here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageAlt;
import React, { useState, useEffect } from 'react';
import { Edit2, User, Mail, Phone, MapPin, Camera, ArrowLeft } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../axios/axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const user = await getUserProfile(userId);
        if (user) {
          setUserData(user);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    
    fetchProfile();
  }, []);
  
  // Sync formData with userData
  useEffect(() => {
    setFormData(userData);
  }, [userData]);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await updateUserProfile(userId, formData);
      setUserData({...formData});
      setIsEditing(false);
    } catch(err) {
      console.log('Error updating profile:', err);
    }
  };

  // ... rest of the code
} 
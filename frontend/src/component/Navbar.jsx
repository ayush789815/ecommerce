import React from 'react';
import Header from './Header/Header';

// This component is just a wrapper around the Header component
// to ensure we have a consistent Navbar component to use throughout the app
const Navbar = () => {
  return <Header />;
};

export default Navbar; 
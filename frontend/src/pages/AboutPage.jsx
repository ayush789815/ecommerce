import React from 'react';
import { Truck, Headphones, ShieldCheck } from 'lucide-react';
import Header from '../component/Header/Header';
import Footer from '../component/Footer';

const AboutPage = () => {
  const stats = [
    { value: '10.5k', label: 'Sellers active on our site' },
    { value: '33k', label: 'Monthly Product Sale' },
    { value: '45.5k', label: 'Customers active on our site' },
    { value: '25k', label: 'Annual gross sale on our site' },
  ];

  const team = [
    {
      name: 'Tom Cruise',
      role: 'Founder & Chairman',
      image: 'https://wallpapers.com/images/high/top-gun-maverick-logo-lg74n3vhlbt316zt.webp',
    },
    {
      name: 'Emma Watson',
      role: 'Managing Director',
      image: 'https://wallpapers.com/images/hd/emma-watson-beautiful-smile-go7l78ciwk48nqvf.webp',
    },
    {
      name: 'Will Smith',
      role: 'Product Designer',
      image: 'https://wallpapers.com/images/high/will-smith-thinking-deeply-w8gx5lxw08cvv81a.webp',
    },
  ];

  const services = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days',
    },
  ];

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-gray-600 mb-4">
              Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh.
            </p>
            <p className="text-gray-600 mb-4">
              Exclusive offers a diverse assortment in categories ranging from consumer goods to electronics and fashion.
            </p>
          </div>
          <div>
            <img
              src="https://wallpapers.com/images/hd/starry-night-over-mountains-zt0to2lebx20wyzt.webp"
              alt="About Us"
              className="rounded-lg w-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {services.map((service, index) => (
            <div key={index} className="p-6 rounded-lg shadow bg-gray-100">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white rounded-full shadow">
                {service.icon}
              </div>
              <h3 className="font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;

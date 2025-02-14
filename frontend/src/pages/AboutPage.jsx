import React from 'react';
import { Truck, Headphones, ShieldCheck } from 'lucide-react';
import Header from '../component/Header/Header';
import Footer from '../component/Footer';

const AboutPage = () => {
  const stats = [
    { value: '10.5k', label: 'Sellers active our site' },
    { value: '33k', label: 'Monthly Producuct Sale' },
    { value: '45.5k', label: 'Customer active in our site' },
    { value: '25k', label: 'Anual gross sale in our site' },
  ];

  const team = [
    {
      name: 'Tom Cruise',
      role: 'Founder & Chairman',
      image: 'https://images.unsplash.com/photo-1739236142460-72c4ebe45971?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Emma Watson',
      role: 'Managing Director',
      image: 'https://images.unsplash.com/photo-1739465595182-d3ec24f6ebcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Will Smith',
      role: 'Product Designer',
      image: 'https://images.unsplash.com/photo-1739437455408-66aab68b5c0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-2 gap-12 mb-16">
          <div>
            <h1 className="text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-gray-600 mb-4">
              Launched in 2015, Exclusive is South Asia's premier online shopping
              marketplace with an active presence in Bangladesh. Supported
              by wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sellers and 300 brands and serves 3
              millions customers across the region.
            </p>
            <p className="text-gray-600 mb-4">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assortment in categories
              ranging from consumer.
              Exclusive, launched in 2015, is South Asia's premier online shopping
              marketplace with a strong presence in Bangladesh.
            </p>
            <p className="text-gray-600">
              Supported   by wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sellers and 300 brands and serves 3
              millions customers across the region.It supports 10,500
              sellers and 300 brands, serving 3 million customers. Offering over 1
              million products, Exclusive provides tailored marketing, data, and service solutions, ensuring a diverse and fast-growing assortment.
            </p>
          </div>
          <div>
            <img
              src="https://plus.unsplash.com/premium_photo-1739091068170-5486fbb36cff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1Nnx8fGVufDB8fHx8fA%3D%3D"
              alt="About Us"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg text-center border hover:border-red-500 transition-colors"
            >
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-gray-600">X</a>
                  <a href="#" className="text-gray-400 hover:text-gray-600">In</a>
                  <a href="#" className="text-gray-400 hover:text-gray-600">Ig</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {service.icon}
              </div>
              <h3 className="font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
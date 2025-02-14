import React from 'react';
import { Phone, Mail } from 'lucide-react';
import Header from '../component/Header/Header';
import Footer from '../component/Footer';

const ContactPage = () => {
  return (
    <>
    <Header />
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid grid-cols-2 gap-12">
        <div>
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="bg-red-500 p-3 rounded-full text-white">
                <Phone className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold ml-4">Call To Us</h2>
            </div>
            <p className="text-gray-600 mb-2">We are available 24/7, 7 days a week.</p>
            <p className="text-gray-600">Phone: +91 8839042497</p>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <div className="bg-red-500 p-3 rounded-full text-white">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold ml-4">Write To US</h2>
            </div>
            <p className="text-gray-600 mb-2">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-gray-600">Emails: ayushvishwakarmaa612@gmail.com</p>
            <p className="text-gray-600">Emails: support@exclusive.com</p>
          </div>
        </div>

        <div>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="bg-gray-50 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="bg-gray-50 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <input
              type="tel"
              placeholder="Your Phone *"
              className="w-full bg-gray-50 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <textarea
              placeholder="Your Message"
              rows="6"
              className="w-full bg-gray-50 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
            ></textarea>
            <button
              type="submit"
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ContactPage;
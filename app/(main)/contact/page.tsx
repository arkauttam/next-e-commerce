"use client";

import React from "react";
import { TextShimmer } from '../../../components/motion-primitives/text-shimmer';

const ContactPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      
      {/* Main Gradient Heading */}
      <h2
        className="text-4xl font-bold text-center mb-12 
                   bg-gradient-to-r from-[#def5fa] via-[#14346b] to-[#040414] 
                   bg-clip-text text-transparent"
      >

        Contact Us
      </h2>

      {/* Contact Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Contact Form */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right - Contact Info */}
        <div className="bg-gray-100 dark:bg-gray-900 shadow-lg rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Information
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Feel free to reach out to us anytime. We’ll be happy to help you.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Address
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                123 Main Street, City, Country
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Phone
              </h4>
              <p className="text-gray-600 dark:text-gray-300">+1 234 567 890</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Email
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                info@example.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Find Us on the Map
        </h3>
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509547!2d144.95565131531596!3d-37.81732797975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577f93c1e9efaf7!2sEnvato!5e0!3m2!1sen!2sau!4v1618888562427!5m2!1sen!2sau"
            width="100%"
            height="100%"
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

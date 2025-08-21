import React from "react";
import { Separator } from "../ui/separator";
import { FaFacebook, FaTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import Link from 'next/link'
import { dummyCategories } from "@/data/category/categoryData";
import Logo from "../logo/Logo";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 mb-8">
          {/* Column 1 - Logo and Social */}
          <div className="flex flex-col space-y-4">
            <Logo />
            <p className="text-gray-300 text-sm md:text-base">
              Your one-stop shop for all things electronics.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com"
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href="https://www.x.com"
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href="https://www.instagram.com"
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagramSquare size={24} />
              </Link>
            </div>
          </div>

          {/* Column 2 - Categories */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              {dummyCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={`/shop?category=${category.name}`}
                    className="text-gray-300 hover:text-white text-sm md:text-base transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Navigation */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white text-sm md:text-base transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white text-sm md:text-base transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white text-sm md:text-base transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-300 hover:text-white text-sm md:text-base transition-colors"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Support */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-gray-300 hover:text-white text-sm md:text-base transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm md:text-base transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm md:text-base transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm md:text-base transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <Separator className="bg-gray-600 my-6" />

        {/* Newsletter Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <h3 className="text-lg font-semibold">Stay Updated</h3>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter and never miss exclusive deals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-600 border border-gray-500 focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 text-sm text-white placeholder-gray-300"
              />
              <Button
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 px-6 font-medium whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Separator className="bg-gray-600 my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
          <div className="flex items-center flex-wrap gap-2 text-sm text-gray-300">
            <span>
              © {new Date().getFullYear()} e-commerce. Made by
              <a
                href="https://www.linkedin.com/in/uttam-ghosh-7187a2258/"
                className="text-blue-300 hover:text-blue-200 pl-1 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Uttam Ghosh
              </a>
            </span>
            <span className="flex items-center gap-1">
              with
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              for shoppers everywhere.
            </span>
          </div>
          <div className="flex items-center flex-wrap gap-3 text-sm text-gray-300">
            <span>Fast Delivery</span>
            <span className="hidden sm:inline">•</span>
            <span>Secure Payments</span>
            <span className="hidden sm:inline">•</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
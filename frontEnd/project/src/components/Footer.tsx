import React from 'react';
import { BookOpen, Heart, Github as GitHub, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-4/12 mb-6 md:mb-0">
            <div className="flex items-center mb-3">
              <BookOpen className="h-6 w-6 text-[var(--secondary)]" />
              <span className="ml-2 text-xl font-bold">BookStore</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Your one-stop destination for all types of books. 
              Browse our extensive collection and find your next favorite read.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <GitHub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-3/12 mb-6 md:mb-0">
            <h5 className="text-xl font-bold mb-4">Quick Links</h5>
            <ul className="list-none">
              <li className="mb-2">
                <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/login" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Login
                </a>
              </li>
              <li className="mb-2">
                <a href="/register" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Register
                </a>
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-3/12">
            <h5 className="text-xl font-bold mb-4">Contact Us</h5>
            <p className="text-gray-400 mb-2 text-sm">
              123 Bookstore Lane
            </p>
            <p className="text-gray-400 mb-2 text-sm">
              Literary City, BC 12345
            </p>
            <p className="text-gray-400 mb-2 text-sm">
              Email: contact@bookstore.com
            </p>
            <p className="text-gray-400 mb-2 text-sm">
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BookStore. All rights reserved. Made with <Heart className="h-4 w-4 inline text-red-500" /> 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
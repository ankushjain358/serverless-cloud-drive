"use client";

import { MoonIcon, SunIcon } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="bg-black  flex-shrink-0">
      <div className="w-full mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl">
                Cloud Drive
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/auth"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login / Register
            </Link>
            <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md ">
              <SunIcon className="text-white h-4 w-4" />
            </button>
            <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md ">
              <MoonIcon className="text-white h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

"use client";
import { Bell, MapPin, Shield, Users, AlertTriangle, Clock, Star, Menu } from 'lucide-react';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./Navbar.module.css"; // Assuming CSS modules for styling

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className={styles.navbar}>
       <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">SecureGuard Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">AD</span>
              </div>
            </div>
          </div>
        </div>
      </header>
     
    </nav>
  );
};

export default Navbar;

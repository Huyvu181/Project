import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white ml-3 flex justify-between">
      <Link to="/" className="mx-2 hover:text-gray-300">Home</Link>
      <Link to="/dashboard" className="mx-2 hover:text-gray-300">Dashboard</Link>
      <Link to="/profile" className="mx-2 hover:text-gray-300">Profile</Link>
    </nav>

  );
}

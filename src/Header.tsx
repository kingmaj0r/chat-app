import React from 'react';

interface HeaderProps {
  name: string;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ name, handleLogout }) => (
  <div className="flex justify-between items-center bg-blue-500 text-white p-4">
    <h1 className="text-xl font-semibold">Welcome, {name}</h1>
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
    >
      Logout
    </button>
  </div>
);

export default Header;

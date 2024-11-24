import React from 'react';

interface NameSetupProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  isTestingAddress: boolean;
  errorMessage: string;
  handleNameSubmit: () => void;
}

const NameSetup: React.FC<NameSetupProps> = ({
  name,
  setName,
  address,
  setAddress,
  isTestingAddress,
  errorMessage,
  handleNameSubmit,
}) => (
  <div className="flex items-center justify-center h-full bg-white">
    <div className="p-6 bg-gray-200 rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-4">Setup Chat</h1>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        disabled={isTestingAddress}
      />
      <input
        type="text"
        placeholder="Server address (e.g., localhost:8080)"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        disabled={isTestingAddress}
      />
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <button
        onClick={handleNameSubmit}
        disabled={isTestingAddress}
        className={`w-full px-4 py-2 rounded ${
          isTestingAddress ? 'bg-gray-400 text-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isTestingAddress ? 'Testing Address...' : 'Start Chatting'}
      </button>
    </div>
  </div>
);

export default NameSetup;

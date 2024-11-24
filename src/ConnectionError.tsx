import React from 'react';

interface ConnectionErrorProps {
  readyState: number;
  handleReconnect: () => void;
}

const ConnectionError: React.FC<ConnectionErrorProps> = ({ readyState, handleReconnect }) => (
  readyState === WebSocket.CLOSED ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded shadow-lg text-center">
        <p className="text-lg font-semibold text-red-500 mb-4">Connection lost. Please reconnect.</p>
        <button
          onClick={handleReconnect}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reconnect
        </button>
      </div>
    </div>
  ) : null
);

export default ConnectionError;

import React from 'react';

interface MessageListProps {
  messages: { sender: string; text: string }[];
  messageContainerRef: React.RefObject<HTMLDivElement>;
  name: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  messageContainerRef,
  name,
}) => (
  <div ref={messageContainerRef} className="flex-grow p-4 overflow-y-auto bg-gray-50">
    {messages.map((msg, idx) => (
      <div key={idx} className={`flex ${msg.sender === name ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`relative max-w-xs px-4 py-2 rounded-lg shadow ${msg.sender === name ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-gray-300 text-black rounded-tl-none'}`}>
          {msg.sender !== name && <span className="block text-xs font-medium mb-1">{msg.sender}</span>}
          <span>{msg.text}</span>
        </div>
      </div>
    ))}
  </div>
);

export default MessageList;

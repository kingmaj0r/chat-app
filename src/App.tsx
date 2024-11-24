import { useState, useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import NameSetup from './NameSetup';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ConnectionError from './ConnectionError';
import Header from './Header';

const App = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [isTestingAddress, setIsTestingAddress] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Track logout state
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { sendMessage, readyState } = useWebSocket(
    isNameSet && isAddressValid ? `ws://${address}/ws` : null,
    {
      onMessage: (event) => {
        const receivedMessage = JSON.parse(event.data);
        if (receivedMessage.sender === "Server" && receivedMessage.text === "Username already taken") {
          setErrorMessage("This username is already taken. Please choose a different one.");
          setIsNameSet(false);
        } else {
          setMessages((prev) => [...prev, receivedMessage]);
        }
      },
      shouldReconnect: () => false,
      onClose: () => {
        if (!isLoggingOut) {
          setIsNameSet(false);
          setMessages([]);
          setErrorMessage('Connection to the server was lost. Please try reconnecting.');
        }
      },
    }
  );

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const testAddress = async () => {
    setIsTestingAddress(true);
    setErrorMessage('');
    try {
      const testSocket = new WebSocket(`ws://${address}/ws`);
      await new Promise((resolve, reject) => {
        testSocket.onopen = resolve;
        testSocket.onerror = reject;
      });
      testSocket.close();
      setIsAddressValid(true);
    } catch (error) {
      setErrorMessage('Failed to connect to the server. Please check the address and try again.');
      setIsAddressValid(false);
    } finally {
      setIsTestingAddress(false);
    }
  };

  const handleNameSubmit = async () => {
    if (name.trim() && address.trim()) {
      await testAddress();
      if (isAddressValid) {
        sendMessage(JSON.stringify({ sender: name, text: '' }));
        setIsNameSet(true);
      }
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(JSON.stringify({ sender: name, text: message }));
      setMessage('');
    }
  };

  const handleReconnect = () => {
    if (readyState === WebSocket.CLOSED) {
      setIsNameSet(false);
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setIsNameSet(false);
    setIsAddressValid(false);
    setName('');
    setAddress('');
    setMessages([]);
    setErrorMessage('');
    setMessage('');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {!isNameSet ? (
        <NameSetup
          name={name}
          setName={setName}
          address={address}
          setAddress={setAddress}
          isTestingAddress={isTestingAddress}
          errorMessage={errorMessage}
          handleNameSubmit={handleNameSubmit}
        />
      ) : (
        <div className="flex flex-col h-full">
          <Header name={name} handleLogout={handleLogout} />
          <MessageList messages={messages} messageContainerRef={messageContainerRef} name={name} />
          <MessageInput message={message} setMessage={setMessage} handleSend={handleSend} />
          <ConnectionError readyState={readyState} handleReconnect={handleReconnect} />
        </div>
      )}
    </div>
  );
};

export default App;

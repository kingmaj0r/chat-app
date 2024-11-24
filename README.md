# Chat Application

This is a simple WebSocket-based chat application built using React and TypeScript. It allows users to connect to a WebSocket server, set up their username, and exchange messages in real-time.

## Features

- **Username Setup:** The user can input their name and the server address.
- **Real-Time Messaging:** Users can send and receive messages in real time through WebSockets.
- **Reconnect Mechanism:** In case of connection loss, users can attempt to reconnect.
- **Logout:** Users can log out, clearing all the chat history and resetting settings.

## Tech Stack

- **React:** For building the user interface.
- **TypeScript:** For type safety.
- **WebSockets:** For real-time communication between the client and server.

## File Structure

The project is divided into smaller components to make it more maintainable and scalable.

- `src/`
  - `App.tsx`: Main entry point for the application.
  - `NameSetup.tsx`: Component to handle the username and server address setup.
  - `MessageList.tsx`: Component to display the list of messages.
  - `MessageInput.tsx`: Component for the user to input and send messages.
  - `ConnectionError.tsx`: Component to handle the connection error state and reconnect logic.
  - `Header.tsx`: Component for displaying the username and logout button.

## Setup Instructions

### Prerequisites

Make sure you have the following tools installed:
- Node.js (>=14.x.x)
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kingmaj0r/chat-app.git
    cd chat-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

    Or if you're using yarn:

    ```bash
    yarn install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

    Or with yarn:

    ```bash
    yarn start
    ```

    The app should now be running at `http://localhost:3000`.

### WebSocket Server

You will need a WebSocket server running to connect to. The WebSocket client tries to connect to a server at the address you provide (e.g., `localhost:8080`). Make sure the server is set up and configured to handle WebSocket connections.

## Components Overview

### 1. **App.tsx**

The main component that handles the overall state of the application, including:
- User login (with name and server address setup).
- Managing messages and WebSocket connections.
- Handling reconnection and logout functionality.

### 2. **NameSetup.tsx**

Handles the input of the user's name and server address. It also verifies the server address before allowing the user to proceed.

### 3. **MessageList.tsx**

Displays the list of messages. Messages from the user are displayed on the right, and messages from others are displayed on the left.

### 4. **MessageInput.tsx**

Allows the user to input and send messages to the server.

### 5. **ConnectionError.tsx**

Displays a message if the connection to the WebSocket server is lost, allowing the user to try reconnecting.

### 6. **Header.tsx**

Displays the logged-in username and provides a logout button to end the session.

## Running the Application

1. **Set up your WebSocket server**:
   - The client expects a WebSocket server running on `ws://<server-address>/ws`.
   - Make sure the server accepts connections and handles messages in the format `{ sender: string, text: string }`.

2. **Start the app**:
   - Run the development server locally.
   - Enter your desired name and server address in the input fields.
   - Start chatting!

## Known Issues

- WebSocket connection may fail if the server address is incorrect or if the WebSocket server is unavailable.
- The app currently does not handle multiple rooms or advanced features like user lists.

## Future Improvements

- Add user authentication.
- Add message history and storage.
- Implement multiple chat rooms.
- Add styling improvements.

## License

This project is licensed under the MIT License.
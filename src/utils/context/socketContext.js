import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './authContext';
const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { userDetails, userToken } = useAuth();

  useEffect(() => {
    console.log('🔧 SocketProvider - Auth check:', {
      hasToken: !!userToken,
      hasUserDetails: !!userDetails,
      userDetails
    });

    if (userToken && userDetails) {
      console.log('✅ Conditions met - initializing socket');
      initializeSocket();
    } else {
      console.log('❌ Conditions NOT met - skipping socket init');
      disconnectSocket();
    }

    return () => {
      console.log('🧹 Cleanup - disconnecting socket');
      disconnectSocket();
    };
  }, [userToken, userDetails]);

  const initializeSocket = () => {
    try {
      console.log('🚀 Starting socket initialization...');
      console.log('📡 Connecting to:', "https://api.estreewalla.com");

      // Determine user role - since it's not in userDetails, we need to infer it
      // If your API has customer endpoints, likely this is a customer
      const userRole = 'customer'; // Default to customer since you have customerId

      const newSocket = io("https://api.estreewalla.com", {
        transports: ['websocket', 'polling'],
        timeout: 10000,
        forceNew: true,
        query: {
          userId: userDetails.id, // Use .id instead of ._id
          role: userRole,
          platform: 'react-native'
        }
      });

      newSocket.on('connect', () => {
        console.log('✅✅✅ SOCKET CONNECTED SUCCESSFULLY!');
        console.log('🔗 Socket ID:', newSocket.id);
        setIsConnected(true);

        const room = `customer_${userDetails.id}`;
        console.log('🚪 Joining room:', room);
        newSocket.emit('join-room', room);
      });

      newSocket.on('connect_error', (error) => {
        console.log('❌❌❌ CONNECTION ERROR:', error.message);
        console.log('🔍 Error details:', error);

        // Try alternative connection methods
        console.log('🔄 Trying alternative connection method...');
        setTimeout(() => {
          if (!isConnected) {
            initializeSocketWithAlternativeConfig();
          }
        }, 2000);
      });

      newSocket.on('disconnect', (reason) => {
        console.log('🔌 Disconnected:', reason);
        setIsConnected(false);
      });

      // Test if server responds
      newSocket.on('welcome', (data) => {
        console.log('👋 Welcome from server:', data);
      });

      // Listen for any event for debugging
      newSocket.onAny((event, ...args) => {
        console.log(`📡 Received event: ${event}`, args);
      });

      setSocket(newSocket);
      console.log('🎯 Socket instance created');

    } catch (error) {
      console.log('💥 ERROR in initializeSocket:', error);
    }
  };

  // Alternative configuration for connection
  const initializeSocketWithAlternativeConfig = () => {
    try {
      console.log('🔄 Trying alternative socket configuration...');

      const userRole = 'customer';

      const newSocket = io("https://api.estreewalla.com", {
        transports: ['polling'], // Try polling only
        timeout: 5000,
        query: {
          userId: userDetails.id,
          role: userRole
        }
      });

      newSocket.on('connect', () => {
        console.log('✅ Connected with alternative config!');
        setIsConnected(true);
      });

      newSocket.on('connect_error', (error) => {
        console.log('❌ Alternative config also failed:', error.message);
      });

      setSocket(newSocket);
    } catch (error) {
      console.log('💥 Alternative config error:', error);
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      console.log('🔌 Disconnecting socket...');
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  };

  const value = {
    socket,
    isConnected,
    disconnectSocket,
    reconnect: initializeSocket
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
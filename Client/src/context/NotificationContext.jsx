import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      autoConnect: false,
      transports: ["polling", "websocket"],
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.connect();

    const handleConnect = () => {
      console.log("✅ Socket Connected with ID:", socket.id);
    };

    const pushNotification = (title, message) => {
      const timeString = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newNotif = {
        id: Date.now() + Math.random(),
        title,
        message,
        time: timeString,
        read: false,
      };

      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    const handleNewClient = (newClient) => {
      console.log("🔥 Event Received [new_client_registered]:", newClient);
      pushNotification(
        "New Client Registered",
        `${newClient.fullname || newClient.email} created an account.`
      );
    };

    const handleLoggedIn = (client) => {
      console.log("🔥 Event Received [client_logged_in]:", client);
      pushNotification(
        "Client Logged In",
        `${client.fullname || client.email} signed into the platform.`
      );
    };

    const handleDeleted = (deletedClient) => {
      console.log("🔥 Event Received [client_deleted]:", deletedClient);
      pushNotification(
        "Client Account Removed",
        `Account for ${deletedClient.fullname || deletedClient.email} was deleted.`
      );
    };

    socket.on("connect", handleConnect);
    socket.on("new_client_registered", handleNewClient);
    socket.on("client_logged_in", handleLoggedIn);
    socket.on("client_deleted", handleDeleted);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("new_client_registered", handleNewClient);
      socket.off("client_logged_in", handleLoggedIn);
      socket.off("client_deleted", handleDeleted);
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        showNotifications,
        setShowNotifications,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}

"use client";
import React, { createContext, useContext, useState } from "react";

// Define the context type
interface UserContextType {
  isUserIdentified: boolean;
  setIsUserIdentified: (value: boolean) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUserIdentified, setIsUserIdentified] = useState(false);

  return (
    <UserContext.Provider value={{ isUserIdentified, setIsUserIdentified }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy use
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

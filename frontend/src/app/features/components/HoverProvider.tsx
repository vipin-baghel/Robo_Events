'use client';
import React, { createContext, useContext, useState } from 'react';

type HoverContextType = {
  isEventsHovered: boolean;
  setIsEventsHovered: (value: boolean) => void;
};

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export const HoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEventsHovered, setIsEventsHovered] = useState(false);
  return (
    <HoverContext.Provider value={{ isEventsHovered, setIsEventsHovered }}>
      {children}
    </HoverContext.Provider>
  );
};

export const useHoverContext = () => {
  const context = useContext(HoverContext);
  if (!context) {
    throw new Error('useHoverContext must be used within a HoverProvider');
  }
  return context;
};

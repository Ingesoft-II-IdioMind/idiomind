"use client"

import { createContext, useState, useContext, ReactNode } from 'react';

const SidebarContext = createContext({ isSidebarOpen: false, setIsSidebarOpen: (value: boolean) => {},});
const TranslatebarContext = createContext({ isTranslatebarOpen: false, setIsTranslatebarOpen: (value: boolean) => {},});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTranslatebarOpen, setIsTranslatebarOpen] = useState(false);

  
    return (
      <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <TranslatebarContext.Provider value={{ isTranslatebarOpen, setIsTranslatebarOpen }}>
          {children}
        </TranslatebarContext.Provider>
      </SidebarContext.Provider>
    );
  };

export const useSidebar = () => useContext(SidebarContext);
export const useTranslatebar = () => useContext(TranslatebarContext);
import React, { createContext, useContext, useState, useEffect } from 'react';
import { breakpoints } from '../utils/responsive';

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoints.mobile);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoints.mobile);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <ResponsiveContext.Provider value={{ isMobile }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => useContext(ResponsiveContext); 
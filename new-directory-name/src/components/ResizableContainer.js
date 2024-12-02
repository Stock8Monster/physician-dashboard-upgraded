import React from 'react';
import { useResponsive } from '../utils/deviceDetection';

const ResizableContainer = ({ children }) => {
  const { isMobile } = useResponsive();
  
  return (
    <div style={{
      width: isMobile ? '100%' : 'auto',
      height: isMobile ? 'auto' : '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {children}
    </div>
  );
};

export default ResizableContainer; 
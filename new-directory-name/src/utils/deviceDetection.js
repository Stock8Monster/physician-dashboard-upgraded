export const isFoldableDevice = () => {
  const ua = navigator.userAgent;
  return /Galaxy Z Fold/.test(ua) || window.screen.width >= 1768;
};

// Usage in components
const { isMobile, isFoldable } = useResponsive();
const containerWidth = isFoldable ? '100%' : (isMobile ? '100vw' : '800px'); 
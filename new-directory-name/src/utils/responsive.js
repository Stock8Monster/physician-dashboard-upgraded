export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200
};

export const isMobile = () => window.innerWidth <= breakpoints.mobile;
export const isTablet = () => window.innerWidth <= breakpoints.tablet;
import { useState, useEffect } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1440,
    isDesktop: window.innerWidth >= 1440,
    isLandscape: window.innerWidth > window.innerHeight,
    isPortrait: window.innerWidth <= window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;

      setWindowSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1440,
        isDesktop: width >= 1440,
        isLandscape,
        isPortrait: !isLandscape,
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;

import { createContext, useState, useEffect } from "react";

const MediaContext = createContext({
  isTablet: false,
  isDesktop: false,
});

export function MediaContextProvider(props) {
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const tabletQuery = window.matchMedia("only screen and (min-width: 40em)");
    const desktopQuery = window.matchMedia("only screen and (min-width: 90em)");

    setIsTablet(tabletQuery.matches);
    setIsDesktop(desktopQuery.matches);

    function updateIsTablet(e) {
      setIsTablet(e.matches);
    }
    tabletQuery.addEventListener("change", updateIsTablet);

    function updateIsDesktop(e) {
      setIsDesktop(e.matches);
    }
    desktopQuery.addEventListener("change", updateIsDesktop);

    return function cleanup() {
      tabletQuery.removeEventListener("change", updateIsTablet);
      desktopQuery.removeEventListener("change", updateIsDesktop);
    };
  });

  const context = {
    isTablet: isTablet,
    isDesktop: isDesktop,
  };

  return (
    <MediaContext.Provider value={context}>
      {props.children}
    </MediaContext.Provider>
  );
}

export default MediaContext;

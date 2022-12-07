import { createContext, useState, useEffect } from "react";

const MediaContext = createContext({
  isTablet: false,
});

export function MediaContextProvider(props) {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      "only screen and (min-width: 40em)"
    );

    setIsTablet(mediaQueryList.matches);

    function updateIsTablet(e) {
      setIsTablet(e.matches);
    }
    mediaQueryList.addEventListener("change", updateIsTablet);

    return function cleanup() {
      mediaQueryList.removeEventListener("change", updateIsTablet);
    };
  });

  const context = {
    isTablet: isTablet,
  };

  return (
    <MediaContext.Provider value={context}>
      {props.children}
    </MediaContext.Provider>
  );
}

export default MediaContext;

import { useState, useEffect } from "react";

// query : tablet, desktop
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  let selectedQuery = "";

  if (query === "tablet") {
    selectedQuery = "only screen and (min-width: 40em)";
  } else {
    selectedQuery = "only screen and (min-width: 82em)";
  }

  useEffect(() => {
    const media = window.matchMedia(selectedQuery);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;

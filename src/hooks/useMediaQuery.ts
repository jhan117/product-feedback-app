import { useState, useEffect } from "react";

// query : tablet, desktop
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  const minWidth = query === "tablet" ? 40 : 82;
  const selectedQuery = `only screen and (min-width: ${minWidth}em)`;

  useEffect(() => {
    const media = window.matchMedia(selectedQuery);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, selectedQuery]);

  return matches;
};

export default useMediaQuery;

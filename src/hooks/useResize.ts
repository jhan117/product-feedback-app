import { useEffect } from "react";

const useResize = (func: () => void, scroll = false) => {
  useEffect(() => {
    window.addEventListener("resize", func);
    if (scroll) window.addEventListener("scroll", func);
    return () => {
      window.removeEventListener("resize", func);
      if (scroll) window.removeEventListener("scroll", func);
    };
  }, [func, scroll]);
};

export default useResize;

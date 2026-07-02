import { useEffect } from "react";

const useResize = (func: () => void, scroll = false) => {
  useEffect(() => {
    let ticking = false;
    const throttledFunc = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          func();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("resize", throttledFunc);
    if (scroll) window.addEventListener("scroll", throttledFunc);
    return () => {
      window.removeEventListener("resize", throttledFunc);
      if (scroll) window.removeEventListener("scroll", throttledFunc);
    };
  }, [func, scroll]);
};

export default useResize;

import { useEffect } from "react";

const useRootClass = (page) => {
  useEffect(() => {
    const root = document.querySelector("#root");

    root.className = "";
    root.classList.add(`${page}Body`);
  }, []);

  return true;
};

export default useRootClass;

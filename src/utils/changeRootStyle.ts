const changeRootStyle = (page: string) => {
  const root = document.querySelector("#root")!;
  root.className = "";
  root.classList.add(`${page}Body`);
};

export default changeRootStyle;

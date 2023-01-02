window.onScroll = (e) => {
  const scroll = window.scrollY;
  const header = document.querySelector("#nav-principal");
  if (scroll > 300) {
    header.classList.add("bg-light");
    console.log(scroll)
  } else {
    header.classList.add("bg-dark");
    console.log("menor 300", scroll);
  }
};

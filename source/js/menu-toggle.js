const menuButton = document.querySelector(".main-header__button");
const naviBar = document.querySelector(".main-header__nav");

const toggleMenu = () => {
  menuButton.addEventListener("click", () => {
    naviBar.classList.toggle("main-nav--opened");
  });
};

export { toggleMenu };

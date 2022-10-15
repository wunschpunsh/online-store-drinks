const selectContent = document.querySelector(".sort__control");
const selectItems = document.querySelectorAll(".sort__control-item");
const currentSelect = document.querySelector(".sort__control-current");

const showSelectedItem = () => {
  selectItems.forEach((item) => {
    if (item.textContent === currentSelect.textContent) {
      item.classList.add("sort__control-item--active");
    } else {
      item.classList.remove("sort__control-item--active");
    }
  });
};

const toggleOpen = () => {
  selectContent.classList.toggle("sort__control--open");
  showSelectedItem();
};

const openSelect = () => {
  currentSelect.addEventListener("click", toggleOpen);

  selectItems.forEach((item) => {
    item.addEventListener("click", () => {
      currentSelect.textContent = item.textContent;
      toggleOpen();
    });
  });
};

export { openSelect };

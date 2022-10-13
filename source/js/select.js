const currentSelect = document.querySelector('.sort__control-current');
const selectContent = document.querySelector('.sort__control');
const selectItem = document.querySelectorAll('.sort__control-item');

const toggleOpen = () => {
  selectContent.classList.toggle('sort__control--open');
};

const openSelect = () => {
  currentSelect.addEventListener('click', toggleOpen);

  selectItem.forEach((item) => {
    item.addEventListener('click', () => {
      currentSelect.textContent = item.textContent;
      toggleOpen();
    });
  });
};

export { openSelect };

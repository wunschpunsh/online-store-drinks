const prevButton = document.querySelector(".pagination__link--prev");
const nextButton = document.querySelector(".pagination__link--next");
const numberButtons = document.querySelectorAll(".pagination__link--number");
const paginationList = document.querySelector(".pagination__list");

const MIN_SCREEN_WIDTH = 768;

const currentScreenWidth = window.screen.width;

let currentPageNumber = 2;

const selectedPage = function () {
  for (let i = 0; i < numberButtons.length; i++) {
    if (i === currentPageNumber - 1) {
      numberButtons[i].classList.add("pagination__link--active");
    } else {
      numberButtons[i].classList.remove("pagination__link--active");
    }
  }
};

const hiddenButton = function () {
  if (currentScreenWidth >= MIN_SCREEN_WIDTH) {
    currentPageNumber == 1
      ? (prevButton.style.visibility = "hidden")
      : (prevButton.style.visibility = "visible");
    currentPageNumber == numberButtons.length
      ? (nextButton.style.visibility = "hidden")
      : (nextButton.style.visibility = "visible");
  }

  currentPageNumber == 1
    ? (prevButton.disabled = true)
    : (prevButton.disabled = false);
  currentPageNumber == numberButtons.length
    ? (nextButton.disabled = true)
    : (nextButton.disabled = false);
};

const changePage = function (page) {
  if (page < 1) {
    page = 1;
  }
  if (page > numberButtons.length) {
    page = numberButtons.length;
  }
  hiddenButton();
  selectedPage();
};

const prevPage = function () {
  currentPageNumber--;
  changePage(currentPageNumber);
};

const nextPage = function () {
  currentPageNumber++;
  changePage(currentPageNumber);
};

const clickPage = function () {
  paginationList.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains("pagination__link--number")) {
      currentPageNumber = evt.target.textContent;
      changePage(currentPageNumber);
    }

    if (
      evt.target.classList.contains("pagination__link-text--prev") ||
      evt.target.classList.contains("pagination__link--prev")
    ) {
      prevPage();
    }

    if (
      evt.target.classList.contains("pagination__link-text--next") ||
      evt.target.classList.contains("pagination__link--next")
    ) {
      nextPage();
    }
  });
};

export { clickPage };

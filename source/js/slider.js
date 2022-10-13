const createSlider = () => {
  new Swiper('.swiper ', {
    navigation: {
      nextEl: '.slide__button--next',
      prevEl: '.slide__button--prev',
    },
    pagination: {
      el: '.slider-pagination__list',
      clickable: true,
    },
  });
};

export { createSlider };

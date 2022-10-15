const createSlider = () => {
  new Swiper('.swiper ', {
    navigation: {
      nextEl: '.promo__swiper-button--next',
      prevEl: '.promo__swiper-button--prev',
    },
    pagination: {
      el: '.slider-pagination__list',
      clickable: true,
    },
  });
};

export { createSlider };

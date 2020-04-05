const slider = tns({
  container: '.carusel__slider',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false,
});

document.querySelector('.carusel__prev').addEventListener('click', function () {
  slider.goTo('prev')
});

document.querySelector('.carusel__next').addEventListener('click', function () {
  slider.goTo('next')
});
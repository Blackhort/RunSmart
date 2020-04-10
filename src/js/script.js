const slider = tns({
  container: '.carusel__slider',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  navPosition: "bottom",
  nav: true,
  autoplay: false,
  autoplayButton: false,
  autoplayButtonOutput: false,
  responsive: {
    768: {
      nav: false,
      autoplay: false,
    }
  }
});

document.querySelector('.carusel__prev').addEventListener('click', function () {
  slider.goTo('prev')
});

document.querySelector('.carusel__next').addEventListener('click', function () {
  slider.goTo('next')
});

(function($) {
  $(function() {
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    
  });
  })(jQuery);

  function toggleSlide(item){
    $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__more').eq(i).toggleClass('catalog-item__more_active');
      })
    })
  }
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');
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

  $('[data-modal=consultation]').on('click', function() {
    $('.form__input').val("");
    $('.overlay').css('display', 'flex');
    $('.overlay, #consultation').fadeIn('slow');

  });

  $('.button_mini').each(function(i){
    $(this).on('click', function(){
      $('.form__input').val("");
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay').css('display', 'flex');
      $('.overlay, #order').fadeIn('slow');
    });
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  $(function() {
    $("input[name=phone]").mask("+7(999) 999-99-99");
  });


  function ValidateForm(form){
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста введите ваше имя",
        phone: "Введите ваш номер телефона для связи!",
        email: {
          required: "Введите ваш e-mail для связи!",
          email: "e-mail должен быть в формате name@domain.com"
        }
      }
    });
  };
  ValidateForm('#consultation form');
  ValidateForm('#order form');
  ValidateForm('#consultation-form');

  $(window).scroll(function() {
    if ($(this).scrollTop()>1400) {
      $('.up').fadeIn('slow');
    } else {
      $('.up').fadeOut('slow');
    }
  });


  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
    });
      return false;
  });
})(jQuery);

new WOW().init();

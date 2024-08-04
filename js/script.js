document.addEventListener(`DOMContentLoaded`, function(){
  $(document).ready(function () {

    


      var swiper = new Swiper(".bannerSwiper", {
        pagination: {
          el: ".swiper-pagination-banner",
          type: "fraction",
        },
  
        loop:true,
        autoplay: {
          delay : 2500,
          disableOnInteraction: false,
        },
        
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
  
      var bullet = ['MOBILE', 'DISPLAY', 'NOTEBOOK', 'MAINBOARD', 'ACCESSORY']
      var swiper1 = new Swiper(".section1Swiper", {
        effect : 'fade',
        fadeEffect: {
          crossFade: true 
        },
        loop: false,
        pagination: {
          el: ".swiper-pagination-section1",
          clickable: true,
          renderBullet: function(index, className) {
            return '<div class="' + className + '"><span>' + (bullet[index]) + '</span></div>';
          }
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      
      var swiper3 = new Swiper(".section3Swiper", {
        // slidesPerView: 2,
        // spaceBetween: 20,
        // slidesOffsetAfter: 20,
        // slidesPerGroup: 2,
        loop:false, 
        autoplay: {
          delay : 5000,
          disableOnInteraction: false,
        },
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
          draggable: true,
        },
        pagination: {
          el: ".swiper-pagination-section3",
          clickable: true,
        },
        breakpoints: {
          1500: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
            slidesOffsetAfter: 20,
          },
          760: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 20,
            slidesOffsetAfter: 20,
          },
        }
      });  
  
      // 배너 오토플레이 시작 중지
      $('.stop-btn').click(function() {
        console.log('pause');
        swiper.autoplay.stop(); // 재생 중이라면 일시정지
        $(this).css({ display: 'none' });
        $('.start-btn').css({ display: 'block' });
      });
      $('.start-btn').click(function() {
        console.log('play');
        swiper.autoplay.start(); // 재생 중이라면 일시정지
        $(this).css({ display: 'none' });
        $('.stop-btn').css({ display: 'block' });
      });
  
      // 맨위로 올라가는 버튼 설정
      $(window).scroll(function(){
        const height = $(window).scrollTop();
        if(height == 0){
          $('.quick-bottom-btn').removeClass('start');
          $('.quick-top-btn').removeClass('start');
        }
        if(0 < height && height < 1500){
          $('.quick-bottom-btn').addClass('start');
          $('.quick-top-btn').addClass('start');
          $('.quick-top-btn').removeClass('end');
        }
        if(1500 <= height && height < 3065){
          $('.quick-top-btn').addClass('end');
          $('.quick-top-btn').removeClass('start');
          $('.quick-top-btn').removeClass('max');
        }
        if(height >= 3065){
          $('.quick-top-btn').addClass('max');
        }
      });
  
      $('.quick-top-btn').bind('click', function() {
        $('html, body').animate({scrollTop: '0'}, 680);
      });
      $('.quick-top-btn').click(function(){
        $('html').scrollTop('0');
      });
  
      // 해더메뉴
      $(window).mousemove(function(){
        const y = event.pageY;
        if($(window).width() > 1100){
          if(y > $('.header').height()){
            $('.menu-bottom').css("height", "0");
            $('.header').css("height", "100");
            $('.menu').siblings().removeClass('hoverd');
            $('.menu-tab').children('.checked').removeClass('checked');
          };
        } else{
          $('.header').css("height", "auto");
        }
        
      })
      
      $('.hamburger_btn').click(function(){
        if(true == $('#trigger').is(":checked")){
          $('.hamburger_menu').css("display", "block");
          $('.header').css("position", "fixed");
          $('.quick-bottom-btn').css("display", "none");
          $('.quick-top-btn').css("display", "none");
        } else{
          $('.hamburger_menu').css("display", "none");
          $('.header').css("position", "absolute");
          $('.quick-bottom-btn').css("display", "flex");
          $('.quick-top-btn').css("display", "flex");
        }
      })
      
      $('li').click(function(){
        var class_check = $(this).parents(".header");
        if(class_check.hasClass("header") == true){
          if($(this).siblings().hasClass("checked") == true){
            var h = $(this).parent().children('.checked').next('ul').height();
            var realh = $('.menu-bottom').height();
            var num = realh - h;
            $(this).siblings().removeClass('checked');
      
            $(this).addClass('checked')
            h = $(this).next('ul').height();
            $('.menu-bottom').css("height", num + h);
            return;
          }
      
          if($(this).hasClass("checked") == true){
            const h = $(this).next('ul').height();
            const realh = $('.menu-bottom').height();
            $('.menu-bottom').css("height", realh - h)
            $(this).removeClass('checked');
            return;
          }
      
          if($(this).parent().hasClass("menu-tab") == true){
            $(this).addClass('checked')
            $(this).siblings().removeClass('checked');
      
            const h = $(this).next('ul').height();
            const realh = $('.menu-bottom').height();
            $('.menu-bottom').css("height", realh + h)
            return;
          }
        }
      })
  
      $('.name').hover(function(){
        const menu = $(this).parent();
        const h = $(menu).find('.menu-tab').height();
        
        $('.menu-bottom').css("height", h + 16)
        $('.header').css("height", h + 116);
        $('.menu').siblings().removeClass('hoverd');
        $(menu).addClass('hoverd');;
      })
  
      // 반응형 햄버거메뉴 조절부분
      function fnCall(){
        const subMenu = $('.hamburger_menu .sub-txt');
        if($(window).width() > 1100){
            $(subMenu).css('max-height', 'auto');
        }
      }

      fnCall();
      
      $('.main-txt').click(function(){
        const subMenus = $('.hamburger_menu .sub-txt');
        const menu = $(this).closest('.menu');
        const anotherSubTxt = menu.siblings('.menu').find('.sub-txt');
  
        if($(window).width() < 1100) {
          for (const subMenu of subMenus) {
            const currentHeight = $(subMenu).css('max-height');
            if (currentHeight === '0px' || currentHeight === 'none') {
              $(subMenu).css('max-height', subMenu.scrollHeight + 'px');
            } else {
              $(subMenu).css('max-height', '0px');
            }
          }
          anotherSubTxt.css('max-height', '0px');
        }else{
          
        }
      });

      $('.hamburger_btn').click(function(){
        $(this).parents('body').children('.hamburger_menu').children().children().children('.sub-txt').removeClass('checked')
      })

    window.addEventListener('resize', function(){
      fnCall();
    });


  })


});

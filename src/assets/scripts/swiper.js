/*const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView:5,
    autoplay: {                       
        delay: 2000,  
    }
}).mount();

swiperContainer.style.width = '80%';

swiperSlides.forEach(slide => {
  slide.style.width = '200px'
});

swiper.slideNext();
swiper.autoplay();
swiper.enabled();*/

var swiper = new Swiper(".mySwiper", {
  direction: 'horizontal',
  slidesPerView: 5,
  slides_to_show_mobile:2,
  spaceBetween: 0,
  loop: true,
  infinite: yes,
  speed: 1000,
  autoplay:yes,
  autoplay: {                       
    delay: 200,
    disableOnInteraction: true,  
},
   breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
        slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});
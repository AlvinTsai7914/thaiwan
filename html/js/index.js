// .hero-slider
$(function () {
    if ($(".hero-slider").length > 0) {
            // var menu = [];
        // jQuery('.hero-slider .swiper-slide').each(function (index) {
        //     menu.push(jQuery(this).find('.slide-inner').attr("data-text"));
        // });
        var interleaveOffset = 0.5;
        var swiperOptionsSingleSlide = {
            speed: 1000,
            parallax: true,
            watchSlidesProgress: true,
        };

        var swiperOptions = {
            // loop: true,
            speed: 1000,
            watchSlidesProgress: true,
            navigation: {
                nextEl: '.hero-slider .swiper-button-next',
                prevEl: '.hero-slider .swiper-button-prev',
            },
            pagination: {
                el: ".hero-slider .swiper-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 6000,
                stopOnLastSlide: false,
                // disableOnInteraction: false,
            },
            on: {
                init: function() {
                    var videos = document.querySelectorAll('.hero-slider video');
                    videos.forEach((video) => {
                        video.currentTime = 1
                    })
                
                },

                transitionStart: function(){
                    var videos = document.querySelectorAll('video');
                    Array.prototype.forEach.call(videos, function(video){
                        video.pause();
                    });
                },
                
                transitionEnd: function(){
                    var activeIndex = this.activeIndex;
                    var activeSlide = document.getElementsByClassName('swiper-slide')[activeIndex];
                    var activeSlideVideo = activeSlide.getElementsByTagName('video')[0];
                    // console.log(activeSlideVideo !== undefined)
                    if (activeSlideVideo !== undefined) {
                        activeSlideVideo.play();
                    }
                },
            }
        };

        let heroSliderLength = $(".hero-slider .swiper-container .swiper-slide").length
        // console.log(heroSliderLength)

        let bannerSwiper, 
            bannerSwiper2;

        if (heroSliderLength == 1) {
            bannerSwiper = new Swiper("section.hero-slider .swiper-container", swiperOptionsSingleSlide);
            bannerSwiper2 = new Swiper("section.hero-slider .swiper-container-cards", {
                effect: "fade",
                fadeEffect: { crossFade: true },
            });
        } else if (heroSliderLength > 1) {
            bannerSwiper = new Swiper("section.hero-slider .swiper-container", swiperOptions);
            bannerSwiper2 = new Swiper("section.hero-slider .swiper-container-cards", {
                // loop: true,
                effect: "fade",
                fadeEffect: { crossFade: true },
                // spaceBetween: 10
            });
        }
        

        bannerSwiper.controller.control = bannerSwiper2;
        bannerSwiper2.controller.control = bannerSwiper;
    }

})
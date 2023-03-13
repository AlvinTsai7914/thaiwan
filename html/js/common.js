// 共用 js
// 節流器
function throttle(func, timeout = 250) {
    let last;
    let timer;

    return function () {
        const context = this;
        const args = arguments;
        const now = +new Date();

        if (last && now < last + timeout) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                func.apply(context, args);
            }, timeout);
        } else {
            last = now;
            func.apply(context, args);
        }
    };
}

function debounce(func, delay = 250) {
    let timer = null;

    return () => {
        let context = this;
        let args = arguments;

        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

function closeSubNav() {
    $(".-open").removeClass("-open")
    $("html,body").removeClass("-locked")
    $("header").removeClass("-active")
}

// 防止transition在網頁剛載入時出現效果 (圖片橫移)
$(function() {
    $(".transition_none").removeClass("transition_none")
})

// header
$(function() {
    $(".hamburger").on("click", function(e) {
            $("header").toggleClass("-open")
            $(".overlay").toggleClass("-open")
    })

    $(".overlay").on("click", () => {closeSubNav()})

    $(".sub_nav a").on("click",() => {closeSubNav()})
       
    $("header .mobile_search__trigger").on("click", function() {
        $(".mobile_search__input").addClass("-open")
        $(".mobile_search__input input")[0].focus();
        $(".overlay").toggleClass("-open")
    })

    $(".mobile_search__input .close").on("click", function() {
        $(".mobile_search__input.-open").removeClass("-open")
        $(".overlay").removeClass("-open")
    })

    // 網頁滾動事件的動作
    function windowScrollEvent() {
        let $scrollTop = $(window).scrollTop(),
            $header = $("header");
            closeSubNav()
        if ($scrollTop > 90) {
            $header.addClass("-solid");
        } else {
            $header.removeClass("-solid");
        }
    }
    

    // 監聽網頁滾動 控制header和gototop
    $(window).on("scroll", throttle(windowScrollEvent));

})

// 頁籤 
$(function() {
    if ($(".tablist_swiper").length > 0) {
        var swiper = new Swiper(".tablist_swiper", {
        slidesPerView: 5,
        spaceBetween: 0,
        freeMode: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        breakpoints: {
            "0": {
                slidesPerView: 2,
            },
            "576": {
                slidesPerView: 3,
            },
            "992": {
                slidesPerView: 4,
            },
            "1400": {
                slidesPerView: 5,
            },
            "1921": {
                slidesPerView: 6,
            }
        },
    });
    }
    $(".tablist_swiper .tab").on("click", function() {
        let target = $(this).data("target")

        $(".tablist_swiper .active").removeClass("active")
        $(this).addClass("active")
  
        $(".tablist_swiper_target .-show").removeClass("-show")
        $(`.tablist_swiper_target div[data-id="${target}"]`).addClass("-show")

    })
})

// 內頁動畫
$(function() {
    if($("[data-aos]").length > 0) {
        // console.log("AOS.init();")
        AOS.init({
            duration: 800,
        });
    }
})

// 服務案例
$(function() {
    if ($(".caseSwiper .swiper").length !== 0) {
        var swiper = new Swiper(".caseSwiper .swiper", {
            slidesPerView: 3,
            spaceBetween: 15,
            centerInsufficientSlides: true,
            navigation: {
                nextEl: ".caseSwiper .swiper-button-next",
                prevEl: ".caseSwiper .swiper-button-prev",
            },
            breakpoints: {
                "@0.00": {
                    slidesPerView: 1,
                },
                "@0.75": {
                    slidesPerView: 2,
                },
                "1200": {
                    slidesPerView: 3,
                },
            },
        });
    }
})
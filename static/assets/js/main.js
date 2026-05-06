    "use strict";


    /*--
        preloader
    -----------------------------------*/
     $(window).on('load', function(event) {
        $('#preloader').delay(500).fadeOut(500);
    });

    /*--
        Header Sticky
    -----------------------------------*/

    window.onscroll = function () {
        const left = document.getElementById("header");

        if (left.scrollTop > 50 || self.pageYOffset > 50) {
            left.classList.add("sticky")
        } else {
            left.classList.remove("sticky");
        }
    }    

    
    /*--
        Menu parent Element Icon
    -----------------------------------*/
    const $subMenu = document.querySelectorAll('.sub-menu');
    $subMenu.forEach(function (subMenu) {
        const menuExpand = document.createElement('span')
        menuExpand.classList.add('menu-icon')
        // menuExpand.innerHTML = '+'
        subMenu.parentElement.insertBefore(menuExpand, subMenu)
        if (subMenu.classList.contains('mega-menu')) {
            subMenu.classList.remove('mega-menu')
            subMenu.querySelectorAll('ul').forEach(function (ul) {
                ul.classList.add('sub-menu')
                const menuExpand = document.createElement('span')
                menuExpand.classList.add('menu-icon')
                menuExpand.innerHTML = '+'
                ul.parentElement.insertBefore(menuExpand, ul)
            })
        }
    })

    /*--
        Search Js
    -----------------------------------*/
	var $searchWrap = $('.search-wrap');
	var $navSearch = $('.search-btn');
	var $searchClose = $('#search-close');

	$('.search-btn').on('click', function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: 'toggle' }, 500);
		$navSearch.add($searchClose).addClass("open");
	});

	$('.search-close').on('click', function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: 'toggle' }, 500);
		$navSearch.add($searchClose).removeClass("open");
	});

	function closeSearch() {
		$searchWrap.fadeOut(200);
		$navSearch.add($searchClose).removeClass("open");
	}

	$(document.body).on('click', function (e) {
		closeSearch();
	});

	$(".search-btn, .main-search-input").on('click', function (e) {
		e.stopPropagation();
	});

        
    /*--
        Mobile Menu 
    -----------------------------------*/

    /* Get Sibling */
    const getSiblings = function (elem) {
        const siblings = []
        let sibling = elem.parentNode.firstChild
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== elem) {
                siblings.push(sibling)
            }
            sibling = sibling.nextSibling
        }
        return siblings
    }

    /* Slide Up */
    const slideUp = (target, time) => {
        const duration = time ? time : 500;
        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = duration + 'ms'
        target.style.boxSizing = 'border-box'
        target.style.height = target.offsetHeight + 'px'
        target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        window.setTimeout(() => {
            target.style.display = 'none'
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
        }, duration)
    }

    /* Slide Down */
    const slideDown = (target, time) => {
        const duration = time ? time : 500;
        target.style.removeProperty('display')
        let display = window.getComputedStyle(target).display
        if (display === 'none') display = 'block'
        target.style.display = display
        const height = target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        target.offsetHeight
        target.style.boxSizing = 'border-box'
        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = duration + 'ms'
        target.style.height = height + 'px'
        window.setTimeout(() => {
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
        }, duration)
    }

    /* Slide Toggle */
    const slideToggle = (target, time) => {
        const duration = time ? time : 500;
        if (window.getComputedStyle(target).display === 'none') {
            return slideDown(target, duration)
        } else {
            return slideUp(target, duration)
        }
    }


    /*--
		Offcanvas/Collapseable Menu 
	-----------------------------------*/
    const offCanvasMenu = function (selector) {

        const $offCanvasNav = document.querySelector(selector),
            $subMenu = $offCanvasNav.querySelectorAll('.sub-menu');
        $subMenu.forEach(function (subMenu) {
            const menuExpand = document.createElement('span')
            menuExpand.classList.add('menu-expand')
            // menuExpand.innerHTML = '+'
            subMenu.parentElement.insertBefore(menuExpand, subMenu)
            if (subMenu.classList.contains('mega-menu')) {
                subMenu.classList.remove('mega-menu')
                subMenu.querySelectorAll('ul').forEach(function (ul) {
                    ul.classList.add('sub-menu')
                    const menuExpand = document.createElement('span')
                    menuExpand.classList.add('menu-expand')
                    menuExpand.innerHTML = '+'
                    ul.parentElement.insertBefore(menuExpand, ul)
                })
            }
        })

        $offCanvasNav.querySelectorAll('.menu-expand').forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.preventDefault()
                const parent = this.parentElement
                if (parent.classList.contains('active')) {
                    parent.classList.remove('active');
                    parent.querySelectorAll('.sub-menu').forEach(function (subMenu) {
                        subMenu.parentElement.classList.remove('active');
                        slideUp(subMenu)
                    })
                } else {
                    parent.classList.add('active');
                    slideDown(this.nextElementSibling)
                    getSiblings(parent).forEach(function (item) {
                        item.classList.remove('active')
                        item.querySelectorAll('.sub-menu').forEach(function (subMenu) {
                            subMenu.parentElement.classList.remove('active');
                            slideUp(subMenu)
                        })
                    })
                }
            })
        })
    }
    offCanvasMenu('.offcanvas-menu');

  /*--
    magnificPopup video view 
  -----------------------------------*/	
	$('.popup-video').magnificPopup({
		type: 'iframe'
	});

  /*--    
      Counter Up
  -----------------------------------*/  

    $('.counter').counterUp({
        delay: 10,
        time: 1500,
    });

  
/*--js add by me */



document.addEventListener("DOMContentLoaded", function () {

    const scrollBox = document.querySelector(".scroll-services");

    if (!scrollBox) return; // ✅ crash prevent

    const content = document.createElement("div");
    content.classList.add("scroll-inner");

    while (scrollBox.firstChild) {
        content.appendChild(scrollBox.firstChild);
    }

    const clone = content.cloneNode(true);

    scrollBox.appendChild(content);
    scrollBox.appendChild(clone);

    let speed = 0.5;
    let isPaused = false;

    function autoScroll() {
        if (!isPaused) {
            scrollBox.scrollTop += speed;

            if (scrollBox.scrollTop >= content.offsetHeight) {
                scrollBox.scrollTop = 0;
            }
        }
        requestAnimationFrame(autoScroll);
    }

    autoScroll();

    scrollBox.addEventListener("mouseenter", () => isPaused = true);
    scrollBox.addEventListener("mouseleave", () => isPaused = false);

});





 
    /*--
        Case Study Active
	-----------------------------------*/
  var swiper = new Swiper('.case-study-active', {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    pagination: {
        el: ".case-study-active .swiper-pagination",
        clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    }
  });


  /*--
        Testimonial Active
	-----------------------------------*/
    var swiper = new Swiper('.testimonial-active', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,        
    });

    /*--    
        Testimonial Two Active
    -----------------------------------*/
var swiper = new Swiper(".testimonial-02-active", {

slidesPerView: 6,
spaceBetween: 40,
loop: true,

autoplay: {
delay: 0,
disableOnInteraction: false
},

speed: 4000,

observer: true,
observeParents: true,



breakpoints: {

0: {
slidesPerView: 2,
spaceBetween: 20
},

576: {
slidesPerView: 3
},

768: {
slidesPerView: 4
},

992: {
slidesPerView: 5
},

1200: {
slidesPerView: 6
}

}

});


if (window.location.pathname === "/privacy/" || window.location.pathname === "/terms/") {

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'a')) {
            e.preventDefault();
        }
    });

    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });

}









    /*--    
        Brand Active
    -----------------------------------*/
    var swiper = new Swiper(".brand-active .swiper-container", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 5,
          },
        },
    });

    // /*--    
    //     Testimonial Two Active
    // -----------------------------------*/
    // var swiper = new Swiper(".team-active", {
    //     slidesPerView: 4,
    //     loop: true,
    //     pagination: {
    //         el: ".team-active .swiper-pagination",
    //         clickable: true,
    //     },
    //     breakpoints: {
    //       0: {
    //         slidesPerView: 1,
    //       },
    //       576: {
    //         slidesPerView: 2,
    //       },
    //       768: {
    //         slidesPerView: 3,
    //       },
    //       992: {
    //         slidesPerView: 4,
    //       },
    //     },
    // });



    /*--    
      Progress Bar
  -----------------------------------*/  

    if($('.progress-line').length) {
        $('.progress-line').appear(function(){
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width', percent+'%');
        }, {accY: 0});
    }



    /*--
        AOS
    -----------------------------------*/   
    AOS.init({
        duration: 1200,
        once: true,
    });

const container = document.getElementById("binaryBg");

if (container) {
    setInterval(() => {
        const span = document.createElement("span");
        span.className = "binary";
        span.innerText = Math.random() > 0.5 ? "1" : "0";

        span.style.left = Math.random() * 100 + "%";
        span.style.animationDuration = (3 + Math.random() * 3) + "s";

        container.appendChild(span);

        setTimeout(() => {
            span.remove();
        }, 6000);
    }, 120);
}

tsParticles.load("tsparticles-footer", {
  fullScreen: { enable: false },

  particles: {
    number: {
      value: 40,
      density: { enable: true, area: 800 }
    },

    color: {
      value: "#ed2424"
    },

    links: {
      enable: true,
      distance: 120,
      color: "#00f0ff",
      opacity: 0.3,
      width: 1
    },

    move: {
      enable: true,
      speed: 1,
      outModes: { default: "bounce" }
    },

    size: {
      value: { min: 1, max: 3 }
    },

    opacity: {
      value: 0.4
    }
  },

  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab"
      }
    },
    modes: {
      grab: {
        distance: 140,
        links: { opacity: 0.6 }
      }
    }
  }
});



document.addEventListener("DOMContentLoaded", function () {

  // ===== GENERIC SLIDER FUNCTION =====
  function initSlider(trackId, nextClass, prevClass) {

    let index = 0;

    const track = document.getElementById(trackId);
    const images = document.querySelectorAll(`#${trackId} img`);
    const total = images.length;

    const next = document.querySelector(nextClass);
    const prev = document.querySelector(prevClass);

    // ✅ SAFETY CHECK (MOST IMPORTANT)
    if (!track || !next || !prev || total === 0) return;

    function slide() {
      track.style.transition = "transform 0.6s ease-in-out";
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    next.addEventListener("click", () => {
      index++;
      slide();

      if (index === total - 1) {
        setTimeout(() => {
          track.style.transition = "none";
          index = 0;
          track.style.transform = "translateX(0)";
        }, 600);
      }
    });

    prev.addEventListener("click", () => {
      if (index === 0) {
        track.style.transition = "none";
        index = total - 1;
        track.style.transform = `translateX(-${index * 100}%)`;

        setTimeout(() => {
          index--;
          slide();
        }, 50);
      } else {
        index--;
        slide();
      }
    });

    // AUTO SLIDE
    setInterval(() => {
      index++;
      slide();

      if (index === total - 1) {
        setTimeout(() => {
          track.style.transition = "none";
          index = 0;
          track.style.transform = "translateX(0)";
        }, 600);
      }
    }, 2500);
  }

  // ===== INIT ALL SLIDERS =====
  initSlider("labTrack", ".lab-next", ".lab-prev");
  initSlider("droneTrack", ".drone-next", ".drone-prev");
  initSlider("defenceTrack", ".defence-next", ".defence-prev");

});


// const cards = document.querySelectorAll(".info-card");
// let index = 0;

// setInterval(() => {

//     cards[index].classList.remove("active");
//     cards[index].classList.add("prev");

//     index = (index + 1) % cards.length;

//     cards[index].classList.add("active");

//     setTimeout(() => {
//         cards.forEach(card => card.classList.remove("prev"));
//     }, 500);

// }, 2000);



document.addEventListener("DOMContentLoaded", () => {

  const infoCards = document.querySelectorAll(".info-card");
  const slider = document.querySelector(".info-card-slider");

    if (!swiperEl) return;

    const swiper = new Swiper(swiperEl, {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 40,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      observer: true,
      observeParents: true,
      breakpoints: {
        0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 20 },
        576: { slidesPerView: 2, slidesPerGroup: 2 },
        768: { slidesPerView: 2, slidesPerGroup: 2 },
        992: { slidesPerView: 3, slidesPerGroup: 3 },
        1200: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });
  });
});

  if (slider) {
      slider.addEventListener("mouseenter", stopSlider);
      slider.addEventListener("mouseleave", startSlider);
  }

  
  
  

});



document.addEventListener("DOMContentLoaded", function () {

  var swiper = new Swiper(".styloSwiper", {
    slidesPerView: 5,
    spaceBetween: 40,
    loop: true,

    speed: 4000,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    observer: true,
    observeParents: true,

    breakpoints: {
      0: { slidesPerView: 2, spaceBetween: 20 },
      576: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      992: { slidesPerView: 5 },
      1200: { slidesPerView: 5 }
    }
  });

});










// var swiper = new Swiper(".styloSwiper", {
//   slidesPerView: 5,
//   spaceBetween: 40,
//   loop: true,

//   speed: 4000,

//   autoplay: {
//     delay: 0,
//     disableOnInteraction: false,
//   },

//   observer: true,
//   observeParents: true,

//   breakpoints: {
//     0: { slidesPerView: 2, spaceBetween: 20 },
//     576: { slidesPerView: 3 },
//     768: { slidesPerView: 4 },
//     992: { slidesPerView: 5 },
//     1200: { slidesPerView: 5 }
//   }
// });


// // 🔥 BUTTON FIX
// document.querySelector(".swiper-button-next").addEventListener("click", () => {
//   swiper.autoplay.stop();        // pause
//   swiper.slideNext(500);         // move
//   setTimeout(() => {
//     swiper.autoplay.start();     // resume
//   }, 600);
// });

// document.querySelector(".swiper-button-prev").addEventListener("click", () => {
//   swiper.autoplay.stop();
//   swiper.slidePrev(500);
//   setTimeout(() => {
//     swiper.autoplay.start();
//   }, 600);
// });



// var swiper = new Swiper(".styloSwiper", {
//   slidesPerView: 5,
//   spaceBetween: 40,
//   loop: true,

//   speed: 4000,

//   autoplay: {
//     delay: 0,
//     disableOnInteraction: false,
//   },

//   observer: true,
//   observeParents: true,

//   breakpoints: {
//     0: { slidesPerView: 2, spaceBetween: 20 },
//     576: { slidesPerView: 3 },
//     768: { slidesPerView: 4 },
//     992: { slidesPerView: 5 },
//     1200: { slidesPerView: 5 }
//   }
// });


// var swiper = new Swiper(".styloSwiper", {
//   slidesPerView: 5,
//   spaceBetween: 40,
//   loop: true,

//   autoplay: {
//     delay: 0,
//     disableOnInteraction: false,
//     pauseOnMouseEnter: true,
//     waitForTransition: false   // 👈 instant stop fix
//   },

//   speed: 4000,

//   allowTouchMove: true,

//   observer: true,
//   observeParents: true,
// });

// const swiperEl = document.querySelector(".styloSwiper");

// swiperEl.addEventListener("click", () => {
//   if (swiper.autoplay.running) {
//     swiper.autoplay.stop();

//     // 👇 instantly freeze (no delay)
//     swiper.setTranslate(swiper.getTranslate());
//   } else {
//     swiper.autoplay.start();
//   }
// });



document.querySelectorAll(".stylo-learn").forEach(btn => {
  btn.addEventListener("click", function () {
    let card = this.closest(".stylo-service-card");
    card.classList.add("flip");
  });
});

/* MOUSE LEAVE → AUTO BACK */
document.querySelectorAll(".stylo-service-card").forEach(card => {
  card.addEventListener("mouseleave", () => {
    card.classList.remove("flip");
  });
});



document.querySelectorAll(".stylo-learn-btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation(); // important
    let card = this.closest(".stylo-service-card");
    card.classList.add("flip");
  });
});



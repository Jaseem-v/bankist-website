'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((el) => {
  el.addEventListener("click", openModal)
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//////////////////////////////////////////////////////////
/// Nav-hover

const nav = document.querySelector(".nav");

const handle = function (e) {
  if (!e.target.classList.contains("nav__link")) return;
  const sibilings = e.target.closest(".nav").querySelectorAll(".nav__link");
  const logo = document.querySelector(".nav__logo")

  sibilings.forEach((el) => {
    if (el !== e.target) {
      el.style.opacity = this;
      logo.style.opacity = this;

    }
  })
}

nav.addEventListener("mouseover", handle.bind(0.5))
nav.addEventListener("mouseout", handle.bind(1))

//////////////////////////////////////////////////////////////
// Scroll to section

const nav__links = document.querySelector(".nav__links");

nav__links.addEventListener("click", (e) => {
  e.preventDefault();
  let id = document.querySelector(`${e.target.getAttribute("href")}`);
  let secttion_cord = id.getBoundingClientRect();

  window.scrollTo({
    left: secttion_cord.left,
    top: secttion_cord.top,
    behavior: "smooth"
  })

})


////////////////////////////////////////////////////////////////////////////
// nav-bar fixed
const header = document.querySelector(".header");
let navHeight = nav.getBoundingClientRect().height;

const headerInteract = (entries) => {
  let [entry] = entries
  if (!entry.isIntersecting)
    nav.classList.add("sticky")
  else
    nav.classList.remove("sticky")
}

let headerInteractOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
}

new IntersectionObserver(headerInteract, headerInteractOptions).observe(header);

//////////////////////////////////////////////////////////
// section fade effect

const sections = document.querySelectorAll(".section");

const sectionInteract = (entries, observe) => {
  let [entry] = entries
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden")
  observe.unobserve(entry.target)
}

let sectionInteractOptions = {
  root: null,
  threshold: 0.10,
}

sections.forEach((el) => {
  new IntersectionObserver(sectionInteract, sectionInteractOptions).observe(el);
  el.classList.add("section--hidden")
})

///////////////////////////////////////////////////////
// tabs


const tabContainer = document.querySelector(".operations__tab-container");
const tabContents = document.querySelectorAll(".operations__content")

tabContainer.addEventListener("click", (e) => {

  tabContainer.querySelectorAll(".operations__tab").forEach(el => {
    el.classList.remove("operations__tab--active")
  })

  let activeTab = e.target.closest(".operations__tab")
  activeTab.classList.add("operations__tab--active");

  let tabNumber = activeTab.dataset.tab

  tabContents.forEach(el => {
    el.classList.remove("operations__content--active");
  })

  document.querySelector(`.operations__content--${tabNumber}`).classList.add("operations__content--active")

})

////////////////////////////////////////////////////////
// slider
const sliders = document.querySelectorAll(".slide")
const rightBtn = document.querySelector(".slider__btn--right")
const leftBtn = document.querySelector(".slider__btn--left")
const dotContainer = document.querySelector(".dots");
const slider = document.querySelector(".slider");


let maxSlide = sliders.length;
let slideNumber = 0;

sliders.forEach((el, i) => {
  el.style.transform = `translateX(${100 * i}%)`;
  dotContainer.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`
  );
});


const dotsActive = (i) => {
  document.querySelectorAll(".dots__dot").forEach((el) => {
    el.classList.remove("dots__dot--active");
  });

  document.querySelector(`.dots__dot[data-slide="${i}"]`).classList.add("dots__dot--active")
}

const goToSlide = function (slide) {
  sliders.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

dotsActive(0);
goToSlide(0);

dotContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("dots__dot")) return;
  let dataSlide = e.target.dataset.slide;
  goToSlide(dataSlide);
  dotsActive(dataSlide);

})

const sliderRightEvent = () => {
  if (slideNumber === maxSlide - 1) {
    slideNumber = 0;
  } else {
    slideNumber++;
  }
  goToSlide(slideNumber)
  dotsActive(slideNumber);

}

const sliderLeftEvent = () => {
  if (slideNumber === 0) {
    slideNumber = maxSlide - 1;
  } else {
    slideNumber--;
  }
  goToSlide(slideNumber)
  dotsActive(slideNumber)
}

rightBtn.addEventListener("click", sliderRightEvent);
leftBtn.addEventListener("click", sliderLeftEvent);


const sliderKeypress = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
      sliderLeftEvent();
    } else if (e.key == "ArrowRight") {
      sliderRightEvent();
    }
  })
}


const sliderInteract = (entries, observe) => {
  let [entry] = entries
  if (entry.isIntersecting) {
    sliderKeypress();
  }
}
// observe.unobserve(entry.target)


let sliderInteractOptions = {
  root: null,
  threshold: 0,
}


new IntersectionObserver(sliderInteract, sliderInteractOptions).observe(slider);

///////////////////////////////////////////////////////
/// lazy load

const lazyImgs = document.querySelectorAll("img[data-src]")

console.log(lazyImgs);

const imgInteract = (entries, observe) => {
  let [entry] = entries
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

}
// observe.unobserve(entry.target)


let imgInteractOptions = {
  root: null,
  threshold: 0,
  rootMargin: "100px"
}

lazyImgs.forEach((el) => {
  new IntersectionObserver(imgInteract, imgInteractOptions).observe(el);
})
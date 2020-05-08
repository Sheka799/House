class SliderCarouselTwo {
  constructor({main, wrap, next, prev, infinity = false, responsive = [], position = 0, slidesToShow = 3}) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.optionsTwo = {
      position,
      infinity,
      maxPosition: this.slides.length - this.slidesToShow,
      widthSlide: Math.floor(100 / this.slidesToShow)
    };
    this.responsive = responsive;
  }
init () {
  this.addGloClassTwo();
  this.addStyleTwo();

  if (this.prev && this.next) {
    this.controlSlider();
  } else {
    this.addArrow();
    this.controlSlider();
  }
  if (this.responsive) {
  this.responseInit();
  }
}

addGloClassTwo () {
  this.main.classList.add('.glo-sliderTwo');
  this.wrap.classList.add('.glo-slider__wrapTwo');
  for (const item of this.slides) {
    item.classList.add('glo-slider__itemTwo');
  }
}
addStyleTwo() {
  let style = document.getElementById('sliderCarousel__style');
  if (!style) 
  {
  style = document.createElement('style');
  style.id = 'sliderCarousel__style';
  }
  style.textContent = `
    .glo-sliderTwo {
      overflow: hidden !important;
    }
    .glo-slider__wrapTwo {
      display: flex !important;
      transition: transform 0.5s !important;
      will-change: transform !important;
    }
    .glo-slider__itemTwo {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex: 0 0 ${this.optionsTwo.widthSlide}% !important;
      margin: 0 !important;
      padding: 0 20px;
    }
  `;

  document.head.appendChild(style);
}
controlSlider() {
  this.prev.addEventListener('click', this.prevSlider.bind(this));
  this.next.addEventListener('click', this.nextSlider.bind(this)); 
}

prevSlider () {
  if (this.optionsTwo.infinity || this.optionsTwo.position > 0) {
  --this.optionsTwo.position;
  if (this.optionsTwo.position < 0) {
    this.optionsTwo.position = this.slides.length - this.slidesToShow;
  }
  this.wrap.style.transform = `translateX(-${this.optionsTwo.position * this.optionsTwo.widthSlide}%)`;
  } 
}

nextSlider () {
  if (this.optionsTwo.infinity || this.optionsTwo.position < this.slides.length - this.slidesToShow) {
  ++this.optionsTwo.position;
  if (this.optionsTwo.position > this.slides.length - this.slidesToShow) {
    this.optionsTwo.position = 0;
  }
  this.wrap.style.transform = `translateX(-${this.optionsTwo.position * this.optionsTwo.widthSlide}%)`;
} 
}

// addArrow () {
//   this.prev = document.createElement('button');
//   this.next = document.createElement('button');
  
//   this.prev.className = 'glo-slider__prev';
//   this.next.className = 'glo-slider__next';

//   this.main.appendChild(this.prev);
//   this.main.appendChild(this.next);
// }

responseInit() {
  const slidesToShowDefault = this.slidesToShow;
  const allResponse = this.responsive.map(item => item.breakpoint);
  const maxResponse = Math.max(...allResponse);

  const checkResponse = () => {
    const widthWindow = document.documentElement.clientWidth;
    if (widthWindow < maxResponse) {
      for (let i = 0; i < allResponse.length; i++) {
        if (widthWindow < allResponse[i]) {
          this.slidesToShow = this.responsive[i].slidesToShow;
        this.optionsTwo.widthSlide = Math.floor(100 / this.slidesToShow);
        this.addStyleTwo();
        } 
      }
    } else {
      this.slidesToShow = slidesToShowDefault;
    this.optionsTwo.widthSlide = Math.floor(100 / this.slidesToShow);
    this.addStyleTwo();
    }
  };

  checkResponse();

  window.addEventListener('resize', checkResponse);
}
}

const optionsTwo = {
main: '.portfolio-container__two',
wrap: '.portfolio-slider__two',
prev: '.prev-carousel-two',
next: '.next-carousel-two',
slidesToShow: 3,
infinity: true,
responsive: [{
  breakpoint: 1024,
  slidesToShow: 3
},
{
  breakpoint: 768,
  slidesToShow: 2
},
{
  breakpoint: 576,
  slidesToShow: 1
}]
};

const carouselTwo = new SliderCarouselTwo(optionsTwo);
carouselTwo.init();
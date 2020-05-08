class SliderCarousel {
  constructor({main, wrap, next, prev, infinity = false, responsive = [], position = 0, slidesToShow = 3}) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.options = {
      position,
      infinity,
      maxPosition: this.slides.length - this.slidesToShow,
      widthSlide: Math.floor(100 / this.slidesToShow)
    };
    this.responsive = responsive;
  }
init () {
  this.addGloClass();
  this.addStyle();

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

addGloClass () {
  this.main.classList.add('.glo-slider');
  this.wrap.classList.add('.glo-slider__wrap');
  for (const item of this.slides) {
    item.classList.add('glo-slider__item');
  }
}
addStyle() {
  let style = document.getElementById('sliderCarousel-style');
  if (!style) 
  {
  style = document.createElement('style');
  style.id = 'sliderCarousel-style';
  }
  style.textContent = `
    .glo-slider {
      overflow: hidden !important;
    }
    .glo-slider__wrap {
      display: flex !important;
      transition: transform 0.5s !important;
      will-change: transform !important;
    }
    .glo-slider__item {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex: 0 0 ${this.options.widthSlide}% !important;
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
  if (this.options.infinity || this.options.position > 0) {
  --this.options.position;
  if (this.options.position < 0) {
    this.options.position = this.slides.length - this.slidesToShow;
  }
  this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
  } 
}

nextSlider () {
  if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
  ++this.options.position;
  if (this.options.position > this.slides.length - this.slidesToShow) {
    this.options.position = 0;
  }
  this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
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
        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
        this.addStyle();
        } 
      }
    } else {
      this.slidesToShow = slidesToShowDefault;
    this.options.widthSlide = Math.floor(100 / this.slidesToShow);
    this.addStyle();
    }
  };

  checkResponse();

  window.addEventListener('resize', checkResponse);
}
}


const options = {
main: '.portfolio-container',
wrap: '.portfolio-slider',
prev: '.prev-carousel',
next: '.next-carousel',
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

const carousel = new SliderCarousel(options);
carousel.init();
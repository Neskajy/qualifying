class Slider {
    constructor(sliderSelector, gallerySelector, sliderWrapperSelector, slidesPerView = 3, autoUpdateSlider = false) {
        this.slider = document.querySelector(sliderSelector);
        this.parent = this.slider.parentElement;
        this.grandParent = this.slider.parentElement;
        this.sliderWrapper = document.querySelector(sliderWrapperSelector);
        this.gallery = document.querySelector(gallerySelector);
        this.slidesPerView = slidesPerView;
        this.slidesCount = this.gallery.children.length;
        this.currentSlide = 0;
        this.galleryGap = 5;

        if (!this.slider || !this.gallery || !this.isSliderValid()) {
            console.error("Slider or gallery element not found, or slider is invalid.");
            return;
        }
        this.setDimensions();
        this.createSwitchers();
        // this.paintSlides();
        this.deleteSlidesDrag();
        // this.controlDots();
        if (autoUpdateSlider) {
            this.autoUpdate();
        }

        //Адаптив
        window.addEventListener('resize', () => {
            this.setDimensions();
        });
    }

    isSliderValid() {
        return Array.from(this.gallery.children).every(element => element.classList.contains('slide'));
    }

    setDimensions() {
        this.galleryWidth = this.slider.clientWidth;


        this.sliderWrapper = this.galleryWidth - 40;

        
        console.log(this.slider.className);
        
        if (this.slider.className == "slider") {
            this.slidesPerView = 5;
            if (window.screen.width <= 1350) {
                this.slider.style.width = window.screen.width;
                if (window.screen.width <= 1350 && window.screen.width > 968) {
                    this.slidesPerView = 4;
                } else if (window.screen.width <= 968 && window.screen.width > 624) {
                    this.slidesPerView = 3;
                } else if (window.screen.width <= 624 && window.screen.width >= 220) {
                    this.slidesPerView = 2;
                }
            }
        } else if (this.slider.className == "slider-partners") {
            if (window.screen.width <= 1350) {
                this.slider.style.width = window.screen.width;
                if (window.screen.width <= 1350 && window.screen.width > 968) {
                    this.slidesPerView = 6;
                } else if (window.screen.width <= 968 && window.screen.width > 624) {
                    this.slidesPerView = 5;
                } else if (window.screen.width <= 624 && window.screen.width >= 520) {
                    this.slidesPerView = 4;
                } else if (window.screen.width <= 520 && window.screen.width >= 420) {
                    this.slidesPerView = 3;
                } else if (window.screen.width <= 420 && window.screen.width >= 320) {
                    this.slidesPerView = 2;
                }
            }
        }

        this.slideWidth = (this.galleryWidth - (this.galleryGap * (this.slidesPerView - 1))) / this.slidesPerView;

        Array.from(this.gallery.children).forEach(element => {
            element.style.width = `${this.slideWidth}px`;
        });

        this.gallery.style.gap = `${this.galleryGap}px`;
    }

    deleteDimension() {

    }

    deleteSlidesDrag() {
        Array.from(this.gallery.children).forEach(element => {
            element.addEventListener('dragstart', (event) => {
                event.preventDefault();
            });
        });
    }

    createSwitchers() {
        const newSpanLeft = document.createElement('span');
        newSpanLeft.className = 'switchSlideLeft';
        this.slider.appendChild(newSpanLeft);
        this.newSpanWidth = 40;
        newSpanLeft.style.position = 'absolute';
        newSpanLeft.style.width = `${this.newSpanWidth}px`;
        newSpanLeft.style.top = '50%';
        newSpanLeft.style.transform = 'translateY(-50%)';
        newSpanLeft.style.left = `${-this.newSpanWidth / 2}px`;
        newSpanLeft.innerHTML = '<img class="switcher" src="/public/media/products/icons/switcher.svg">'
        
        const newSpanRight = document.createElement('span');
        newSpanRight.className = 'switchSlideRight';
        this.slider.appendChild(newSpanRight);
        newSpanRight.style.position = 'absolute';
        newSpanRight.style.width = `${this.newSpanWidth}px`;
        newSpanRight.style.top = '50%';
        newSpanRight.style.transform = 'translateY(-50%)';
        newSpanRight.style.right = `${(-this.newSpanWidth / 2)}px`;
        newSpanRight.innerHTML = '<img class="switcher" src="/public/media/products/icons/switcher.svg">'
        //Add event listeners here to call rollSlideLeft/rollSlideRight
        newSpanLeft.addEventListener('click', () => this.rollSlide('left'));
        newSpanRight.addEventListener('click', () => this.rollSlide('right'));

    }

    rollSlide(direction) {
        if (direction === 'right') {
            if (this.canSwitchRight()) {
                this.currentSlide++;
            } else {
                this.currentSlide = 0;
            }
        } else if (direction === 'left') {
            if (this.canSwitchLeft()) {
                this.currentSlide--;
            } else {
                this.currentSlide = this.slidesCount - this.slidesPerView;
            }
        }
        this.updateSliderPosition();
    }

    controlDots() {
        if (!Array.from(this.slider.children).some(child => child.className.includes("dot"))) {
            this.dots = document.createElement('div');
            this.dots.className = 'dots';
            this.slider.appendChild(this.dots);
            for (let pos = 0; pos < this.slidesCount - (this.slidesPerView - 1); pos++) {
                const newDot = document.createElement('div');
                newDot.className = 'dot';
                this.dots.append(newDot);

                newDot.addEventListener('click', () => {
                    this.currentSlide = pos;
                    this.updateSliderPosition();
                });
            }
        }
    }

    autoUpdate() {
        if (this.autoUpdateIntervalId) { // Проверка на существование интервала
            clearInterval(this.autoUpdateIntervalId);
        }
        this.autoUpdateIntervalId = setInterval(() => {
            this.rollSlide("right");
        }, 6000);
    }

    canSwitchRight() {
        const lastVisibleSlideIndex = this.currentSlide + this.slidesPerView - 1;
        return lastVisibleSlideIndex < this.slidesCount - 1;
    }

    canSwitchLeft() {
        return this.currentSlide > 0;
    }

    updateSliderPosition() {
        const translateXValue = -this.currentSlide * (this.slideWidth + this.galleryGap);
        this.gallery.style.transform = `translateX(${translateXValue}px)`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.slider', '.gallery', '.slider-wrapper', 5, autoUpdateSlider = true);
    const slider_partners = new Slider('.slider-partners', '.gallery-partners', '.slider-partners-wrapper', 7, autoUpdateSlider = true);
});
// import Swiper JS
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/swiper-bundle.css';
import '../css/main.css';

const burgerBtn = document.querySelector('.header__burger-btn svg');
const menuHeader = document.querySelector('.header__menu');

burgerBtn.addEventListener('click', function () {
	this.classList.toggle('active');
	menuHeader.classList.toggle('active');

	if (menuHeader.classList.contains('active')) {
		document.querySelector('body').style.overflow = 'hidden';
	} else {
		document.querySelector('body').style.overflow = '';
	}


});



const headerSliderEl = document.querySelector('.header__slider');

const headerSlider = new Swiper(headerSliderEl, {
	loop: true,
	effect: 'fade',
	navigation: {
		nextEl: '.slider-nav__next',
		prevEl: '.slider-nav__prev',
	},
	pagination: {
		el: '.header__slider-pagination',
		clickable: false,
		renderBullet: function (index, className) {
			index = (index >= 0 && index < 10) ? `0${++index}` : ++index;

			return `<div class="${className} custom-pagination__item">
						<div class="custom-pagination__line"></div>
						<div class="custom-pagination__num">${index}</div>
						<div class="custom-pagination__text">
						${document.querySelectorAll('.slider-item__info-title')[+index].textContent}
						</div>
					</div>`;
		},
	},
});

var zigzagSlider = new Swiper('.zigzag-slider', {
	loop: true,
	slideToClickedSlide: true,
	navigation: {
		nextEl: '.zigzag-slider .slider-nav__next',
		prevEl: '.zigzag-slider .slider-nav__prev',
	},
	breakpoints: {
		320: {
			centeredSlides: true,
			slidesPerView: 1.5,
		},
		480: {
			centeredSlides: true,
			slidesPerView: 2,
		},
		767: {
			slidesPerView: 3,
			centeredSlides: true,
		},
		1001: {
			centeredSlides: false,
			slidesPerView: 4,
		}
	},

});

const mapCircle = document.querySelectorAll('.map-slider__circle');
const mapSlideList = document.querySelectorAll('.map-slider__slide');
let sleepMapSlider;
let isMapSlider = false;
initToggleMapSlider();

zigzagSlider.on('slideChangeTransitionStart', function () {
	mapSlideList[0].parentElement.querySelector('.map-slider__slide.active').classList.remove('active');
	mapSlideList[this.realIndex].classList.add('active');
});

window.addEventListener('resize', function () {
	initToggleMapSlider();
})

mapCircle.forEach(function (elem, index) {
	elem.addEventListener('click', function () {
		if (mapSlideList[index].classList.contains('active')) return;

		mapSlideList[index].parentElement.querySelector('.map-slider__slide.active').classList.remove('active');
		mapSlideList[index].classList.add('active');
		zigzagSlider.slideToLoop(index);
	});
});

sliderFadeEffect('.holder__slider');
sliderFadeEffect('.shop__slider');

for (let counter of document.querySelectorAll('.counter')) {
	numberPicker(counter);
}

//добавление класса при клике на маркер
const markerCommWrapp = document.querySelectorAll('.surfboard__box');

for (let markerGroup of markerCommWrapp) {
	markerGroup.addEventListener('click', function (e) {
		if (e.target.closest('.surfboard__desc-mark')) {
			if (e.target.classList.contains('active')) return;

			markerGroup.querySelector('.surfboard__desc-mark.active').classList.remove('active');
			e.target.classList.add('active');
		}
	});
}

//Изменение значения input через кнопки
function numberPicker(elem) {
	let input = elem.querySelector('input[type="number"]'),
		btnUp = elem.querySelector('.counter__btn-up'),
		btnDown = elem.querySelector('.counter__btn-down'),
		min = input.getAttribute('min'),
		max = input.getAttribute('max'),
		summView = elem.closest('.info').querySelector('.summ'),
		priceNight = summView.dataset.priceNight,
		nightsEl = elem.closest('.info').querySelector('.nights'),
		guestsEl = elem.closest('.info').querySelector('.guests');

	calculationSumm()

	btnUp.addEventListener('click', function () {
		let oldValue = parseFloat(input.value);

		if (oldValue >= max) return;

		input.value = ++oldValue;
		calculationSumm();
	});

	btnDown.addEventListener('click', function () {
		let oldValue = parseFloat(input.value);

		if (oldValue <= min) return;

		input.value = --oldValue;
		calculationSumm();
	});

	input.addEventListener('change', function () {
		let value = parseFloat(this.value);

		if (isNaN(value)) min;

		value = Math.round(value);


		input.value = (value < min) ? min :
			(value > max) ? max :
				(value >= min && value <= max) ? value :
					min;
	});

	function calculationSumm() {
		let summ = +`${+priceNight * +nightsEl.value * +guestsEl.value}`;

		summView.textContent = summ.toFixed(0);
	}
};

function initToggleMapSlider() {
	if (document.documentElement.clientWidth < 1000 && !isMapSlider) {

		sleepMapSlider = new Swiper('.map-slider', {
			allowTouchMove: false,
			//spaceBetween: 15,
			centeredSlides: true,
			breakpoints: {
				320: {
					width: 250,
					slidesPerView: 1,
				},
				480: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				}
			},
			on: {
				init: function () {
					zigzagSlider.on('slideChange', function () {
						sleepMapSlider.slideToLoop(zigzagSlider.realIndex);
					})
				}
			},
		});

		isMapSlider = true;
		let indexActiveSlide = [...mapSlideList].indexOf(document.querySelector('.map-slider__slide.active'));

		sleepMapSlider.slideTo(indexActiveSlide);
	} else if (document.documentElement.clientWidth > 1000 && isMapSlider) {
		sleepMapSlider.destroy();
		isMapSlider = false;
		zigzagSlider.off('slideChange');
	}
};

function sliderFadeEffect(selector) {
	new Swiper(selector, {
		loop: true,
		effect: 'fade',
		allowTouchMove: false,
		fadeEffect: {
			crossFade: true
		},
		navigation: {
			nextEl: `${selector} .slider-nav__next`,
			prevEl: `${selector} .slider-nav__prev`,
		},
	});
}

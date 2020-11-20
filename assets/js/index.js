// import Swiper JS
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/swiper-bundle.css';
import '../css/main.css';

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


//document.querySelector('.header__slider').swiper();

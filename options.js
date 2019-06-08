'use strict';

const DONATE_PURPOSE = document.querySelectorAll('.modal__input');
const DONATE_PURPOSE_LABEL = document.querySelector('.donateForm__purpose')

DONATE_PURPOSE.forEach((el) => {
	el.addEventListener('change', () => {
		DONATE_PURPOSE_LABEL.value = el.value
	})
})
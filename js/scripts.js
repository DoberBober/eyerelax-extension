/*
	— Я жду с минуты на минуту гонца. Взгляни на дорогу, кого ты там видишь?
	— Никого.
	— Мне бы такое зрение — увидеть никого, да еще на таком расстоянии.
*/


function localizeHtmlPage(){
	var objects = document.getElementsByTagName('html');
	for (var j = 0; j < objects.length; j++){
		var obj = objects[j];

		var valStrH = obj.innerHTML.toString();
		var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1){
			return v1 ? chrome.i18n.getMessage(v1) : "";
		});

		if(valNewH != valStrH){
			obj.innerHTML = valNewH;
		}
	}
}

localizeHtmlPage();


const PLAY = document.querySelector('#play');
const RESET = document.querySelector('#reset');
const FAQ = document.querySelector('#faq');
const DONATE = document.querySelector('#donate');
const CLOSE_INFO = document.querySelector('#closeInfo');
const CLOSE_DONATE = document.querySelector('#closeDonate');

const INFO = document.querySelector('#info');
const MONEY = document.querySelector('#money');

const TIME = document.querySelector('#time');

const EYE_LEFT = document.querySelector('#eye-left');
const EYE_RIGHT = document.querySelector('#eye-right');

const SPEED = document.querySelector('#speed');
const DISTANCE = document.querySelector('#distance');

const DONATE_PURPOSE = document.querySelectorAll('.modal__input');
const DONATE_PURPOSE_LABEL = document.querySelector('.donateForm__purpose')

var speed_value = 100 - SPEED.value
var distance_value = DISTANCE.value
var tempDistance = '-25px';
var tempTime = 0;

var leftEyeTimeout;
var rightEyeTimeout;
var tuoemiTemit;


/*
	— Больно глазам.
	— Ты впервые ими смотришь.
*/


function clearAllIntervals(){
	clearInterval(leftEyeTimeout)
	clearInterval(rightEyeTimeout)
	clearInterval(tuoemiTemit)
}


/*
	Природа наделила нас двумя глазами, двумя ушами, но лишь одним языком, дабы мы смотрели и слушали больше, чем говорили.
*/


function getRangeValue(rangeElement, valueVariable){
	switch(valueVariable){
		case 'speed':
			speed_value = 100 - rangeElement.value;
		case 'distance':
			distance_value = rangeElement.value;
	}

	if(leftEyeTimeout && leftEyeTimeout){
		document.body.classList.remove('working');
		clearAllIntervals()
		start()
	}
}

SPEED.addEventListener('input', () => {
	getRangeValue(SPEED, 'speed')
})

DISTANCE.addEventListener('input', () => {
	getRangeValue(DISTANCE, 'distance')

	tempDistance = -distance_value + 'px';
	EYE_LEFT.style.marginLeft = -distance_value + 'px'
	EYE_RIGHT.style.marginRight = -distance_value + 'px'
})


/*
	Зрение — это не то, что видят твои глаза, — это образ, который создает твой мозг. 
	Наш здравый смысл защищает наше зрение. 
	Обычно люди не могут видеть то, что противоречит логике...
*/


function start(){
	if(document.body.classList.contains('working')){
		document.body.classList.remove('working');
		clearAllIntervals()
	} else {
		document.body.classList.add('working');
	
		tuoemiTemit = setInterval(() => {
			tempTime++;
			TIME.textContent = Math.floor(tempTime / 60) + ':' + (tempTime % 60 < 10 ? '0' + tempTime % 60 : tempTime % 60)
			if(tempTime !=0 && tempTime % 60 == 0){
				if ("vibrate" in navigator){
					navigator.vibrate(500);
				}
			}
		}, 1000)
			
		leftEyeTimeout = setInterval(() => {
			EYE_LEFT.style.marginLeft = parseInt(window.getComputedStyle(EYE_LEFT).marginLeft) - 3 + 'px'
		}, speed_value * 15)
	
		rightEyeTimeout = setInterval(() => {
			EYE_RIGHT.style.marginRight = parseInt(window.getComputedStyle(EYE_RIGHT).marginRight) - 3 + 'px'
		}, speed_value * 15)
	}
}

PLAY.addEventListener('click', () => {
	start()
})


/*
	Когда закрываешь глаза, смотришь в себя — в темноту.
*/


RESET.addEventListener('click', () => {
	document.body.classList.remove('working');
	clearAllIntervals()	
	EYE_LEFT.style.marginLeft = tempDistance;
	EYE_RIGHT.style.marginRight = tempDistance;
	tempTime = 0;
	TIME.textContent = '0:00';
})


/*
	Я чувствую запах дождя до того, как упадут первые капли, но я их не вижу. 
	Я чувствую, как солнце ласкает моё лицо, но я не вижу, как оно встает или садится. 
	Я так хочу видеть мир так, как его видят другие: видеть солнце, видеть дождь. 
	И музыку... 
	Музыка, наверное, очень красивая.
*/


FAQ.addEventListener('click', () => {
	document.body.classList.remove('working');
	INFO.classList.add('modal--visible');
	clearAllIntervals()	
})

DONATE.addEventListener('click', () => {
	document.body.classList.remove('working');
	MONEY.classList.add('modal--visible');
	clearAllIntervals()	
})


/*
	Мир грёз нельзя увидеть глазами, его нужно почувствовать сердцем.
*/


CLOSE_INFO.addEventListener('click', (e) => {
	e.currentTarget.parentNode.classList.remove('modal--visible');
})
CLOSE_DONATE.addEventListener('click', (e) => {
	e.currentTarget.parentNode.classList.remove('modal--visible');
})


/*
	Что из сотворенного завистливее глаза? Потому он плачет о всем, что видит. 
*/

DONATE_PURPOSE.forEach((el) => {
	el.addEventListener('change', () => {
		DONATE_PURPOSE_LABEL.value = el.value
	})
})
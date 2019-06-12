'use strict';

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

const DONATE_PURPOSE = document.querySelectorAll('.modal__input');
const DONATE_PURPOSE_LABEL = document.querySelector('.donateForm__purpose');

DONATE_PURPOSE.forEach((el) => {
	el.addEventListener('change', () => {
		DONATE_PURPOSE_LABEL.value = el.value
	})
})


// 

const ADD_TIME = document.querySelector('#addTime');
const SAVE = document.querySelector('#save');
const TIME = document.querySelector('.time__list');
const TIME_TEMPLATE = document.querySelector('#timeTemplate').content.querySelector('div');

var deleteTimeList = document.querySelectorAll('.delete')

ADD_TIME.addEventListener('click', () => {
	var el = TIME_TEMPLATE.cloneNode(true);
	var del = el.querySelector('.delete');
	del.addEventListener('click', () => {
		del.parentNode.remove()
	})
	TIME.appendChild(el)
})

deleteTimeList.forEach((el) => {
	el.addEventListener('click', () => {
		el.parentNode.remove()
	})
	deleteTimeList = document.querySelectorAll('.delete');
})


// 

const TIME_FORM = document.querySelector('#time');

function save_options() {
	event.preventDefault()
	var inputs = document.querySelectorAll('.time__item input');
	var notifications = document.querySelector('#notifications').checked;
	var values = [];
	inputs.forEach((el) => {
		values.push(el.value)
	})

	chrome.storage.sync.set({
		'favoriteTime': values,
		'notificationsEnabled': notifications
	}, () => {
		chrome.notifications.create("NOTIFICATIONS", {
			type: "basic",
			title: chrome.i18n.getMessage("saved_successfully"),
			message: "",
			iconUrl: "img/logo128.png",
		}, () => {
			
		});
	});

}

function restore_options() {
	chrome.storage.sync.get({
		notificationsEnabled: true,
		favoriteTime: ["12:50", "15:50", "17:50"]
	}, function(items) {
		items.favoriteTime.forEach((time) => {
			var el = TIME_TEMPLATE.cloneNode(true);
			var del = el.querySelector('input').value = time;
			var del = el.querySelector('.delete');
			del.addEventListener('click', () => {
				del.parentNode.remove()
			})
			TIME.appendChild(el)
		})

		if(items.notificationsEnabled){
			document.querySelector('#notifications').checked = true
		}
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
TIME_FORM.addEventListener('submit', save_options);

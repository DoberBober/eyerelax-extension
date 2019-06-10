'use strict';

chrome.browserAction.onClicked.addListener(function(){
	chrome.tabs.create({
		'url': 'index.html'
	})
})

chrome.notifications.onClicked.addListener(function(notificationId) {
	switch(notificationId){
		case 'INSTALL':
			chrome.tabs.create({url: 'options.html'});
			break;
		case 'REMINDER':
			chrome.tabs.create({url: 'index.html'});
			break;
		default:
			break;
	}
});

chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install" || details.reason == "update"){
		chrome.notifications.create("INSTALL", {
			type: "basic",
			title: "Расширение установлено",
			message: "Нажмите на это сообщение, чтобы настроить уведомления",
			iconUrl: "images/logo128.png",
		}, () => {

		});
	}
});

setInterval(() => {
	chrome.storage.sync.get({
		notificationsEnabled: true,
		favoriteTime: []
	}, function(items) {
		if(items.notificationsEnabled && items.favoriteTime){
			items.favoriteTime.forEach((time, index) => {
				var tempDate = new Date();
				var tempHours = tempDate.getHours();
				var tempMinutes = (tempDate.getMinutes() < 10 ? '0' : '') + tempDate.getMinutes();
					if(time.split(":")[0] == tempHours && time.split(":")[1] == tempMinutes){
						chrome.notifications.create("REMINDER", {
							type: "basic",
							title: "Может сделаем тренировку для глаз?",
							message: "Ты уже работаешь довольно долго",
							iconUrl: "images/logo128.png",
						}, () => {
							
						});
					}
			})
		}
	});
}, 60000)

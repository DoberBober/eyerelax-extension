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
			title: chrome.i18n.getMessage("extension_installed_title"),
			message: chrome.i18n.getMessage("extension_installed_description"),
			iconUrl: "img/logo128.png",
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
			var tempDate = new Date();
			var tempHours = tempDate.getHours();
			var tempMinutes = (tempDate.getMinutes() < 10 ? '0' : '') + tempDate.getMinutes();

			items.favoriteTime.forEach((time, index) => {
					if(time.split(":")[0] == tempHours && time.split(":")[1] == tempMinutes){
						chrome.notifications.create("REMINDER", {
							type: "basic",
							title: chrome.i18n.getMessage("reminder_title"),
							message: chrome.i18n.getMessage("reminder_description"),
							iconUrl: "img/logo128.png",
						}, () => {
							
						});
					}
			})
		}
	});
}, 60000)

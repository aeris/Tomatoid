/*
 *   Copyright 2013 Arthur Taborda <arthur.hvt@gmail.com>
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU Library General Public License as
 *   published by the Free Software Foundation; either version 2 or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details
 *
 *   You should have received a copy of the GNU Library General Public
 *   License along with this program; if not, write to the
 *   Free Software Foundation, Inc.,
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
var test = false;

function onClick() {
	if (!inPomodoro) {
		start();
	} else {
		timer.running = !timer.running;
	}
}

function onDoubleClick() {
	if (inPomodoro) {
		stop();
	}
}

function start() {
	console.log(plasmoid.popupIcon)
	timer.totalSeconds = test ? 5 : pomodoroLenght * 60;
	timer.running = true;
	inPomodoro = true;
	inBreak = false;
}


function startBreak() {
	console.log(plasmoid.popupIcon)

	if(completedPomodoros % pomodorosPerLongBreak == 0) {
		timer.totalSeconds = test ? 10 : longBreakLenght * 60;
	} else {
		timer.totalSeconds = test ? 7 : shortBreakLenght * 60;
	}
	timer.running = true;
	inPomodoro = false;
	inBreak = true;
}


function stop() {
	console.log(plasmoid.popupIcon)

	timer.running = false;
	inPomodoro = false;
	inBreak = false;
	timer.totalSeconds = 0;
}


function completePomodoro() {
	completedPomodoros += 1
}


function notify(summary, body) {
	var engine = dataEngine("notifications");
	var service = engine.serviceForSource("notification");
	var op = service.operationDescription("createNotification");
	op["appName"] = tomatoid.appName;
	op["appIcon"] = "chronometer"
	op["summary"] = summary;
	op["body"] = body;
	op["timeout"] = 7000;

	service.startOperationCall(op);

	console.log(op)
}


function randomString(len) {
	var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var randomString = "";
	for (var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz,randomPoz+1);
	}
	return randomString;
}
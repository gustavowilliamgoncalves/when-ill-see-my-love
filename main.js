let target = new Date(2026, 0, 24, 14, 0, 0); // mês: 0=jan, 1=fev

const elDays = document.getElementById('days');
const elHours = document.getElementById('hours');
const elMinutes = document.getElementById('minutes');
const elSeconds = document.getElementById('seconds');
const elMessage = document.getElementById('message');

function pad(n){
	return String(n).padStart(2,'0');
}

let timer = null;

/**
 * `update('2026-02-24T14:00:00')` ou `update(new Date(2026,1,24,14))`.
 */
function update(newTarget){
	if(newTarget){
		target = (newTarget instanceof Date) ? newTarget : new Date(newTarget);
	}

	const now = new Date();
	let diff = target - now;
	if(diff <= 0){
		elDays.textContent = '0';
		elHours.textContent = '00';
		elMinutes.textContent = '00';
		elSeconds.textContent = '00';
		elMessage.textContent = 'Já chegou!';
		if(timer){
			clearInterval(timer);
			timer = null;
		}
		return;
	}

	const sec = Math.floor(diff / 1000);
	const days = Math.floor(sec / 86400);
	const hours = Math.floor((sec % 86400) / 3600);
	const minutes = Math.floor((sec % 3600) / 60);
	const seconds = sec % 60;

	elDays.textContent = days;
	elHours.textContent = pad(hours);
	elMinutes.textContent = pad(minutes);
	elSeconds.textContent = pad(seconds);
	elMessage.textContent = '';
}

update();
timer = setInterval(update, 1000);

window.setCountdown = function(date){ update(date); };

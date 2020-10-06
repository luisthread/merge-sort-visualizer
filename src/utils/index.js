export function createArray(n) {
	let arr = [];
	for (let i = 0; i < n; ++i) {
		arr[i] = getRandomInt(1, 101);
	}

	return arr;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

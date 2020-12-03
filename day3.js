const getDataForDay = require('./utils/fetch-challenge-data');

function part1(map, path) {
	return map.reduce((sum, el, i) => el[i * path.r / path.d] === '#' && i % path.d === 0 ? sum + 1 : sum, 0);
}

function part2(map, slopes) {
	return slopes.reduce((sum, slope) => sum * part1(map, slope), 1);
}

getDataForDay(3).then(data => {
	let times = 7 * data.length / data[0].length;
	let map = data.map((row) => row.repeat(times).split(''));

	console.log('part1', part1(map, { r: 3, d: 1 }));
	console.log('part2', part2(map, [{ r: 1, d: 1 }, { r: 3, d: 1 }, { r: 5, d: 1 }, { r: 7, d: 1 }, { r: 1, d: 2 }]));
}).catch(console.log);

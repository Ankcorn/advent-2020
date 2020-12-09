const getDataForDay = require('./utils/fetch-challenge-data');

let part1 = (customs) => {
	let count = 0;
	for(let group of customs) {
		let answer = []
		for(let pp of group) {
			console.log(answer, pp)
			answer =  new Set([...answer, ...pp.split('')]);
		}
		count = count + answer.size;
	}
	return count
}

let part2 = (customs) => {
	let count = 0;
	for(let group of customs) {
		let answer = group[0].split('')

		for(let pp of group) {
			console.log('p', pp)
			console.log('pp', pp.split(''))
			answer = answer.filter(el => pp.split('').includes(el));
			console.log(answer)
		}
		console.log(answer.length)
		count = count + answer.length;
	}
	return count
}
getDataForDay(6).then(data => {
	let input = data.trim().split('\n\n').map(el => el.split('\n'))
	console.log('part1', part1(input))
	console.log('part2', part2(input))
}).catch(console.log);

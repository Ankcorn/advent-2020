const getDataForDay = require('./utils/fetch-challenge-data');

let part1 = (boardingPass) => {
	let seatNumbers = []
	for(let bp of boardingPass) {
		let row = [0,127];
		let col = [0,7];
		for(let char of bp.split('').entries()) {
			if(char[1] === 'F') {
				row[1] = row[1] - Math.ceil((row[1]- row[0]) / 2);
			}
			if(char[1] === 'B') {
				row[0] = row[0] + Math.ceil((row[1] - row[0]) / 2)
			}

			if(char[1] === 'R') {
				col[0] = col[1] - Math.floor((col[1] - col[0]) / 2);
			}

			if(char[1] === 'L') {
				col[1] = col[1] - Math.ceil((col[1] - col[0]) / 2);
			}
			
			if(char[0] === 9 ) {
				seatNumbers.push(row[0] * 8 + col[0])
			}
		}
	}
	return seatNumbers.sort((a,b) => b-a)
}

let part2 = (boardingIds) => {
	console.log(boardingIds)
	let prev = undefined;

	for(let id of boardingIds) {
		if(prev-id !== 1) {
			console.log(id)
		}
		prev= id
	}
}
getDataForDay(5).then(data => {
	
	let test1 = ['BBFFBBFRLL']
	console.log('part1', part1(data.split('\n'))[0])
	console.log('part2', part2(part1(data.split('\n'))))
}).catch(console.log);

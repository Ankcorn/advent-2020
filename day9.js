const getDataForDay = require('./utils/fetch-challenge-data');

let part1 = (instructions) => {
	let ans;
	for (let a in instructions) {
		if (a < 25) {
			continue;
		}
		let hasSum
		
		for (let b = 1; b < 26; b++) {
			for (let c = 1; c < 26; c++) {
				if((instructions[a-b] + instructions[a-c]) === instructions[a]) {
					hasSum = true
				}
			}
		}

		if(!hasSum) {
			return instructions[a]
		}
	}
	return ans
}

let part2 = (instructions) => {
	console.log(instructions)
	let res;
	for(let [a, numA] of instructions.entries()) {
		let arr = []
		for(let [b, numB] of instructions.entries()) {
			if(b>=a) {
				arr.push(numB)
				if(arr.reduce((sum, el) => sum + el, 0) === 10884537) {
					return arr
				}
			}
		}
		if(res) break;
	}
	console.log(res)
	let range = instructions.splice(res.a, res.b -1).sort((a,b) => a-b);
	console.log(range)
	console.log(range.reduce((sum, el) => sum + el, 0))
	return range[0] + range[range.length - 1];
}

getDataForDay(9).then(data => {
	console.log('part1', part1(data.trim().split('\n').map((n) => Number(n))))
	console.log('part2', part2(data.trim().split('\n').map((n) => Number(n))).sort())
}).catch(console.log);

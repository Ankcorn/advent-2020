const getDataForDay = require('./utils/fetch-challenge-data');

let part1 = (instructions, a, n) => {
	let next = n || 0;
	let acc = a || 0;
	if (next === instructions.length) {
		return { acc, status: 'ended' };
	}

	if (instructions[next].used) {
		return { acc, status: 'crashed' };
	}

	instructions[next].used = true

	if (instructions[next].instruction.includes('nop')) {
		return part1(instructions, acc, next + 1)
	}

	let [i, quant] = instructions[next].instruction.split(' ');

	if (i === 'acc') {
		return part1(instructions, eval(acc + quant), next + 1);
	}
	if (i === 'jmp') {
		return part1(instructions, acc, eval(next + quant));
	}
}

let part2 = (instructions) => {
	for (let [index, line] of instructions.entries()) {
		let newIns = JSON.parse(JSON.stringify(instructions))
		if (line.instruction.includes('jmp')) {
			newIns[index].instruction = line.instruction.replace('jmp', 'nop')
		} else if (line.instruction.includes('nop')) {
			newIns[index].instruction = line.instruction.replace('nop', 'jmp')
		}
		let res = part1(newIns)
		if (res.status === 'ended') {
			return res
		}
	}
}

getDataForDay(8).then(data => {
	let input = data.trim().split('\n').map(el => ({ instruction: el }));
	let input2 = JSON.parse(JSON.stringify(input))
	console.log('part1', part1(input))
	console.log('part2', part2(input2))
}).catch(console.log);

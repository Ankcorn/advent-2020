const getDataForDay = require('./utils/fetch-challenge-data');

let part1 = (instructions, a, n) => {
	let next = n || 0
	let acc = a || 0
	if(next === instructions.length) {
		console.log('ended')
		return { acc, status: 'ended' };
	}
	if(instructions[next].used) {
		return { acc, status: 'crashed' };
	}
	instructions[next].used = true

	if(instructions[next].instruction.includes('nop')) {
	
		next++
		return part1(instructions, acc, next)
	}

	let [i, quant] = instructions[next].instruction.split(' ');
	let [opp, ...nn] = quant.split('');
	let num = Number(nn.join(''));
	if(i === 'acc') {
		next++
		acc = opp === '-' ? acc - num: acc + num;
		return part1(instructions, acc, next);
	}
	if(i === 'jmp') {
		next = opp === '-' ? next - num: next + num;
		return part1(instructions, acc, next);
	}
}

let part2 = (instructions) => {
	for(let [index, line] of instructions.entries()) {
		let newIns = JSON.parse(JSON.stringify(instructions))
		if(line.instruction.includes('jmp')) {
			newIns[index].instruction = line.instruction.replace('jmp', 'nop')
		} else if(line.instruction.includes('nop')) {
			newIns[index].instruction = line.instruction.replace('nop', 'jmp')
		}
		let res = part1(newIns)
		if(res.status === 'ended') {
			return res.acc
		}
	}
}


getDataForDay(8).then(data => {
	let input = data.trim().split('\n').map(el => ({ instruction: el}));
	let input2 = JSON.parse(JSON.stringify(input))
	console.log('part1', part1(input))
	console.log('part2', part2(input2))
}).catch(console.log);

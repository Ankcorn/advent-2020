const getDataForDay = require('./utils/fetch-challenge-data');

function part1(expenses) {
	for(let a of expenses) {
		for(let b of expenses) {
			if(a+b === 2020) {
				return a*b
			}
		}
	}
}

function part2(expenses) {
	for(let a of expenses) {
		for(let b of expenses) {
			for(let c of expenses) {
				if(a+b+c === 2020) {
					return a*b*c
				}
			}
		}
	}
}

(async () => {
	try { 
		const data = await getDataForDay(1);
		const expenses = data.split('\n').map(Number)
		console.log('part1', part1(expenses))
		console.log('part2', part2(expenses))
	} catch(e) {
		console.error(e)
	}
})();

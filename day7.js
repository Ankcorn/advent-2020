const getDataForDay = require('./utils/fetch-challenge-data');

let part1 = (bags) => {
	let input = bags.reduce((sum, el) => {
		let [bag, contents] = el.split(' bags contain');

		let parsedContents = contents.split(',').map(a=>{
			let [f, ...words] = a.split(' ').filter(a => a.length > 0);
			if(f === 'no') {
				return null
			}		

			return words.filter(a => !a.includes('bag')).join(' ');
		});


		
		return {
			...sum,
			[bag.trim()]: parsedContents
		}
	}, {})
	let goldPaths = []
	for(let bag of Object.keys(input)) {

		let burrow = (input, key, start) => {
			if(!start) {
				start=key
			}
			if(!input[key].includes('shiny gold')) {
				if(input[key].filter(a=>a).length) {
					for (let c of input[key]) {
						burrow(input, c, start)
					}
					return
				}
				return
			}
			
			goldPaths.push(start)
		}
		
		burrow(input, bag)
	}
	return new Set(goldPaths).size
}

let part2 = (bags) => {
	let input = bags.reduce((sum, el) => {
		let [bag, contents] = el.split(' bags contain');

		let parsedContents = contents.split(',').map(a=>{
			let [f, ...words] = a.split(' ').filter(a => a.length > 0);
			if(f === 'no') {
				return null
			}		

			return { color: words.filter(a => !a.includes('bag')).join(' '), num: Number(f) }
		});


		
		return {
			...sum,
			[bag.trim()]: parsedContents
		}
	}, {})
	console.log(input);
	let count = 0
	const gogo = (bag) => {
		let child = input[bag];
		for(let bag of child){
			if(bag) {
				for(let i = 0; i<bag.num; i++) {
					console.log(bag.color);
					count++
					gogo(bag.color)
				}
			}
		}
	}
	gogo('shiny gold');
	return count;
}
getDataForDay(7).then(data => {
	let input = data.trim().split('\n')
	console.log('part1', part1(input))
	console.log('part2', part2(input))
}).catch(console.log);

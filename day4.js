const getDataForDay = require('./utils/fetch-challenge-data');

let part1 = (passports) => {
	let validPassports = passports.filter((passp) => {
		return Object.keys(passp).filter(el => el !=='cid').length === 7
	})
	return validPassports
}

let isHightValid = (hgt) => {
	if(hgt.includes('in')) {
		let num = Number(hgt.split('in')[0])
		return num > 58 && num < 77
	}
	if(hgt.includes('cm')) {
		let num = Number(hgt.split('cm')[0])
		return num > 149 && num < 194
	}
	return false
}
let isColor = (hcl) => {
	let res = /#([a-z0-9]{6})/.exec(hcl);
	return !!res
}

let part2 = (passports) => {
	let validSoFar = part1(passports);
	let actualPassports = validSoFar.filter(el => (
		Number(el.byr) > 1919 &&  Number(el.byr) < 2003 &&
		Number(el.iyr) > 2009 && Number(el.iyr) < 2021 &&
		Number(el.eyr) > 2019 && Number(el.eyr) < 2031 &&
		isHightValid(el.hgt) && 
		isColor(el.hcl) &&
		['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(el.ecl) && 
		el.pid.length === 9
	));
	return actualPassports
}

getDataForDay(4).then(data => {
	console.log(data)
	let passports = data.split('\n').reduce((sum, el) => {
		if(el === '') return [...sum, []];
		sum[sum.length-1] = {
			...sum[sum.length-1],
			...el.split(' ').reduce((sum, el) => {
				let [key, val] = el.split(':')
				return {
					...sum,
					[key]: val
				}
			}, {})
		}
		return sum
	}, [[]]);
	console.log('input', passports)
	console.log('part1', part1(passports).length);
	console.log('part2', part2(passports).length);
	
}).catch(console.log);

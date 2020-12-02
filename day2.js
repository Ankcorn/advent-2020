const getDataForDay = require('./utils/fetch-challenge-data');

function part1(passwords) {
	let validPasswords = passwords.filter(el => {
		let matchLength = el.password.filter(c => c === el.rules.char).length
		return matchLength >= el.rules.min && matchLength <= el.rules.max
	})
	return validPasswords.length
}

function part2(passwords) {
	let validPasswords = passwords.filter(el => {
		let first = el.password[el.rules.min - 1];
		let second = el.password[el.rules.max - 1];
		return (first === el.rules.char) !== (second === el.rules.char)
	})
	return validPasswords.length
}

(async () => {
	try {
		let data = await getDataForDay(2);
		let passwords = data.split('\n').filter(el => el).map(el => {
			let [rules, password] = el.split(': ')
			let [quant, char] = rules.split(' ')
			let [min, max] = quant.split('-')

			return {
				rules: {
					min: Number(min),
					max: Number(max),
					char
				},
				password: password.split('')
			}
		});

		console.log('part1', part1(passwords))
		console.log('part2', part2(passwords))
	} catch (e) {
		console.error(e)
	}
})();

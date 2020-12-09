require('dotenv').config()
const { get } = require('axios');
const { promises: fs } = require('fs');
const path = require('path');

async function getDataForDay(n) {
	try {
		const file = await fs.readFile(path.join(__dirname, `../data/day_${n}.txt`));
		return file.toString();
	} catch(e) {
		console.log('file not found in cache fetching new data')
		const { data } = await get(`https://adventofcode.com/2020/day/${n}/input`, { headers: {
			Cookie: `session=${process.env.SESSION}`
		}});
		await fs.writeFile(path.join(__dirname, `../data/day_${n}.txt`), data)
		return data;
	}
}

module.exports = getDataForDay

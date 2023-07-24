const { parse } = require('csv-parse');
// const parse = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];
const isHabitablePlanet = (planet) => {
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
};

// const agesGreaterThan30 = [];
// const isAgesGreaterThan30 = (person) => {
// 	return person['Age'] > 30;
// };

fs.createReadStream('kepler_data.csv')
	.pipe(
		parse({
			comment: '#',
			columns: true,
		})
	)
	.on('data', (data) => {
		if (isHabitablePlanet(data)) {
			habitablePlanets.push(data);
		}
		// if (isAgesGreaterThan30(data)) {
		// 	agesGreaterThan30.push(data);
		// }
	})
	.on('error', (err) => {
		console.log(err);
	})
	.on('end', () => {
		console.log(
			habitablePlanets.map((planet) => {
				return planet['kepler_name'];
			})
		);
		console.log(`${habitablePlanets.length} habitable planets found`);
		console.log('done');
	});

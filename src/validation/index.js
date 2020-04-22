const Joi = require('@hapi/joi');
const {get, isEmpty} = require('lodash');

const GET_WEATHER_SCHEMA = Joi.object({
	zipCodes: Joi.array().required().min(1).max(15)
});

const validateGetWeatherParams = (req, res, next) => {
	const {zipCodes = '[]'} = req.query || {};
	try {
		const formattedZipCode = JSON.parse(zipCodes);
		const {error = {}} = GET_WEATHER_SCHEMA.validate({zipCodes: formattedZipCode}) || {};
		if (isEmpty(error)) {
			req.query.zipCodes = formattedZipCode;
			next();
			return
		}
		const message = get(error, 'details[0].message', '');
		res.status(400).send({message})
	} catch (e) {
		res.status(500).send({message: 'Internal server error is found'})
	}
};

module.exports = {
	validateGetWeatherParams: validateGetWeatherParams
};

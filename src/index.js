const axios = require('axios')
const helmet = require('helmet')
const express = require('express')
const cors = require('cors')
const {get, map} = require('lodash')
const {validateGetWeatherParams} = require("./validation")
const {getUrlWithCityCode} = require("./constants")

const app = express();
app.use(cors())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/weather', validateGetWeatherParams, (req, res) => {
	const {zipCodes = []} = req.query || {};
	const promiseList = [];
	map(zipCodes, zipCodeItem => {
		promiseList.push(axios.get(getUrlWithCityCode({code: zipCodeItem})))
	});
	
	try {
		axios.all(promiseList).then(axios.spread((...responses) => {
			res.status(200).send({data: map(responses, item => item.data)})
		})).catch((error) => {
			let code = 500
			let message = 'Internal server error is found'
			const data = get(error, 'response.data', {})
			if (data.cod === 401) {
				code = 401
				message = 'Invalid API key'
			}
			res.status(code).send({message})
		})
	} catch (e) {
		res.status(500).send({message: 'Internal server error is found'})
	}
});

module.exports = app;

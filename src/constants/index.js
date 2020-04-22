const MOCK_TESTING_URL = 'http://www.mocky.io/v2/5e9ddd9334000081676eea37'
const WEATHER_API_BASE_URL = 'http://dummy.restapiexample.com/api/v1/employee/2'
const getUrlWithCityCode = ({code}) => `https://api.openweathermap.org/data/2.5/weather?zip=${ code },us&APPID=d97e7e4cad65084a1ca8d5caa2277985`

module.exports = {
	MOCK_TESTING_URL,
	WEATHER_API_BASE_URL,
	getUrlWithCityCode,
}

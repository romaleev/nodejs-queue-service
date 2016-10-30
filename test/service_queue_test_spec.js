var frisby = require('frisby');
var Config = require('../src/common/Config'),
	api = Config.api,
	apiTimeout = Config.apiTimeout;

//for(var i = 0; i < 10; i++)
frisby.create('External API test - service-queue')
	.post(api + '/service-queue', {
		'shipments': '123456789',
		'track': '123456789',
		'pricing': 'NL,US'
	}, {json: true})
	.expectStatus(200)
	.expectJSONTypes({
		'shipments': {
			'123456789': Array
		},
		'track': {
			'123456789': String
		},
		'pricing': {
			'NL': Number,
			'US': Number
		}
	})
	.timeout(apiTimeout + 500)
	.toss();

frisby.create('External API test - service-queue')
	.post(api + '/service-queue', {
		'shipments': '12345679',
		'track': '123456789',
		'pricing': 'NL,US'
	}, {json: true})
	.expectStatus(400)
	.timeout(apiTimeout + 500)
	.toss();

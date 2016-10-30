var frisby = require('frisby');
var Config = require('../src/common/Config'),
		api = Config.api,
		apiTimeout = Config.apiTimeout;

frisby.create('External API test - shipments')
	.get(api + '/shipments?q=123456789,987654321,987654321')
	.expectStatus(200)//.inspectJSON()
	.expectJSONTypes({
		123456789: Array,
		987654321: Array
	})
	.timeout(apiTimeout + 500)
	.toss();
frisby.create('External API test - shipments')
	.get(api + '/shipments?q=123456789,9876')
	.expectStatus(400)
	.toss();
frisby.create('External API test - shipments')
	.get(api + '/shipments?a=123456789,9876')
	.expectStatus(400)
	.timeout(apiTimeout + 500)
	.toss();

frisby.create('External API test - track')
	.get(api + '/track?q=123456789,987654321')
	.expectStatus(200)
	.expectJSONTypes({
		123456789: String,
		987654321: String
	})
	.timeout(apiTimeout + 500)
	.toss();
frisby.create('External API test - track')
	.get(api + '/track?q=123456789,9876')
	.expectStatus(400)
	.toss();
frisby.create('External API test - track')
	.get(api + '/track?a=123456789,9876')
	.expectStatus(400)
	.timeout(apiTimeout + 500)
	.toss();

frisby.create('External API test - pricing')
	.get(api + '/pricing?q=NL,US')
	.expectStatus(200)
	.expectJSONTypes({
		NL: Number,
		US: Number
	})
	.timeout(apiTimeout + 500)
	.toss();
frisby.create('External API test - pricing')
	.get(api + '/pricing?q=NL,NN')
	.expectStatus(400)
	.timeout(apiTimeout + 500)
	.toss();
frisby.create('External API test - pricing')
	.get(api + '/pricing?a=NL,US')
	.expectStatus(400)
	.timeout(apiTimeout + 500)
	.toss();

frisby.create('External API test - 503')
	.get(api + '/shipment')
	.expectStatus(503)
	.timeout(apiTimeout + 500)
	.toss();

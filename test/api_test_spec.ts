import frisby, { Joi } from 'frisby'
import { api, apiTimeout } from '../src/common/Config.json'

const Array = Joi.array()
const Number = Joi.number()
const String = Joi.string()

describe('External API tests', () => {

	it('External API test - shipments', () => {
		frisby
			.get(`${api}/shipments?q=123456789,987654321,987654321`)
			.expect('status', 200)
			.expect('jsonTypes', {
				123456789: Array,
				987654321: Array
			})
			.timeout(apiTimeout + 500)

		frisby
			.get(`${api}/shipments?q=123456789,9876`)
			.expect('status', 400)

		frisby
			.get(`${api}/shipments?a=123456789,9876`)
			.expect('status', 400)
			.timeout(apiTimeout + 500)
	})

	it('External API test - track', () => {
		frisby
			.get(`${api}/track?q=123456789,987654321`)
			.expect('status', 200)
			.expect('jsonTypes', {
				123456789: String,
				987654321: String
			})
			.timeout(apiTimeout + 500)

		frisby
			.get(`${api}/track?q=123456789,9876`)
			.expect('status', 400)

		frisby
			.get(`${api}/track?a=123456789,9876`)
			.expect('status', 400)
			.timeout(apiTimeout + 500)
	})

	it('External API test - pricing', () => {
		frisby
			.get(`${api}/pricing?q=NL,US`)
			.expect('status', 200)
			.expect('jsonTypes', {
				NL: Number,
				US: Number
			})
			.timeout(apiTimeout + 500)

		frisby
			.get(`${api}/pricing?q=NL,NN`)
			.expect('status', 400)
			.timeout(apiTimeout + 500)

		frisby
			.get(`${api}/pricing?a=NL,US`)
			.expect('status', 400)
			.timeout(apiTimeout + 500)

	})

	it('External API test - 503', () => {
		frisby
			.get(api + '/shipment')
			.expect('status', 503)
			.timeout(apiTimeout + 500)
	})

})


import frisby, { Joi } from 'frisby'
import { api, apiTimeout } from '../src/common/Config.json'

const Array = Joi.array()
const Number = Joi.number()
const String = Joi.string()

describe('Service API test', () => {

	it('service - 200', () => {
		frisby
			.post(`${api}/service`, {
				'shipments': '123456789',
				'track': '123456789',
				'pricing': 'NL,US'
			}, {json: true})
			.expect('status', 200)
			.expect('jsonTypes', {
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
	})

	it('service - 400', () => {
		frisby
			.post(`${api}/service`, {
				'shipments': '12345679',
				'track': '123456789',
				'pricing': 'NL,US'
			}, {json: true})
			.expect('status', 400)
			.timeout(apiTimeout + 500)
	})

})

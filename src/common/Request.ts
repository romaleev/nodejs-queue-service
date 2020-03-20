import http, { IncomingMessage } from 'http'
import { host, port } from 'common/Config.json'

export const get = (path: string): Promise<{}> =>
	new Promise((resolve, reject) =>
		http.request({
			host,
			port,
			method: 'GET',
			path
		}, (res: IncomingMessage) => {
			if (res.statusCode < 200 || res.statusCode > 299)
				return reject('error status ' + res.statusCode)

			let str = ''

			res
				.on('error', (error: Error) => reject(error))
				.on('data', (chunk) => str += chunk)
				.on('end', () => {
					console.log(str)
					try {
						resolve(JSON.parse(str))
					} catch (error) {
						reject(error)
					}
				})
		}).end())

import { get } from 'common/Request'
import Queue from 'promise-queue'
import { queueLimit } from 'common/Config.json'

const queues = {}

export default (req, res) => {
	const time = Date.now()

	const body = req.body
	console.log('processing', time)

	const promises = []
	const requests = Object.keys(body).length

	const finish = () =>
		requests === promises.length && Promise.all(promises)
			.then((data: {}) => {
				let result = {}
				Object.keys(body).forEach((api: string, i: number) => {
					result[api] = data[i]
				})

				console.log('done', time)
				res.status(200).send(result)
			})
			.catch((err: Error) => {
				console.log('error', err)
				res.status(400).send(err)
			})

	Object.keys(body).forEach((api: string) => {
		if (!queues[api]) queues[api] = new Queue(queueLimit, Infinity)

		queues[api].add(() => {
			console.log('start', api, Date.now() - time)
			const promise = get('/' + api + '?q=' + body[api])
			promises.push(promise)
			finish()
			return promise
		})
	})
}

import { Request, Response } from 'express'
import { get } from 'common/Request'

export default (req: Request, res: Response) => {
	let body = req.body
	console.log('processing', body)

	let promises: Promise<{}>[] = []
	Object.keys(body).forEach((api: string) =>
		promises.push(get('/' + api + '?q=' + body[api])))

	Promise.all(promises)
		.then((data: [{}]) => {
			const result = {}
			Object.keys(body).forEach((api: string, i: number) =>
				result[api] = data[i])

			console.log('done', result)
			res.status(200).send(result)
		})
		.catch((err) => {
			console.log('error', err)
			res.status(400).send(err)
		})
}

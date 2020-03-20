import { Request, Response } from 'express'
import { apiTimeout } from 'common/Config.json'

const TRACK_REGEXP = /^[0-9]{9}$/
const STATUSES = ['NEW', 'IN TRANSIT', 'COLLECTING', 'COLLECTED', 'DELIVERING', 'DELIVERED']

export default (req: Request, res: Response) => {
	const q: string = req.query.q
	if (!q) return res.status(400).end()

	const list: string[] = [...new Set(q.indexOf(',') === -1 ? [q] : q.split(','))]

	if(list.some((item: string) => !TRACK_REGEXP.test(item)))
		return res.status(400).end()

	const result = {}
	for (let item of list)
		result[item] = STATUSES[Math.floor(Math.random() * STATUSES.length)]

	setTimeout(() => res.status(200).send(result), apiTimeout)
}

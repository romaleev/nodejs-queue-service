import { Request, Response } from 'express'
import { apiTimeout } from 'common/Config.json'

const SHIPMENTS_REGEXP = /^[0-9]{9}$/
const PRODUCTS = ['box', 'envelope', 'palet']

export default (req: Request, res: Response) => {
	const q: string = req.query.q
	if (!q) return res.status(400).end()

	const list: string[] = [...new Set(q.indexOf(',') === -1 ? [q] : q.split(','))]

	if (list.some((item: string) => !SHIPMENTS_REGEXP.test(item)))
		return res.status(400).end()

	const result = {}
	for (let item of list) {
		result[item] = []
		for (let i = 0; i < parseInt(item.slice(-1)); i++)
			result[item].push(PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)])
	}

	setTimeout(() => res.status(200).send(result), apiTimeout)
}

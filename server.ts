import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import PricingApi from 'api/PricingApi'
import ShipmentsApi from 'api/ShipmentsApi'
import TrackApi from 'api/TrackApi'
import Service from 'Service'
import ServiceQueue from 'ServiceQueue'
import { port } from 'common/Config.json'

express()
	.use(bodyParser.json())
	.get('/shipments', ShipmentsApi)
	.get('/track', TrackApi)
	.get('/pricing', PricingApi)
	.get('*', (_req, res: Response) => res.status(503).end())
	.post('/service', Service)
	.post('/service-queue', ServiceQueue)
	.post('/register', (req: Request, res: Response) => {
		setTimeout(() => {
			console.log('/register', req.body)
			res.status(201).end()
		}, Math.floor(Math.random() * 2000) + 500)
	})
	.listen(port, () => console.log(`server started at localhost:${port}`))

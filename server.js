import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import ExternalApi from 'api/ExternalApi';
import Service from 'Service';
import ServiceQueue from 'ServiceQueue';
import { port } from 'common/Config';

let server = express();
server
	.use(bodyParser.json());

ExternalApi(server);
Service(server);
ServiceQueue(server);

server
	.post('/register', (req, res)=>{
		setTimeout(()=> {
			console.log('/register', req.body);
			res.status(201).end();
		}, Math.floor(Math.random() * 2000) + 500);
	})
	.listen(port, ()=> console.log('server started at localhost:' + port));

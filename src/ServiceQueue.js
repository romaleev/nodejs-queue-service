import Request from 'common/Request';
import Queue from 'promise-queue';
import { queueLimit} from 'common/Config';

let queues = {};

export default (node)=>{
	node.post('/service-queue', (req, res)=>{
		let time = Date.now();

		let body = req.body;
		console.log('processing', time);

		let promises = [];
		let requests = Object.keys(body).length;

		let finish = ()=>
			requests === promises.length && Promise.all(promises)
					.then((data)=> {
						let result = {};
						Object.keys(body).forEach((api, i)=> {
							result[api] = data[i];
						});

						console.log('done', time);
						res.status(200).send(result);
					})
					.catch((err)=> {
						console.log('error', err);
						res.status(400).send(err);
					});

		Object.keys(body).forEach((api)=>{
			if(!queues[api]) queues[api] = new Queue(queueLimit, Infinity);
			queues[api].add(()=> {
				console.log('start', api, Date.now() - time);
				let promise = Request.get('/' + api + '?q=' + body[api]);
				promises.push(promise);
				finish();
				return promise;
			});
		});
	});
}

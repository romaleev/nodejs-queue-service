import Request from 'common/Request';

export default (node)=>{
	node.post('/service', (req, res)=>{
		let body = req.body;
		console.log('processing', body);

		let promises = [];
		Object.keys(body).forEach((api)=>
			promises.push(Request.get('/' + api + '?q=' + body[api])));

		Promise.all(promises)
			.then((data)=>{
				let result = {};
				Object.keys(body).forEach((api, i)=>{
					result[api] = data[i];});

				console.log('done', result);
				res.status(200).send(result);
			})
			.catch((err)=>{
				console.log('error', err);
				res.status(400).send(err);
			});
	});
}

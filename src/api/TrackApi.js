import { apiTimeout } from 'common/Config';

let statuses = ['NEW', 'IN TRANSIT', 'COLLECTING', 'COLLECTED', 'DELIVERING', 'DELIVERED'];

export default (url, node)=>
	node.get(url, (req, res)=>{
		let q = req.query.q;
		if(!q) return res.status(400).end();

		let list = [...new Set(q.indexOf(',') === -1 ?  [q] : q.split(','))];

		for(let item of list)
			if(!/^[0-9]{9}$/.test(item)) return res.status(400).end();

		let result = {};
		for(let item of list)
			result[item] = statuses[Math.floor(Math.random() * statuses.length)];

		setTimeout(()=> res.status(200).send(result), apiTimeout);
	})

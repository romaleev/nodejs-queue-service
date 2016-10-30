import { apiTimeout } from 'common/Config';

let products =  ['box', 'envelope', 'palet'];

export default (url, node)=>
	node.get(url, (req, res)=>{
		let q = req.query.q;
		if(!q) return res.status(400).end();

		let list = [...new Set(q.indexOf(',') === -1 ?  [q] : q.split(','))];

		let regexp = /^[0-9]{9}$/;
		if(list.some((item)=> !regexp.test(item))) return res.status(400).end();

		let result = {};
		for(let item of list) {
			result[item] = [];
			for (let i = 0; i < parseInt(item.slice(-1)); i++)
				result[item].push(products[Math.floor(Math.random() * products.length)]);
		}

		setTimeout(()=> res.status(200).send(result), apiTimeout);
	})

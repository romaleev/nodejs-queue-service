import http from 'http';
import { host, port } from 'common/Config';

export default {
	get: (path)=> new Promise((resolve, reject)=>
		http.request({
			host,
			port,
			method: 'GET',
			path
		}, (res)=>{
			if (res.statusCode < 200 || res.statusCode > 299) return reject('error status ' + res.statusCode);
			let str = '';
			res.on('error', (e)=>{
				reject(e);
			});
			res.on('data', (chunk)=>	str += chunk );
			res.on('end', ()=>{
				console.log(str);
				try{
					resolve(JSON.parse(str));
				} catch(e){
					reject(e);
				}
			});
		}).end())
};

import ShipmentsApi from 'api/ShipmentsApi';
import TrackApi from 'api/TrackApi';
import PricingApi from 'api/PricingApi';

export default (node)=>{
	ShipmentsApi('/shipments', node);
	TrackApi('/track', node);
	PricingApi('/pricing', node);
	node.get('*', (req, res)=> res.status(503).end());
}

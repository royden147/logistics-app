const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const CSV = require('../models/csv');
const Track = require('../models/track');
const Invoice = require('../models/invoice');
const app = require('../app');

router.post('/', async (req, res, next)=>{
	const csv = await CSV.findById(req.body.tracking_id);
	const trackingInfo = await Track.create({
		...req.body,
		date_time: Date()
	}); 
	delete csv._doc._id;
	let invoice = {
		...csv._doc,
		tracking_id: req.body.tracking_id,
		total_bill: '$' + req.body.total_bill
	}
	const invoiceInfo = await Invoice.create(invoice);
	res.redirect(301, 'csv/fetch?s=1');
});


router.get('/:id', async (req, res, next)=>{
	const order = await CSV.findById(req.params.id);
	res.render('orders', {pageName: "orders", order: order, showLinks: global.showLinks})
});


module.exports = router;

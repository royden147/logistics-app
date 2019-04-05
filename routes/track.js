const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Track = require('../models/track');
const app = require('../app');


router.get('/', async (req, res, next)=>{
	const trackingData = await Track.find();
	res.render('track', {pageName: 'track', trackingData: trackingData, showLinks: global.showLinks, showError: false, search: false});
});


router.post('/', async (req, res, next)=>{
	const trackingData = await Track.find({tracking_id: req.body.tracking_id});
	let showError = false;
	if(trackingData.length === 0){
		showError = true;
	}
	res.render('track', {pageName: 'track', trackingData: trackingData, showLinks: global.showLinks, showError: showError, search: true});
});
module.exports = router;

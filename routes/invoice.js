const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const CSV = require('../models/csv');
const Track = require('../models/track');
const Invoice = require('../models/invoice');
const app = require('../app');
const tablePDF = require('../createTable');


router.get('/',  async (req, res, next)=>{
	const invoices = await Invoice.find();
	res.render('invoice', {pageName: "invoices", invoices: invoices, showLinks: global.showLinks});
});

router.get('/pdf/:id',  async (req, res, next)=>{
	const invoice = await Invoice.findById(req.params.id);
	let pdf = tablePDF.create(invoice);
    pdf.pipe(res);
    pdf.end();
});

module.exports = router;
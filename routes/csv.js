const express = require('express');
const router = express.Router();
const multer  = require('multer');
const csvToJson = require('convert-csv-to-json');
const path = require('path');
const CSV = require('../models/csv');
const fs = require('fs');
const app = require('../app');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
 
var upload = multer({ 
	storage: storage
}).single('csv');


router.get('/', (req, res, next)=>{
	res.render('csv', {pageName: 'csv', success: req.query.s, showLinks: global.showLinks, selectFirst: req.query.e, incorrectFormat: req.query.i})
});


router.post('/', upload, async (req, res, next)=>{
	if(!req.file){
	  return  res.redirect(301, '/csv?e=1');				
	}
	let filePath = path.join(__dirname, '..', 'uploads', `${req.file.originalname}`);
	if(path.extname(filePath) !== '.csv'){
		fs.unlinkSync(filePath);		
		return res.redirect(301, '/csv?i=1');
	}
	let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(filePath);
	const csv = await CSV.create(...json);
	fs.unlinkSync(filePath);
	global.showLinks = true;
	res.redirect(301, '/csv?s=1');
});


router.get('/fetch', async (req, res, next)=>{
	const csvs = await CSV.find();
	res.render('fetch', {pageName: 'fetch', csvs: csvs, success: req.query.s, showLinks: global.showLinks});
})

module.exports = router;
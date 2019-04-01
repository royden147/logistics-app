const express = require('express');
const router = express.Router();
const multer  = require('multer');
const csvToJson = require('convert-csv-to-json');
const path = require('path');
const CSV = require('../models/csv');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
 
var upload = multer({ 
	storage: storage,
	fileFilter: function (req, file, cb) {
	    var ext = path.extname(file.originalname);
	    if(ext !== '.csv') {
	        return cb(new Error('Only CSV file uploads are allowed'))
	    }
	    cb(null, true)
	},
}).single('csv');



router.get('/', (req, res, next)=>{
	res.render('csv', {pageName: 'csv', success: req.query.s})
});


router.post('/', upload, async (req, res, next)=>{
	var filePath = path.join(__dirname, '..', 'uploads', `${req.file.originalname}`);
	let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(filePath);
	const csv = await CSV.create(...json);
	console.log(csv)
	res.redirect(301, '/csv?s=1');
});


router.get('/fetch', async (req, res, next)=>{
	const csvs = await CSV.find();
	// res.status(200).json(csvs);
	res.render('fetch', {pageName: 'fetch', data: JSON.stringify(csvs)});
})

module.exports = router;
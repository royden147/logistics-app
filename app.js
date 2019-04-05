const express = require('express');
const csvRoutes = require('./routes/csv');
const ordersRoutes = require('./routes/orders');
const trackRoutes = require('./routes/track');
const invoiceRoutes = require('./routes/invoice');

const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

//middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

global.showLinks = false;

//home route
app.get('/', (req, res, next)=>{
	res.render('home', {pageName: 'home', showLinks: global.showLinks});
});


//about route
app.get('/about', (req, res, next)=>{
	res.render('about', {pageName: 'about', showLinks: global.showLinks});
});


//register routers
app.use('/csv', csvRoutes);
app.use('/orders', ordersRoutes);
app.use('/track', trackRoutes);
app.use('/invoice', invoiceRoutes);

//catch all route
app.use((req, res, next)=>{
	res.render('error', {pageName: "error", message: 'Requested URL doesnt exist', showLinks: global.showLinks});
});

//error middleware
app.use((err, req, res, next)=>{
	res.render('error', {pageName: "error", message: err.message, showLinks: global.showLinks});
});

//make server and database live
mongoose.connect('mongodb+srv://muhammad:F121369.@csv-app-cluster0-szudg.mongodb.net/logistics-app?retryWrites=true', { useNewUrlParser: true })
	.then(()=>{
		console.log('db connection success');
		app.listen(4000, console.log('Server running on port 4000'));
	})
	.catch(err => console.log(err, 'DB connection Fail'));


module.exports = app;


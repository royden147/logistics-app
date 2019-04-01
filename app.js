const express = require('express');
const csvRoutes = require('./routes/csv');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res, next)=>{
	res.render('home', {pageName: 'home'});
});

app.get('/about', (req, res, next)=>{
	res.render('about', {pageName: 'about'});
});

app.use('/csv', csvRoutes);

//catch all route
app.use((req, res, next)=>{
	res.render('error', {pageName: "error", message: 'Requested URL doesnt exist'});
});

//error middleware
app.use((err, req, res, next)=>{
	res.render('error', {pageName: "error", message: err.message});
});

mongoose.connect('mongodb+srv://muhammad:F121369.@csv-app-cluster0-szudg.mongodb.net/logistics-app?retryWrites=true', { useNewUrlParser: true })
	.then(()=>{
		console.log('db connection success');
		app.listen(4000, console.log('Server running on port 4000'));
	})
	.catch(err => console.log(err, 'DB connection Fail'));


module.exports = app;
const mongoose = require('mongoose');

const CSVSchema = new mongoose.Schema({}, {strict: false});

module.exports = mongoose.model('csv', CSVSchema);
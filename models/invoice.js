const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({}, {strict: false});

module.exports = mongoose.model('invoice', InvoiceSchema);
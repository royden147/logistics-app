const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({}, {strict: false});

module.exports = mongoose.model('track', TrackSchema);
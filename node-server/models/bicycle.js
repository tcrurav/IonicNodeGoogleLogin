// Load required packages
var mongoose = require('mongoose');

// Define our Bicycle schema
var BicycleSchema   = new mongoose.Schema({
  brand: String,
  model: String
});

// Export the Mongoose model
module.exports = mongoose.model('Bicycle', BicycleSchema);
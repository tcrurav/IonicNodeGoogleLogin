var express = require('express');
var router = express.Router();

var bicycleController = require('../controllers/bicycle');

var authController = require('../controllers/auth');

// Create endpoint handlers for /bicycles
router.route('/')
  .post(authController.isAuthenticated, bicycleController.postBicycles)
  .get(authController.isAuthenticated, bicycleController.getBicycles);

// Create endpoint handlers for /bicycles/:bicycle_id
router.route('/:bicycle_id')
  .get(authController.isAuthenticated, bicycleController.getBicycle)
  .put(authController.isAuthenticated, bicycleController.putBicycle)
  .delete(authController.isAuthenticated, bicycleController.deleteBicycle);

module.exports = router;
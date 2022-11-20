const express = require('express');
const router = express.Router();
const async = require("async");
const Fit = require('../models/fit');
const FitController = require('../controllers/fitController');

router.get('/fits/', FitController.get_fits);
router.post('/fit/create', FitController.create);
router.get('/fit/:fitId', FitController.get_fit);
router.put('/fit/:fitId/update', FitController.update);
router.delete('/fit/:fitId/delete', FitController.delete);

module.exports = router;
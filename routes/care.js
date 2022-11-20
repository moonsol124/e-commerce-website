const express = require('express');
const router = express.Router();
const async = require("async");
const Care = require('../models/care');
const CareController = require('../controllers/careController');

router.get('/cares/', CareController.get_cares);
router.post('/care/create', CareController.create);
router.get('/care/:careId', CareController.get_care);
router.put('/care/:careId/update', CareController.update);
router.delete('/care/:careId/delete', CareController.delete);

module.exports = router;
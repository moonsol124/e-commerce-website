const express = require('express');
const router = express.Router();
const async = require("async");
const Color = require('../models/color');
const ColorController = require('../controllers/colorController');

router.get('/colors/', ColorController.get_colors);
router.post('/color/create', ColorController.create);
router.get('/color/:colorId', ColorController.get_color);
router.put('/color/:colorId/update', ColorController.update);
router.delete('/color/:colorId/delete', ColorController.delete);

module.exports = router;
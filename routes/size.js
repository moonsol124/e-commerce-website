const express = require('express');
const router = express.Router();
const async = require("async");
const Size = require('../models/size');
const SizeController = require('../controllers/sizeController');

router.get('/sizes/', SizeController.get_sizes);
router.post('/size/create', SizeController.create);
router.get('/size/:sizeId', SizeController.get_size);
router.put('/size/:sizeId/update', SizeController.update);
router.delete('/size/:sizeId/delete', SizeController.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const async = require("async");
const Material = require('../models/material');
const MaterialController = require('../controllers/materialController');

router.get('/materials/', MaterialController.get_materials);
router.post('/material/create', MaterialController.create);
router.get('/material/:materialId', MaterialController.get_material);
router.put('/material/:materialId/update', MaterialController.update);
router.delete('/material/:materialId/delete', MaterialController.delete);

module.exports = router;
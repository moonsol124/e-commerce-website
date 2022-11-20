const express = require('express');
const router = express.Router();
const async = require("async");
const gender = require('../models/gender');
const GenderController = require('../controllers/genderController');

router.get('/genders/', GenderController.get_genders);
router.post('/gender/create', GenderController.create);
router.get('/gender/:genderId', GenderController.get_gender);
router.put('/gender/:genderId/update', GenderController.update);
router.delete('/gender/:genderId/delete', GenderController.delete);

module.exports = router;
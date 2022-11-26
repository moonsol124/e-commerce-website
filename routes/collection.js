const express = require('express');
const router = express.Router();
const async = require("async");
const Collection = require('../models/collection');
const CollectionController = require('../controllers/collectionController');

router.get('/collections/', CollectionController.get_collections);
router.post('/collection/create', CollectionController.create);
router.get('/collection/:collectionId', CollectionController.get_collection);
router.put('/collection/:collectionId/update', CollectionController.update);
router.delete('/collection/:collectionId/delete', CollectionController.delete);
// router.get('/db_collections', CollectionController.get_db_collections);
module.exports = router;
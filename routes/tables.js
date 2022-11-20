const express = require('express');
const router = express.Router();
const async = require("async");

router.get('/tables', function tables(req, res, next) {
    db.listCollections().toArray(function(err, collInfos) {
        // collInfos is an array of collection info objects that look like:
        // { name: 'test', options: {} }
    });
})
router.exports = router;
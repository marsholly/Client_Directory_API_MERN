const express = require('express');

const router = new express.Router();

router.use('/bb', require('./bb'));

module.exports = router;

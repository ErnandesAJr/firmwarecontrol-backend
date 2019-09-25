const express = require('express');
const multer = require('multer');
const multerConfig = require('../../config/multer')

const router = express.Router();

require('./firmware-routes')(multer, multerConfig, router);

module.exports = router;
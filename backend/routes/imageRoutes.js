/* Keven Lam */
const express = require('express');
const router = express.Router();

const Image = require('../models/image');

router.get('/:id', Image.getByEventId);

module.exports = router;
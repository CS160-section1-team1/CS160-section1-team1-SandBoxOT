/* Keven Lam */
const express = require('express');
const router = express.Router();
const Service_Provider = require('../models/service_provider');

// router.get('/:id', User.getById);
router.post('/signup', Service_Provider.signup);

module.exports = router;
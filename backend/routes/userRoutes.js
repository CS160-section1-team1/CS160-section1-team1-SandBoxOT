/* Keven Lam */
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:id', User.getById);
router.post('/signup', User.signup);
router.post('/login', User.login);

module.exports = router;

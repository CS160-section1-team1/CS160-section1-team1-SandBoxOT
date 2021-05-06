/* Keven Lam */
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

router.get('/allUsers', Admin.getAllUsers);
router.get('/allEvents', Admin.getAllEvents);
router.post('/login', Admin.login);


module.exports = router;

/* Keven Lam */
const express = require('express');
const router = express.Router();

const Event = require('../models/event');

router.get('/citizen/:id', Event.listCitizenEvents);
router.post('/search', Event.search);
router.post('/register', Event.register);


module.exports = router;
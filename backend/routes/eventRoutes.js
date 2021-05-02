/* Keven Lam */
const express = require('express');
const router = express.Router();

const Event = require('../models/event');

router.get('/:id', Event.getById);
router.get('/citizen/:id', Event.listCitizenEvents);
router.get('/service_provider/:id', Event.listServicerEvents);
router.post('/search', Event.search);
router.post('/create', Event.create);
router.post('/register', Event.register);


module.exports = router;
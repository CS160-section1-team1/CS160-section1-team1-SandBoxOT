/* Keven Lam */
const express = require('express');
const router = express.Router();

// Handle FormData requests (photo uploads)
const multer = require('multer');
const upload = multer();

const Event = require('../models/event');

router.get('/:id', Event.getById);
router.get('/citizen/:id', Event.listCitizenEvents);
router.get('/service_provider/:id', Event.listServicerEvents);
router.get('/index/recent', Event.listIndexEvents);
router.post('/search', Event.search);
router.post('/create', upload.single('picture'), Event.create);
router.post('/register', Event.register);
router.delete('/delete/:id', Event.deleteEvent);


module.exports = router;
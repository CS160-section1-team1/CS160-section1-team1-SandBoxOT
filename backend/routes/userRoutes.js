/* Keven Lam */
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:id', User.getById);
router.post('/signup', User.signup);
router.post('/login', User.login);
router.post('/addCardInfo', User.addCardInfo);
router.get('/getCardInfo/:id', User.getCardInfo);
router.get('/getBalance/:id', User.getBalance);
router.post('/deposit', User.deposit);
router.post('/withdraw', User.withdraw);
router.delete('/deleteCard/:wallet_id', User.deleteCard);

module.exports = router;

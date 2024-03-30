const express = require('express');
const router = express.Router();

const wishController = require('../controller/wish.controller.js');
const authenticate = require('../middleware/authenticate.js');

router.get('/', authenticate, wishController.findUserWish);
router.put('/add', authenticate, wishController.addWishItem);
router.delete('/:id', authenticate, wishController.removeWishItem);

module.exports = router;
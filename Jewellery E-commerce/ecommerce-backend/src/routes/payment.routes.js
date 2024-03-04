const express = require("express");
const authenticate = require("../middleware/authenticate.js");
const paymentController = require("../controller/payment.controller.js");

const router = express.Router();

router.post('/:id', authenticate, paymentController.createPaymentLink);
router.get('/', authenticate, paymentController.updatePaymentInformation);

module.exports = router;
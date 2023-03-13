const express = require("express")
const { createOrder, apiKey, paymentVerification } = require("../controllers/paymentControllers")
const { isAuthenticatedUser } = require("../middleware/auth")
const router = express.Router()

router.route('/apikey').get(isAuthenticatedUser, apiKey)
router.route('/paymentverifications').post(paymentVerification)

module.exports = router
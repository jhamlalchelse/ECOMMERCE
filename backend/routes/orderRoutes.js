const express = require('express')
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder, createOrder } = require('../controllers/orderControllers')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const router = express.Router()


router.route('/order/new').post(newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/orders/me').get( myOrders)
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)

router.route('/confirm/order').post(createOrder)



module.exports = router 
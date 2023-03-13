const express = require('express')
const { getAllProducts, createProduct, updateProduct, deleteProduct, productDetails, createProductReview, getProductReviews, deleteReview } = require('../controllers/productControllers')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const router = express.Router()


router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin') ,createProduct)
router.route('/products').get(getAllProducts)
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin','stuff') , updateProduct)
.delete(isAuthenticatedUser,authorizeRoles('admin','stuff') ,deleteProduct)
router.route('/product/:id').get(productDetails)
router.route('/product/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(getProductReviews)
router.route('/admin/review').delete(isAuthenticatedUser, authorizeRoles('admin','stuff'),deleteReview)




module.exports = router